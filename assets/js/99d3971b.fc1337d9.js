"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5530],{51761:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>r,contentTitle:()=>l,default:()=>h,frontMatter:()=>a,metadata:()=>o,toc:()=>c});var n=i(85893),s=i(11151);const a={title:"State Transitions",sidebar_label:"State Transitions",sidebar_position:4,slug:"/ibc/light-clients/solomachine/state_transitions"},l="State Transitions",o={id:"light-clients/solomachine/state_transitions",title:"State Transitions",description:"Client State Verification Functions",source:"@site/versioned_docs/version-v8.1.x/03-light-clients/03-solomachine/04-state_transitions.md",sourceDirName:"03-light-clients/03-solomachine",slug:"/ibc/light-clients/solomachine/state_transitions",permalink:"/v8/ibc/light-clients/solomachine/state_transitions",draft:!1,unlisted:!1,tags:[],version:"v8.1.x",sidebarPosition:4,frontMatter:{title:"State Transitions",sidebar_label:"State Transitions",sidebar_position:4,slug:"/ibc/light-clients/solomachine/state_transitions"},sidebar:"defaultSidebar",previous:{title:"State",permalink:"/v8/ibc/light-clients/solomachine/state"},next:{title:"Overview",permalink:"/v8/ibc/light-clients/wasm/overview"}},r={},c=[{value:"Client State Verification Functions",id:"client-state-verification-functions",level:2},{value:"Update By Header",id:"update-by-header",level:2},{value:"Update By Governance Proposal",id:"update-by-governance-proposal",level:2},{value:"Upgrade",id:"upgrade",level:2},{value:"Misbehaviour",id:"misbehaviour",level:2}];function d(e){const t={h1:"h1",h2:"h2",li:"li",p:"p",ul:"ul",...(0,s.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"state-transitions",children:"State Transitions"}),"\n",(0,n.jsx)(t.h2,{id:"client-state-verification-functions",children:"Client State Verification Functions"}),"\n",(0,n.jsx)(t.p,{children:"Successful state verification by a solo machine light client will result in:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"the sequence being incremented by 1."}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"update-by-header",children:"Update By Header"}),"\n",(0,n.jsx)(t.p,{children:"A successful update of a solo machine light client by a header will result in:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"the public key being updated to the new public key provided by the header."}),"\n",(0,n.jsx)(t.li,{children:"the diversifier being updated to the new diviersifier provided by the header."}),"\n",(0,n.jsx)(t.li,{children:"the timestamp being updated to the new timestamp provided by the header."}),"\n",(0,n.jsx)(t.li,{children:"the sequence being incremented by 1"}),"\n",(0,n.jsx)(t.li,{children:"the consensus state being updated (consensus state stores the public key, diversifier, and timestamp)"}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"update-by-governance-proposal",children:"Update By Governance Proposal"}),"\n",(0,n.jsx)(t.p,{children:"A successful update of a solo machine light client by a governance proposal will result in:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"the client state being updated to the substitute client state"}),"\n",(0,n.jsx)(t.li,{children:"the consensus state being updated to the substitute consensus state (consensus state stores the public key, diversifier, and timestamp)"}),"\n",(0,n.jsx)(t.li,{children:"the frozen sequence being set to zero (client is unfrozen if it was previously frozen)."}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"upgrade",children:"Upgrade"}),"\n",(0,n.jsx)(t.p,{children:"Client udgrades are not supported for the solo machine light client. No state transition occurs."}),"\n",(0,n.jsx)(t.h2,{id:"misbehaviour",children:"Misbehaviour"}),"\n",(0,n.jsx)(t.p,{children:"Successful misbehaviour processing of a solo machine light client will result in:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"the frozen sequence being set to the sequence the misbehaviour occurred at"}),"\n"]})]})}function h(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},11151:(e,t,i)=>{i.d(t,{Z:()=>o,a:()=>l});var n=i(67294);const s={},a=n.createContext(s);function l(e){const t=n.useContext(a);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),n.createElement(a.Provider,{value:t},e.children)}}}]);