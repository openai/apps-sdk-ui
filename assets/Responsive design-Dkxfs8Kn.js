import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as t}from"./index-ikABDTSQ.js";import{M as r,T as d,S as l}from"./index-BNUg4Y7r.js";import{N as c}from"./NextPrev-DKPd6bE6.js";import"./index-CDlOlYQx.js";import"./iframe-B-8_lDgr.js";import"./index-BGZCjPBa.js";import"./index-CA2ozmjx.js";import"./index-DgH-xKnr.js";import"./index-h17mY_kq.js";import"./Card-DK_ANHI3.js";import"./clsx-B-dksMZM.js";function i(n){const s={a:"a",code:"code",em:"em",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...t(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Concepts/Responsive design"}),`
`,e.jsx(d,{children:"Responsive design"}),`
`,e.jsx(l,{children:"Build adaptive interfaces with Apps SDK UI"}),`
`,e.jsx(s.h2,{id:"approach",children:"Approach"}),`
`,e.jsxs(s.p,{children:["Styles should be written ",e.jsx(s.strong,{children:"mobile-first"}),", meaning the base styles are applied to all screen sizes. Then, responsive styles are added that take effect at specific breakpoints and ",e.jsx(s.em,{children:"above"}),"."]}),`
`,e.jsx(s.p,{children:"In practice this may look like starting with a single column layout, then introducing multiple columns at certain breakpoints, when sufficient screen width is available."}),`
`,e.jsx(s.h2,{id:"default-breakpoints",children:"Default breakpoints"}),`
`,e.jsx(s.p,{children:"Default breakpoints are provided out-of-the-box with Apps SDK UI, and are integrated into Tailwind and React utilities."}),`
`,e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"text-left",style:{width:60},children:e.jsx("strong",{children:"Name"})}),e.jsx("th",{className:"text-left",style:{width:100},children:e.jsx("strong",{children:"Size"})}),e.jsx("th",{className:"text-left",style:{width:160},children:e.jsx("strong",{children:"Common device"})}),e.jsx("th",{className:"text-left",children:e.jsx("strong",{children:"Example usage"})})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"xs"})}),e.jsx("td",{children:e.jsx("code",{children:"380px"})}),e.jsx("td",{children:"Portrait mobile"}),e.jsx("td",{children:"Applying styles to very small screens (by default), then using this breakpoint to override"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"sm"})}),e.jsx("td",{children:e.jsx("code",{children:"576px"})}),e.jsx("td",{children:"Landscape mobile, phablet"}),e.jsx("td",{children:e.jsxs(s.p,{children:["Collapsed mobile menu",e.jsx("br",{}),`
Single-column list/detail views`]})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"md"})}),e.jsx("td",{children:e.jsx("code",{children:"768px"})}),e.jsx("td",{children:"Tablet"}),e.jsx("td",{children:e.jsxs(s.p,{children:["Expanded primary navigation",e.jsx("br",{}),`
Fixed left sidebar navigation`]})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"lg"})}),e.jsx("td",{children:e.jsx("code",{children:"1024px"})}),e.jsx("td",{children:"Laptop"}),e.jsx("td",{children:e.jsxs(s.p,{children:["Tight column layouts",e.jsx("br",{}),`
Sticky sidebar in API Ref`]})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"xl"})}),e.jsx("td",{children:e.jsx("code",{children:"1280px"})}),e.jsx("td",{children:"Desktop"}),e.jsx("td",{children:"Spacious column layouts"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"2xl"})}),e.jsx("td",{children:e.jsx("code",{children:"1536px"})}),e.jsx("td",{children:"Widescreen"}),e.jsx("td",{children:"Largest screen sizes, widescreen viewing"})]})]})]}),`
`,e.jsx(s.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(s.h3,{id:"tailwind",children:"Tailwind"}),`
`,e.jsxs(s.p,{children:["Use standard Tailwind paradigms for writing responsive utility classes. See the ",e.jsx(s.a,{href:"https://tailwindcss.com/docs/responsive-design",rel:"nofollow",children:"Tailwind documentation"})," for more details."]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`// Use flex columns by default, then convert to flex row at "lg" and up
<div className="flex flex-col lg:flex-row"></div>
`})}),`
`,e.jsx(s.h3,{id:"react",children:"React"}),`
`,e.jsx(s.p,{children:"Use our React hook for detecting breakpoints in your components."}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`import { useBreakpoint } from "@openai/apps-sdk-ui/hooks/useBreakpoint";

function SampleComponent() {
  const isMediumBreakpoint = useBreakpoint("md"); // true or false
}
`})}),`
`,e.jsx(c,{prev:{title:"Dark mode",path:"concepts-dark-mode"},next:{title:"Typography",path:"concepts-typography"}})]})}function w(n={}){const{wrapper:s}={...t(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(i,{...n})}):i(n)}export{w as default};
