#!/usr/bin/python3

import argparse
import json
import re
import requests
import semver
from typing import List, Dict

COMPATIBILITY_FLAG = "compatibility"
FROM_VERSION = "from_version"
RELEASES_URL = "https://api.github.com/repos/cosmos/ibc-go/releases"
CHAIN_A = "chain-a"
CHAIN_B = "chain-b"
HERMES = "hermes"
DEFAULT_IMAGE = "ghcr.io/cosmos/ibc-go-simd"
RLY = "rly"


def parse_version(version: str) -> semver.Version:
    if version.startswith("v"):
        version = version[1:]
    if version.startswith("release-"):
        # strip off the release prefix and parse the actual version
        return parse_version(version[len("release-"):])
    # ensure "main" is always greater than other versions for semver comparison.
    if version == "main":
        version = "9999.999.999"
    if version.endswith("x"):
        version = version.replace("x", "999", 1)
    return semver.Version.parse(version)


def parse_args() -> argparse.Namespace:
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(description="Generate Compatibility JSON.")
    parser.add_argument(
        "--file",
        help="The test file to look at.",
    )
    parser.add_argument(
        "--release-version",
        help="The version to run tests for.",
    )
    parser.add_argument(
        "--image",
        default=DEFAULT_IMAGE,
        help=f"Specify the image to be used in the test. Default: {DEFAULT_IMAGE}",
    )
    parser.add_argument(
        "--chain",
        choices=[CHAIN_A, CHAIN_B],
        default=CHAIN_A,
        help=f"Specify {CHAIN_A} or {CHAIN_B} for use with the json files.",
    )
    parser.add_argument(
        "--relayer",
        choices=[HERMES, RLY],
        default=HERMES,
        help=f"Specify relayer, either {HERMES} or {RLY}",
    )

    return parser.parse_args()


def _get_max_version(versions):
    """remove the v as it's not a valid semver version"""
    return max([parse_version(v) for v in versions])


def _get_tags_to_test(min_version: semver.Version, max_version: semver.Version, all_versions: List[semver.Version]):
    all_versions = [parse_version(v) for v in all_versions]
    """return all tags that are between the min and max versions"""
    # TODO: fix this hack
    return ["v" + str(v) for v in all_versions if min_version < v < max_version]


def main():
    args = parse_args()
    file_lines = _load_file_lines(args.file)
    file_metadata = _build_file_metadata(file_lines)
    tags = _get_ibc_go_releases(args.release_version)

    # TODO: fix hack
    # strip the v
    min_version = file_metadata["fields"]["from_version"][1:]
    max_version = _get_max_version(tags)

    release_versions = [args.release_version]

    tags_to_test = _get_tags_to_test(min_version, max_version, tags)
    tags_to_test.extend(release_versions)

    other_versions = tags_to_test

    # if we are specifying chain B, we invert the versions.
    if args.chain == CHAIN_B:
        release_versions, other_versions = other_versions, release_versions

    test_suite = file_metadata["test_suite"]
    test_functions = file_metadata["tests"]

    compatibility_json = {
        "chain-a": sorted(release_versions),
        "chain-b": sorted(other_versions),
        "entrypoint": [test_suite],
        "test": sorted(test_functions),
        "relayer-type": [args.relayer],
        "chain-image": [args.image]
    }

    _validate(compatibility_json, "")
    # output the json on a single line. This ensures the output is directly passable to a github workflow.
    print(json.dumps(compatibility_json), end="")


def _validate(compatibility_json: Dict, version: str):
    """validates that the generated compatibility json fields will be valid for a github workflow."""
    required_keys = frozenset({"chain-a", "chain-b", "entrypoint", "test", "relayer-type"})
    for k in required_keys:
        if k not in compatibility_json:
            raise ValueError(f"key {k} not found in {compatibility_json.keys()}")

    if len(compatibility_json["entrypoint"]) != 1:
        raise ValueError(f"found more than one entrypoint: {compatibility_json['entrypoint']}")

    if len(compatibility_json["test"]) <= 0:
        raise ValueError(f"no tests found for version {version}")

    if len(compatibility_json["relayer-type"]) <= 0:
        raise ValueError("no relayer specified")


def _get_ibc_go_releases(from_version: str) -> List[str]:
    releases = []

    from_version_semver = parse_version(from_version)

    resp = requests.get(RELEASES_URL)
    resp.raise_for_status()

    response_body = resp.json()

    all_tags = [release["tag_name"] for release in response_body]
    for tag in all_tags:
        # skip alphas, betas and rcs
        if any(c in tag for c in ("beta", "rc", "alpha", "icq")):
            continue
        try:
            semver_tag = parse_version(tag)
        except ValueError:  # skip any non semver tags.
            continue

        # get all versions
        if semver_tag <= from_version_semver:
            releases.append(tag)

    return releases


def _extract_all_test_functions(file_lines: List[str]) -> List[str]:
    """creates a list of all test functions that should be run in the compatibility tests based on the version provided"""
    all_tests = []
    for i, line in enumerate(file_lines):
        line = line.strip()

        # TODO: handle block comments
        if line.startswith("//"):
            continue

        if not _is_test_function(line):
            continue

        test_function = _test_function_match(line).group(1)
        all_tests.append(test_function)

    return all_tests


def _test_function_match(line: str) -> re.Match:
    return re.match(r".*(Test.*)\(\)", line)


def _is_test_function(line: str) -> bool:
    """determines if the line contains a test function definition."""
    return _test_function_match(line) is not None


def _extract_test_suite_function(file_lines: List[str]) -> str:
    """extracts the name of the test suite function in the file. It is assumed there is exactly one test suite defined"""
    for line in file_lines:
        line = line.strip()
        if "(t *testing.T)" in line:
            return re.search(r"func\s+(.*)\(", line).group(1)
    raise ValueError("unable to find test suite in file lines")


def _load_file_lines(file_name: str) -> List[str]:
    with open(file_name, "r") as f:
        return f.readlines()


def _extract_script_fields(file_lines: List[str]) -> Dict:
    """extract any field in the format of
    // compatibility:field_name:value
    e.g.
    // compatibility:from_version: v7.0.0
    // compatibility:foo: bar
    becomes
    {
      "from_version": "v7.0.0",
      "foo": "bar"
    }
    """
    script_fields = {}
    for line in file_lines:
        line = line.strip()
        match = re.match(rf"//\s*{COMPATIBILITY_FLAG}\s*:\s*(.*):\s*(.*)", line)
        if match:
            script_fields[match.group(1)] = match.group(2)
    return script_fields



def _semver_to_str(semver_version: semver.Version) -> str:
    return f"v{semver_version.major}.{semver_version.minor}.{semver_version.patch}"


def _str_to_semver(str_version: str) -> semver.Version:
    if str_version.startswith("v"):
        str_version = str_version[1:]
    return semver.Version.parse(str_version)


def _build_file_metadata(file_lines: List[str]) -> Dict:
    return {
        "test_suite": _extract_test_suite_function(file_lines),
        "tests": _extract_all_test_functions(file_lines),
        "fields": _extract_script_fields(file_lines)
    }


if __name__ == "__main__":
    main()