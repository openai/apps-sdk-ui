import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as m}from"./index-ikABDTSQ.js";import"./index-vTu4Yset.js";import{M as f,T as u,S as v,C as o,A as g,a as i}from"./index-B_efgwSD.js";import{l as y}from"./index-h17mY_kq.js";import{S as b,B as t,V as l,a as r,b as c,c as S,D as a,C as w,L as d,I as h,d as p,e as x,O as C}from"./SelectControl.stories-BNGsKQ1Z.js";import"./index-CDlOlYQx.js";import"./iframe-BD9l1ykc.js";import"./index-BGZCjPBa.js";import"./index-CA2ozmjx.js";import"./index-DgH-xKnr.js";import"./index-BP2sAJBc.js";import"./clsx-B-dksMZM.js";import"./useEscCloseStack-D1Z2m5Rr.js";import"./index-DpDpMmvd.js";import"./index-CAX21tL8.js";import"./index-Bo7e4fPN.js";import"./useLatestValue-DL0UuayD.js";import"./helpers-f26tJ_7u.js";import"./internal-DlOBqL0c.js";import"./AppsSDKUIContext-M1LWlfJD.js";import"./index-f1W-XCGd.js";import"./index-DSWOpmMK.js";import"./renderHelpers-DMqZrfTK.js";import"./index-D7F-HZ0J.js";import"./index-K5-zvULe.js";import"./index-Bf2qc8Rt.js";import"./copyToClipboard-B2drfy3h.js";import"./index-CdQtMw5d.js";import"./index-C-_BHfSz.js";import"./index-CXgy4vRa.js";import"./index-KXolyfTN.js";import"./index-DFAwLZtL.js";function j(s){const n={code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...m(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(f,{of:b}),`
`,e.jsx(u,{children:"SelectControl"}),`
`,e.jsx(v,{children:"Customizable select control for use with any type of floating UI"}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { SelectControl } from "@openai/apps-sdk-ui/components/SelectControl";
`})}),`
`,e.jsx(o,{of:t,additionalActions:[{title:"View story",onClick:y(void 0,"Base")}]}),`
`,e.jsx(n.h2,{id:"reference",children:"Reference"}),`
`,e.jsx(g,{of:t}),`
`,e.jsx(n.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(n.h3,{id:"variants",children:"Variants"}),`
`,e.jsxs(n.p,{children:["Use the ",e.jsx(n.code,{children:"variant"})," prop to stylize the select control. Available ",e.jsx(n.code,{children:"variant"})," styles are similar to ",e.jsx(n.code,{children:"<Button>"}),", but aligned with subtle differences from ",e.jsx(n.code,{children:"<Input>"})," variant treatments."]}),`
`,e.jsx(o,{of:l,sourceState:"none"}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(i,{of:l})}),`
`,e.jsx(n.h3,{id:"sizing--roundness",children:"Sizing & roundness"}),`
`,e.jsxs(n.p,{children:["Sizing of the control is determined with the ",e.jsx(n.code,{children:"size"})," prop. Each ",e.jsx(n.code,{children:"size"})," provides dynamic values for various aspects of the control, including icon and indicator placement, as well ",e.jsx(n.code,{children:"font-size"})," and gutter values."]}),`
`,e.jsxs(n.p,{children:["Create fully rounded controls with the ",e.jsx(n.code,{children:"pill"})," prop. When ",e.jsx(n.code,{children:"pill"})," is set, extra horizontal gutter is dynamically applied, and the clear action is also set to ",e.jsx(n.code,{children:"pill"}),"."]}),`
`,e.jsx(o,{of:r,sourceState:"hidden"}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(i,{of:r})}),`
`,e.jsx(n.h3,{id:"selected",children:"Selected"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"selected"})," to indicate if the control has a selected value, which toggles visual placeholder styling."]}),`
`,e.jsx(n.p,{children:"As you'll notice here, this doesn't do anything to the content of the control – that's up to you."}),`
`,e.jsx(o,{of:c}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(i,{of:c})}),`
`,e.jsx(n.h3,{id:"start-icon",children:"Start icon"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"StartIcon"})," to display an icon in the control. Sizing, spacing, and coloring are handled automatically."]}),`
`,e.jsx(o,{of:S}),`
`,e.jsx(n.h3,{id:"dropdown-icon",children:"Dropdown icon"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"dropdownIconType"})," to control the presentation of the dropdown indicator."]}),`
`,e.jsx(o,{of:a}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(i,{of:a})}),`
`,e.jsx(n.h3,{id:"clearable",children:"Clearable"}),`
`,e.jsxs(n.p,{children:["Pass a callback ",e.jsx(n.code,{children:"onClearClick"})," to enable the clearable action."]}),`
`,e.jsx(o,{of:w}),`
`,e.jsx(n.h3,{id:"loading",children:"Loading"}),`
`,e.jsx(n.p,{children:"During loading, dropdown icon and clear actions are automatically hidden."}),`
`,e.jsxs(n.p,{children:["Interactions will be prevented by default during this state, by providing a default value for ",e.jsx(n.code,{children:"inert"})," to ",e.jsx(n.code,{children:"true"}),". You can override this behavior directly with ",e.jsx(n.code,{children:"inert"}),", or use ",e.jsx(n.code,{children:"disabled"})," to add visual disablement."]}),`
`,e.jsx(o,{of:d}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(i,{of:d})}),`
`,e.jsx(n.h3,{id:"invalid",children:"Invalid"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"invalid"})," to visually indicate the control is in an invalid state."]}),`
`,e.jsx(o,{of:h}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(i,{of:h})}),`
`,e.jsx(n.h3,{id:"disabled",children:"Disabled"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"disabled"})," to both visually and accessibly disable the control."]}),`
`,e.jsx(o,{of:p}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(i,{of:p})}),`
`,e.jsx(n.h3,{id:"block",children:"Block"}),`
`,e.jsxs(n.p,{children:["Create full-width controls with the ",e.jsx(n.code,{children:"block"})," prop."]}),`
`,e.jsx(o,{of:x}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(i,{of:x})}),`
`,e.jsx(n.h3,{id:"optical-alignment",children:"Optical alignment"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"opticallyAlign"})," with either ",e.jsx(n.code,{children:'"start"'})," or ",e.jsx(n.code,{children:'"end"'})," to offset the gutter of the control."]}),`
`,e.jsx(o,{of:C,sourceState:"none"})]})}function se(s={}){const{wrapper:n}={...m(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(j,{...s})}):j(s)}export{se as default};
