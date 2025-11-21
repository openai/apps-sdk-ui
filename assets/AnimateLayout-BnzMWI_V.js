import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as a}from"./index-ikABDTSQ.js";import{M as r,T as d,S as c,C as t,A as l}from"./index-BNUg4Y7r.js";import{A as h,S as o,a as m,b as x,T as p}from"./AnimateLayout.stories-BmNWnB7M.js";import"./index-CDlOlYQx.js";import"./iframe-B-8_lDgr.js";import"./index-BGZCjPBa.js";import"./index-CA2ozmjx.js";import"./index-DgH-xKnr.js";import"./clsx-B-dksMZM.js";import"./index-BNAx77fs.js";import"./index-DZdtDvV8.js";import"./helpers-f26tJ_7u.js";import"./renderHelpers-DMqZrfTK.js";import"./internal-DlOBqL0c.js";import"./AppsSDKUIContext-M1LWlfJD.js";import"./index-D7F-HZ0J.js";import"./index-K5-zvULe.js";import"./index-Bf2qc8Rt.js";import"./copyToClipboard-B2drfy3h.js";import"./index-vTu4Yset.js";import"./TextLink-_vsY4L_3.js";function s(i){const n={code:"code",em:"em",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...a(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:h}),`
`,e.jsx(d,{children:"AnimateLayout"}),`
`,e.jsx(c,{children:"Animate width & height of components as they mount and unmount"}),`
`,e.jsx(n.h3,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { AnimateLayout } from "@openai/apps-sdk-ui/components/Transition"
`})}),`
`,e.jsx(n.h3,{id:"overview",children:"Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"<AnimateLayout>"})," is an abstraction around ",e.jsx(n.code,{children:"<TransitionGroup>"})," for batteries-included transition animations that can also animate ",e.jsx(n.code,{children:"height"})," and ",e.jsx(n.code,{children:"width"})," of transitions."]}),`
`,e.jsxs(n.p,{children:["All of the same properties from ",e.jsx(n.code,{children:"<Animate>"})," are supported here, as well as new properties for customizing the timing of layout transitions - ",e.jsx(n.code,{children:"layoutEnter"}),", ",e.jsx(n.code,{children:"layoutExit"}),", and ",e.jsx(n.code,{children:"layoutMove"}),"."]}),`
`,e.jsx(n.h3,{id:"when-to-use",children:"When to use"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"<AnimateLayout>"})," is great for transitions should naturally affect layout of surrounding DOM nodes."]}),`
`,e.jsxs(n.p,{children:["These animations should be for transitioning between two states that occupy ",e.jsx(n.em,{children:"the same space"}),", such as:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.em,{children:"nothing"})," → Component"]}),`
`,e.jsxs(n.li,{children:["Component → ",e.jsx(n.em,{children:"nothing"})]}),`
`,e.jsx(n.li,{children:"Component → AnotherComponent"}),`
`]}),`
`,e.jsx(n.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(n.h3,{id:"height",children:"Height"}),`
`,e.jsxs(n.p,{children:["By default, ",e.jsx(n.code,{children:"<AnimateLayout>"})," animates the ",e.jsx(n.code,{children:"height"})," of a component as it enters and exits the DOM."]}),`
`,e.jsx("div",{className:"story-example",children:e.jsx(t,{of:o,source:{code:`
<>
  <Line className="w-full h-12" />
  <AnimateLayout transitionClassName="pt-4">
    {show && <PrimaryLine key="s" className="w-full h-[80px]" />}
  </AnimateLayout>
  <Line className="w-full h-12 mt-4" /> 
</>
`}})}),`
`,e.jsx(n.h3,{id:"width",children:"Width"}),`
`,e.jsxs(n.p,{children:["You can also animate the ",e.jsx(n.code,{children:"width"})," of components by passing ",e.jsx(n.code,{children:'dimension="width"'}),"."]}),`
`,e.jsx("div",{className:"story-example",children:e.jsx(t,{of:m,source:{code:`
<div className="flex">
  <Square className="w-[200px] h-[200px]" />
  <AnimateLayout
    dimension="width"
    transitionClassName="pl-6"
    enter={{ delay: 200 }}
    layoutExit={{ delay: 75 }}
  >
    {show && <PrimarySquare key="s" className="w-[200px] h-[200px]" />}
  </AnimateLayout>
  <Square className="w-[200px] h-[200px] ml-6" />
</div>
`}})}),`
`,e.jsx(n.h3,{id:"accordion",children:"Accordion"}),`
`,e.jsxs(n.p,{children:["Accordion items are a great example of dynamically introducing content that affect the ",e.jsx(n.code,{children:"height"})," of surrounding DOM nodes."]}),`
`,e.jsxs(n.p,{children:["The following example shows how to wrap accordion item content with ",e.jsx(n.code,{children:"<AnimateLayout>"})," to create a smooth animation."]}),`
`,e.jsx(t,{of:x,layout:"padded",source:{code:`
<AnimateLayout
  enter={{ y: 0, delay: 150, duration: 450 }}
  exit={{ y: -8 }}
  layoutEnter={{ duration: 400 }}
>
  {open && (
    <div key="content" className="pb-4 text-secondary">
      {children}
    </div>
  )}
</AnimateLayout>
`}}),`
`,e.jsx(n.h3,{id:"talk-button",children:"Talk button"}),`
`,e.jsxs(n.p,{children:["When animating ",e.jsx(n.code,{children:"width"}),", the ",e.jsx(n.code,{children:"height"})," of the component should be consistent."]}),`
`,e.jsxs(n.p,{children:["The key to making this animation work is using ",e.jsx(n.code,{children:"transitionClassName"})," to recreate the flexbox structure that ",e.jsx(n.code,{children:"<Button>"})," normally provides, and stretching it to the ful height of the button."]}),`
`,e.jsx(t,{of:p,source:{code:`
<Button
  color={recording ? "danger" : "primary"}
  size="xl"
  iconSize="lg"
  onClick={handleClick}
  loading={sending}
>
  <AnimateLayout dimension="width" transitionClassName="h-full flex items-center gap-2">
    {recording ? (
      <ArrowUp key="recording" />
    ) : (
      <Fragment key="record">
        <Wave /> Talk
      </Fragment>
    )}
  </AnimateLayout>
</Button>
`}}),`
`,e.jsx(n.h3,{id:"gotchas",children:"Gotchas"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"<AnimateLayout>"})," provides a wrapping element, which ",e.jsx(n.code,{children:"className"})," and layout transition properties are applied to."]}),`
`,e.jsxs(n.li,{children:["Avoid box model properties on ",e.jsx(n.code,{children:"className"}),", like ",e.jsx(n.code,{children:"margin"}),", ",e.jsx(n.code,{children:"padding"}),", ",e.jsx(n.code,{children:"border"}),".",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["These are additive to ",e.jsx(n.code,{children:"height: 0;"})," empty state, and cannot be properly animated."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Avoid ",e.jsx(n.code,{children:"box-shadow"})," on ",e.jsx(n.code,{children:"className"}),", as it will be visible during empty state."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"margin"})," cannot be animated, and should be avoided on the children (",e.jsx(n.code,{children:"transitionClassName"}),"). Use padding instead, which is intrinsic to the ",e.jsx(n.code,{children:"height"})," calculation!"]}),`
`]}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsx(l,{of:o})]})}function z(i={}){const{wrapper:n}={...a(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{z as default};
