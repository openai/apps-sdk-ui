import{j as o}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as a}from"./index-ikABDTSQ.js";import{M as p,T as l,S as d,C as t,A as c,a as m}from"./index-BNUg4Y7r.js";import{T as h,B as n,a as x,C as r}from"./Tooltip.stories-BiQUGy1R.js";import"./index-CDlOlYQx.js";import"./iframe-B-8_lDgr.js";import"./index-BGZCjPBa.js";import"./index-CA2ozmjx.js";import"./index-DgH-xKnr.js";import"./index-BNAx77fs.js";import"./index-DZdtDvV8.js";import"./clsx-B-dksMZM.js";import"./helpers-f26tJ_7u.js";import"./renderHelpers-DMqZrfTK.js";import"./internal-DlOBqL0c.js";import"./AppsSDKUIContext-M1LWlfJD.js";import"./index-D7F-HZ0J.js";import"./index-K5-zvULe.js";import"./index-Bf2qc8Rt.js";import"./copyToClipboard-B2drfy3h.js";import"./index-vTu4Yset.js";import"./index-5083RxDK.js";import"./useEscCloseStack-D1Z2m5Rr.js";import"./index-DpDpMmvd.js";import"./index-CAX21tL8.js";import"./index-Bo7e4fPN.js";import"./useLatestValue-DL0UuayD.js";import"./index-CXgy4vRa.js";function s(i){const e={code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...a(),...i.components};return o.jsxs(o.Fragment,{children:[o.jsx(p,{of:h}),`
`,o.jsx(l,{children:"Tooltip"}),`
`,o.jsx(d,{children:"Brief and informative hover text"}),`
`,o.jsx(e.h2,{id:"usage",children:"Usage"}),`
`,o.jsx(e.pre,{children:o.jsx(e.code,{className:"language-jsx",children:`import { Tooltip } from "@openai/apps-sdk-ui/components/Tooltip";
`})}),`
`,o.jsx(t,{of:n}),`
`,o.jsx(e.h2,{id:"reference",children:"Reference"}),`
`,o.jsx(c,{of:n}),`
`,o.jsx(e.h2,{id:"examples",children:"Examples"}),`
`,o.jsx(e.h3,{id:"different-triggers",children:"Different triggers"}),`
`,o.jsxs(e.p,{children:[o.jsx(e.code,{children:"Tooltip"})," provides an optional component, ",o.jsx(e.code,{children:"Tooltip.TriggerDecorator"}),", to help create accessible tooltip triggers. However, any component can be used as a trigger."]}),`
`,o.jsx(t,{of:x}),`
`,o.jsx(e.h3,{id:"conditionally-enabled",children:"Conditionally enabled"}),`
`,o.jsxs(e.p,{children:["Sometimes a tooltip should only be disabled under certain conditions, such as when a component is disabled, providing more context as to why that is. Below is an example of how to do this by conditionally passing in ",o.jsx(e.code,{children:"null"})," content."]}),`
`,o.jsx(t,{of:r,source:{code:`<Tooltip
  content={disabled ? "This action is disabled for reasons" : null}
>
  <Button color="primary" size="lg" disabled={disabled}>
    Sample button
  </Button>
</Tooltip>
`}}),`
`,o.jsx(m,{of:r})]})}function I(i={}){const{wrapper:e}={...a(),...i.components};return e?o.jsx(e,{...i,children:o.jsx(s,{...i})}):s(i)}export{I as default};
