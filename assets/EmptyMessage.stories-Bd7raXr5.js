import{j as e}from"./jsx-runtime-D_zvdyIk.js";import"./index-BNAx77fs.js";import{E as x,P as h,M as j,B as f,e as w,S as b}from"./index-vTu4Yset.js";import{T}from"./TextLink-_vsY4L_3.js";import{E as s}from"./EmptyMessage-C_6YQ3eU.js";import{B as I}from"./index-DZdtDvV8.js";const S={title:"Components/EmptyMessage"},r=()=>e.jsxs(s,{children:[e.jsx(s.Icon,{children:e.jsx(x,{})}),e.jsx(s.Title,{children:"Your evaluations will appear here"}),e.jsx(s.Description,{children:"Create an evaluation to assess your model's responses"}),e.jsx(s.ActionRow,{children:e.jsxs(I,{color:"primary",onClick:()=>{},size:"lg",children:[e.jsx(h,{className:"mr-[-2px]"}),"Create"]})})]}),o=()=>e.jsxs(s,{children:[e.jsx(s.Icon,{color:"danger",children:e.jsx(j,{})}),e.jsx(s.Title,{color:"danger",children:"Enable microphone access in your browser's settings."})]}),a=()=>e.jsxs(s,{children:[e.jsx(s.Icon,{color:"warning",children:e.jsx(f,{})}),e.jsx(s.Title,{children:"o1-preview is in beta"}),e.jsx(s.Description,{children:"System instructions and model configuration are not available yet. Responses may take longer."}),e.jsx(s.ActionRow,{className:"text-sm",children:e.jsxs(T,{href:"/",children:["Learn more",e.jsx(w,{})]})})]}),t=()=>e.jsxs(s,{fill:"none",children:[e.jsx(s.Icon,{size:"sm",children:e.jsx(b,{})}),e.jsxs(s.Description,{children:["No icons found matching ",e.jsx("span",{className:"font-semibold",children:'"pizza"'})]})]});var n,i,c;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`() => <EmptyMessage>
    <EmptyMessage.Icon>
      <Explore />
    </EmptyMessage.Icon>
    <EmptyMessage.Title>Your evaluations will appear here</EmptyMessage.Title>
    <EmptyMessage.Description>
      Create an evaluation to assess your model's responses
    </EmptyMessage.Description>
    <EmptyMessage.ActionRow>
      <Button color="primary" onClick={() => {}} size="lg">
        <Plus className="mr-[-2px]" />
        Create
      </Button>
    </EmptyMessage.ActionRow>
  </EmptyMessage>`,...(c=(i=r.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};var p,m,l;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`() => <EmptyMessage>
    <EmptyMessage.Icon color="danger">
      <Mic />
    </EmptyMessage.Icon>
    <EmptyMessage.Title color="danger">
      Enable microphone access in your browser's settings.
    </EmptyMessage.Title>
  </EmptyMessage>`,...(l=(m=o.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};var g,y,d;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`() => <EmptyMessage>
    <EmptyMessage.Icon color="warning">
      <Beta />
    </EmptyMessage.Icon>
    <EmptyMessage.Title>o1-preview is in beta</EmptyMessage.Title>
    <EmptyMessage.Description>
      System instructions and model configuration are not available yet. Responses may take longer.
    </EmptyMessage.Description>
    <EmptyMessage.ActionRow className="text-sm">
      <TextLink href="/">
        Learn more
        <ArrowUpRight />
      </TextLink>
    </EmptyMessage.ActionRow>
  </EmptyMessage>`,...(d=(y=a.parameters)==null?void 0:y.docs)==null?void 0:d.source}}};var E,M,u;t.parameters={...t.parameters,docs:{...(E=t.parameters)==null?void 0:E.docs,source:{originalSource:`() => <EmptyMessage fill="none">
    <EmptyMessage.Icon size="sm">
      <Search />
    </EmptyMessage.Icon>
    <EmptyMessage.Description>
      No icons found matching <span className="font-semibold">"pizza"</span>
    </EmptyMessage.Description>
  </EmptyMessage>`,...(u=(M=t.parameters)==null?void 0:M.docs)==null?void 0:u.source}}};const R=["Base","Error","Warning","Empty"],k=Object.freeze(Object.defineProperty({__proto__:null,Base:r,Empty:t,Error:o,Warning:a,__namedExportsOrder:R,default:S},Symbol.toStringTag,{value:"Module"}));export{r as B,k as E,o as a,t as b};
