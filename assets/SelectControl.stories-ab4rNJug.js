import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as ae}from"./index-CDlOlYQx.js";import{q as v,r as le,i as I,p as ne}from"./index-vTu4Yset.js";import{M as a}from"./index-JgbsMnBD.js";import{S as r}from"./index-C9ZQDE51.js";const se={title:"Components/SelectControl",component:r,argTypes:{opticallyAlign:{control:{type:"inline-radio"},options:["start","end"]}}},c=o=>{const[t,s]=ae.useState("");return e.jsxs(a,{children:[e.jsx(a.Trigger,{children:e.jsx(r,{...o,className:"w-[200px]",selected:!!t,onClearClick:()=>s(""),StartIcon:v,children:t||"Select date..."})}),e.jsx(a.Content,{minWidth:200,width:200,children:e.jsxs(a.RadioGroup,{value:t,onChange:s,children:[e.jsx(a.RadioItem,{value:"Today",children:"Today"}),e.jsx(a.RadioItem,{value:"Last week",children:"Last week"}),e.jsx(a.RadioItem,{value:"Last month",children:"Last month"}),e.jsx(a.RadioItem,{value:"Last 3 months",children:"Last 3 months"})]})})]})};c.args={variant:"outline",pill:!0,size:"md"};c.parameters={docs:{source:{code:`
const [value, setValue] = useState("")
const placeholder = "Select date..."

return (
  // Use any floating UI, like <Menu>, <Popover>, etc.
  <Menu>
    <Menu.Trigger>
      <SelectControl
        selected={!!value}
        onClearClick={() => setValue("")}
        StartIcon={CalendarAlt}
      >
        {value || placeholder}
      </SelectControl>
    </Menu.Trigger>
    <Menu.Content>
      <Menu.RadioGroup value={value} onChange={setValue}>
        ...
      </Menu.RadioGroup>
    </Menu.Content>
  </Menu>
)
`}}};const j=["soft","outline","ghost"],d=o=>e.jsx("div",{className:"pt-1 pb-6 w-full max-w-[500px] mx-auto",children:e.jsx(ce,{rowLabels:j,renderRow:t=>e.jsx(r,{...o,className:"w-[200px]",variant:j[t],selected:!0,StartIcon:le,onClearClick:()=>{},children:"Sample value"})})});d.args={invalid:!1,disabled:!1,onInteract:()=>{}};d.parameters={controls:{include:["invalid","disabled"]}};const l=o=>e.jsxs("div",{className:"flex flex-col gap-2 justify-start items-start",children:[e.jsx(r,{...o,dropdownIconType:"none",children:"Select..."}),e.jsx(r,{...o,loading:!0,children:"Select..."}),e.jsx(r,{...o,children:"Select..."}),e.jsx(r,{...o,StartIcon:I,dropdownIconType:"none",children:"Tool calls"}),e.jsx(r,{...o,onClearClick:()=>{},selected:!0,StartIcon:I,dropdownIconType:"none",children:"With tool calls"}),e.jsx(r,{...o,onClearClick:()=>{},selected:!0,StartIcon:v,dropdownIconType:"chevronDown",children:"Today"}),e.jsx(r,{...o,onClearClick:()=>{},selected:!0,StartIcon:v,children:"Today"})]});l.args={color:"primary",size:"md",pill:!1,onInteract:()=>{}};l.parameters={controls:{include:["size","pill","variant"]}};l.argTypes={size:{control:"select"},variant:{control:"select"}};const i=o=>e.jsx("div",{className:"w-[290px] text-center p-2 border border-dashed border-alpha/20 rounded-md",children:e.jsx(r,{...o,children:"Select..."})});i.args={size:"lg",block:!0};i.parameters={controls:{include:["block"]}};const p=o=>e.jsxs("div",{className:"flex flex-col gap-3 w-[280px]",children:[e.jsxs("div",{className:"border border-dashed border-alpha/20 rounded-md py-4 px-6",children:[e.jsx("div",{className:"mb-2 text-secondary text-sm",children:"Default"}),e.jsx(r,{...o,opticallyAlign:void 0,children:"Ghost control"})]}),e.jsxs("div",{className:"border border-dashed border-alpha/20 rounded-md py-4 px-6",children:[e.jsx("div",{className:"mb-2 text-secondary text-sm",children:'opticallyAlign="start"'}),e.jsx(r,{...o,children:"Ghost control"})]})]});p.args={selected:!0,variant:"ghost",opticallyAlign:"start"};p.parameters={controls:{include:["opticallyAlign"]}};const g=o=>e.jsx(r,{...o,StartIcon:v,children:"Select date..."});g.parameters={docs:{source:{code:`
<SelectControl StartIcon={CalendarAlt}>
  Reader
</SelectControl>  
  `}}};const u=o=>e.jsx(r,{...o,StartIcon:ne,children:"Reader"});u.args={disabled:!0,selected:!0,onInteract:()=>alert("Not disabled")};u.parameters={controls:{include:["disabled"]},docs:{source:{code:`
<SelectControl disabled>
  Reader
</SelectControl>  
  `}}};const m=o=>e.jsx(r,{...o,children:"Select..."});m.args={selected:!1};m.parameters={controls:{include:["selected"]}};const S=o=>e.jsx(r,{...o,children:"Loading models..."});S.args={loading:!0};S.parameters={controls:{include:["loading"]}};const C=o=>e.jsx(r,{...o,selected:!0,children:"Pineapple on pizza"});C.args={invalid:!0};C.parameters={controls:{include:["invalid"]},docs:{source:{code:`
<SelectControl invalid>
  Pineapple on pizza
</SelectControl>  
  `}}};const n=o=>e.jsx(r,{...o,children:"Select..."});n.args={dropdownIconType:"dropdown"};n.argTypes={dropdownIconType:{control:"select"}};n.parameters={controls:{include:["dropdownIconType"]}};const x=o=>{const[t,s]=ae.useState("Sample value");return e.jsx(r,{...o,selected:!!t,onInteract:()=>s("Sample value"),onClearClick:()=>s(""),children:t||"Select..."})},ce=({rowLabels:o,renderRow:t})=>e.jsx("div",{className:"flex flex-col gap-6",children:o.map((s,h)=>e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"text-right text-tertiary text-sm mr-8 -ml-3 min-w-[4rem]",children:s}),e.jsx("div",{className:"flex-1",children:t(h)})]},h))});var y,b,w;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`(args: SelectControlProps) => {
  const [value, setValue] = useState("");
  const placeholder = "Select date...";
  return (
    // Use any floating UI, like <Menu>, <Popover>, etc.
    <Menu>
      <Menu.Trigger>
        <SelectControl {...args} className="w-[200px]" selected={!!value} onClearClick={() => setValue("")} StartIcon={CalendarAlt}>
          {value || placeholder}
        </SelectControl>
      </Menu.Trigger>
      <Menu.Content minWidth={200} width={200}>
        <Menu.RadioGroup value={value} onChange={setValue}>
          <Menu.RadioItem value="Today">Today</Menu.RadioItem>
          <Menu.RadioItem value="Last week">Last week</Menu.RadioItem>
          <Menu.RadioItem value="Last month">Last month</Menu.RadioItem>
          <Menu.RadioItem value="Last 3 months">Last 3 months</Menu.RadioItem>
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu>
  );
}`,...(w=(b=c.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};var T,f,M;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`(args: SelectControlProps) => <div className="pt-1 pb-6 w-full max-w-[500px] mx-auto">
    <RowMatrix rowLabels={VARIANT_OPTIONS} renderRow={row => <SelectControl {...args} className="w-[200px]" variant={VARIANT_OPTIONS[row]} selected StartIcon={Cabinet} onClearClick={() => {}}>
          Sample value
        </SelectControl>} />
  </div>`,...(M=(f=d.parameters)==null?void 0:f.docs)==null?void 0:M.source}}};var N,R,k;l.parameters={...l.parameters,docs:{...(N=l.parameters)==null?void 0:N.docs,source:{originalSource:`(args: SelectControlProps) => <div className="flex flex-col gap-2 justify-start items-start">
    <SelectControl {...args} dropdownIconType="none">
      Select...
    </SelectControl>
    <SelectControl {...args} loading>
      Select...
    </SelectControl>
    <SelectControl {...args}>Select...</SelectControl>
    <SelectControl {...args} StartIcon={Tools} dropdownIconType="none">
      Tool calls
    </SelectControl>
    <SelectControl {...args} onClearClick={() => {}} selected StartIcon={Tools} dropdownIconType="none">
      With tool calls
    </SelectControl>
    <SelectControl {...args} onClearClick={() => {}} selected StartIcon={CalendarAlt} dropdownIconType="chevronDown">
      Today
    </SelectControl>
    <SelectControl {...args} onClearClick={() => {}} selected StartIcon={CalendarAlt}>
      Today
    </SelectControl>
  </div>`,...(k=(R=l.parameters)==null?void 0:R.docs)==null?void 0:k.source}}};var A,P,L;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`(args: SelectControlProps) => <div className="w-[290px] text-center p-2 border border-dashed border-alpha/20 rounded-md">
    <SelectControl {...args}>Select...</SelectControl>
  </div>`,...(L=(P=i.parameters)==null?void 0:P.docs)==null?void 0:L.source}}};var V,z,O;p.parameters={...p.parameters,docs:{...(V=p.parameters)==null?void 0:V.docs,source:{originalSource:`(args: SelectControlProps) => <div className="flex flex-col gap-3 w-[280px]">
    <div className="border border-dashed border-alpha/20 rounded-md py-4 px-6">
      <div className="mb-2 text-secondary text-sm">Default</div>
      <SelectControl {...{
      ...args,
      opticallyAlign: undefined
    }}>Ghost control</SelectControl>
    </div>
    <div className="border border-dashed border-alpha/20 rounded-md py-4 px-6">
      <div className="mb-2 text-secondary text-sm">opticallyAlign="start"</div>
      <SelectControl {...args}>Ghost control</SelectControl>
    </div>
  </div>`,...(O=(z=p.parameters)==null?void 0:z.docs)==null?void 0:O.source}}};var D,G,_;g.parameters={...g.parameters,docs:{...(D=g.parameters)==null?void 0:D.docs,source:{originalSource:`(args: SelectControlProps) => <SelectControl {...args} StartIcon={CalendarAlt}>
    Select date...
  </SelectControl>`,...(_=(G=g.parameters)==null?void 0:G.docs)==null?void 0:_.source}}};var U,B,W;u.parameters={...u.parameters,docs:{...(U=u.parameters)==null?void 0:U.docs,source:{originalSource:`(args: SelectControlProps) => <SelectControl {...args} StartIcon={User}>
    Reader
  </SelectControl>`,...(W=(B=u.parameters)==null?void 0:B.docs)==null?void 0:W.source}}};var E,q,F;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:"(args: SelectControlProps) => <SelectControl {...args}>Select...</SelectControl>",...(F=(q=m.parameters)==null?void 0:q.docs)==null?void 0:F.source}}};var H,J,K;S.parameters={...S.parameters,docs:{...(H=S.parameters)==null?void 0:H.docs,source:{originalSource:"(args: SelectControlProps) => <SelectControl {...args}>Loading models...</SelectControl>",...(K=(J=S.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,X,Y;C.parameters={...C.parameters,docs:{...(Q=C.parameters)==null?void 0:Q.docs,source:{originalSource:`(args: SelectControlProps) => <SelectControl {...args} selected>
    Pineapple on pizza
  </SelectControl>`,...(Y=(X=C.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,$,ee;n.parameters={...n.parameters,docs:{...(Z=n.parameters)==null?void 0:Z.docs,source:{originalSource:"(args: SelectControlProps) => <SelectControl {...args}>Select...</SelectControl>",...(ee=($=n.parameters)==null?void 0:$.docs)==null?void 0:ee.source}}};var oe,re,te;x.parameters={...x.parameters,docs:{...(oe=x.parameters)==null?void 0:oe.docs,source:{originalSource:`(args: SelectControlProps) => {
  const [value, setValue] = useState("Sample value");
  const placeholder = "Select...";
  return <SelectControl {...args} selected={!!value} onInteract={() => setValue("Sample value")} onClearClick={() => setValue("")}>
      {value || placeholder}
    </SelectControl>;
}`,...(te=(re=x.parameters)==null?void 0:re.docs)==null?void 0:te.source}}};const de=["Base","Variants","Sizing","Block","OpticalAlignment","StartIcon","Disabled","Selected","Loading","Invalid","DropdownIcon","Clearable"],Ce=Object.freeze(Object.defineProperty({__proto__:null,Base:c,Block:i,Clearable:x,Disabled:u,DropdownIcon:n,Invalid:C,Loading:S,OpticalAlignment:p,Selected:m,Sizing:l,StartIcon:g,Variants:d,__namedExportsOrder:de,default:se},Symbol.toStringTag,{value:"Module"}));export{c as B,x as C,n as D,C as I,S as L,p as O,Ce as S,d as V,l as a,m as b,g as c,u as d,i as e};
