import{j as e}from"./jsx-runtime-D_zvdyIk.js";import"./index-f1W-XCGd.js";import{T as r}from"./index-XVXXFwUV.js";import{B as u}from"./index-DSWOpmMK.js";const T={title:"Components/Tooltip",component:r,args:{content:"This is additional context that appears when the trigger is hovered or focused",compact:!1,interactive:!1},argTypes:{content:{control:"text"},maxWidth:{control:{type:"range",min:100,max:400,step:5}},openDelay:{control:{type:"range",min:0,max:1500,step:50}},sideOffset:{control:{type:"range",min:0,max:40,step:1}},alignOffset:{control:{type:"range",min:0,max:40,step:1}}}},a=t=>e.jsx(r,{...t,children:e.jsx(r.TriggerDecorator,{children:"Simple text with tooltip"})}),s=t=>e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(r,{...t,children:e.jsx(u,{color:"primary",size:"lg",children:"Sample button"})}),e.jsx(r,{...t,children:e.jsx("span",{children:"Inaccessible trigger"})})]}),o=({disabled:t})=>e.jsx(r,{content:t?"This action is disabled for reasons":null,children:e.jsx(u,{color:"primary",size:"lg",disabled:t,children:"Sample button"})});o.args={disabled:!0};o.argTypes={disabled:{control:"boolean"},content:{table:{disable:!0}},compact:{table:{disable:!0}},interactive:{table:{disable:!0}},maxWidth:{table:{disable:!0}},forceOpen:{table:{disable:!0}},openDelay:{table:{disable:!0}},align:{table:{disable:!0}},alignOffset:{table:{disable:!0}},side:{table:{disable:!0}},sideOffset:{table:{disable:!0}},gutterSize:{table:{disable:!0}},preventUnintentionalClickToClose:{table:{disable:!0}},ref:{table:{disable:!0}},contentClassName:{table:{disable:!0}}};var i,l,n;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`(args: TooltipProps) => <Tooltip {...args}>
    <Tooltip.TriggerDecorator>Simple text with tooltip</Tooltip.TriggerDecorator>
  </Tooltip>`,...(n=(l=a.parameters)==null?void 0:l.docs)==null?void 0:n.source}}};var c,p,d;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`(args: TooltipProps) => <div className="flex items-center gap-4">
    <Tooltip {...args}>
      <Button color="primary" size="lg">
        Sample button
      </Button>
    </Tooltip>
    <Tooltip {...args}>
      <span>Inaccessible trigger</span>
    </Tooltip>
  </div>`,...(d=(p=s.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var m,b,g;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`({
  disabled
}: {
  disabled: boolean;
}) => <Tooltip content={disabled ? "This action is disabled for reasons" : null}>
    <Button color="primary" size="lg" disabled={disabled}>
      Sample button
    </Button>
  </Tooltip>`,...(g=(b=o.parameters)==null?void 0:b.docs)==null?void 0:g.source}}};const x=["Base","Triggers","Conditional"],S=Object.freeze(Object.defineProperty({__proto__:null,Base:a,Conditional:o,Triggers:s,__namedExportsOrder:x,default:T},Symbol.toStringTag,{value:"Module"}));export{a as B,o as C,S as T,s as a};
