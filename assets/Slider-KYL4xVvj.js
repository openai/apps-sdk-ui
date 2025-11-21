import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as n}from"./index-ikABDTSQ.js";import{M as s,T as l,S as p,C as i,a as m}from"./index-BNUg4Y7r.js";import{S as d,B as t,T as c,M as h}from"./Slider.stories-DPhgwTAR.js";import"./index-CDlOlYQx.js";import"./iframe-B-8_lDgr.js";import"./index-BGZCjPBa.js";import"./index-CA2ozmjx.js";import"./index-DgH-xKnr.js";import"./index-5083RxDK.js";import"./copyToClipboard-B2drfy3h.js";import"./index-vTu4Yset.js";import"./clsx-B-dksMZM.js";import"./index-K5-zvULe.js";import"./useEscCloseStack-D1Z2m5Rr.js";import"./index-DpDpMmvd.js";import"./index-CAX21tL8.js";import"./index-Bo7e4fPN.js";import"./useLatestValue-DL0UuayD.js";import"./helpers-f26tJ_7u.js";import"./index-CXgy4vRa.js";import"./useBreakpoints-ChX5TJS7.js";import"./index-BNAx77fs.js";import"./index-DZdtDvV8.js";import"./renderHelpers-DMqZrfTK.js";import"./internal-DlOBqL0c.js";import"./AppsSDKUIContext-M1LWlfJD.js";import"./index-D7F-HZ0J.js";import"./index-Bf2qc8Rt.js";import"./index-CdQtMw5d.js";import"./index-C3TNoT0m.js";function a(o){const r={code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:d}),`
`,e.jsx(l,{children:"Slider"}),`
`,e.jsx(p,{children:"Fine-tune values within a set range"}),`
`,e.jsx(r.h3,{id:"usage",children:"Usage"}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-jsx",children:`import { Slider } from "@openai/apps-sdk-ui/components/Slider";
`})}),`
`,e.jsx(r.h3,{id:"reference",children:"Reference"}),`
`,e.jsx(i,{of:t}),`
`,e.jsx(m,{of:t}),`
`,e.jsx(r.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(r.h3,{id:"adding-a-tooltip",children:"Adding a tooltip"}),`
`,e.jsx(r.p,{children:"A tooltip can easily be added to the Slider label by providing JSX instead of a simple string."}),`
`,e.jsx(i,{of:c,source:{code:`  <Slider
    label={(
        <Tooltip content="More details about this field">
            <TriggerDecorator>Example field</TriggerDecorator>
        </Tooltip>
    )}
    max={2000}
    min={0}
    onChange={() => {}}
    resetValue={1000}
    step={10}
    unit="ms"
    value={1000}
  />
`}}),`
`,e.jsx(r.h3,{id:"marks",children:"Marks"}),`
`,e.jsxs(r.p,{children:["Slider marks can be easily added by passing an array of values to the ",e.jsx(r.code,{children:"marks"})," prop. Responsive behaviors are handled automatically."]}),`
`,e.jsx(i,{of:h,source:{code:`<Slider
    value={value}
    onChange={() => {}}
    label="Passing grade"
    min={1}
    max={3}
    step={1}
    marks={[
        { value: 1, label: "Inaccurate" },
        { value: 2, label: "Some inaccuracies" },
        { value: 3, label: "Accurate" },
    ]}
    trackColor="#61C454"
    rangeColor="#EF4146"
/>
`}})]})}function G(o={}){const{wrapper:r}={...n(),...o.components};return r?e.jsx(r,{...o,children:e.jsx(a,{...o})}):a(o)}export{G as default};
