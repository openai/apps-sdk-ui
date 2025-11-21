import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as d}from"./index-ikABDTSQ.js";import{P as r}from"./index-D5s9QLGj.js";import{M as c,T as l,S as p,C as t,A as i}from"./index-BNUg4Y7r.js";import{P as h,B as a,N as x,H as m,C as j}from"./Popover.stories-DPa2FPM-.js";import"./index-CDlOlYQx.js";import"./clsx-B-dksMZM.js";import"./index-K5-zvULe.js";import"./useEscCloseStack-D1Z2m5Rr.js";import"./index-DpDpMmvd.js";import"./index-BGZCjPBa.js";import"./index-CA2ozmjx.js";import"./index-CAX21tL8.js";import"./index-Bo7e4fPN.js";import"./useLatestValue-DL0UuayD.js";import"./helpers-f26tJ_7u.js";import"./index-DZdtDvV8.js";import"./renderHelpers-DMqZrfTK.js";import"./internal-DlOBqL0c.js";import"./AppsSDKUIContext-M1LWlfJD.js";import"./index-D7F-HZ0J.js";import"./index-Bf2qc8Rt.js";import"./index-DvP4gEHi.js";import"./index-C-_BHfSz.js";import"./index-CXgy4vRa.js";import"./iframe-B-8_lDgr.js";import"./index-DgH-xKnr.js";import"./index-BNAx77fs.js";import"./copyToClipboard-B2drfy3h.js";import"./index-vTu4Yset.js";import"./usePopoverController-nyBlCbyw.js";function s(n){const o={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...d(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(c,{of:h}),`
`,e.jsx(l,{children:"Popover"}),`
`,e.jsx(p,{children:"Generic floating UI utility for contextual actions"}),`
`,e.jsx(o.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-jsx",children:`import { Popover } from "@openai/apps-sdk-ui/components/Popover";
`})}),`
`,e.jsx(t,{of:a}),`
`,e.jsx(o.h2,{id:"reference",children:"Reference"}),`
`,e.jsx("h3",{id:"popover-root","data-heading-label":"Root",children:e.jsx(o.code,{children:"Popover"})}),`
`,e.jsx(i,{of:r}),`
`,e.jsx("h3",{id:"popover-trigger","data-heading-label":"Trigger",children:e.jsx(o.code,{children:"Popover.Trigger"})}),`
`,e.jsx(o.p,{children:"Renders the element that toggles the popover. The trigger should be the user's point of interaction for revealing the popup."}),`
`,e.jsx("h3",{id:"popover-content","data-heading-label":"Content",children:e.jsx(o.code,{children:"Popover.Content"})}),`
`,e.jsx(i,{of:r.Content}),`
`,e.jsx(o.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(o.h3,{id:"sizing-the-popover",children:"Sizing the popover"}),`
`,e.jsxs(o.p,{children:["The popover can be sized with any combination of ",e.jsx(o.code,{children:"width"}),", ",e.jsx(o.code,{children:"minWidth"}),", or ",e.jsx(o.code,{children:"maxWidth"}),". All popovers default to a ",e.jsx(o.code,{children:"minWidth"})," of ",e.jsx(o.code,{children:"300px"}),", and a ",e.jsx(o.code,{children:"maxWidth"})," of Radix's viewport detection."]}),`
`,e.jsx(t,{of:x}),`
`,e.jsx(o.h3,{id:"open-on-hover",children:"Open on hover"}),`
`,e.jsxs(o.p,{children:["Use ",e.jsx(o.code,{children:"showOnHover"})," to create popovers that appear on hover and focus events. This should be used sparingly and with clear intention."]}),`
`,e.jsxs(o.p,{children:["By default, hover popovers will not alter the focused element on the page, nor restore focus to the trigger on close. However, if interactive content is present in the popover, and ",e.jsx(o.code,{children:"tab"})," is used to navigate into the popover, focus will be restored to the trigger on close."]}),`
`,e.jsx(t,{of:m}),`
`,e.jsx(o.h3,{id:"using-the-controller",children:"Using the controller"}),`
`,e.jsxs(o.p,{children:["You can access ",e.jsx(o.code,{children:"usePopoverController()"})," controller context from components within ",e.jsx(o.code,{children:"Popover.Content"}),". The hook exposes two methods, ",e.jsx(o.code,{children:"close()"})," and ",e.jsx(o.code,{children:"shake()"}),". They do exactly what you think they do."]}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:["Attempting to submit an empty form calls the ",e.jsx(o.code,{children:"shake()"})," method"]}),`
`,e.jsxs(o.li,{children:["After async submission occurs (faked loading state), the ",e.jsx(o.code,{children:"close()"})," method is called to close the popup imperatively."]}),`
`]}),`
`,e.jsx(t,{of:j}),`
`,e.jsx(o.h3,{id:"nesting",children:"Nesting"}),`
`,e.jsxs(o.p,{children:["All floating UI components in Apps SDK UI can be infinitely nested by relying on ",e.jsx(o.code,{children:"z-index: auto;"})," and natural stacking order."]}),`
`,e.jsxs(o.p,{children:["Additionally, ",e.jsx(o.code,{children:"esc"})," keypresses are handled independently as a stacking order."]})]})}function Y(n={}){const{wrapper:o}={...d(),...n.components};return o?e.jsx(o,{...n,children:e.jsx(s,{...n})}):s(n)}export{Y as default};
