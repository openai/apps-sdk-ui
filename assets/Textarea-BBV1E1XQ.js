import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as j}from"./index-ikABDTSQ.js";import{M as p,T as u,S as m,C as n,A as f,a as t}from"./index-BNUg4Y7r.js";import{T as v,B as o,V as g,A as a,S as r,D as l,I as d,a as c,b as h}from"./Textarea.stories-B8pEmmk8.js";import"./index-CDlOlYQx.js";import"./iframe-B-8_lDgr.js";import"./index-BGZCjPBa.js";import"./index-CA2ozmjx.js";import"./index-DgH-xKnr.js";import"./clsx-B-dksMZM.js";import"./index-Bf2qc8Rt.js";import"./helpers-f26tJ_7u.js";function x(i){const s={code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...j(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{of:v}),`
`,e.jsx(u,{children:"Textarea"}),`
`,e.jsx(m,{children:"Semantic multi-line text input collection"}),`
`,e.jsx(s.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-jsx",children:`import { Textarea } from "@openai/apps-sdk-ui/components/Textarea";
`})}),`
`,e.jsx(n,{of:o}),`
`,e.jsx(s.h2,{id:"reference",children:"Reference"}),`
`,e.jsx(f,{of:o,exclude:["ref"]}),`
`,e.jsx(s.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(s.h3,{id:"variants",children:"Variants"}),`
`,e.jsxs(s.p,{children:["Use ",e.jsx(s.code,{children:"variant"})," to stylize the textarea."]}),`
`,e.jsx(n,{of:g,sourceState:"none"}),`
`,e.jsx(s.h3,{id:"auto-resize",children:"Auto resize"}),`
`,e.jsxs(s.p,{children:["Enable ",e.jsx(s.code,{children:"autoResize"})," to automatically grow/shrink the textarea as the user types. Control the bounds with ",e.jsx(s.code,{children:"rows"})," (initial height) and ",e.jsx(s.code,{children:"maxRows"}),"."]}),`
`,e.jsx(n,{of:a}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(t,{of:a})}),`
`,e.jsx(s.h3,{id:"sizing",children:"Sizing"}),`
`,e.jsxs(s.p,{children:["Sizing of the textarea is controlled with ",e.jsx(s.code,{children:"size"})," and ",e.jsx(s.code,{children:"gutterSize"})," props. ",e.jsx(s.code,{children:"size"})," sets the textarea to a specific control ",e.jsx(s.code,{children:"height"})," for single-line equivalent, and ",e.jsx(s.code,{children:"gutterSize"})," sets the horizontal padding."]}),`
`,e.jsxs(s.p,{children:["Each ",e.jsx(s.code,{children:"size"})," provides default values for ",e.jsx(s.code,{children:"gutterSize"}),", as well as ",e.jsx(s.code,{children:"font-size"})," and ",e.jsx(s.code,{children:"border-radius"}),". Each of these values can be overridden independently."]}),`
`,e.jsx(n,{of:r,sourceState:"hidden"}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(t,{of:r})}),`
`,e.jsx(s.h3,{id:"disabled",children:"Disabled"}),`
`,e.jsxs(s.p,{children:["Use the ",e.jsx(s.code,{children:"disabled"})," prop to disable the textarea, greying it out and preventing user interactions."]}),`
`,e.jsx(n,{of:l}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(t,{of:l})}),`
`,e.jsx(s.h3,{id:"invalid",children:"Invalid"}),`
`,e.jsxs(s.p,{children:["Use the ",e.jsx(s.code,{children:"invalid"})," prop to mark the textarea as invalid. You decide how this state is removed, whether that's through ",e.jsx(s.code,{children:"onFocus"}),", ",e.jsx(s.code,{children:"onChange"}),", an ",e.jsx(s.code,{children:"onSubmit"})," handler, etc."]}),`
`,e.jsxs(s.p,{children:["Default visual styles will be applied, based on the ",e.jsx(s.code,{children:"variant"}),". Additionally, ",e.jsx(s.code,{children:"[data-invalid]"})," is applied to the container for custom styling."]}),`
`,e.jsx(n,{of:d}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(t,{of:d})}),`
`,e.jsx(s.h3,{id:"auto-select-text",children:"Auto select text"}),`
`,e.jsxs(s.p,{children:["Pass ",e.jsx(s.code,{children:"autoSelect"})," to select all text in the textarea – useful when pairing with other copy actions. This prop behaves like an imperative action when toggled and allows selection to change."]}),`
`,e.jsx(n,{of:c}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(t,{of:c})}),`
`,e.jsx(s.h3,{id:"autofill-extensions",children:"Autofill extensions"}),`
`,e.jsxs(s.p,{children:["By default, autofill extensions are prevented by ",e.jsx(s.code,{children:"Textarea"}),". For the occasions where you want browser extensions to be present, pass ",e.jsx(s.code,{children:"allowAutofillExtensions"})," to remove the disabling."]}),`
`,e.jsxs(s.p,{children:["When ",e.jsx(s.code,{children:"name"})," is passed this value will default to ",e.jsx(s.code,{children:"true"}),"."]}),`
`,e.jsx(n,{of:h}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(t,{of:h})})]})}function R(i={}){const{wrapper:s}={...j(),...i.components};return s?e.jsx(s,{...i,children:e.jsx(x,{...i})}):x(i)}export{R as default};
