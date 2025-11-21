import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as d}from"./index-ikABDTSQ.js";import"./CodeBlock-BgCMP09Y.js";import"./index-h17mY_kq.js";import{M as t,T as r,S as h,C as n,A as a}from"./index-B_efgwSD.js";import{C as l,B as c,a as x,J as j,b as p,T as g,c as u,P as m,d as f,e as S,f as k,M as C,g as y,S as b,h as B,i as v,Y as U,j as w,G as M,k as J,l as T,m as D,R as L,D as N,n as P,o as O,K as R}from"./CodeBlock.stories-BV_5L_oM.js";import"./index-CDlOlYQx.js";import"./clsx-B-dksMZM.js";import"./index-f1W-XCGd.js";import"./index-DSWOpmMK.js";import"./helpers-f26tJ_7u.js";import"./renderHelpers-DMqZrfTK.js";import"./internal-DlOBqL0c.js";import"./AppsSDKUIContext-M1LWlfJD.js";import"./index-D7F-HZ0J.js";import"./index-K5-zvULe.js";import"./index-Bf2qc8Rt.js";import"./copyToClipboard-B2drfy3h.js";import"./index-vTu4Yset.js";import"./iframe-BD9l1ykc.js";import"./index-BGZCjPBa.js";import"./index-CA2ozmjx.js";import"./index-DgH-xKnr.js";function i(o){const s={code:"code",h2:"h2",h3:"h3",h4:"h4",p:"p",pre:"pre",...d(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{of:l}),`
`,e.jsx(r,{children:"CodeBlock"}),`
`,e.jsx(h,{children:"Display syntax-highlighted code snippets"}),`
`,e.jsx(s.h3,{id:"usage",children:"Usage"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-jsx",children:`import { CodeBlock } from "@openai/apps-sdk-ui/components/CodeBlock";
`})}),`
`,e.jsx(n,{of:c,source:{code:`
const codeSnippet = '...'

return (
  <CodeBlock language="javascript">{codeSnippet}</CodeBlock>
)
`}}),`
`,e.jsx(s.h2,{id:"reference",children:"Reference"}),`
`,e.jsx(a,{of:c}),`
`,e.jsx(s.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(s.h3,{id:"custom-composition",children:"Custom composition"}),`
`,e.jsxs(s.p,{children:["Custom code blocks can be created by using ",e.jsx(s.code,{children:"<CodeBlockBase>"})," component composition. ",e.jsx(s.code,{children:"<CodeBlockBase.Code>"})," can be used to render code within the base container, with custom markup around it."]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.code,{children:"<CodeBlockBase.CopyButton>"})," is also exposed, however it won't always make sense to re-use."]}),`
`,e.jsxs(s.p,{children:["In this example, a header is being added above the code block with a bespoke ",e.jsx(s.code,{children:"<CopyButton>"}),"."]}),`
`,e.jsx(n,{of:x,source:{code:`
const codeSnippet = '...'

return (
  <CodeBlockBase>
    <div className="flex items-center justify-between bg-(--alpha-02) border-b border-b-(--alpha-06) px-4 py-1">
      <span className="text-sm font-semibold text-secondary">typescript</span>
      <CopyButton
        variant="ghost"
        color="secondary"
        size="md"
        uniform
        copyValue={codeSnippet}
        className="-mr-2"
      />
    </div>
    <CodeBlockBase.Code language="typescript">
      {codeSnippet}
    </CodeBlockBase.Code>
  </CodeBlockBase>
)
`}}),`
`,e.jsx(s.h3,{id:"supported-languages",children:"Supported languages"}),`
`,e.jsxs(s.p,{children:["A pragmatic set of Prism grammars are pre-registered out of the box: ",e.jsx(s.code,{children:"javascript"}),", ",e.jsx(s.code,{children:"jsx"}),", ",e.jsx(s.code,{children:"typescript"}),", ",e.jsx(s.code,{children:"tsx"}),", ",e.jsx(s.code,{children:"python"}),", ",e.jsx(s.code,{children:"json"}),", ",e.jsx(s.code,{children:"jsonc"}),", ",e.jsx(s.code,{children:"bash"}),", ",e.jsx(s.code,{children:"markup"}),", ",e.jsx(s.code,{children:"css"}),", ",e.jsx(s.code,{children:"scss"}),", ",e.jsx(s.code,{children:"sql"}),", ",e.jsx(s.code,{children:"markdown"}),", ",e.jsx(s.code,{children:"yaml"}),", ",e.jsx(s.code,{children:"java"}),", ",e.jsx(s.code,{children:"go"}),", ",e.jsx(s.code,{children:"c"}),", ",e.jsx(s.code,{children:"clike"}),", ",e.jsx(s.code,{children:"php"}),", ",e.jsx(s.code,{children:"ruby"}),", ",e.jsx(s.code,{children:"docker"}),", ",e.jsx(s.code,{children:"diff"}),", ",e.jsx(s.code,{children:"toml"}),", ",e.jsx(s.code,{children:"kotlin"})]}),`
`,e.jsx(s.h4,{id:"javascript",children:"JavaScript"}),`
`,e.jsxs(s.p,{children:["Use the ",e.jsx(s.code,{children:"javascript"})," language to highlight JavaScript code."]}),`
`,e.jsx(n,{of:j,sourceState:"none"}),`
`,e.jsx(s.h4,{id:"jsx",children:"JSX"}),`
`,e.jsxs(s.p,{children:["Use the ",e.jsx(s.code,{children:"jsx"})," language for React components."]}),`
`,e.jsx(n,{of:p,sourceState:"none"}),`
`,e.jsx(s.h4,{id:"typescript",children:"TypeScript"}),`
`,e.jsxs(s.p,{children:["Use the ",e.jsx(s.code,{children:"typescript"})," language for typed JavaScript code."]}),`
`,e.jsx(n,{of:g,sourceState:"none"}),`
`,e.jsx(s.h4,{id:"tsx",children:"TSX"}),`
`,e.jsxs(s.p,{children:["Use the ",e.jsx(s.code,{children:"tsx"})," language for typed React components."]}),`
`,e.jsx(n,{of:u,sourceState:"none"}),`
`,e.jsx(s.h4,{id:"python",children:"Python"}),`
`,e.jsxs(s.p,{children:["Highlight Python code snippets with the ",e.jsx(s.code,{children:"python"})," language."]}),`
`,e.jsx(n,{of:m,sourceState:"none"}),`
`,e.jsx(s.h4,{id:"json",children:"JSON"}),`
`,e.jsxs(s.p,{children:["Highlight JSON data structures with the ",e.jsx(s.code,{children:"json"})," language."]}),`
`,e.jsx(n,{of:f,sourceState:"none"}),`
`,e.jsx(s.h4,{id:"jsonc",children:"JSONC"}),`
`,e.jsxs(s.p,{children:["Highlight JSON with comments using the ",e.jsx(s.code,{children:"jsonc"})," language."]}),`
`,e.jsx(n,{of:S,sourceState:"none"}),`
`,e.jsx(s.h4,{id:"bash",children:"Bash"}),`
`,e.jsxs(s.p,{children:["Use the ",e.jsx(s.code,{children:"bash"})," language for shell scripts."]}),`
`,e.jsx(n,{of:k,sourceState:"none"}),`
`,e.jsx(s.h4,{id:"markup",children:"Markup"}),`
`,e.jsxs(s.p,{children:["Use the ",e.jsx(s.code,{children:"markup"})," language to highlight HTML and XML."]}),`
`,e.jsx(n,{of:C,sourceState:"none"}),`
`,e.jsx(s.h4,{id:"css",children:"CSS"}),`
`,e.jsxs(s.p,{children:["Use the ",e.jsx(s.code,{children:"css"})," language to highlight CSS styles."]}),`
`,e.jsx(n,{of:y,sourceState:"none"}),`
`,e.jsx(s.h4,{id:"scss",children:"SCSS"}),`
`,e.jsxs(s.p,{children:["Use the ",e.jsx(s.code,{children:"scss"})," language to highlight SCSS styles."]}),`
`,e.jsx(n,{of:b,sourceState:"none"}),`
`,e.jsx(s.h4,{id:"sql",children:"SQL"}),`
`,e.jsxs(s.p,{children:["Highlight SQL queries with the ",e.jsx(s.code,{children:"sql"})," language."]}),`
`,e.jsx(n,{of:B,sourceState:"none"}),`
`,e.jsx(s.h4,{id:"markdown",children:"Markdown"}),`
`,e.jsxs(s.p,{children:["Use the ",e.jsx(s.code,{children:"markdown"})," language to highlight Markdown."]}),`
`,e.jsx(n,{of:v,sourceState:"none"}),`
`,e.jsx(s.h4,{id:"yaml",children:"YAML"}),`
`,e.jsxs(s.p,{children:["Use the ",e.jsx(s.code,{children:"yaml"})," language to highlight YAML files."]}),`
`,e.jsx(n,{of:U,sourceState:"none"}),`
`,e.jsx(s.h4,{id:"java",children:"Java"}),`
`,e.jsxs(s.p,{children:["Use the ",e.jsx(s.code,{children:"java"})," language to highlight Java code."]}),`
`,e.jsx(n,{of:w,sourceState:"none"}),`
`,e.jsx(s.h4,{id:"go",children:"Go"}),`
`,e.jsxs(s.p,{children:["Use the ",e.jsx(s.code,{children:"go"})," language to highlight Go code."]}),`
`,e.jsx(n,{of:M,sourceState:"none"}),`
`,e.jsx(s.h4,{id:"c",children:"C"}),`
`,e.jsxs(s.p,{children:["Use the ",e.jsx(s.code,{children:"c"})," language to highlight C code."]}),`
`,e.jsx(n,{of:J,sourceState:"none"}),`
`,e.jsx(s.h4,{id:"c-like",children:"C-like"}),`
`,e.jsxs(s.p,{children:["Use the ",e.jsx(s.code,{children:"clike"})," language to highlight C-like syntax (C, C++, Java)."]}),`
`,e.jsx(n,{of:T,sourceState:"none"}),`
`,e.jsx(s.h4,{id:"php",children:"PHP"}),`
`,e.jsxs(s.p,{children:["Use the ",e.jsx(s.code,{children:"php"})," language to highlight PHP code."]}),`
`,e.jsx(n,{of:D,sourceState:"none"}),`
`,e.jsx(s.h4,{id:"ruby",children:"Ruby"}),`
`,e.jsxs(s.p,{children:["Use the ",e.jsx(s.code,{children:"ruby"})," language to highlight Ruby code."]}),`
`,e.jsx(n,{of:L,sourceState:"none"}),`
`,e.jsx(s.h4,{id:"docker",children:"Docker"}),`
`,e.jsxs(s.p,{children:["Use the ",e.jsx(s.code,{children:"docker"})," language for Dockerfiles."]}),`
`,e.jsx(n,{of:N,sourceState:"none"}),`
`,e.jsx(s.h4,{id:"diff",children:"Diff"}),`
`,e.jsxs(s.p,{children:["Use the ",e.jsx(s.code,{children:"diff"})," language for diff outputs."]}),`
`,e.jsx(n,{of:P,sourceState:"none"}),`
`,e.jsx(s.h4,{id:"toml",children:"TOML"}),`
`,e.jsxs(s.p,{children:["Use the ",e.jsx(s.code,{children:"toml"})," language to highlight TOML files."]}),`
`,e.jsx(n,{of:O,sourceState:"none"}),`
`,e.jsx(s.h4,{id:"kotlin",children:"Kotlin"}),`
`,e.jsxs(s.p,{children:["Use the ",e.jsx(s.code,{children:"kotlin"})," language to highlight Kotlin code."]}),`
`,e.jsx(n,{of:R,sourceState:"none"})]})}function de(o={}){const{wrapper:s}={...d(),...o.components};return s?e.jsx(s,{...o,children:e.jsx(i,{...o})}):i(o)}export{de as default};
