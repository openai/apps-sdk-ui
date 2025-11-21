import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as s}from"./index-ikABDTSQ.js";import{M as o,T as a,S as d,C as l,A as c}from"./index-BNUg4Y7r.js";import{S as i,B as h}from"./SlotTransitionGroup.stories-DMrmLYO0.js";import"./index-CDlOlYQx.js";import"./iframe-B-8_lDgr.js";import"./index-BGZCjPBa.js";import"./index-CA2ozmjx.js";import"./index-DgH-xKnr.js";import"./index-BNAx77fs.js";import"./index-DZdtDvV8.js";import"./clsx-B-dksMZM.js";import"./helpers-f26tJ_7u.js";import"./renderHelpers-DMqZrfTK.js";import"./internal-DlOBqL0c.js";import"./AppsSDKUIContext-M1LWlfJD.js";import"./index-D7F-HZ0J.js";import"./index-K5-zvULe.js";import"./index-Bf2qc8Rt.js";import"./copyToClipboard-B2drfy3h.js";import"./index-vTu4Yset.js";function r(n){const t={code:"code",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:i}),`
`,e.jsx(a,{children:"SlotTransitionGroup"}),`
`,e.jsx(d,{children:"Primitive for rendering components over time (slot-based)"}),`
`,e.jsx(t.h3,{id:"usage",children:"Usage"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-jsx",children:`import { SlotTransitionGroup } from "@openai/apps-sdk-ui/components/Transition"
`})}),`
`,e.jsx(t.h3,{id:"overview",children:"Overview"}),`
`,e.jsxs(t.p,{children:[e.jsx(t.code,{children:"<SlotTransitionGroup>"})," manages the mounting and unmounting of components over time by applying stateful data attributes directly to the original child element(s). No wrapper elements are introduced."]}),`
`,e.jsxs(t.p,{children:["When keyed ",e.jsx(t.code,{children:"children"})," are mounted or unmounted, ",e.jsx(t.code,{children:"<SlotTransitionGroup>"})," adds transition state data attributes on the child node itself."]}),`
`,e.jsxs(t.p,{children:["The timing of stateful attributes is controlled with ",e.jsx(t.code,{children:"enterDuration"})," and ",e.jsx(t.code,{children:"exitDuration"}),". Children must provide a stable ",e.jsx(t.code,{children:"key"})," so transitions are tracked correctly."]}),`
`,e.jsx(t.h3,{id:"when-to-use",children:"When to use"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["Prefer ",e.jsx(t.code,{children:"<Animate>"}),", ",e.jsx(t.code,{children:"<AnimateLayout>"}),", or ",e.jsx(t.code,{children:"<AnimateLayoutGroup>"})," first."]}),`
`,e.jsxs(t.li,{children:["Use ",e.jsx(t.code,{children:"<SlotTransitionGroup>"})," when you need ",e.jsx(t.code,{children:"<TransitionGroup>"}),"-like control but without any extra wrapper nodes."]}),`
`]}),`
`,e.jsx(l,{of:h,source:{code:`
// JSX
<SlotTransitionGroup enterDuration={2000} exitDuration={1000}>
  {show && <Square key="s" className={s.Example} />}
</SlotTransitionGroup>

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
`,e.jsx(t.h3,{id:"transition-states",children:"Transition states"}),`
`,e.jsx(t.p,{children:"There are two types of transitions, enter and exit, and five total data attributes that represent the possible state of transitions. These attributes are applied directly on the child elements."}),`
`,e.jsx(t.p,{children:"The attributes are transient and removed when no longer relevant."}),`
`,e.jsx(t.p,{children:"No styles are provided by default."}),`
`,e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Attribute"}),e.jsx("th",{children:"Description"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(t.code,{children:"data-entering"})}),e.jsx("td",{children:"Component enter transition is staged. Remains applied through the entire entrance transition."})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(t.code,{children:"data-entering-active"})}),e.jsx("td",{children:"Component enter transition is active."})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(t.code,{children:"data-exiting"})}),e.jsx("td",{children:"Component exit transition is staged. Remains applied through the entire exit transition."})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(t.code,{children:"data-exiting-active"})}),e.jsx("td",{children:"Component exit transition is active."})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(t.code,{children:"data-interrupted"})}),e.jsx("td",{children:"Component was animating and then switched to the opposite transition before completion."})]})]})]}),`
`,e.jsx(t.h3,{id:"initial-mount-transitions",children:"Initial mount transitions"}),`
`,e.jsxs(t.p,{children:["By default, ",e.jsx(t.code,{children:"<SlotTransitionGroup>"})," prevents initial transitions of ",e.jsx(t.code,{children:"children"})," when it is mounted."]}),`
`,e.jsxs(t.p,{children:["If you want children to transition on the initial mount of the group, pass ",e.jsx(t.code,{children:"preventInitialTransition={false}"}),"."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-jsx",children:`<SlotTransitionGroup preventInitialTransition={false}>{show && <Sample key="s" />}</SlotTransitionGroup>
`})}),`
`,e.jsx(t.h3,{id:"props",children:"Props"}),`
`,e.jsx(c,{of:i})]})}function X(n={}){const{wrapper:t}={...s(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(r,{...n})}):r(n)}export{X as default};
