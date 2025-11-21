import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as l}from"./index-ikABDTSQ.js";import{R as d}from"./index-vTu4Yset.js";import{A as i}from"./Avatar-5sABvfUs.js";import{l as c}from"./index-h17mY_kq.js";import{M as h,T as p,S as x,C as n,A as m,a as j}from"./index-B_efgwSD.js";import{H as f}from"./Hero-CRu8pH0n.js";import{A as u,B as o,T as v,I as g,a as y,O as b,S as r,C as T,R as w,b as A}from"./Avatar.stories-BvbDlHDO.js";import"./index-CDlOlYQx.js";import"./clsx-B-dksMZM.js";import"./helpers-f26tJ_7u.js";import"./iframe-BD9l1ykc.js";import"./index-BGZCjPBa.js";import"./index-CA2ozmjx.js";import"./index-DgH-xKnr.js";function t(s){const a={code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...l(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(h,{of:u}),`
`,e.jsx(p,{children:"Avatar"}),`
`,e.jsx(x,{children:"Display user identities with either text, photo, or an icon"}),`
`,e.jsxs(f,{className:"flex gap-4",children:[e.jsx(i,{name:"Tyler",imageUrl:"https://gravatar.com/avatar/9531b260b9693f3394bea8646c6ea141ce58fe5a138b7db7729d60a4c5dde552",size:48}),e.jsx(i,{name:"Will",size:48}),e.jsx(i,{name:"Tech support",Icon:d,size:48,color:"primary",variant:"solid"})]}),`
`,e.jsx(a.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(a.pre,{children:e.jsx(a.code,{className:"language-jsx",children:`import { Avatar } from "@openai/apps-sdk-ui/components/Avatar";
`})}),`
`,e.jsx(n,{of:o,additionalActions:[{title:"View story",onClick:c(void 0,"Base")}]}),`
`,e.jsx(a.h2,{id:"reference",children:"Reference"}),`
`,e.jsx(m,{of:o}),`
`,e.jsx(a.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(a.h3,{id:"text",children:"Text"}),`
`,e.jsxs(a.p,{children:["For text-based avatars, a single initial is displayed based on the ",e.jsx(a.code,{children:"name"})," prop passed to the component."]}),`
`,e.jsx(n,{of:v}),`
`,e.jsx(a.h3,{id:"image",children:"Image"}),`
`,e.jsxs(a.p,{children:["To display an image avatar, provide an absolute URL to the image with ",e.jsx(a.code,{children:"imageUrl"}),". Images will have a soft fade entrance once loaded, or fallback to a text display if the image fail to load."]}),`
`,e.jsx(n,{of:g}),`
`,e.jsx(a.h3,{id:"icon",children:"Icon"}),`
`,e.jsxs(a.p,{children:["To display an icon avatar, provide an icon to render to the ",e.jsx(a.code,{children:"Icon"})," prop. The ",e.jsx(a.code,{children:"name"})," prop is not used in this case, and can be omitted."]}),`
`,`
`,e.jsx(n,{of:y,source:{code:`<Avatar
  Icon={Robot}
  size={48}
/>`}}),`
`,e.jsx(a.h3,{id:"overflow-count",children:"Overflow count"}),`
`,e.jsxs(a.p,{children:["To display an overflow avatar, provide a number to the ",e.jsx(a.code,{children:"overflowCount"})," prop. The number will be automatically formatted and scaled to fit."]}),`
`,e.jsx(n,{of:b}),`
`,e.jsx(a.h3,{id:"sizing",children:"Sizing"}),`
`,e.jsxs(a.p,{children:["To size the avatar, pass a ",e.jsx(a.code,{children:"number"})," to the ",e.jsx(a.code,{children:"size"})," property, which will set the width and height in pixels. Text and icon avatars will scale their sizes dynamically based on this value."]}),`
`,e.jsx(n,{of:r}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(j,{of:r})}),`
`,e.jsx(a.h3,{id:"colors--variants",children:"Colors & variants"}),`
`,e.jsxs(a.p,{children:["You can stylize the display of the avatar using the ",e.jsx(a.code,{children:"color"})," and ",e.jsx(a.code,{children:"variant"})," props."]}),`
`,`
`,e.jsx(n,{of:T,sourceState:"none"}),`
`,e.jsx(a.h3,{id:"roundness",children:"Roundness"}),`
`,e.jsxs(a.p,{children:["By default, avatars are fully rounded. You can override this by passing a Tailwind rounding class to ",e.jsx(a.code,{children:"className"}),"."]}),`
`,e.jsx(n,{of:w}),`
`,e.jsx(a.h3,{id:"interactive",children:"Interactive"}),`
`,e.jsxs(a.p,{children:["Avatars can be used as interactive elements by passing an ",e.jsx(a.code,{children:"onClick"})," handler. The avatar will automatically apply semantic and visual interaction styles."]}),`
`,e.jsx(n,{of:A,source:{code:`<Avatar
  name="Will"
  size={48}
  onClick={saySup}
/>`}})]})}function H(s={}){const{wrapper:a}={...l(),...s.components};return a?e.jsx(a,{...s,children:e.jsx(t,{...s})}):t(s)}export{H as default};
