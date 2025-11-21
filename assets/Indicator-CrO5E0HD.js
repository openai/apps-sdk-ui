import{j as o}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as p}from"./index-ikABDTSQ.js";import{M as g,T as u,S as m,C as n,A as e,a as i}from"./index-B_efgwSD.js";import"./index-h17mY_kq.js";import{H as f}from"./Hero-CRu8pH0n.js";import{L as C,a as z}from"./index-D7F-HZ0J.js";import{I as c,C as t,L as a,a as d,b as I,c as L,d as l,e as S,f as h,g as v,h as k,i as y}from"./Indicator.stories-DMYkUGQH.js";import"./index-CDlOlYQx.js";import"./iframe-BD9l1ykc.js";import"./index-BGZCjPBa.js";import"./index-CA2ozmjx.js";import"./index-DgH-xKnr.js";import"./clsx-B-dksMZM.js";import"./index-K5-zvULe.js";import"./helpers-f26tJ_7u.js";function x(s){const r={code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...p(),...s.components};return c||j("IndicatorStories",!1),t||j("IndicatorStories.ContinuousCircularProgress",!0),o.jsxs(o.Fragment,{children:[o.jsx(g,{of:c}),`
`,o.jsx(u,{children:"Indicators"}),`
`,o.jsx(m,{children:"Display loading and progress states to users"}),`
`,o.jsxs(f,{className:"flex items-center gap-6",children:[o.jsx(C,{size:20}),o.jsx(t,{size:24}),o.jsx(z,{})]}),`
`,o.jsx(r.h2,{id:"loadingindicator",children:o.jsx(r.code,{children:"LoadingIndicator"})}),`
`,o.jsx(r.p,{children:"Simple spinning indicator for general loading states."}),`
`,o.jsx(r.h3,{id:"usage",children:"Usage"}),`
`,o.jsx(r.pre,{children:o.jsx(r.code,{className:"language-jsx",children:`import { LoadingIndicator } from "@openai/apps-sdk-ui/components/Indicator";
`})}),`
`,o.jsx(n,{of:a}),`
`,o.jsx(r.h3,{id:"reference",children:"Reference"}),`
`,o.jsx(e,{of:a}),`
`,o.jsx(r.h3,{id:"sizing--stroke",children:"Sizing & stroke"}),`
`,o.jsxs(r.p,{children:["By default, the indicator adapts to the surrounding ",o.jsx(r.code,{children:"font-size"})," and ",o.jsx(r.code,{children:"color"})," of text."]}),`
`,o.jsxs(r.p,{children:["You can control the size of the ",o.jsx(r.code,{children:"LoadingIndicator"})," using the ",o.jsx(r.code,{children:"--indicator-size"})," CSS custom property."]}),`
`,o.jsx(n,{of:d}),`
`,o.jsx("div",{className:"canvas-controls-only",children:o.jsx(i,{of:d})}),`
`,o.jsx(r.h3,{id:"color",children:"Color"}),`
`,o.jsxs(r.p,{children:["The indicator defaults to ",o.jsx(r.code,{children:"currentcolor"}),", inheriting the surrounding text color. This can also be customized by altering the ",o.jsx(r.code,{children:"--indicator-color"})," variable around the DOM scope of the component."]}),`
`,o.jsx(n,{of:I}),`
`,o.jsx(r.h3,{id:"duration",children:"Duration"}),`
`,o.jsxs(r.p,{children:["You can control the rotation speed of the spinner with ",o.jsx(r.code,{children:"--indicator-rotate-duration"}),"."]}),`
`,o.jsx(n,{of:L}),`
`,o.jsx("hr",{}),`
`,o.jsx(r.h2,{id:"circularprogress",children:o.jsx(r.code,{children:"CircularProgress"})}),`
`,o.jsx(r.p,{children:"Circular progress ring with simulated progress animation."}),`
`,o.jsx(r.h3,{id:"usage-1",children:"Usage"}),`
`,o.jsx(r.pre,{children:o.jsx(r.code,{className:"language-jsx",children:`import { CircularProgress } from "@openai/apps-sdk-ui/components/Indicator";
`})}),`
`,o.jsx(n,{of:l}),`
`,o.jsx(e,{of:l}),`
`,o.jsx(r.h3,{id:"progress",children:"Progress"}),`
`,o.jsxs(r.p,{children:["Use ",o.jsx(r.code,{children:"progress"})," to define a static progress and prevent the animation."]}),`
`,o.jsx(n,{of:S}),`
`,o.jsx(r.h3,{id:"sizing--stroke-1",children:"Sizing & stroke"}),`
`,o.jsxs(r.p,{children:["Use ",o.jsx(r.code,{children:"size"})," and ",o.jsx(r.code,{children:"strokeWidth"})," to control the sizing and thickness of the loader."]}),`
`,o.jsxs(r.p,{children:["You can also control these values with CSS variables by targeting ",o.jsx(r.code,{children:"--circular-progress-size"})," and ",o.jsx(r.code,{children:"--circular-progress-stroke"}),"."]}),`
`,o.jsx(n,{of:h}),`
`,o.jsx("div",{className:"canvas-controls-only",children:o.jsx(i,{of:h})}),`
`,o.jsx(r.h3,{id:"color-1",children:"Color"}),`
`,o.jsxs(r.p,{children:["Customize the color of the indicator with the ",o.jsx(r.code,{children:"--circular-progress-track-color"})," and ",o.jsx(r.code,{children:"--circular-progress-track-active-color"})," variables."]}),`
`,o.jsx(n,{of:v}),`
`,o.jsx("hr",{}),`
`,o.jsx(r.h2,{id:"loadingdots",children:o.jsx(r.code,{children:"LoadingDots"})}),`
`,o.jsx(r.p,{children:"Indicate typing progress with staggered pulsing dot animation."}),`
`,o.jsx(r.h3,{id:"usage-2",children:"Usage"}),`
`,o.jsx(r.pre,{children:o.jsx(r.code,{className:"language-jsx",children:`import { LoadingDots } from "@openai/apps-sdk-ui/components/Indicator";
`})}),`
`,o.jsx(n,{of:k}),`
`,o.jsx(r.h3,{id:"color-2",children:"Color"}),`
`,o.jsxs(r.p,{children:["The indicator defaults to ",o.jsx(r.code,{children:"currentcolor"}),", inheriting the surrounding text color."]}),`
`,o.jsxs(r.p,{children:["You can customize the color by providing a different ",o.jsx(r.code,{children:"color"})," value or context."]}),`
`,o.jsx(n,{of:y})]})}function H(s={}){const{wrapper:r}={...p(),...s.components};return r?o.jsx(r,{...s,children:o.jsx(x,{...s})}):x(s)}function j(s,r){throw new Error("Expected "+(r?"component":"object")+" `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{H as default};
