import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as F}from"./index-CDlOlYQx.js";import{A as x,e as $,f as q,K as H}from"./index-vTu4Yset.js";import"./index-BNAx77fs.js";import{a as s}from"./index-DZdtDvV8.js";const J={title:"Components/ButtonLink",component:s,args:{children:"View API Keys",color:"primary",size:"md",href:"https://platform.openai.com",block:!1,disabled:!1,pill:!1}},c=r=>e.jsxs(s,{as:"a",...r,children:[r.children," ",e.jsx(x,{})]});c.parameters={docs:{source:{code:`<ButtonLink
  color="primary"
  href="https://platform.openai.com"
>
  View API Keys
  <ArrowRight />
</ButtonLink>  
    `}}};const d=()=>e.jsxs(s,{href:"/some-path",color:"primary",children:["Internal link ",e.jsx(x,{})]}),p=()=>e.jsxs(s,{href:"https://openai.com",color:"primary",children:["External link ",e.jsx($,{})]}),o=r=>e.jsxs("div",{className:"flex flex-col gap-2 justify-start items-start",children:[e.jsxs(s,{...r,children:["View account ",e.jsx(x,{})]}),e.jsx(s,{...r,children:"View account"})]});o.args={color:"primary",size:"lg",pill:!1};o.parameters={controls:{include:["size","pill"]}};const t=r=>e.jsxs(s,{...r,children:[e.jsx(q,{})," View website"]});t.args={color:"info",size:"lg",uniform:!1,variant:"soft"};t.parameters={controls:{include:["size","iconSize"]}};t.argTypes={size:{control:"select"},iconSize:{control:"select"}};const a=r=>e.jsx("div",{className:"w-[290px] text-center p-2 border border-dashed border-alpha/20 rounded-md",children:e.jsx(s,{as:"a",...r})});a.args={children:"Continue to dashboard",size:"lg",block:!0};a.parameters={controls:{include:["block"]}};const n=r=>e.jsxs(s,{...r,children:[e.jsx(H,{})," View API Keys"]});n.args={disabled:!0,onClick:()=>alert("Not disabled")};n.parameters={controls:{include:["disabled"]},docs:{source:{code:`<ButtonLink
  href="https://platform.openai.com"
  color="primary"
  disabled
  onClick={alertMsg}
>
  <Key />
  View API Keys
</ButtonLink>`}}};const k=["soft","solid","outline","ghost"],f=["primary","secondary","danger","info","discovery","success","caution","warning"],i=r=>e.jsx("div",{className:"pt-1 pb-6 min-w-[820px]",children:e.jsx(Q,{rowLabels:k,columnLabels:f,renderCell:(l,u)=>e.jsx(s,{as:"a",...r,size:r.size,color:f[u],variant:k[l]})})});i.args={children:"Button",size:"lg"};i.parameters={layout:"padded"};const Q=({rowLabels:r,columnLabels:l,renderCell:u})=>{const U=`auto repeat(${l.length}, min-content)`;return e.jsxs("div",{className:"grid gap-6 items-center justify-center",style:{gridTemplateColumns:U},children:[e.jsx("div",{}),l.map((g,m)=>e.jsx("div",{className:"text-center text-tertiary text-sm mb-1",children:g},m)),r.map((g,m)=>e.jsxs(F.Fragment,{children:[e.jsx("div",{className:"text-right text-tertiary text-sm mr-3 -ml-3",children:g}),l.map((X,h)=>e.jsx("div",{className:"text-center",children:u(m,h)},h))]},m))]})};var B,L,j;c.parameters={...c.parameters,docs:{...(B=c.parameters)==null?void 0:B.docs,source:{originalSource:`(args: ButtonLinkProps) => <ButtonLink as="a" {...args}>
    {args.children} <ArrowRight />
  </ButtonLink>`,...(j=(L=c.parameters)==null?void 0:L.docs)==null?void 0:j.source}}};var b,w,y;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:`() => <ButtonLink href="/some-path" color="primary">
    Internal link <ArrowRight />
  </ButtonLink>`,...(y=(w=d.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var S,v,A;p.parameters={...p.parameters,docs:{...(S=p.parameters)==null?void 0:S.docs,source:{originalSource:`() => <ButtonLink href="https://openai.com" color="primary">
    External link <ArrowUpRight />
  </ButtonLink>`,...(A=(v=p.parameters)==null?void 0:v.docs)==null?void 0:A.source}}};var z,I,N;o.parameters={...o.parameters,docs:{...(z=o.parameters)==null?void 0:z.docs,source:{originalSource:`(args: ButtonLinkProps) => <div className="flex flex-col gap-2 justify-start items-start">
    <ButtonLink {...args}>
      View account <ArrowRight />
    </ButtonLink>
    <ButtonLink {...args}>View account</ButtonLink>
  </div>`,...(N=(I=o.parameters)==null?void 0:I.docs)==null?void 0:N.source}}};var R,V,C;t.parameters={...t.parameters,docs:{...(R=t.parameters)==null?void 0:R.docs,source:{originalSource:`(args: ButtonLinkProps) => <ButtonLink {...args}>
    <Globe /> View website
  </ButtonLink>`,...(C=(V=t.parameters)==null?void 0:V.docs)==null?void 0:C.source}}};var P,K,O;a.parameters={...a.parameters,docs:{...(P=a.parameters)==null?void 0:P.docs,source:{originalSource:`(args: ButtonLinkProps) => <div className="w-[290px] text-center p-2 border border-dashed border-alpha/20 rounded-md">
    <ButtonLink as="a" {...args} />
  </div>`,...(O=(K=a.parameters)==null?void 0:K.docs)==null?void 0:O.source}}};var E,_,T;n.parameters={...n.parameters,docs:{...(E=n.parameters)==null?void 0:E.docs,source:{originalSource:`(args: ButtonLinkProps) => <ButtonLink {...args}>
    <Key /> View API Keys
  </ButtonLink>`,...(T=(_=n.parameters)==null?void 0:_.docs)==null?void 0:T.source}}};var M,D,G;i.parameters={...i.parameters,docs:{...(M=i.parameters)==null?void 0:M.docs,source:{originalSource:`(args: ButtonLinkProps) => <div className="pt-1 pb-6 min-w-[820px]">
    <Matrix rowLabels={VARIANTS} columnLabels={COLORS} renderCell={(row, col) => <ButtonLink as="a" {...args} size={args.size} color={COLORS[col]} variant={VARIANTS[row]} />} />
  </div>`,...(G=(D=i.parameters)==null?void 0:D.docs)==null?void 0:G.source}}};const W=["Base","Internal","External","Sizing","Icon","Block","Disabled","Colors"],te=Object.freeze(Object.defineProperty({__proto__:null,Base:c,Block:a,Colors:i,Disabled:n,External:p,Icon:t,Internal:d,Sizing:o,__namedExportsOrder:W,default:J},Symbol.toStringTag,{value:"Module"}));export{te as B,i as C,n as D,p as E,d as I,o as S,c as a,t as b,a as c};
