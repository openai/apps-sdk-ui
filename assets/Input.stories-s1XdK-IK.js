import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as Z}from"./index-CDlOlYQx.js";import"./index-BNAx77fs.js";import{S as $,X as ee}from"./index-vTu4Yset.js";import{I as s}from"./index-C2jLX_4z.js";import{B as b}from"./index-DZdtDvV8.js";const ae={title:"Components/Input",component:s,args:{placeholder:"Enter text...",allowAutofillExtensions:!1,disabled:!1,invalid:!1}},g=a=>e.jsx(s,{...a}),r=a=>{const[t,x]=Z.useState("");return e.jsxs("div",{className:"flex flex-col gap-2.5 justify-start items-start w-[220px]",children:[e.jsx(s,{...a}),e.jsx(s,{...a,placeholder:"Search...",startAdornment:e.jsx($,{className:"fill-tertiary"})}),e.jsx(s,{...a,value:t,placeholder:"Username",onChange:v=>x(v.target.value),maxLength:16,endAdornment:e.jsxs("span",{className:"mt-[1.5px] tabular-nums text-tertiary text-[.875em]",children:[t.length,"/16"]})})]})};r.args={size:"lg",pill:!1};r.parameters={controls:{include:["size","gutterSize","pill"]}};r.argTypes={size:{control:"select"},gutterSize:{control:"select"}};const o=a=>e.jsx(s,{...a});o.args={startAdornment:e.jsx($,{className:"fill-tertiary"}),placeholder:"Start adornment"};o.parameters={docs:{source:{code:`<Input
  placeholder="Start adornment"
  startAdornment={<Search className="fill-tertiary" />}
/>`}}};const m=()=>{const[a,t]=Z.useState("Clearable value");return e.jsx("div",{className:"w-[220px]",children:e.jsx(s,{placeholder:"Enter text...",value:a,onChange:x=>t(x.target.value),pill:!0,endAdornment:a?e.jsx(b,{className:"-mr-2.5",color:"secondary",variant:"soft",uniform:!0,size:"3xs",onClick:()=>t(""),pill:!0,children:e.jsx(ee,{})}):void 0})})};m.parameters={docs:{source:{code:`<Input
  placeholder="Enter text..."
  value={value}
  onChange={(evt) => setValue(evt.target.value)}
  pill
  endAdornment={
    value ? (
      <Button
        className="-mr-2.5"
        color="secondary"
        variant="soft"
        uniform
        size="3xs"
        onClick={() => setValue("")}
        pill
      >
        <X />
      </Button>
    ) : undefined
  }
/>`}}};const n=a=>e.jsx(s,{...a});n.args={disabled:!0,defaultValue:"Jane Doe"};n.parameters={controls:{include:["disabled"]}};const i=a=>e.jsx(s,{...a});i.args={invalid:!0,placeholder:"Invalid input"};i.parameters={controls:{include:["invalid"]}};const c=a=>e.jsx(s,{...a,defaultValue:"Toggle to auto select"});c.args={autoSelect:!1,placeholder:"Add text..."};c.parameters={controls:{include:["autoSelect"]}};const d=a=>e.jsx(s,{...a,placeholder:a.allowAutofillExtensions?"Allowed":"Not allowed"},String(a.allowAutofillExtensions));d.args={allowAutofillExtensions:!0,name:"email"};d.parameters={controls:{include:["allowAutofillExtensions"]}};const l=a=>e.jsxs("div",{className:"flex gap-2",children:[e.jsx(s,{placeholder:"jane.doe@gmail.com",size:a.size,variant:a.variant}),e.jsx(b,{color:"primary",size:a.size,variant:a.variant,children:"Subscribe"})]});l.args={variant:"outline",size:"lg"};l.parameters={controls:{include:["variant","size"]}};l.argTypes={variant:{control:"select"},size:{control:"select"}};const p=a=>e.jsxs("div",{className:"flex flex-col gap-3 w-[360px]",children:[e.jsxs("div",{className:"border border-dashed border-alpha/20 rounded-md py-6 px-8",children:[e.jsx("div",{className:"mb-4 text-secondary text-sm",children:"Default"}),e.jsx("label",{className:"text-sm mb-1 block",children:"Field 1"}),e.jsx(s,{...a,pill:!0}),e.jsx("label",{className:"mt-3 text-sm mb-1 block",children:"Field 2"}),e.jsx(s,{...a,pill:!0}),e.jsx(b,{className:"mt-3",color:"primary",variant:"soft",pill:!0,children:"Submit"})]}),e.jsxs("div",{className:"border border-dashed border-alpha/20 rounded-md py-6 px-8",children:[e.jsx("div",{className:"mb-4 text-secondary text-sm",children:'opticallyAlign="start"'}),e.jsx("label",{className:"text-sm mb-1 block",children:"Field 1"}),e.jsx(s,{...a,opticallyAlign:"start",pill:!0}),e.jsx("label",{className:"mt-3 text-sm mb-1 block",children:"Field 2"}),e.jsx(s,{...a,opticallyAlign:"start",pill:!0}),e.jsx(b,{className:"mt-3",color:"primary",variant:"soft",opticallyAlign:"start",pill:!0,children:"Submit"})]})]});p.args={placeholder:"Sample input"};const h=["outline","soft"],u=a=>e.jsx("div",{className:"pt-1 pb-6 w-full max-w-[500px] mx-auto",children:e.jsx(se,{rowLabels:h,renderRow:t=>e.jsx(s,{...a,className:"w-[180px]",variant:h[t]})})});u.args={placeholder:"Enter text..."};const se=({rowLabels:a,renderRow:t})=>e.jsx("div",{className:"flex flex-col gap-6",children:a.map((x,v)=>e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"text-right text-tertiary text-sm mr-8 -ml-3 min-w-[4rem]",children:x}),e.jsx("div",{className:"flex-1",children:t(v)})]},v))});var f,N,j;g.parameters={...g.parameters,docs:{...(f=g.parameters)==null?void 0:f.docs,source:{originalSource:"(args: InputProps) => <Input {...args} />",...(j=(N=g.parameters)==null?void 0:N.docs)==null?void 0:j.source}}};var S,A,I;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{originalSource:`(args: InputProps) => {
  const [username, setUsername] = useState<string>("");
  return <div className="flex flex-col gap-2.5 justify-start items-start w-[220px]">
      <Input {...args} />
      <Input {...args} placeholder="Search..." startAdornment={<Search className="fill-tertiary" />} />
      <Input {...args} value={username} placeholder="Username" onChange={evt => setUsername(evt.target.value)} maxLength={16} endAdornment={<span className="mt-[1.5px] tabular-nums text-tertiary text-[.875em]">
            {username.length}/16
          </span>} />
    </div>;
}`,...(I=(A=r.parameters)==null?void 0:A.docs)==null?void 0:I.source}}};var y,w,z;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:"(args: InputProps) => <Input {...args} />",...(z=(w=o.parameters)==null?void 0:w.docs)==null?void 0:z.source}}};var E,B,V;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:`() => {
  const [value, setValue] = useState<string>("Clearable value");
  return <div className="w-[220px]">
      <Input placeholder="Enter text..." value={value} onChange={evt => setValue(evt.target.value)} pill endAdornment={value ? <Button className="-mr-2.5" color="secondary" variant="soft" uniform size="3xs" onClick={() => setValue("")} pill>
              <X />
            </Button> : undefined} />
    </div>;
}`,...(V=(B=m.parameters)==null?void 0:B.docs)==null?void 0:V.source}}};var P,k,O;n.parameters={...n.parameters,docs:{...(P=n.parameters)==null?void 0:P.docs,source:{originalSource:"(args: InputProps) => <Input {...args} />",...(O=(k=n.parameters)==null?void 0:k.docs)==null?void 0:O.source}}};var C,T,_;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:"(args: InputProps) => <Input {...args} />",...(_=(T=i.parameters)==null?void 0:T.docs)==null?void 0:_.source}}};var F,R,D;c.parameters={...c.parameters,docs:{...(F=c.parameters)==null?void 0:F.docs,source:{originalSource:'(args: InputProps) => <Input {...args} defaultValue="Toggle to auto select" />',...(D=(R=c.parameters)==null?void 0:R.docs)==null?void 0:D.source}}};var U,L,M;d.parameters={...d.parameters,docs:{...(U=d.parameters)==null?void 0:U.docs,source:{originalSource:'(args: InputProps) => <Input key={String(args.allowAutofillExtensions)} {...args} placeholder={args.allowAutofillExtensions ? "Allowed" : "Not allowed"} />',...(M=(L=d.parameters)==null?void 0:L.docs)==null?void 0:M.source}}};var W,X,J;l.parameters={...l.parameters,docs:{...(W=l.parameters)==null?void 0:W.docs,source:{originalSource:`(args: InputProps) => <div className="flex gap-2">
    <Input placeholder="jane.doe@gmail.com" size={args.size} variant={args.variant} />
    <Button color="primary" size={args.size} variant={args.variant}>
      Subscribe
    </Button>
  </div>`,...(J=(X=l.parameters)==null?void 0:X.docs)==null?void 0:J.source}}};var q,G,H;p.parameters={...p.parameters,docs:{...(q=p.parameters)==null?void 0:q.docs,source:{originalSource:`(args: InputProps) => <div className="flex flex-col gap-3 w-[360px]">
    <div className="border border-dashed border-alpha/20 rounded-md py-6 px-8">
      <div className="mb-4 text-secondary text-sm">Default</div>
      <label className="text-sm mb-1 block">Field 1</label>
      <Input {...args} pill />
      <label className="mt-3 text-sm mb-1 block">Field 2</label>
      <Input {...args} pill />
      <Button className="mt-3" color="primary" variant="soft" pill>
        Submit
      </Button>
    </div>
    <div className="border border-dashed border-alpha/20 rounded-md py-6 px-8">
      <div className="mb-4 text-secondary text-sm">opticallyAlign="start"</div>
      <label className="text-sm mb-1 block">Field 1</label>
      <Input {...args} opticallyAlign="start" pill />
      <label className="mt-3 text-sm mb-1 block">Field 2</label>
      <Input {...args} opticallyAlign="start" pill />
      <Button className="mt-3" color="primary" variant="soft" opticallyAlign="start" pill>
        Submit
      </Button>
    </div>
  </div>`,...(H=(G=p.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};var K,Q,Y;u.parameters={...u.parameters,docs:{...(K=u.parameters)==null?void 0:K.docs,source:{originalSource:`(args: InputProps) => <div className="pt-1 pb-6 w-full max-w-[500px] mx-auto">
    <RowMatrix rowLabels={VARIANT_OPTIONS} renderRow={row => <Input {...args} className="w-[180px]" variant={VARIANT_OPTIONS[row]} />} />
  </div>`,...(Y=(Q=u.parameters)==null?void 0:Q.docs)==null?void 0:Y.source}}};const te=["Base","Sizing","StartAdornment","EndAdornment","Disabled","Invalid","AutoSelect","AutofillExtensions","WithButton","OpticalAlignment","Variants"],de=Object.freeze(Object.defineProperty({__proto__:null,AutoSelect:c,AutofillExtensions:d,Base:g,Disabled:n,EndAdornment:m,Invalid:i,OpticalAlignment:p,Sizing:r,StartAdornment:o,Variants:u,WithButton:l,__namedExportsOrder:te,default:ae},Symbol.toStringTag,{value:"Module"}));export{c as A,g as B,n as D,m as E,de as I,p as O,r as S,u as V,l as W,o as a,i as b,d as c};
