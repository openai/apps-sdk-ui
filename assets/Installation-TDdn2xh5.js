import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as o}from"./index-ikABDTSQ.js";import{M as r,T as i,S as a}from"./index-B_efgwSD.js";import{N as d}from"./NextPrev-Cla_p7jn.js";import"./index-CDlOlYQx.js";import"./iframe-BD9l1ykc.js";import"./index-BGZCjPBa.js";import"./index-CA2ozmjx.js";import"./index-DgH-xKnr.js";import"./index-h17mY_kq.js";import"./Card-DLV5WmtV.js";import"./clsx-B-dksMZM.js";function s(t){const n={a:"a",code:"code",em:"em",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...o(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Overview/Installation"}),`
`,e.jsx(i,{children:"Installation"}),`
`,e.jsx(a,{children:"Quick tutorial for adding Apps SDK UI to your app"}),`
`,e.jsx(n.h2,{id:"prerequisites",children:"Prerequisites"}),`
`,e.jsx(n.p,{children:"Apps SDK UI is built on top of React and Tailwind 4. To use Apps SDK UI, you'll need to have both installed in your project, and configured with your build system."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["React 18 or 19 (",e.jsx(n.a,{href:"https://react.dev/learn/installation",rel:"nofollow",children:"install guide"}),")"]}),`
`,e.jsxs(n.li,{children:["Tailwind 4 (",e.jsx(n.a,{href:"https://tailwindcss.com/docs/installation",rel:"nofollow",children:"install guide"}),")"]}),`
`]}),`
`,e.jsx(n.h2,{id:"install-steps",children:"Install steps"}),`
`,e.jsx(n.h3,{id:"1-install-the-package",children:"1. Install the package"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install @openai/apps-sdk-ui
`})}),`
`,e.jsx(n.h3,{id:"2-setup-styles",children:"2. Setup styles"}),`
`,e.jsxs(n.p,{children:["Add the foundation styles and Tailwind layers to the top of your global stylesheet (e.g. ",e.jsx(n.code,{children:"main.css"}),"):"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`@import "tailwindcss";
@import "@openai/apps-sdk-ui/css";
/* Required for Tailwind to find class references in Apps SDK UI components. */
@source "../node_modules/@openai/apps-sdk-ui";

/* The rest of your application CSS */
`})}),`
`,e.jsxs(n.p,{children:["Then import your stylesheet ",e.jsx(n.em,{children:"before"})," rendering any components:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`// Must be imported first to ensure Tailwind layers and style foundations are defined before any potential component styles
import "./main.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
`})}),`
`,e.jsx(n.h3,{id:"3-add-react-provider",children:"3. Add React provider"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"<AppsSDKUIProvider>"})," provides polyfills for ChatGPT's browser environment and allows you to define a router link component - used in components like ",e.jsx(n.code,{children:"<TextLink>"})," and ",e.jsx(n.code,{children:"<ButtonLink>"}),"."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`// Must be imported first to ensure Tailwind layers and style foundations are defined before component styles
import "./main.css"

import { AppsSDKUIProvider } from "@openai/apps-sdk-ui/components/AppsSDKUIProvider"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Link } from 'react-router'
import { App } from "./App"

declare global {
  interface AppsSDKUIConfig {
    LinkComponent: typeof Link
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppsSDKUIProvider linkComponent={Link}>
      <App />
    </AppsSDKUIProvider>
  </StrictMode>,
)
`})}),`
`,e.jsx(n.p,{children:"If your app doesn't use a router:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<AppsSDKUIProvider linkComponent={"a" as any}>
  <App />
</AppsSDKUIProvider>
`})}),`
`,e.jsx(n.h3,{id:"start-building",children:"Start building"}),`
`,e.jsx(n.p,{children:"Your project is now ready to use Apps SDK UI!"}),`
`,e.jsx(n.p,{children:"Here's an example of a simple reservation card, using Tailwind classes and components."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { Badge } from "@openai/apps-sdk-ui/components/Badge"
import { Button } from "@openai/apps-sdk-ui/components/Button"
import {
  Calendar,
  Invoice,
  Maps,
  Members,
  Phone,
} from "@openai/apps-sdk-ui/components/Icon"

export function ReservationCard() {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-default bg-surface shadow-lg p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-secondary text-sm">
            Reservation
          </p>
          <h2 className="mt-1 heading-lg">La Luna Bistro</h2>
        </div>
        <Badge color="success">Confirmed</Badge>
      </div>
      <div>
        <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-sm">
          <dt className="flex items-center gap-1.5 font-medium text-secondary">
            <Calendar className="size-4" />
            Date
          </dt>
          <dd className="text-right">Apr 12 · 7:30 PM</dd>
          <dt className="flex items-center gap-1.5 font-medium text-secondary">
            <Members className="size-4" />
            Guests
          </dt>
          <dd className="text-right">Party of 2</dd>
          <dt className="flex items-center gap-1.5 font-medium text-secondary">
            <Invoice className="size-4" />
            Reference
          </dt>
          <dd className="text-right uppercase">4F9Q2K</dd>
        </dl>
      </div>
      <div className="mt-4 grid gap-3 border-t border-subtle pt-4 sm:grid-cols-2">
        <Button variant="soft" color="secondary" block>
          <Phone />
          Call
        </Button>
        <Button color="primary" block>
          <Maps />
          Directions
        </Button>
      </div>
    </div>
  )
}
`})}),`
`,e.jsx(d,{prev:{title:"Introduction",path:"overview-introduction"},next:{title:"Dark mode",path:"concepts-dark-mode"}})]})}function b(t={}){const{wrapper:n}={...o(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(s,{...t})}):s(t)}export{b as default};
