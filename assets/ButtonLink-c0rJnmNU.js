import{j as n}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as h}from"./index-ikABDTSQ.js";import"./index-vTu4Yset.js";import"./index-f1W-XCGd.js";import{M as p,T as x,S as j,C as i,A as u,a as s}from"./index-B_efgwSD.js";import{l as m}from"./index-h17mY_kq.js";import{B as f,a as r,I as k,E as g,C as y,S as t,b as l,c as d,D as c}from"./ButtonLink.stories-Dzus1YGM.js";import"./index-CDlOlYQx.js";import"./index-DSWOpmMK.js";import"./clsx-B-dksMZM.js";import"./helpers-f26tJ_7u.js";import"./renderHelpers-DMqZrfTK.js";import"./internal-DlOBqL0c.js";import"./AppsSDKUIContext-M1LWlfJD.js";import"./index-D7F-HZ0J.js";import"./index-K5-zvULe.js";import"./index-Bf2qc8Rt.js";import"./copyToClipboard-B2drfy3h.js";import"./iframe-BD9l1ykc.js";import"./index-BGZCjPBa.js";import"./index-CA2ozmjx.js";import"./index-DgH-xKnr.js";function a(o){const e={code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...h(),...o.components};return n.jsxs(n.Fragment,{children:[n.jsx(p,{of:f}),`
`,n.jsx(x,{children:"ButtonLink"}),`
`,n.jsxs(j,{children:[n.jsx(e.code,{children:"<Button>"})," as a semantic anchor element"]}),`
`,n.jsx(e.h2,{id:"usage",children:"Usage"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`import { ButtonLink } from "@openai/apps-sdk-ui/components/ButtonLink";
`})}),`
`,n.jsx(i,{of:r,additionalActions:[{title:"View story",onClick:m(void 0,"Base")}]}),`
`,n.jsx(e.h2,{id:"reference",children:"Reference"}),`
`,n.jsx(u,{of:r}),`
`,n.jsx(e.h2,{id:"examples",children:"Examples"}),`
`,n.jsx(e.h3,{id:"internal-link",children:"Internal link"}),`
`,n.jsxs(e.p,{children:["When a relative ",n.jsx(e.code,{children:"href"})," or ",n.jsx(e.code,{children:"to"})," is provided, ",n.jsx(e.code,{children:"ButtonLink"})," automatically uses the configured ",n.jsx(e.code,{children:"LinkComponent"})," from ",n.jsx(e.code,{children:"AppsSDKUIProvider"})," so your router handles navigation and prefetching."]}),`
`,n.jsx(i,{of:k}),`
`,n.jsx(e.h3,{id:"external-link",children:"External link"}),`
`,n.jsxs(e.p,{children:["When linking to an external URL (or when ",n.jsx(e.code,{children:"external"})," is set), ",n.jsx(e.code,{children:"<a>"})," is used with ",n.jsx(e.code,{children:'target="_blank"'})," and ",n.jsx(e.code,{children:'rel="noopener noreferrer"'})," added automatically."]}),`
`,n.jsxs(e.p,{children:["If your link is not being automatically identified, you can force external link behavior with the ",n.jsx(e.code,{children:"external"})," prop."]}),`
`,n.jsx(i,{of:g}),`
`,n.jsx(e.h3,{id:"colors--variants",children:"Colors & variants"}),`
`,n.jsxs(e.p,{children:["You can stylize the display of the link using the ",n.jsx(e.code,{children:"color"})," and ",n.jsx(e.code,{children:"variant"})," props."]}),`
`,n.jsx(i,{of:y,sourceState:"none"}),`
`,n.jsx(e.h3,{id:"sizing--roundness",children:"Sizing & roundness"}),`
`,n.jsxs(e.p,{children:["Sizing of the link is controlled with ",n.jsx(e.code,{children:"size"})," and ",n.jsx(e.code,{children:"gutterSize"})," props. ",n.jsx(e.code,{children:"size"})," sets the control ",n.jsx(e.code,{children:"height"}),", and ",n.jsx(e.code,{children:"gutterSize"})," sets the horizontal padding."]}),`
`,n.jsxs(e.p,{children:["Create fully rounded links with the ",n.jsx(e.code,{children:"pill"})," prop. When ",n.jsx(e.code,{children:"pill"})," is set, extra horizontal gutter is dynamically applied to the link."]}),`
`,n.jsx(i,{of:t,sourceState:"hidden"}),`
`,n.jsx("div",{className:"canvas-controls-only",children:n.jsx(s,{of:t})}),`
`,n.jsx(e.h3,{id:"icons",children:"Icons"}),`
`,n.jsxs(e.p,{children:["Icon sizing is controlled by the ",n.jsx(e.code,{children:"iconSize"})," prop, which makes it easy to add icons as children without additional props."]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"size"})," will provide a default value for ",n.jsx(e.code,{children:"iconSize"}),", but setting the prop will force the specified size."]}),`
`,n.jsx(i,{of:l}),`
`,n.jsx("div",{className:"canvas-controls-only",children:n.jsx(s,{of:l})}),`
`,n.jsx(e.h3,{id:"block",children:"Block"}),`
`,n.jsxs(e.p,{children:["Create full-width links with the ",n.jsx(e.code,{children:"block"})," prop."]}),`
`,n.jsx(i,{of:d}),`
`,n.jsx("div",{className:"canvas-controls-only",children:n.jsx(s,{of:d})}),`
`,n.jsx(e.h3,{id:"disabled",children:"Disabled"}),`
`,n.jsxs(e.p,{children:["Use ",n.jsx(e.code,{children:"disabled"})," to both visually and accessibly disable a link. The component renders as a ",n.jsx(e.code,{children:'span[role="link"]'}),", and ",n.jsx(e.code,{children:"onClick"})," handles are not bound."]}),`
`,n.jsx(i,{of:c}),`
`,n.jsx("div",{className:"canvas-controls-only",children:n.jsx(s,{of:c})}),`
`,n.jsx(e.h2,{id:"configure-your-router",children:"Configure your Router"}),`
`,n.jsx(e.h3,{id:"provider",children:"Provider"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`// In the root of your App
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
<ButtonLink to={{ pathname: "/help" }} prefetch="intent">
  Get Help
</ButtonLink>
`})}),`
`,n.jsx(e.h3,{id:"component-level",children:"Component-level"}),`
`,n.jsxs(e.p,{children:["For testing, and rare escape-hatch use-cases, you can also pass your Link component to the ",n.jsx(e.code,{children:"as"})," prop."]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import {Link} from "next/link"

<ButtonLink as={Link} href="/dashboard">
  View Dashboard
</ButtonLink>
`})})]})}function F(o={}){const{wrapper:e}={...h(),...o.components};return e?n.jsx(e,{...o,children:n.jsx(a,{...o})}):a(o)}export{F as default};
