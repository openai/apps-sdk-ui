import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as o}from"./index-ikABDTSQ.js";import{M as s,T as i,S as a}from"./index-B_efgwSD.js";import{N as h}from"./NextPrev-Cla_p7jn.js";import"./index-CDlOlYQx.js";import"./iframe-BD9l1ykc.js";import"./index-BGZCjPBa.js";import"./index-CA2ozmjx.js";import"./index-DgH-xKnr.js";import"./index-h17mY_kq.js";import"./Card-DLV5WmtV.js";import"./clsx-B-dksMZM.js";function r(n){const t={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...o(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Concepts/Dark mode"}),`
`,e.jsx(i,{children:"Dark mode"}),`
`,e.jsx(a,{children:"Configure light & dark mode in your app"}),`
`,e.jsx(t.h2,{id:"overview",children:"Overview"}),`
`,e.jsx(t.p,{children:"Light and dark mode are fully supported, but your app is in control of how the attribute is applied and persisted."}),`
`,e.jsxs(t.p,{children:["To set a view mode, apply a ",e.jsx(t.code,{children:"[data-theme]"})," attribute to the ",e.jsx(t.code,{children:"html"})," element of your DOM."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<html data-theme="dark">
  <!-- ... -->
</html>
`})}),`
`,e.jsx(t.p,{children:"Light and dark mode can also be nested within your content:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<html data-theme="dark">
  <body>
    <div>Dark mode content (root scope)</div>
    <div data-theme="light">Light mode content (nested scope)</div>
  </body>
</html>
`})}),`
`,e.jsx(t.h2,{id:"tailwind",children:"Tailwind"}),`
`,e.jsxs(t.p,{children:["Tailwind is configured to look for the ",e.jsx(t.code,{children:"[data-theme]"})," attribute, and will work as expected with dark mode classes."]}),`
`,e.jsxs(t.p,{children:["For more details, refer to the ",e.jsx(t.a,{href:"https://tailwindcss.com/docs/dark-mode",rel:"nofollow",children:"Tailwind documentation"}),"."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<div class="bg-white dark:bg-black">
  <!-- ... -->
</div>
`})}),`
`,e.jsx(t.h2,{id:"javascript",children:"JavaScript"}),`
`,e.jsx(t.h3,{id:"applydocumenttheme",children:e.jsx(t.code,{children:"applyDocumentTheme"})}),`
`,e.jsx(t.p,{children:"Helper for applying a given view state to the root element"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-tsx",children:`import { applyDocumentTheme } from "@openai/apps-sdk-ui/theme"

applyDocumentTheme("dark")
`})}),`
`,e.jsx(t.h3,{id:"getdocumenttheme",children:e.jsx(t.code,{children:"getDocumentTheme"})}),`
`,e.jsx(t.p,{children:"Helper for reading the current view state on the root element."}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-tsx",children:`import { getDocumentTheme } from "@openai/apps-sdk-ui/theme"

const currentTheme = getDocumentTheme() // "light" or "dark"
`})}),`
`,e.jsx(t.h3,{id:"usedocumenttheme",children:e.jsx(t.code,{children:"useDocumentTheme"})}),`
`,e.jsxs(t.p,{children:["Hook for reading the latest view state on the root element. The hook will return a live value, as it listens to attribute changes on the ",e.jsx(t.code,{children:"html"})," element via a ",e.jsx(t.code,{children:"MutationObserver"}),"."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-tsx",children:`import { useDocumentTheme } from "@openai/apps-sdk-ui/theme"

const SomeComponent = () => {
  const currentTheme = useDocumentTheme() // "light" or "dark"
}
`})}),`
`,e.jsx(t.h2,{id:"reference-example",children:"Reference example"}),`
`,e.jsx(t.p,{children:"Below is a full example of persistent light/dark mode using a Zustand store, handling applying the initial theme, listening for OS theme changes, subscribing to state changes, and storing user preferences in localStorage."}),`
`,e.jsx(t.p,{children:"The concepts can be ported to whichever ergonomic best suits your application."}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-tsx",children:`import { applyDocumentTheme } from "@openai/apps-sdk-ui/theme"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export type Theme = "light" | "dark" | "system"
type ThemeState = {
  theme: Theme
}

const INITIAL_STATE: ThemeState = {
  theme: "system",
}

const store = create(
  persist(() => INITIAL_STATE, {
    name: "oai:user:theme",
    storage: createJSONStorage(() => localStorage),
  }),
)

// Apply when store is created / updated
store.subscribe((state) => applyDocumentTheme(resolveTheme(state.theme)))

// Apply when system theme changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => applyDocumentTheme(resolveTheme(store.getState().theme)))

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function resolveTheme(theme?: Theme): "light" | "dark" {
  if (theme == null || theme === "system") {
    return getSystemTheme()
  }

  return theme
}

export function setTheme(theme: Theme) {
  store.setState({ theme })
}

export function useSelectedTheme() {
  return store((state) => state.theme)
}

export function useCurrentTheme() {
  return store((state) => resolveTheme(state.theme))
}
`})}),`
`,e.jsx(h,{prev:{title:"Installation",path:"overview-installation"},next:{title:"Responsive design",path:"concepts-responsive-design"}})]})}function k(n={}){const{wrapper:t}={...o(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(r,{...n})}):r(n)}export{k as default};
