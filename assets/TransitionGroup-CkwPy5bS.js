import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as s}from"./index-ikABDTSQ.js";import{M as o,T as a,S as d,C as c,A as l}from"./index-B_efgwSD.js";import{T as i,B as h}from"./TransitionGroup.stories-i8zaauFA.js";import"./index-CDlOlYQx.js";import"./iframe-BD9l1ykc.js";import"./index-BGZCjPBa.js";import"./index-CA2ozmjx.js";import"./index-DgH-xKnr.js";import"./index-f1W-XCGd.js";import"./index-DSWOpmMK.js";import"./clsx-B-dksMZM.js";import"./helpers-f26tJ_7u.js";import"./renderHelpers-DMqZrfTK.js";import"./internal-DlOBqL0c.js";import"./AppsSDKUIContext-M1LWlfJD.js";import"./index-D7F-HZ0J.js";import"./index-K5-zvULe.js";import"./index-Bf2qc8Rt.js";import"./copyToClipboard-B2drfy3h.js";import"./index-vTu4Yset.js";function r(t){const n={code:"code",em:"em",h3:"h3",p:"p",pre:"pre",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:i}),`
`,e.jsx(a,{children:"TransitionGroup"}),`
`,e.jsx(d,{children:"Primitive for rendering components over time"}),`
`,e.jsx(n.h3,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { TransitionGroup } from "@openai/apps-sdk-ui/components/Transition"
`})}),`
`,e.jsx(n.h3,{id:"overview",children:"Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"<TransitionGroup>"})," manages the mounting and unmounting of components ",e.jsx(n.em,{children:"over time"})," by controlling the rendering of ",e.jsx(n.code,{children:"children"})," passed to the component."]}),`
`,e.jsxs(n.p,{children:["When ",e.jsx(n.code,{children:"children"})," are mounted and unmounted, ",e.jsx(n.code,{children:"<TransitionGroup>"})," wraps the components with a containing element and applies stateful data attributes for entering and exiting transitions."]}),`
`,e.jsxs(n.p,{children:["The timing of component rendering and stateful data attributes is based on ",e.jsx(n.code,{children:"enterDuration"})," and ",e.jsx(n.code,{children:"exitDuration"})," values. Children must provide a stable ",e.jsx(n.code,{children:"key"})," to correctly keep track of component references."]}),`
`,e.jsx(n.h3,{id:"when-to-use",children:"When to use"}),`
`,e.jsxs(n.p,{children:["Always reach for ",e.jsx(n.code,{children:"<Animate>"}),", ",e.jsx(n.code,{children:"<AnimateLayout>"}),", or ",e.jsx(n.code,{children:"<AnimateLayoutGroup>"})," before using ",e.jsx(n.code,{children:"<TransitionGroup>"})," directly."]}),`
`,e.jsx(n.p,{children:"Direct use of this primitive should only be necessary for very complex transitions with many moving parts."}),`
`,e.jsx(c,{of:h,source:{code:`
// JSX
<TransitionGroup className={s.Example} enterDuration={2000} exitDuration={1000}>
  {show && <Square key="s" />}
</TransitionGroup>

// CSS
.Example {
  &[data-entering] {
    opacity: 0;
  }

  &[data-exiting] {
    opacity: 1;
  }

  &[data-entering-active],
  &[data-exiting][data-interrupted] {
    opacity: 1;
    box-shadow: 0 0 0 5px green;
    transition: opacity 2s ease, box-shadow 2s ease;
  }

  &[data-exiting-active],
  &[data-entering][data-interrupted] {
    opacity: 0;
    box-shadow: 0 0 0 5px red;
    transition: opacity 1s ease, box-shadow 1s ease;
  }
}
`}}),`
`,e.jsx(n.h3,{id:"transition-states",children:"Transition states"}),`
`,e.jsx(n.p,{children:"There are two types of transitions, enter and exit, and five total data attributes that represent the possible state of transitions."}),`
`,e.jsx(n.p,{children:"The transition data attributes are transient, only applied while they are relevant. When a given transition is completed, attribute are removed."}),`
`,e.jsxs(n.p,{children:["No styles are provided by default from ",e.jsx(n.code,{children:"<TransitionGroup>"}),"."]}),`
`,e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Attribute"}),e.jsx("th",{children:"Description"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:"data-entering"})}),e.jsx("td",{children:e.jsx(n.p,{children:`Component enter transition is about to start - useful for staging enter animation styles.
Remains applied through the entire entrance transition.`})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:"data-entering-active"})}),e.jsx("td",{children:"Component enter transition is active."})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:"data-exiting"})}),e.jsx("td",{children:e.jsx(n.p,{children:`Component exit transition is about to start - useful for staging exit animation styles.
Remains applied through the entire exit transition.`})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:"data-exiting-active"})}),e.jsx("td",{children:"Component exit transition is active."})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:"data-interrupted"})}),e.jsx("td",{children:e.jsx(n.p,{children:`Component was animating, but then changed to the opposite transition before the original
transition completed. For example, an exiting component was re-mounted again, or an entering
component was removed before completing entrance.`})})]})]})]}),`
`,e.jsx(n.h3,{id:"initial-mount-transitions",children:"Initial mount transitions"}),`
`,e.jsxs(n.p,{children:["By default, ",e.jsx(n.code,{children:"<TransitionGroup>"})," prevents initial transitions of ",e.jsx(n.code,{children:"children"})," components when it ",e.jsx(n.em,{children:"itself"})," is mounted to the DOM."]}),`
`,e.jsxs(n.p,{children:["For specific situations where you want children of the ",e.jsx(n.code,{children:"<TransitionGroup>"})," to transition as it's mounted, pass ",e.jsx(n.code,{children:"preventInitialTransition={false}"}),"."]}),`
`,e.jsxs(n.p,{children:["In the above example, ",e.jsx(n.code,{children:"<Sample>"})," will experience an initial enter transition when the ",e.jsx(n.code,{children:"TransitionGroup"})," is rendered."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`<TransitionGroup preventInitialTransition={false}>{show && <Sample key="s" />}</TransitionGroup>
`})}),`
`,e.jsx(n.h3,{id:"props",children:"Props"}),`
`,e.jsx(l,{of:i})]})}function X(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(r,{...t})}):r(t)}export{X as default};
