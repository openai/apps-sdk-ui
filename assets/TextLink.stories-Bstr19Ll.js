import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{e as N,A as w}from"./index-vTu4Yset.js";import{T as s}from"./TextLink-_vsY4L_3.js";const I={title:"Components/TextLink",component:s,args:{href:"#"}},c=r=>e.jsxs("p",{children:["You can use the ",e.jsx(s,{...r,children:"responses endpoint"})," to generate text. You can either use the API directly from an HTTP client of your choice, or use one of OpenAI's"," ",e.jsx(s,{...r,children:"official SDKs"})," for your preferred language."]});c.parameters={docs:{source:{code:`<p>
  You can use the{' '}
  <TextLink href="#">responses endpoint</TextLink>{' '}
  to generate text. You can either use the API directly from an HTTP client of your choice, or use one of OpenAI's{' '}
  <TextLink href="#">official SDKs</TextLink>{' '}
  for your preferred language.
</p>`}}};const t=r=>e.jsxs("p",{className:r.colorClassName,children:["You can use the ",e.jsx(s,{href:"#",children:"responses endpoint"})," to generate text. You can either use the API directly from an HTTP client of your choice, or use one of OpenAI's"," ",e.jsx(s,{href:"#",children:"official SDKs"})," for your preferred language."]});t.args={colorClassName:"text-secondary"};t.argTypes={colorClassName:{control:"select",options:["text-default","text-base","text-secondary","text-tertiary","text-primary","text-info","text-discovery","text-danger","text-warning","text-caution"]}};t.parameters={controls:{include:["colorClassName"]}};const o=r=>e.jsxs("p",{children:["Sample text with a ",e.jsx(s,{...r,children:"primary link"})]});o.args={primary:!0};o.parameters={controls:{include:["primary"]}};const a=r=>e.jsxs("p",{className:"text-secondary",children:["Sample text with a ",e.jsx(s,{...r,children:"subtle link"})]});a.args={underline:!1};a.parameters={controls:{include:["underline"]}};const n=r=>e.jsxs(s,{...r,children:["External link ",e.jsx(N,{})]});n.args={primary:!0,underline:!0,href:"https://openai.com"};n.parameters={docs:{source:{code:`
<TextLink primary underline href="https://openai.com">
  External link <ArrowUpRight />
</TextLink>
`}}};const i=r=>e.jsxs(s,{...r,children:["Contact support ",e.jsx(w,{})]});i.args={className:"font-semibold",underline:!1};i.parameters={docs:{source:{code:`
<TextLink className="font-semibold" underline={false} href="#">
  Contact support <ArrowRight />
</TextLink>
`}}};var l,p,u;c.parameters={...c.parameters,docs:{...(l=c.parameters)==null?void 0:l.docs,source:{originalSource:`(args: TextLinkProps) => <p>
    You can use the <TextLink {...args}>responses endpoint</TextLink> to generate text. You can
    either use the API directly from an HTTP client of your choice, or use one of OpenAI's{" "}
    <TextLink {...args}>official SDKs</TextLink> for your preferred language.
  </p>`,...(u=(p=c.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var x,d,m;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`(args: {
  colorClassName: string;
}) => <p className={args.colorClassName}>
    You can use the <TextLink href="#">responses endpoint</TextLink> to generate text. You can
    either use the API directly from an HTTP client of your choice, or use one of OpenAI's{" "}
    <TextLink href="#">official SDKs</TextLink> for your preferred language.
  </p>`,...(m=(d=t.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var f,h,g;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`(args: TextLinkProps) => <p>
    Sample text with a <TextLink {...args}>primary link</TextLink>
  </p>`,...(g=(h=o.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var T,k,y;a.parameters={...a.parameters,docs:{...(T=a.parameters)==null?void 0:T.docs,source:{originalSource:`(args: TextLinkProps) => <p className="text-secondary">
    Sample text with a <TextLink {...args}>subtle link</TextLink>
  </p>`,...(y=(k=a.parameters)==null?void 0:k.docs)==null?void 0:y.source}}};var L,P,j;n.parameters={...n.parameters,docs:{...(L=n.parameters)==null?void 0:L.docs,source:{originalSource:`(args: TextLinkProps) => <TextLink {...args}>
    External link <ArrowUpRight />
  </TextLink>`,...(j=(P=n.parameters)==null?void 0:P.docs)==null?void 0:j.source}}};var S,A,C;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`(args: TextLinkProps) => <TextLink {...args}>
    Contact support <ArrowRight />
  </TextLink>`,...(C=(A=i.parameters)==null?void 0:A.docs)==null?void 0:C.source}}};const Y=["Base","Colors","Primary","Underline","External","Weight"],R=Object.freeze(Object.defineProperty({__proto__:null,Base:c,Colors:t,External:n,Primary:o,Underline:a,Weight:i,__namedExportsOrder:Y,default:I},Symbol.toStringTag,{value:"Module"}));export{c as B,t as C,n as E,o as P,R as T,a as U,i as W};
