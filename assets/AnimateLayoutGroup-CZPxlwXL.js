import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as r}from"./index-ikABDTSQ.js";import{M as a,T as l,S as d,C as o,A as c}from"./index-BNUg4Y7r.js";import{A as m,V as n,H as p}from"./AnimateLayoutGroup.stories-FO_Y7ssR.js";import"./index-CDlOlYQx.js";import"./iframe-B-8_lDgr.js";import"./index-BGZCjPBa.js";import"./index-CA2ozmjx.js";import"./index-DgH-xKnr.js";import"./clsx-B-dksMZM.js";import"./index-BNAx77fs.js";import"./index-DZdtDvV8.js";import"./helpers-f26tJ_7u.js";import"./renderHelpers-DMqZrfTK.js";import"./internal-DlOBqL0c.js";import"./AppsSDKUIContext-M1LWlfJD.js";import"./index-D7F-HZ0J.js";import"./index-K5-zvULe.js";import"./index-Bf2qc8Rt.js";import"./copyToClipboard-B2drfy3h.js";import"./index-vTu4Yset.js";function s(t){const i={code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:m}),`
`,e.jsx(l,{children:"AnimateLayoutGroup"}),`
`,e.jsx(d,{children:"Animate width & height of lists of components as they enter and exit"}),`
`,e.jsx(i.h3,{id:"usage",children:"Usage"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-jsx",children:`import { AnimateLayoutGroup } from "@openai/apps-sdk-ui/components/Transition"
`})}),`
`,e.jsx(i.h3,{id:"overview",children:"Overview"}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"<AnimateLayoutGroup>"})," is an abstraction around ",e.jsx(i.code,{children:"<TransitionGroup>"})," specifically designed for rendering lists of components, while batteries-included transition animations that can also animate ",e.jsx(i.code,{children:"height"})," and ",e.jsx(i.code,{children:"width"})," of transitions."]}),`
`,e.jsxs(i.p,{children:["All of the same properties from ",e.jsx(i.code,{children:"<Animate>"})," are supported here, as well as new properties for customizing the timing of layout transitions - ",e.jsx(i.code,{children:"layoutEnter"}),", ",e.jsx(i.code,{children:"layoutExit"}),", and ",e.jsx(i.code,{children:"layoutMove"}),"."]}),`
`,e.jsx(i.h3,{id:"when-to-use",children:"When to use"}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"<AnimateLayoutGroup>"})," is great for animating lists of components that should naturally affect layout of surrounding DOM nodes."]}),`
`,e.jsx(i.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(i.h3,{id:"vertical-list",children:"Vertical list"}),`
`,e.jsx("div",{className:"story-example",children:e.jsx(o,{of:n,source:{code:`
<>
  <Line className="py-2" />
  <AnimateLayoutGroup
    initial={{ y: -10, opacity: 0, blur: 0 }}
    enter={{ y: 0, delay: 150, duration: 600 }}
    exit={{ scale: 0.8, blur: 10, duration: 500 }}
    layoutEnter={{ duration: 400, timingFunction: "ease" }}
    layoutExit={{ delay: 150 }}
  >
    {list.map(({ id }) => (
      <div key={id} className="py-2">
        <PrimaryLine onClick={() => handleRemove(id)} />
      </div>
    ))}
  </AnimateLayoutGroup>
  <Line className="py-2" />
<>
`}})}),`
`,e.jsx(i.h3,{id:"horizontal-list",children:"Horizontal list"}),`
`,e.jsx("div",{className:"story-example",children:e.jsx(o,{of:p,source:{code:`
<>
  <Square className="px-2" />
  <AnimateLayoutGroup dimension="width">
    {list.map(({ id }) => (
      <div key={id} className="px-2">
        <PrimarySquare onClick={() => handleRemove(id)} />
      </div>
    ))}
  </AnimateLayoutGroup>
  <Square className="px-2" />
<>
`}})}),`
`,e.jsx(i.h2,{id:"props",children:"Props"}),`
`,e.jsx(c,{of:n})]})}function D(t={}){const{wrapper:i}={...r(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(s,{...t})}):s(t)}export{D as default};
