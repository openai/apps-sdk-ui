import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as r}from"./index-ikABDTSQ.js";import{M as a,T as c,S as d,C as s,A as l}from"./index-B_efgwSD.js";import{A as h,F as o,G as x,C as p,a as m}from"./Animate.stories-Cz7-6deQ.js";import"./index-CDlOlYQx.js";import"./iframe-BD9l1ykc.js";import"./index-BGZCjPBa.js";import"./index-CA2ozmjx.js";import"./index-DgH-xKnr.js";import"./clsx-B-dksMZM.js";import"./index-f1W-XCGd.js";import"./index-DSWOpmMK.js";import"./helpers-f26tJ_7u.js";import"./renderHelpers-DMqZrfTK.js";import"./internal-DlOBqL0c.js";import"./AppsSDKUIContext-M1LWlfJD.js";import"./index-D7F-HZ0J.js";import"./index-K5-zvULe.js";import"./index-Bf2qc8Rt.js";import"./copyToClipboard-B2drfy3h.js";import"./index-vTu4Yset.js";function t(i){const n={code:"code",em:"em",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:h}),`
`,e.jsx(c,{children:"Animate"}),`
`,e.jsx(d,{children:"Animate components as they mount and unmount"}),`
`,e.jsx(n.h3,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { Animate } from "@openai/apps-sdk-ui/components/Transition"
`})}),`
`,e.jsx(n.h3,{id:"overview",children:"Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"<Animate>"})," is an abstraction around ",e.jsx(n.code,{children:"<TransitionGroup>"})," for batteries-included transition animations."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"enter"}),", ",e.jsx(n.code,{children:"exit"}),", and ",e.jsx(n.code,{children:"initial"})," props allow you to define the behavior of the animation from a set of GPU-accelerated properties. Animatable properties include ",e.jsx(n.code,{children:"opacity"}),", ",e.jsx(n.code,{children:"x"}),", ",e.jsx(n.code,{children:"y"}),", ",e.jsx(n.code,{children:"scale"}),", ",e.jsx(n.code,{children:"rotate"}),", ",e.jsx(n.code,{children:"skewX"}),", ",e.jsx(n.code,{children:"skewY"}),", and ",e.jsx(n.code,{children:"blur"}),"."]}),`
`,e.jsx(n.h3,{id:"when-to-use",children:"When to use"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"<Animate>"})," is great for transitions that don't need to affect the layout of surrounding DOM nodes. Typically, this will mean components with a fixed size or ",e.jsx(n.code,{children:"absolute"})," positioning."]}),`
`,e.jsxs(n.p,{children:["These animations should be for transitioning between two states that occupy ",e.jsx(n.em,{children:"the same space"}),", such as:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.em,{children:"nothing"})," → Component"]}),`
`,e.jsxs(n.li,{children:["Component → ",e.jsx(n.em,{children:"nothing"})]}),`
`,e.jsx(n.li,{children:"Component → AnotherComponent"}),`
`]}),`
`,e.jsx(n.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(n.h3,{id:"fade",children:"Fade"}),`
`,e.jsxs(n.p,{children:["By default, ",e.jsx(n.code,{children:"<Animate>"})," provides a simple fade in/out transition, using ",e.jsx(n.code,{children:"ease"})," timing functions."]}),`
`,e.jsx("div",{className:"story-example",children:e.jsx(s,{of:o,source:{code:`
<Animate className="w-[200px] h-[200px]">
  {visible && <Square key="s" />}
</Animate>
`}})}),`
`,e.jsx(n.h3,{id:"grow",children:"Grow"}),`
`,e.jsxs(n.p,{children:["You can extend the basic fade behavior by providing transform properties to ",e.jsx(n.code,{children:"enter"}),", ",e.jsx(n.code,{children:"exit"}),", and ",e.jsx(n.code,{children:"initial"}),"."]}),`
`,e.jsxs(n.p,{children:["When transform properties are passed, our cubic timing functions (",e.jsx(n.code,{children:"--cubic-enter"})," and ",e.jsx(n.code,{children:"--cubic-ext"}),") are automatically applied."]}),`
`,e.jsx("div",{className:"story-example",children:e.jsx(s,{of:x,source:{code:`
<Animate
  className="w-[200px] h-[200px]"
  enter={{ scale: 1 }}
  exit={{ scale: 0.5, blur: 20 }}
>
  {visible && <Square key="s" />}
</Animate>
`}})}),`
`,e.jsx(n.h3,{id:"continuous-transitions",children:"Continuous transitions"}),`
`,e.jsxs(n.p,{children:["By default, ",e.jsx(n.code,{children:"<Animate>"}),' basically "toggles" between ',e.jsx(n.code,{children:"enter"})," and ",e.jsx(n.code,{children:"exit"})," definitions. You can differentiate entrance and exit transitions by using the ",e.jsx(n.code,{children:"initial"})," property."]}),`
`,e.jsx(n.p,{children:"This example is a bit silly, but a practical example would be creating transitions with an emphasized entrance and subtle exit."}),`
`,e.jsx("div",{className:"story-example",children:e.jsx(s,{of:p,source:{code:`
<Animate
  className="w-[200px] h-[200px]"
  initial={{ x: 120, skewX: 30 }}
  enter={{ duration: 800 }}
  exit={{ x: -120, skewX: -8, duration: 500 }}
>
  {visible && <Square key="s" />}
</Animate>
`}})}),`
`,e.jsx(n.h3,{id:"cross-fade",children:"Cross fade"}),`
`,e.jsxs(n.p,{children:["Easily create cross fade effects between components, like ",e.jsx(n.code,{children:"<CopyButton>"}),"'s icon animation, or larger elements like page transitions."]}),`
`,e.jsx(s,{of:m,source:{code:`
<Button size="2xl" iconSize="xl" variant="soft" onClick={handleClick}>
  <Animate
    className="w-[var(--button-icon-size)] h-[var(--button-icon-size)]"
    enter={{ scale: 1, delay: 150, duration: 400 }}
    exit={{ scale: 0.6, duration: 150 }}
  >
    {copied ? <Check key="copied" /> : <Copy key="copy" />}
  </Animate>
</Button>
`}}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsx(l,{of:o})]})}function q(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{q as default};
