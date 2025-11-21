import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as x}from"./index-ikABDTSQ.js";import{l as m,m as g,n as u}from"./index-vTu4Yset.js";import{S as i,a as f,B as t,b as r,c as d,D as a,d as c,e as b}from"./SegmentedControl.stories-BvePpsAs.js";import{M as S,T as C,S as v,C as s,A as h,a as l}from"./index-BNUg4Y7r.js";import{H as y}from"./Hero-CxtmekiR.js";import{l as w}from"./index-h17mY_kq.js";import{r as z}from"./index-CDlOlYQx.js";import"./clsx-B-dksMZM.js";import"./index-K5-zvULe.js";import"./helpers-f26tJ_7u.js";import"./index-DpDpMmvd.js";import"./index-BGZCjPBa.js";import"./index-CA2ozmjx.js";import"./index-KXolyfTN.js";import"./index-CdQtMw5d.js";import"./index-CAX21tL8.js";import"./iframe-B-8_lDgr.js";import"./index-DgH-xKnr.js";const k=()=>{const[o,n]=z.useState("light");return e.jsxs(i,{value:o,onChange:j=>n(j),"aria-label":"Seleect theme mode",gutterSize:"sm",children:[e.jsx(i.Option,{value:"light","aria-label":"Light mode",children:e.jsx(m,{})}),e.jsx(i.Option,{value:"dark","aria-label":"Dark mode",children:e.jsx(g,{})}),e.jsx(i.Option,{value:"system","aria-label":"System mode",children:e.jsx(u,{})})]})};function p(o){const n={code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...x(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(S,{of:f}),`
`,e.jsx(C,{children:"SegmentedControl"}),`
`,e.jsx(v,{children:"Toggle through grouped options"}),`
`,`
`,e.jsx(y,{className:"flex gap-4",children:e.jsx(k,{})}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { SegmentedControl } from "@openai/apps-sdk-ui/components/SegmentedControl";
`})}),`
`,e.jsx(s,{of:t,additionalActions:[{title:"View story",onClick:w(void 0,"Base")}]}),`
`,e.jsx(n.h2,{id:"reference",children:"Reference"}),`
`,e.jsx("h3",{id:"segmentedcontrol-root","data-heading-label":"Root",children:e.jsx(n.code,{children:"SegmentedControl"})}),`
`,e.jsx(h,{of:t}),`
`,e.jsx("h3",{id:"segmentedcontrol-option","data-heading-label":"Option",children:e.jsx(n.code,{children:"SegmentedControl.Option"})}),`
`,e.jsx(h,{of:i.Option}),`
`,e.jsx(n.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(n.h3,{id:"sizing--roundness",children:"Sizing & roundness"}),`
`,e.jsxs(n.p,{children:["Sizing of the control is controlled with ",e.jsx(n.code,{children:"size"})," and ",e.jsx(n.code,{children:"gutterSize"})," props. ",e.jsx(n.code,{children:"size"})," sets the control to a specific ",e.jsx(n.code,{children:"height"}),", and ",e.jsx(n.code,{children:"gutterSize"})," sets the horizontal padding of the inner options."]}),`
`,e.jsxs(n.p,{children:["Each ",e.jsx(n.code,{children:"size"})," provides default values for ",e.jsx(n.code,{children:"gutterSize"}),", as well as ",e.jsx(n.code,{children:"font-size"})," and ",e.jsx(n.code,{children:"border-radius"}),". Each of these values can be overridden independently."]}),`
`,e.jsxs(n.p,{children:["Create a fully rounded control with the ",e.jsx(n.code,{children:"pill"})," prop. When ",e.jsx(n.code,{children:"pill"})," is set, extra horizontal gutter is dynamically applied to the inner options."]}),`
`,e.jsx(s,{of:r,sourceState:"hidden"}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(l,{of:r})}),`
`,e.jsx(n.h3,{id:"block",children:"Block"}),`
`,e.jsxs(n.p,{children:["Create full-width controls with the ",e.jsx(n.code,{children:"block"})," prop."]}),`
`,e.jsx(s,{of:d}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(l,{of:d})}),`
`,e.jsx(n.h3,{id:"disabled-group",children:"Disabled group"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"disabled"})," on the ",e.jsx(n.code,{children:"SegmentedControl"})," root to disable all options."]}),`
`,e.jsx(s,{of:a}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(l,{of:a})}),`
`,e.jsx(n.h3,{id:"disabled-option",children:"Disabled option"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"disabled"})," on a given ",e.jsx(n.code,{children:"SegmentedControl.Option"})," to disable only that option."]}),`
`,e.jsx(s,{of:c}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(l,{of:c})}),`
`,e.jsx(n.h3,{id:"scrollable",children:"Scrollable"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"SegmentedControl"})," can support scrolling, but is not enabled by default."]}),`
`,e.jsxs(n.p,{children:["To create a scrollable segmented control, wrap the component in a simple ",e.jsx(n.code,{children:"flex"})," wrapper, which will then cause the control to create inner scrolling when applicable. When scrollable, the selected option will automatically be scrolled into view."]}),`
`,e.jsx(s,{of:b})]})}function I(o={}){const{wrapper:n}={...x(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(p,{...o})}):p(o)}export{k as Example,I as default};
