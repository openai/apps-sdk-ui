import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as h}from"./index-ikABDTSQ.js";import{e as p}from"./index-vTu4Yset.js";import{T as i}from"./TextLink-_vsY4L_3.js";import{M as x,T as m,S as j,C as s,A as u,a as o}from"./index-B_efgwSD.js";import{H as f}from"./Hero-CRu8pH0n.js";import{T as k,B as t,C as a,P as l,U as c,E as y,W as g}from"./TextLink.stories-Bstr19Ll.js";import"./index-CDlOlYQx.js";import"./clsx-B-dksMZM.js";import"./internal-DlOBqL0c.js";import"./AppsSDKUIContext-M1LWlfJD.js";import"./iframe-BD9l1ykc.js";import"./index-BGZCjPBa.js";import"./index-CA2ozmjx.js";import"./index-DgH-xKnr.js";function d(r){const n={code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...h(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(x,{of:k}),`
`,e.jsx(m,{children:"TextLink"}),`
`,e.jsx(j,{children:"Semantic link used for both internal and external links"}),`
`,e.jsxs(f,{className:"flex gap-4",children:[e.jsx(i,{children:"Read more"}),e.jsxs(i,{primary:!0,children:["External link ",e.jsx(p,{})]})]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { TextLink } from "@openai/apps-sdk-ui/components/TextLink"
`})}),`
`,e.jsx(s,{of:t}),`
`,e.jsx(n.h2,{id:"reference",children:"Reference"}),`
`,e.jsx(u,{of:t}),`
`,e.jsx(n.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(n.h3,{id:"default-inheritance",children:"Default inheritance"}),`
`,e.jsxs(n.p,{children:["By default, ",e.jsx(n.code,{children:"TextLink"})," uses ",e.jsx(n.code,{children:"currentcolor"})," inheritance and ",e.jsx(n.code,{children:"text-decoration: underline"})," to create subtle visual differentiation from surrounding text. The hover effect is a dynamic deemphasis of the ",e.jsx(n.code,{children:"currentcolor"}),", with some special cases for ",e.jsx(n.code,{children:"text-secondary"})," and ",e.jsx(n.code,{children:"text-tertiary"})," contexts."]}),`
`,e.jsx(n.p,{children:"You can see this behavior by changing the text color context of the paragraph the links are in below:"}),`
`,e.jsx(s,{of:a}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(o,{of:a})}),`
`,e.jsx(n.h3,{id:"primary-color",children:"Primary color"}),`
`,e.jsxs(n.p,{children:["You can create a colorful link style with the ",e.jsx(n.code,{children:"primary"})," prop, which uses color for visual differentiation."]}),`
`,e.jsxs(n.p,{children:["Primary links also remove the default ",e.jsx(n.code,{children:"underline"})," treatment - pass ",e.jsx(n.code,{children:"underline"})," re-apply that style."]}),`
`,e.jsx(s,{of:l}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(o,{of:l})}),`
`,e.jsx(n.h3,{id:"underline",children:"Underline"}),`
`,e.jsx(n.p,{children:"Links have an underlined aesthetic by default."}),`
`,e.jsxs(n.p,{children:["Pass ",e.jsx(n.code,{children:"underline={false}"})," to remove the underline from the link."]}),`
`,e.jsx(s,{of:c}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(o,{of:c})}),`
`,e.jsx(n.h3,{id:"external-links",children:"External links"}),`
`,e.jsxs(n.p,{children:["When external paths are provided, ",e.jsx(n.code,{children:"<a>"})," will be used with ",e.jsx(n.code,{children:'target="_blank"'})," and ",e.jsx(n.code,{children:'rel="noopener noreferrer"'})," included by default. You can also compose icons along with the text to add visual indication."]}),`
`,e.jsx(s,{of:y}),`
`,e.jsx(n.h3,{id:"font-weight",children:"Font weight"}),`
`,e.jsxs(n.p,{children:["To customize the font weight, pass a Tailwind class to the ",e.jsx(n.code,{children:"className"})," prop."]}),`
`,e.jsx(s,{of:g}),`
`,e.jsx(n.h2,{id:"configure-your-router",children:"Configure your Router"}),`
`,e.jsx(n.h3,{id:"provider",children:"Provider"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`// In the root of your App
import {AppsSDKUIProvider} from "@openai/apps-sdk-ui/components/AppsSDKUIProvider"
import {Link} from "react-router"

// Set up types 
declare global {
  interface AppsSDKUIConfig {
    LinkComponent: typeof Link
  }
}

// Wrap your app in AppsSDKUIProvider and pass in your router's Link component.
export function App() {
  return (
    <AppsSDKUIProvider linkComponent={Link}>
      {/* other providers... */}
    </AppsSDKUIProvider>
  )
}

// elsewhere - everything just works!
<TextLink to={{ pathname: "/help" }} prefetch="intent">
  Get Help
</TextLink>
`})}),`
`,e.jsx(n.h3,{id:"component-level",children:"Component-level"}),`
`,e.jsxs(n.p,{children:["For testing, and rare escape-hatch use-cases, you can also pass your Link component to the ",e.jsx(n.code,{children:"as"})," prop."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import {Link} from "next/link"

<TextLink as={Link} href="/dashboard">
  View Dashboard
</TextLink>
`})})]})}function M(r={}){const{wrapper:n}={...h(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(d,{...r})}):d(r)}export{M as default};
