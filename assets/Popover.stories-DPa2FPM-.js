import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as p}from"./index-CDlOlYQx.js";import"./index-BNAx77fs.js";import{i as H,F as O,S as G,f as I,j as _,I as k,B as A}from"./index-vTu4Yset.js";import{P as r}from"./index-D5s9QLGj.js";import{u as y}from"./usePopoverController-nyBlCbyw.js";import{B as t}from"./index-DZdtDvV8.js";const E={title:"Components/Popover"},c=()=>e.jsxs(r,{children:[e.jsx(r.Trigger,{children:e.jsx(t,{color:"primary",children:"Generate"})}),e.jsxs(r.Content,{side:"right",children:[e.jsx(b,{}),e.jsx(T,{})]})]}),n=()=>e.jsxs(r,{children:[e.jsx(r.Trigger,{children:e.jsxs(t,{color:"primary",size:"lg",variant:"ghost",className:"font-semibold gap-1.5",children:[e.jsx(H,{})," Actions"]})}),e.jsxs(r.Content,{className:"flex p-2",minWidth:"auto",side:"top",children:[e.jsx(t,{color:"primary",variant:"ghost",gutterSize:"sm",children:e.jsx(O,{height:18,width:18})}),e.jsx(t,{color:"primary",variant:"ghost",gutterSize:"sm",children:e.jsx(G,{height:18,width:18})}),e.jsx(t,{color:"primary",variant:"ghost",gutterSize:"sm",children:e.jsx(I,{height:18,width:18})}),e.jsx(t,{color:"primary",variant:"ghost",gutterSize:"sm",children:e.jsx(_,{height:18,width:18})}),e.jsx(t,{color:"primary",variant:"ghost",gutterSize:"sm",children:e.jsx(k,{height:18,width:18})})]})]});n.parameters={docs:{source:{code:`<Popover>
  <Popover.Trigger>
    ...
  </Popover.Trigger>
  <Popover.Content minWidth="auto" side="top">
    ...
  </Popover.Content>
</Popover>`}}};const s=()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs(r,{showOnHover:!0,children:[e.jsx(r.Trigger,{children:e.jsx(t,{color:"primary",children:"Static content"})}),e.jsx(r.Content,{width:320,side:"right",children:e.jsxs("div",{className:"p-3",children:[e.jsx("h3",{className:"mb-0.5 font-semibold",children:"Popover Title"}),e.jsx("p",{className:"text-sm text-secondary",children:"This is an example of a hoverable popover containing presentational content."}),e.jsx("footer",{className:"mt-2 text-xs text-tertiary",children:"Last updated June 20, 2025"})]})})]}),e.jsxs(r,{showOnHover:!0,children:[e.jsx(r.Trigger,{children:e.jsx(t,{color:"primary",children:"Interactive content"})}),e.jsx(r.Content,{minWidth:230,side:"right",children:e.jsx(W,{})})]})]}),W=()=>{const{close:o}=y();return e.jsxs("div",{className:"p-4 p-6",children:[e.jsx("h3",{className:"mb-1 heading-sm font-semibold",children:"Popover with actions"}),e.jsx("p",{className:"text-sm text-secondary",children:"Try using tab to navigate"}),e.jsxs("div",{className:"mt-4 flex gap-2",children:[e.jsx(t,{color:"secondary",variant:"soft",onClick:o,children:"Cancel"}),e.jsx(t,{color:"primary",onClick:o,children:"Confirm"})]})]})};s.parameters={docs:{source:{code:`<Popover showOnHover>
  <Popover.Trigger>
    ...
  </Popover.Trigger>
  <Popover.Content>
    ...
  </Popover.Content>
</Popover>  
  `}}};const i=()=>e.jsxs(r,{children:[e.jsx(r.Trigger,{children:e.jsx(t,{color:"primary",children:"Generate"})}),e.jsx(r.Content,{side:"right",children:e.jsx(D,{})})]}),D=()=>{const[o,a]=p.useState(""),[l,B]=p.useState(!1),{shake:w,close:N}=y(),z=F=>{if(F.preventDefault(),!o){w();return}B(!0),setTimeout(N,2e3)};return e.jsxs("form",{onSubmit:z,children:[e.jsx(b,{value:o,onChange:a}),e.jsx(T,{loading:l})]})};i.parameters={docs:{source:{code:`
const Example = () => {
  return (
    <Popover>
      <Popover.Trigger>
        <Button color="primary">Generate</Button>
      </Popover.Trigger>
      <Popover.Content side="right" surface="glass">
        <ControllerForm />
      </Popover.Content>
    </Popover>
  )
}

const ControllerForm = () => {
  const [value, setValue] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const { shake, close } = usePopoverController()

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault()

    if (!value) {
      shake()
      return
    }

    setSubmitting(true)
    setTimeout(close, 2000)
  }
  return (
    <form onSubmit={handleSubmit}>
      <Textarea value={value} onChange={setValue} />
      <ActionBar loading={submitting} />
    </form>
  )
}
  `}}};const b=({value:o,onChange:a})=>e.jsx("textarea",{value:o,onChange:l=>a==null?void 0:a(l.target.value),placeholder:"Describe what you're using the model for, and we'll generate system instructions.",style:{width:"100%",height:80,background:"none",padding:"8px 12px 12px",border:0,fontSize:14,lineHeight:"20px",resize:"none",outline:0}}),T=({loading:o})=>e.jsxs("div",{className:"px-2 pb-2 flex items-center justify-between",children:[e.jsxs("div",{className:"flex gap-1 items-center font-normal text-sm text-tertiary",children:[e.jsx(A,{width:16,height:16}),"Free beta"]}),e.jsx(t,{color:"primary",size:"xs",loading:o,type:"submit",children:"Create"})]});var m,d,h;c.parameters={...c.parameters,docs:{...(m=c.parameters)==null?void 0:m.docs,source:{originalSource:`() => <Popover>
    <Popover.Trigger>
      <Button color="primary">Generate</Button>
    </Popover.Trigger>
    <Popover.Content side="right">
      <Textarea />
      <ActionBar />
    </Popover.Content>
  </Popover>`,...(h=(d=c.parameters)==null?void 0:d.docs)==null?void 0:h.source}}};var g,u,v;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`() => <Popover>
    <Popover.Trigger>
      <Button color="primary" size="lg" variant="ghost" className="font-semibold gap-1.5">
        <Tools /> Actions
      </Button>
    </Popover.Trigger>
    <Popover.Content className="flex p-2" minWidth="auto" side="top">
      <Button color="primary" variant="ghost" gutterSize="sm">
        <Functions height={18} width={18} />
      </Button>
      <Button color="primary" variant="ghost" gutterSize="sm">
        <Search height={18} width={18} />
      </Button>
      <Button color="primary" variant="ghost" gutterSize="sm">
        <Globe height={18} width={18} />
      </Button>
      <Button color="primary" variant="ghost" gutterSize="sm">
        <Code height={18} width={18} />
      </Button>
      <Button color="primary" variant="ghost" gutterSize="sm">
        <ImageSquare height={18} width={18} />
      </Button>
    </Popover.Content>
  </Popover>`,...(v=(u=n.parameters)==null?void 0:u.docs)==null?void 0:v.source}}};var x,j,P;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`() => <div className="flex flex-col gap-4">
    <Popover showOnHover>
      <Popover.Trigger>
        <Button color="primary">Static content</Button>
      </Popover.Trigger>
      <Popover.Content width={320} side="right">
        <div className="p-3">
          <h3 className="mb-0.5 font-semibold">Popover Title</h3>
          <p className="text-sm text-secondary">
            This is an example of a hoverable popover containing presentational content.
          </p>
          <footer className="mt-2 text-xs text-tertiary">Last updated June 20, 2025</footer>
        </div>
      </Popover.Content>
    </Popover>
    <Popover showOnHover>
      <Popover.Trigger>
        <Button color="primary">Interactive content</Button>
      </Popover.Trigger>
      <Popover.Content minWidth={230} side="right">
        <InteractiveContent />
      </Popover.Content>
    </Popover>
  </div>`,...(P=(j=s.parameters)==null?void 0:j.docs)==null?void 0:P.source}}};var f,C,S;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`() => {
  return <Popover>
      <Popover.Trigger>
        <Button color="primary">Generate</Button>
      </Popover.Trigger>
      <Popover.Content side="right">
        <ControllerForm />
      </Popover.Content>
    </Popover>;
}`,...(S=(C=i.parameters)==null?void 0:C.docs)==null?void 0:S.source}}};const V=["Base","NaturalSizing","Hover","Controller"],U=Object.freeze(Object.defineProperty({__proto__:null,Base:c,Controller:i,Hover:s,NaturalSizing:n,__namedExportsOrder:V,default:E},Symbol.toStringTag,{value:"Module"}));export{c as B,i as C,s as H,n as N,U as P};
