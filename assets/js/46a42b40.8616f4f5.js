"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8240],{4936:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>i,toc:()=>l});var a=t(85893),s=t(11151);const o={title:"Authentication Modules",sidebar_label:"Authentication Modules",sidebar_position:1,slug:"/apps/interchain-accounts/legacy/auth-modules"},r="Building an authentication module",i={id:"apps/interchain-accounts/legacy/auth-modules",title:"Authentication Modules",description:"Deprecation Notice",source:"@site/versioned_docs/version-v6.2.x/02-apps/02-interchain-accounts/09-legacy/01-auth-modules.md",sourceDirName:"02-apps/02-interchain-accounts/09-legacy",slug:"/apps/interchain-accounts/legacy/auth-modules",permalink:"/v6/apps/interchain-accounts/legacy/auth-modules",draft:!1,unlisted:!1,tags:[],version:"v6.2.x",sidebarPosition:1,frontMatter:{title:"Authentication Modules",sidebar_label:"Authentication Modules",sidebar_position:1,slug:"/apps/interchain-accounts/legacy/auth-modules"},sidebar:"defaultSidebar",previous:{title:"Active Channels",permalink:"/v6/apps/interchain-accounts/active-channels"},next:{title:"Integration",permalink:"/v6/apps/interchain-accounts/legacy/integration"}},c={},l=[{value:"Deprecation Notice",id:"deprecation-notice",level:2},{value:"<code>IBCModule</code> implementation",id:"ibcmodule-implementation",level:2},{value:"<code>OnAcknowledgementPacket</code>",id:"onacknowledgementpacket",level:2},{value:"Integration into <code>app.go</code> file",id:"integration-into-appgo-file",level:2}];function d(e){const n={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h1,{id:"building-an-authentication-module",children:"Building an authentication module"}),"\n",(0,a.jsx)(n.h2,{id:"deprecation-notice",children:"Deprecation Notice"}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.strong,{children:"This document is deprecated and will be removed in future releases"}),"."]}),"\n",(0,a.jsx)(n.admonition,{title:"Synopsis",type:"note",children:(0,a.jsxs)(n.p,{children:["Authentication modules play the role of the ",(0,a.jsx)(n.code,{children:"Base Application"})," as described in ",(0,a.jsx)(n.a,{href:"https://github.com/cosmos/ibc/tree/master/spec/app/ics-030-middleware",children:"ICS-30 IBC Middleware"}),", and enable application developers to perform custom logic when working with the Interchain Accounts controller API."]})}),"\n",(0,a.jsx)(n.p,{children:"The controller submodule is used for account registration and packet sending. It executes only logic required of all controllers of interchain accounts. The type of authentication used to manage the interchain accounts remains unspecified. There may exist many different types of authentication which are desirable for different use cases. Thus the purpose of the authentication module is to wrap the controller submodule with custom authentication logic."}),"\n",(0,a.jsxs)(n.p,{children:["In ibc-go, authentication modules are connected to the controller chain via a middleware stack. The controller submodule is implemented as ",(0,a.jsx)(n.a,{href:"https://github.com/cosmos/ibc/tree/master/spec/app/ics-030-middleware",children:"middleware"})," and the authentication module is connected to the controller submodule as the base application of the middleware stack. To implement an authentication module, the ",(0,a.jsx)(n.code,{children:"IBCModule"})," interface must be fulfilled. By implementing the controller submodule as middleware, any amount of authentication modules can be created and connected to the controller submodule without writing redundant code."]}),"\n",(0,a.jsx)(n.p,{children:"The authentication module must:"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Authenticate interchain account owners."}),"\n",(0,a.jsx)(n.li,{children:"Track the associated interchain account address for an owner."}),"\n",(0,a.jsx)(n.li,{children:"Send packets on behalf of an owner (after authentication)."}),"\n"]}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsxs)(n.p,{children:["Please note that since ibc-go v6 the channel capability is claimed by the controller submodule and therefore it is not required for authentication modules to claim the capability in the ",(0,a.jsx)(n.code,{children:"OnChanOpenInit"})," callback. When the authentication module sends packets on the channel created for the associated interchain account it can pass a ",(0,a.jsx)(n.code,{children:"nil"})," capability to the legacy function ",(0,a.jsx)(n.code,{children:"SendTx"})," of the controller keeper (see ",(0,a.jsxs)(n.a,{href:"/v6/apps/interchain-accounts/legacy/keeper-api#sendtx",children:["section ",(0,a.jsx)(n.code,{children:"SendTx"})]})," below for mode information)."]}),"\n"]}),"\n",(0,a.jsxs)(n.h2,{id:"ibcmodule-implementation",children:[(0,a.jsx)(n.code,{children:"IBCModule"})," implementation"]}),"\n",(0,a.jsxs)(n.p,{children:["The following ",(0,a.jsx)(n.code,{children:"IBCModule"})," callbacks must be implemented with appropriate custom logic:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:"// OnChanOpenInit implements the IBCModule interface\nfunc (im IBCModule) OnChanOpenInit(\n    ctx sdk.Context,\n    order channeltypes.Order,\n    connectionHops []string,\n    portID string,\n    channelID string,\n    chanCap *capabilitytypes.Capability,\n    counterparty channeltypes.Counterparty,\n    version string,\n) (string, error) {\n    // since ibc-go v6 the authentication module *must not* claim the channel capability on OnChanOpenInit\n\n    // perform custom logic\n\n    return version, nil\n}\n\n// OnChanOpenAck implements the IBCModule interface\nfunc (im IBCModule) OnChanOpenAck(\n    ctx sdk.Context,\n    portID,\n    channelID string,\n    counterpartyVersion string,\n) error {\n    // perform custom logic\n\n    return nil\n}\n\n// OnChanCloseConfirm implements the IBCModule interface\nfunc (im IBCModule) OnChanCloseConfirm(\n    ctx sdk.Context,\n    portID,\n    channelID string,\n) error {\n    // perform custom logic\n\n    return nil\n}\n\n// OnAcknowledgementPacket implements the IBCModule interface\nfunc (im IBCModule) OnAcknowledgementPacket(\n    ctx sdk.Context,\n    packet channeltypes.Packet,\n    acknowledgement []byte,\n    relayer sdk.AccAddress,\n) error {\n    // perform custom logic\n\n    return nil\n}\n\n// OnTimeoutPacket implements the IBCModule interface.\nfunc (im IBCModule) OnTimeoutPacket(\n    ctx sdk.Context,\n    packet channeltypes.Packet,\n    relayer sdk.AccAddress,\n) error {\n    // perform custom logic\n\n    return nil\n}\n"})}),"\n",(0,a.jsxs)(n.p,{children:["The following functions must be defined to fulfill the ",(0,a.jsx)(n.code,{children:"IBCModule"})," interface, but they will never be called by the controller submodule so they may error or panic. That is because in Interchain Accounts, the channel handshake is always initiated on the controller chain and packets are always sent to the host chain and never to the controller chain."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:'// OnChanOpenTry implements the IBCModule interface\nfunc (im IBCModule) OnChanOpenTry(\n    ctx sdk.Context,\n    order channeltypes.Order,\n    connectionHops []string,\n    portID,\n    channelID string,\n    chanCap *capabilitytypes.Capability,\n    counterparty channeltypes.Counterparty,\n    counterpartyVersion string,\n) (string, error) {\n    panic("UNIMPLEMENTED")\n}\n\n// OnChanOpenConfirm implements the IBCModule interface\nfunc (im IBCModule) OnChanOpenConfirm(\n    ctx sdk.Context,\n    portID,\n    channelID string,\n) error {\n    panic("UNIMPLEMENTED")\n}\n\n// OnChanCloseInit implements the IBCModule interface\nfunc (im IBCModule) OnChanCloseInit(\n    ctx sdk.Context,\n    portID,\n    channelID string,\n) error {\n    panic("UNIMPLEMENTED")\n}\n\n// OnRecvPacket implements the IBCModule interface. A successful acknowledgement\n// is returned if the packet data is successfully decoded and the receive application\n// logic returns without error.\nfunc (im IBCModule) OnRecvPacket(\n    ctx sdk.Context,\n    packet channeltypes.Packet,\n    relayer sdk.AccAddress,\n) ibcexported.Acknowledgement {\n    panic("UNIMPLEMENTED")\n}\n'})}),"\n",(0,a.jsx)(n.h2,{id:"onacknowledgementpacket",children:(0,a.jsx)(n.code,{children:"OnAcknowledgementPacket"})}),"\n",(0,a.jsxs)(n.p,{children:["Controller chains will be able to access the acknowledgement written into the host chain state once a relayer relays the acknowledgement.\nThe acknowledgement bytes contain either the response of the execution of the message(s) on the host chain or an error. They will be passed to the auth module via the ",(0,a.jsx)(n.code,{children:"OnAcknowledgementPacket"})," callback. Auth modules are expected to know how to decode the acknowledgement."]}),"\n",(0,a.jsx)(n.p,{children:"If the controller chain is connected to a host chain using the host module on ibc-go, it may interpret the acknowledgement bytes as follows:"}),"\n",(0,a.jsxs)(n.p,{children:["Begin by unmarshaling the acknowledgement into ",(0,a.jsx)(n.code,{children:"sdk.TxMsgData"}),":"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:"var ack channeltypes.Acknowledgement\nif err := channeltypes.SubModuleCdc.UnmarshalJSON(acknowledgement, &ack); err != nil {\n    return err\n}\n\ntxMsgData := &sdk.TxMsgData{}\nif err := proto.Unmarshal(ack.GetResult(), txMsgData); err != nil {\n    return err\n}\n"})}),"\n",(0,a.jsxs)(n.p,{children:["If the ",(0,a.jsx)(n.code,{children:"txMsgData.Data"})," field is non nil, the host chain is using SDK version <= v0.45.\nThe auth module should interpret the ",(0,a.jsx)(n.code,{children:"txMsgData.Data"})," as follows:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:"switch len(txMsgData.Data) {\ncase 0:\n    // see documentation below for SDK 0.46.x or greater\ndefault:\n    for _, msgData := range txMsgData.Data {\n        if err := handler(msgData); err != nil {\n            return err\n        }\n    }\n...\n}            \n"})}),"\n",(0,a.jsx)(n.p,{children:"A handler will be needed to interpret what actions to perform based on the message type sent.\nA router could be used, or more simply a switch statement."}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:"func handler(msgData sdk.MsgData) error {\nswitch msgData.MsgType {\ncase sdk.MsgTypeURL(&banktypes.MsgSend{}):\n    msgResponse := &banktypes.MsgSendResponse{}\n    if err := proto.Unmarshal(msgData.Data, msgResponse}; err != nil {\n        return err\n    }\n\n    handleBankSendMsg(msgResponse)\n\ncase sdk.MsgTypeURL(&stakingtypes.MsgDelegate{}):\n    msgResponse := &stakingtypes.MsgDelegateResponse{}\n    if err := proto.Unmarshal(msgData.Data, msgResponse}; err != nil {\n        return err\n    }\n\n    handleStakingDelegateMsg(msgResponse)\n\ncase sdk.MsgTypeURL(&transfertypes.MsgTransfer{}):\n    msgResponse := &transfertypes.MsgTransferResponse{}\n    if err := proto.Unmarshal(msgData.Data, msgResponse}; err != nil {\n        return err\n    }\n\n    handleIBCTransferMsg(msgResponse)\n \ndefault:\n    return\n}\n"})}),"\n",(0,a.jsxs)(n.p,{children:["If the ",(0,a.jsx)(n.code,{children:"txMsgData.Data"})," is empty, the host chain is using SDK version > v0.45.\nThe auth module should interpret the ",(0,a.jsx)(n.code,{children:"txMsgData.Responses"})," as follows:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:"...\n// switch statement from above\ncase 0:\n    for _, any := range txMsgData.MsgResponses {\n        if err := handleAny(any); err != nil {\n            return err\n        }\n    }\n}\n"})}),"\n",(0,a.jsxs)(n.p,{children:["A handler will be needed to interpret what actions to perform based on the type URL of the Any.\nA router could be used, or more simply a switch statement.\nIt may be possible to deduplicate logic between ",(0,a.jsx)(n.code,{children:"handler"})," and ",(0,a.jsx)(n.code,{children:"handleAny"}),"."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:"func handleAny(any *codectypes.Any) error {\nswitch any.TypeURL {\ncase banktypes.MsgSend:\n    msgResponse, err := unpackBankMsgSendResponse(any)\n    if err != nil {\n        return err\n    }\n\n    handleBankSendMsg(msgResponse)\n\ncase stakingtypes.MsgDelegate:\n    msgResponse, err := unpackStakingDelegateResponse(any)\n    if err != nil {\n        return err\n    }\n\n    handleStakingDelegateMsg(msgResponse)\n\n    case transfertypes.MsgTransfer:\n    msgResponse, err := unpackIBCTransferMsgResponse(any)\n    if err != nil {\n        return err\n    }\n\n    handleIBCTransferMsg(msgResponse)\n \ndefault:\n    return\n}\n"})}),"\n",(0,a.jsxs)(n.h2,{id:"integration-into-appgo-file",children:["Integration into ",(0,a.jsx)(n.code,{children:"app.go"})," file"]}),"\n",(0,a.jsxs)(n.p,{children:["To integrate the authentication module into your chain, please follow the steps outlined in ",(0,a.jsxs)(n.a,{href:"/v6/apps/interchain-accounts/legacy/integration#example-integration",children:[(0,a.jsx)(n.code,{children:"app.go"})," integration"]}),"."]})]})}function h(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>i,a:()=>r});var a=t(67294);const s={},o=a.createContext(s);function r(e){const n=a.useContext(o);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),a.createElement(o.Provider,{value:n},e.children)}}}]);