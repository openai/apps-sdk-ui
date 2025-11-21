import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as j}from"./index-ikABDTSQ.js";import{b as u,A as m,c as f,d as g}from"./index-vTu4Yset.js";import"./index-BNAx77fs.js";import{M as b,T as y,S as v,C as s,A as z,a as o}from"./index-BNUg4Y7r.js";import{l as S}from"./index-h17mY_kq.js";import{H as w}from"./Hero-CxtmekiR.js";import{B as C,a as r,C as k,S as c,I as d,b as l,D as a,c as h,L as B,d as x,O as N}from"./Button.stories-4hKJMcky.js";import{B as t}from"./index-DZdtDvV8.js";import"./index-CDlOlYQx.js";import"./copyToClipboard-B2drfy3h.js";import"./iframe-B-8_lDgr.js";import"./index-BGZCjPBa.js";import"./index-CA2ozmjx.js";import"./index-DgH-xKnr.js";import"./index-D5s9QLGj.js";import"./clsx-B-dksMZM.js";import"./index-K5-zvULe.js";import"./useEscCloseStack-D1Z2m5Rr.js";import"./index-DpDpMmvd.js";import"./index-CAX21tL8.js";import"./index-Bo7e4fPN.js";import"./useLatestValue-DL0UuayD.js";import"./helpers-f26tJ_7u.js";import"./index-DvP4gEHi.js";import"./index-C-_BHfSz.js";import"./index-CXgy4vRa.js";import"./renderHelpers-DMqZrfTK.js";import"./internal-DlOBqL0c.js";import"./AppsSDKUIContext-M1LWlfJD.js";import"./index-D7F-HZ0J.js";import"./index-Bf2qc8Rt.js";function p(i){const n={blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...j(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(b,{of:C}),`
`,e.jsx(y,{children:"Button"}),`
`,e.jsx(v,{children:"Create actions in many different styles"}),`
`,e.jsxs(w,{className:"flex gap-3",children:[e.jsx(t,{color:"primary",children:"Submit"}),e.jsx(t,{variant:"soft",children:"Cancel"}),e.jsx(t,{color:"danger",gutterSize:"sm",pill:!1,children:e.jsx(u,{})}),e.jsxs(t,{variant:"outline",children:["Next ",e.jsx(m,{})]}),e.jsxs(t,{variant:"ghost",children:[e.jsx(f,{})," Compare"]}),e.jsx(t,{variant:"ghost",color:"secondary",uniform:!0,children:e.jsx(g,{})})]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { Button } from "@openai/apps-sdk-ui/components/Button";
`})}),`
`,e.jsx(s,{of:r,additionalActions:[{title:"View story",onClick:S(void 0,"Base")}]}),`
`,e.jsx(n.h2,{id:"reference",children:"Reference"}),`
`,e.jsx(z,{of:r}),`
`,e.jsx(n.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(n.h3,{id:"colors--variants",children:"Colors & variants"}),`
`,e.jsxs(n.p,{children:["You can stylize the display of the button using the ",e.jsx(n.code,{children:"color"})," and ",e.jsx(n.code,{children:"variant"})," props."]}),`
`,e.jsx(s,{of:k,sourceState:"none"}),`
`,e.jsx(n.h3,{id:"sizing--roundness",children:"Sizing & roundness"}),`
`,e.jsxs(n.p,{children:["Sizing of the button is controlled with ",e.jsx(n.code,{children:"size"})," and ",e.jsx(n.code,{children:"gutterSize"})," props. ",e.jsx(n.code,{children:"size"})," sets the button to a specific control ",e.jsx(n.code,{children:"height"}),", and ",e.jsx(n.code,{children:"gutterSize"})," sets the horizontal padding."]}),`
`,e.jsxs(n.p,{children:["Each ",e.jsx(n.code,{children:"size"})," provides default values for ",e.jsx(n.code,{children:"gutterSize"})," and ",e.jsx(n.code,{children:"iconSize"})," props, as well as ",e.jsx(n.code,{children:"font-size"}),". Each of these values can be overridden independently."]}),`
`,e.jsxs(n.p,{children:["Create fully rounded buttons with the ",e.jsx(n.code,{children:"pill"})," prop. When ",e.jsx(n.code,{children:"pill"})," is set, extra horizontal gutter is dynamically applied to the button."]}),`
`,e.jsx(s,{of:c,sourceState:"hidden"}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(o,{of:c})}),`
`,e.jsx(n.h3,{id:"icons",children:"Icons"}),`
`,e.jsxs(n.p,{children:["Icon sizing is controlled by the ",e.jsx(n.code,{children:"iconSize"})," prop, which makes it easy to add icons as children of button without additional props."]}),`
`,e.jsxs(n.p,{children:["Default values for ",e.jsx(n.code,{children:"iconSize"})," are provided through the ",e.jsx(n.code,{children:"size"})," prop, but you can pass the prop directly to change the defaults."]}),`
`,e.jsx(n.p,{children:"For icon-only buttons, there are two common approaches:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Square"})," – create perfect square icon buttons with the ",e.jsx(n.code,{children:"uniform"})," prop. When ",e.jsx(n.code,{children:"uniform"})," is passed, ",e.jsx(n.code,{children:"gutterSize"})," is ignored. Combine with ",e.jsx(n.code,{children:"pill"})," to make circular icons."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tighter gutters"})," – applying a smaller ",e.jsx(n.code,{children:"gutterSize"})," than ",e.jsx(n.code,{children:"size"})," can create well-sized, but not exactly square, icon buttons."]}),`
`]}),`
`,e.jsx(s,{of:d}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(o,{of:d})}),`
`,e.jsx(n.h3,{id:"block",children:"Block"}),`
`,e.jsxs(n.p,{children:["Create full-width buttons with the ",e.jsx(n.code,{children:"block"})," prop."]}),`
`,e.jsx(s,{of:l}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(o,{of:l})}),`
`,e.jsx(n.h3,{id:"disabled",children:"Disabled"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"disabled"})," to both visually and accessibly disable a button."]}),`
`,e.jsx(s,{of:a}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(o,{of:a})}),`
`,e.jsx(n.h3,{id:"inert",children:"Inert"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"inert"})," to accessibly disable a button ",e.jsx(n.strong,{children:"without any visual changes"}),"."]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," For accessibility reasons, ",e.jsx(n.code,{children:"disabled"})," is used instead of applying ",e.jsx(n.code,{children:"inert"})," directly to the button. Visual disablement in the ",e.jsx(n.code,{children:"disabled"})," prop is applied via ",e.jsx(n.code,{children:"[data-disable]"}),"."]}),`
`]}),`
`,e.jsx(s,{of:h}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(o,{of:h})}),`
`,e.jsx(n.h3,{id:"loading",children:"Loading"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"loading"})," to display a loading indicator in the button, fading out the current content."]}),`
`,e.jsxs(n.p,{children:["Interactions will be prevented by default during this state, by providing a default value for ",e.jsx(n.code,{children:"inert"})," to ",e.jsx(n.code,{children:"true"}),". You can override this behavior directly with ",e.jsx(n.code,{children:"inert"}),", or use ",e.jsx(n.code,{children:"disabled"})," to add visual disablement."]}),`
`,e.jsx(s,{of:B}),`
`,e.jsx(n.h3,{id:"selected",children:"Selected"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"selected"})," to indicate that a given button is correctly in an open or selected state. The exact visual behavior differs across each ",e.jsx(n.code,{children:"variant"}),"."]}),`
`,e.jsxs(n.p,{children:["This behavior is automatically configured with components like ",e.jsx(n.code,{children:"Menu"})," that apply ",e.jsx(n.code,{children:'[aria-expanded="true"]'})," or ",e.jsx(n.code,{children:'[data-state="open"]'})," attributes."]}),`
`,e.jsx(s,{of:x,additionalActions:[]}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(o,{of:x})}),`
`,e.jsx(n.h3,{id:"optical-alignment",children:"Optical alignment"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"opticallyAlign"})," with either ",e.jsx(n.code,{children:'"start"'})," or ",e.jsx(n.code,{children:'"end"'})," to offset the gutter of the button."]}),`
`,e.jsx(s,{of:N,sourceState:"none"})]})}function ce(i={}){const{wrapper:n}={...j(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(p,{...i})}):p(i)}export{ce as default};
