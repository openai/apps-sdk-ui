import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as p}from"./index-ikABDTSQ.js";import{M as j,T as u,S as m,C as s,A as f,a as i}from"./index-B_efgwSD.js";import{I as g,B as o,V as v,S as r,a as y,E as w,D as d,b as c,A as a,c as l,W as h,O as b}from"./Input.stories-C3vNzyGV.js";import"./index-CDlOlYQx.js";import"./iframe-BD9l1ykc.js";import"./index-BGZCjPBa.js";import"./index-CA2ozmjx.js";import"./index-DgH-xKnr.js";import"./index-f1W-XCGd.js";import"./index-DSWOpmMK.js";import"./clsx-B-dksMZM.js";import"./helpers-f26tJ_7u.js";import"./renderHelpers-DMqZrfTK.js";import"./internal-DlOBqL0c.js";import"./AppsSDKUIContext-M1LWlfJD.js";import"./index-D7F-HZ0J.js";import"./index-K5-zvULe.js";import"./index-Bf2qc8Rt.js";import"./copyToClipboard-B2drfy3h.js";import"./index-vTu4Yset.js";import"./index-mIpzE1Ic.js";function x(t){const n={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...p(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(j,{of:g}),`
`,e.jsx(u,{children:"Input"}),`
`,e.jsx(m,{children:"Semantic input text collection"}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { Input } from "@openai/apps-sdk-ui/components/Input";
`})}),`
`,e.jsx(s,{of:o}),`
`,e.jsx(n.h2,{id:"reference",children:"Reference"}),`
`,e.jsx(f,{of:o,exclude:["ref"]}),`
`,e.jsx(n.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(n.h3,{id:"variants",children:"Variants"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"variant"})," to stylize the input."]}),`
`,e.jsx(s,{of:v,sourceState:"none"}),`
`,e.jsx(n.h3,{id:"sizing--roundness",children:"Sizing & roundness"}),`
`,e.jsxs(n.p,{children:["Sizing of the input is controlled with ",e.jsx(n.code,{children:"size"})," and ",e.jsx(n.code,{children:"gutterSize"})," props. ",e.jsx(n.code,{children:"size"})," sets the input to a specific control ",e.jsx(n.code,{children:"height"}),", and ",e.jsx(n.code,{children:"gutterSize"})," sets the horizontal padding."]}),`
`,e.jsxs(n.p,{children:["Each ",e.jsx(n.code,{children:"size"})," provides default values for ",e.jsx(n.code,{children:"gutterSize"}),", as well as ",e.jsx(n.code,{children:"font-size"}),". Each of these values can be overridden independently."]}),`
`,e.jsx(s,{of:r,sourceState:"hidden"}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(i,{of:r})}),`
`,e.jsx(n.h3,{id:"start-adornment",children:"Start adornment"}),`
`,e.jsxs(n.p,{children:["You can add arbitrary content to the beginning of an input with ",e.jsx(n.code,{children:"startAdornment"})," – like a search icon."]}),`
`,e.jsx(n.p,{children:"Ideally, the spacing will look pretty good by default. If you need to customize the spacing:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"gutterSize"})," determines the amount of spacing on the edges of the container, which you can fine-tune as needed.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["If you need precise spacing not supported by ",e.jsx(n.code,{children:"gutterSize"}),", use negative left margin on your adornment directly (e.g., ",e.jsx(n.code,{children:"-ml-2"}),")."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["The spacing between the adornment and the input is controlled with ",e.jsx(n.code,{children:"gap"})," on the container, which you can customize as needed with Tailwind classes."]}),`
`]}),`
`,e.jsx(s,{of:y}),`
`,e.jsx(n.h3,{id:"end-adornment",children:"End adornment"}),`
`,e.jsxs(n.p,{children:["You can add arbitrary content to the end of an input with ",e.jsx(n.code,{children:"endAdornment"})," – like a clear button."]}),`
`,e.jsxs(n.p,{children:["The same spacing guidance from ",e.jsx(n.code,{children:"startAdornment"})," applies here."]}),`
`,e.jsxs(n.p,{children:["End adornments are most commonly actions that are tucked tightly into the container frame. In these cases, you'll likely reach for negative right margin (e.g., ",e.jsx(n.code,{children:"-mr-2.5"}),") to achieve that aesthetic."]}),`
`,e.jsx(s,{of:w}),`
`,e.jsx(n.h3,{id:"disabled",children:"Disabled"}),`
`,e.jsxs(n.p,{children:["Use the ",e.jsx(n.code,{children:"disabled"})," prop to disable the input, greying it out and preventing user interactions."]}),`
`,e.jsx(s,{of:d}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(i,{of:d})}),`
`,e.jsx(n.h3,{id:"invalid",children:"Invalid"}),`
`,e.jsxs(n.p,{children:["Use the ",e.jsx(n.code,{children:"invalid"})," prop to mark the input as invalid. You decide how this state is removed, whether that's through ",e.jsx(n.code,{children:"onFocus"}),", ",e.jsx(n.code,{children:"onChange"}),", an ",e.jsx(n.code,{children:"onSubmit"})," handler, etc."]}),`
`,e.jsxs(n.p,{children:["Default visual styles will be applied, based on the ",e.jsx(n.code,{children:"variant"}),". Additionally, ",e.jsx(n.code,{children:"[data-invalid]"})," is applied to the container for custom styling."]}),`
`,e.jsx(s,{of:c}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(i,{of:c})}),`
`,e.jsx(n.h3,{id:"auto-select-text",children:"Auto select text"}),`
`,e.jsxs(n.p,{children:["Pass ",e.jsx(n.code,{children:"autoSelect"})," to select all text in the input – useful when pairing with other copy actions. This prop behaves like an imperative action when toggled and allows selection to change."]}),`
`,e.jsx(s,{of:a}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(i,{of:a})}),`
`,e.jsx(n.h3,{id:"autofill-extensions",children:"Autofill extensions"}),`
`,e.jsxs(n.p,{children:["By default, autofill extensions are prevented by ",e.jsx(n.code,{children:"Input"}),". For the occasions where you want browser extensions to be present, pass ",e.jsx(n.code,{children:"allowAutofillExtensions"})," to remove the disabling."]}),`
`,e.jsxs(n.p,{children:["When ",e.jsx(n.code,{children:"name"})," is passed, or ",e.jsx(n.code,{children:"type"})," is set to ",e.jsx(n.code,{children:'"password"'}),", this value will default to ",e.jsx(n.code,{children:"true"}),"."]}),`
`,e.jsx(s,{of:l}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(i,{of:l})}),`
`,e.jsx(n.h3,{id:"with-button",children:"With button"}),`
`,e.jsxs(n.p,{children:["You can pair ",e.jsx(n.code,{children:"Input"})," and ",e.jsx(n.code,{children:"Button"})," components together by using the same ",e.jsx(n.code,{children:"size"})," value."]}),`
`,e.jsx(s,{of:h}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(i,{of:h})}),`
`,e.jsx(n.h3,{id:"optical-alignment",children:"Optical alignment"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"opticallyAlign"})," with either ",e.jsx(n.code,{children:'"start"'})," or ",e.jsx(n.code,{children:'"end"'})," to offset the gutter of the input."]}),`
`,e.jsx(s,{of:b,sourceState:"none"})]})}function P(t={}){const{wrapper:n}={...p(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(x,{...t})}):x(t)}export{P as default};
