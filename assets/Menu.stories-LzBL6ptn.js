import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as V}from"./index-CDlOlYQx.js";import"./index-f1W-XCGd.js";import{h as M,i as W,F as B,S as G,f as N,j as z,I as F,H as E,k as g}from"./index-vTu4Yset.js";import{M as n}from"./index-BP2sAJBc.js";import{B as c}from"./index-DSWOpmMK.js";const _={title:"Components/Menu"},h=()=>e.jsxs(n,{children:[e.jsx(n.Trigger,{children:e.jsxs(c,{color:"primary",size:"lg",variant:"ghost",children:["Sample menu ",e.jsx(M,{})]})}),e.jsxs(n.Content,{width:210,minWidth:210,children:[e.jsxs(n.Item,{children:[e.jsx("p",{className:"font-semibold",children:"Sam Smith"}),e.jsx("p",{className:"text-secondary",children:"sam.smith@gmail.com"})]}),e.jsx(n.Separator,{}),e.jsx(n.Link,{href:"/settings",children:"Your profile"}),e.jsx(n.Link,{href:"https://openai.com/policies/",children:"Terms & policies"}),e.jsx(n.Item,{disabled:!0,onSelect:()=>{},children:"Feature flags"}),e.jsx(n.Separator,{}),e.jsx(n.Item,{onSelect:()=>{},children:"Logout"})]})]}),a=()=>e.jsxs(n,{children:[e.jsx(n.Trigger,{children:e.jsxs(c,{color:"primary",size:"lg",variant:"ghost",className:"font-semibold gap-1.5",children:[e.jsx(W,{})," Tools"]})}),e.jsxs(n.Content,{minWidth:"auto",children:[e.jsxs(n.Item,{onSelect:()=>{},children:[e.jsx(B,{height:18,width:18})," Function"]}),e.jsxs(n.Item,{onSelect:()=>{},children:[e.jsx(G,{height:18,width:18})," File Search"]}),e.jsxs(n.Item,{onSelect:()=>{},children:[e.jsx(N,{height:18,width:18})," Web Search"]}),e.jsxs(n.Item,{onSelect:()=>{},children:[e.jsx(z,{height:18,width:18})," Code Interpreter"]}),e.jsxs(n.Item,{onSelect:()=>{},children:[e.jsx(F,{height:18,width:18})," Image Generation"]})]})]});a.parameters={docs:{source:{code:`<Menu.Content minWidth="auto">
  <Menu.Item onSelect={handleSelect}>
    <Functions height={16} width={16} /> Function
  </Menu.Item>
  ...
</Menu.Content>`}}};const r=()=>e.jsxs(n,{children:[e.jsx(n.Trigger,{children:e.jsxs(c,{color:"primary",size:"lg",variant:"ghost",className:"font-semibold gap-1.5",children:[e.jsx(E,{})," Conversations"]})}),e.jsxs(n.Content,{width:270,children:[e.jsxs(n.Item,{onSelect:()=>{},children:[e.jsx("span",{className:"flex-1 truncate",children:"Sample thread title"}),e.jsx(n.ItemActions,{children:e.jsx(n.ItemAction,{onClick:()=>{},children:e.jsx(g,{})})})]}),e.jsxs(n.Item,{onSelect:()=>{},children:[e.jsx("span",{className:"flex-1 truncate",children:"Another sample thread title"}),e.jsx(n.ItemActions,{children:e.jsx(n.ItemAction,{onClick:()=>{},children:e.jsx(g,{})})})]}),e.jsxs(n.Item,{onSelect:()=>{},children:[e.jsx("span",{className:"flex-1 truncate",children:"Long thread title that is going to be clipped off"}),e.jsx(n.ItemActions,{children:e.jsx(n.ItemAction,{onClick:()=>{},children:e.jsx(g,{})})})]})]})]});r.parameters={docs:{source:{code:`<Menu.Content>
  <Menu.Item onSelect={handleSelect}>
    <span className="flex-1 truncate">Sample thread title</span>
    <Menu.ItemActions>
      <Menu.ItemAction>
        <Edit />
      </Menu.ItemAction>
      <Menu.ItemAction>
        <Delete />
      </Menu.ItemAction>
    </Menu.ItemActions>
  </Menu.Item>
  ...
</Menu.Content>`}}};const m=()=>e.jsxs(n,{children:[e.jsx(n.Trigger,{children:e.jsxs(c,{color:"primary",size:"lg",variant:"ghost",children:["Options ",e.jsx(M,{})]})}),e.jsxs(n.Content,{minWidth:180,children:[e.jsx(n.Item,{onSelect:()=>{},children:"Edit"}),e.jsx(n.Item,{onSelect:()=>{},children:"Duplicate"}),e.jsx(n.Separator,{}),e.jsxs(n.Sub,{children:[e.jsx(n.SubTrigger,{children:"More"}),e.jsxs(n.SubContent,{children:[e.jsx(n.Item,{onSelect:()=>{},children:"Move to project…"}),e.jsx(n.Item,{onSelect:()=>{},children:"Move to folder…"}),e.jsx(n.Separator,{}),e.jsx(n.Item,{onSelect:()=>{},children:"Advanced options…"})]})]}),e.jsx(n.Separator,{}),e.jsx(n.Item,{onSelect:()=>{},children:"Share"}),e.jsx(n.Item,{onSelect:()=>{},children:"Add to favorites"}),e.jsx(n.Separator,{}),e.jsx(n.Item,{onSelect:()=>{},children:"Delete"})]})]}),i=o=>{const[d,l]=V.useState({showGrid:!0,showLabels:!1,enableShadows:!1});return e.jsxs(n,{children:[e.jsx(n.Trigger,{children:e.jsxs(c,{variant:"ghost",color:"primary",children:["Checkbox menu ",e.jsx(M,{})]})}),e.jsxs(n.Content,{minWidth:200,children:[e.jsx(n.CheckboxItem,{checked:d.showGrid,onCheckedChange:t=>l(u=>({...u,showGrid:t})),onSelect:t=>t.preventDefault(),indicatorPosition:o.indicatorPosition,indicatorVariant:o.indicatorVariant,children:"Show grid lines"}),e.jsx(n.CheckboxItem,{checked:d.showLabels,onCheckedChange:t=>l(u=>({...u,showLabels:t})),onSelect:t=>t.preventDefault(),indicatorPosition:o.indicatorPosition,indicatorVariant:o.indicatorVariant,children:"Display labels"}),e.jsx(n.CheckboxItem,{checked:d.enableShadows,onCheckedChange:t=>l(u=>({...u,enableShadows:t})),onSelect:t=>t.preventDefault(),indicatorPosition:o.indicatorPosition,indicatorVariant:o.indicatorVariant,children:"Enable shadows"})]})]})};i.args={indicatorPosition:"end",indicatorVariant:"solid"};i.argTypes={indicatorPosition:{control:"select",options:["start","end"]},indicatorVariant:{control:"select",options:["solid","ghost"]}};i.parameters={controls:{include:["indicatorPosition","indicatorVariant"]},docs:{source:{code:`const [settings, setSettings] = useState({
  showGrid: true,
  showLabels: false,
  enableShadows: false,
})

return (
  <Menu>
    <Menu.Trigger>
      <Button variant="ghost" color="primary">
        Checkbox menu <ChevronDown />
      </Button>
    </Menu.Trigger>
    <Menu.Content minWidth={200}>
      <Menu.CheckboxItem
        checked={settings.showGrid}
        onCheckedChange={(checked) => setSettings((s) => ({ ...s, showGrid: checked }))}
        onSelect={(evt) => evt.preventDefault()}
        indicatorPosition="end"
        indicatorVariant="filled"
      >
        Show grid lines
      </Menu.CheckboxItem>
      <Menu.CheckboxItem
        checked={settings.showLabels}
        onCheckedChange={(checked) => setSettings((s) => ({ ...s, showLabels: checked }))}
        onSelect={(evt) => evt.preventDefault()}
        indicatorPosition="end"
        indicatorVariant="filled"
      >
        Display labels
      </Menu.CheckboxItem>
      <Menu.CheckboxItem
        checked={settings.enableShadows}
        onCheckedChange={(checked) => setSettings((s) => ({ ...s, enableShadows: checked }))}
        onSelect={(evt) => evt.preventDefault()}
        indicatorPosition="end"
        indicatorVariant="filled"
      >
        Enable shadows
      </Menu.CheckboxItem>
    </Menu.Content>
  </Menu>
)`}}};const s=o=>{const[d,l]=V.useState("any");return e.jsxs(n,{children:[e.jsx(n.Trigger,{children:e.jsxs(c,{color:"primary",variant:"ghost",children:["Radio menu ",e.jsx(M,{})]})}),e.jsx(n.Content,{align:"start",minWidth:"auto",width:"auto",children:e.jsxs(n.RadioGroup,{indicatorPosition:o.indicatorPosition,value:d,onChange:l,children:[e.jsx(n.RadioItem,{value:"any",children:"Any time"}),e.jsx(n.RadioItem,{value:"today",disabled:!0,children:"Today"}),e.jsx(n.RadioItem,{value:"last7d",children:"Last 7 days"}),e.jsx(n.RadioItem,{value:"last30d",children:"Last 30 days"}),e.jsx(n.RadioItem,{value:"last3m",children:"Last 3 months"})]})})]})};s.args={indicatorPosition:"end"};s.argTypes={indicatorPosition:{control:"select",options:["start","end"]}};s.parameters={controls:{include:["indicatorPosition"]},docs:{source:{code:`<Menu>
  <Menu.Trigger>
    <Button color="primary" variant="ghost">
      Radio menu <ChevronDown />
    </Button>
  </Menu.Trigger>
  <Menu.Content align="start" minWidth="auto" width="auto">
    <Menu.RadioGroup
      indicatorPosition="end"
      value={value}
      onChange={setValue}
    >
      <Menu.RadioItem value="any">Any time</Menu.RadioItem>
      <Menu.RadioItem value="today">Today</Menu.RadioItem>
      <Menu.RadioItem value="last7d">Last 7 days</Menu.RadioItem>
      <Menu.RadioItem value="last30d">Last 30 days</Menu.RadioItem>
      <Menu.RadioItem value="last3m">Last 3 months</Menu.RadioItem>
    </Menu.RadioGroup>
  </Menu.Content>
</Menu>`}}};var p,I,S;h.parameters={...h.parameters,docs:{...(p=h.parameters)==null?void 0:p.docs,source:{originalSource:`() => <Menu>
    <Menu.Trigger>
      <Button color="primary" size="lg" variant="ghost">
        Sample menu <ChevronDown />
      </Button>
    </Menu.Trigger>
    <Menu.Content width={210} minWidth={210}>
      <Menu.Item>
        <p className="font-semibold">Sam Smith</p>
        <p className="text-secondary">sam.smith@gmail.com</p>
      </Menu.Item>
      <Menu.Separator />
      <Menu.Link href="/settings">Your profile</Menu.Link>
      <Menu.Link href="https://openai.com/policies/">Terms & policies</Menu.Link>
      <Menu.Item disabled onSelect={() => {}}>
        Feature flags
      </Menu.Item>
      <Menu.Separator />
      <Menu.Item onSelect={() => {}}>Logout</Menu.Item>
    </Menu.Content>
  </Menu>`,...(S=(I=h.parameters)==null?void 0:I.docs)==null?void 0:S.source}}};var x,j,C;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`() => <Menu>
    <Menu.Trigger>
      <Button color="primary" size="lg" variant="ghost" className="font-semibold gap-1.5">
        <Tools /> Tools
      </Button>
    </Menu.Trigger>
    <Menu.Content minWidth="auto">
      <Menu.Item onSelect={() => {}}>
        <Functions height={18} width={18} /> Function
      </Menu.Item>
      <Menu.Item onSelect={() => {}}>
        <Search height={18} width={18} /> File Search
      </Menu.Item>
      <Menu.Item onSelect={() => {}}>
        <Globe height={18} width={18} /> Web Search
      </Menu.Item>
      <Menu.Item onSelect={() => {}}>
        <Code height={18} width={18} /> Code Interpreter
      </Menu.Item>
      <Menu.Item onSelect={() => {}}>
        <ImageSquare height={18} width={18} /> Image Generation
      </Menu.Item>
    </Menu.Content>
  </Menu>`,...(C=(j=a.parameters)==null?void 0:j.docs)==null?void 0:C.source}}};var b,v,k;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`() => <Menu>
    <Menu.Trigger>
      <Button color="primary" size="lg" variant="ghost" className="font-semibold gap-1.5">
        <History /> Conversations
      </Button>
    </Menu.Trigger>
    <Menu.Content width={270}>
      <Menu.Item onSelect={() => {}}>
        <span className="flex-1 truncate">Sample thread title</span>
        <Menu.ItemActions>
          <Menu.ItemAction onClick={() => {}}>
            <Trash />
          </Menu.ItemAction>
        </Menu.ItemActions>
      </Menu.Item>
      <Menu.Item onSelect={() => {}}>
        <span className="flex-1 truncate">Another sample thread title</span>
        <Menu.ItemActions>
          <Menu.ItemAction onClick={() => {}}>
            <Trash />
          </Menu.ItemAction>
        </Menu.ItemActions>
      </Menu.Item>
      <Menu.Item onSelect={() => {}}>
        <span className="flex-1 truncate">Long thread title that is going to be clipped off</span>
        <Menu.ItemActions>
          <Menu.ItemAction onClick={() => {}}>
            <Trash />
          </Menu.ItemAction>
        </Menu.ItemActions>
      </Menu.Item>
    </Menu.Content>
  </Menu>`,...(k=(v=r.parameters)==null?void 0:v.docs)==null?void 0:k.source}}};var w,f,y;m.parameters={...m.parameters,docs:{...(w=m.parameters)==null?void 0:w.docs,source:{originalSource:`() => <Menu>
    <Menu.Trigger>
      <Button color="primary" size="lg" variant="ghost">
        Options <ChevronDown />
      </Button>
    </Menu.Trigger>
    <Menu.Content minWidth={180}>
      <Menu.Item onSelect={() => {}}>Edit</Menu.Item>
      <Menu.Item onSelect={() => {}}>Duplicate</Menu.Item>
      <Menu.Separator />
      <Menu.Sub>
        <Menu.SubTrigger>More</Menu.SubTrigger>
        <Menu.SubContent>
          <Menu.Item onSelect={() => {}}>Move to project…</Menu.Item>
          <Menu.Item onSelect={() => {}}>Move to folder…</Menu.Item>
          <Menu.Separator />
          <Menu.Item onSelect={() => {}}>Advanced options…</Menu.Item>
        </Menu.SubContent>
      </Menu.Sub>
      <Menu.Separator />
      <Menu.Item onSelect={() => {}}>Share</Menu.Item>
      <Menu.Item onSelect={() => {}}>Add to favorites</Menu.Item>
      <Menu.Separator />
      <Menu.Item onSelect={() => {}}>Delete</Menu.Item>
    </Menu.Content>
  </Menu>`,...(y=(f=m.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var T,R,A;i.parameters={...i.parameters,docs:{...(T=i.parameters)==null?void 0:T.docs,source:{originalSource:`(args: MenuCheckboxStoryArgs) => {
  const [settings, setSettings] = useState({
    showGrid: true,
    showLabels: false,
    enableShadows: false
  });
  return <Menu>
      <Menu.Trigger>
        <Button variant="ghost" color="primary">
          Checkbox menu <ChevronDown />
        </Button>
      </Menu.Trigger>
      <Menu.Content minWidth={200}>
        <Menu.CheckboxItem checked={settings.showGrid} onCheckedChange={checked => setSettings(s => ({
        ...s,
        showGrid: checked
      }))} onSelect={evt => evt.preventDefault()} indicatorPosition={args.indicatorPosition} indicatorVariant={args.indicatorVariant}>
          Show grid lines
        </Menu.CheckboxItem>
        <Menu.CheckboxItem checked={settings.showLabels} onCheckedChange={checked => setSettings(s => ({
        ...s,
        showLabels: checked
      }))} onSelect={evt => evt.preventDefault()} indicatorPosition={args.indicatorPosition} indicatorVariant={args.indicatorVariant}>
          Display labels
        </Menu.CheckboxItem>
        <Menu.CheckboxItem checked={settings.enableShadows} onCheckedChange={checked => setSettings(s => ({
        ...s,
        enableShadows: checked
      }))} onSelect={evt => evt.preventDefault()} indicatorPosition={args.indicatorPosition} indicatorVariant={args.indicatorVariant}>
          Enable shadows
        </Menu.CheckboxItem>
      </Menu.Content>
    </Menu>;
}`,...(A=(R=i.parameters)==null?void 0:R.docs)==null?void 0:A.source}}};var L,P,D;s.parameters={...s.parameters,docs:{...(L=s.parameters)==null?void 0:L.docs,source:{originalSource:`(args: MenuRadioGroupProps<string>) => {
  const [value, setValue] = useState("any");
  return <Menu>
      <Menu.Trigger>
        <Button color="primary" variant="ghost">
          Radio menu <ChevronDown />
        </Button>
      </Menu.Trigger>
      <Menu.Content align="start" minWidth="auto" width="auto">
        <Menu.RadioGroup indicatorPosition={args.indicatorPosition} value={value} onChange={setValue}>
          <Menu.RadioItem value="any">Any time</Menu.RadioItem>
          <Menu.RadioItem value="today" disabled>
            Today
          </Menu.RadioItem>
          <Menu.RadioItem value="last7d">Last 7 days</Menu.RadioItem>
          <Menu.RadioItem value="last30d">Last 30 days</Menu.RadioItem>
          <Menu.RadioItem value="last3m">Last 3 months</Menu.RadioItem>
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu>;
}`,...(D=(P=s.parameters)==null?void 0:P.docs)==null?void 0:D.source}}};const O=["Base","NaturalSizing","ItemActions","WithSubmenu","WithCheckboxes","WithRadioItems"],U=Object.freeze(Object.defineProperty({__proto__:null,Base:h,ItemActions:r,NaturalSizing:a,WithCheckboxes:i,WithRadioItems:s,WithSubmenu:m,__namedExportsOrder:O,default:_},Symbol.toStringTag,{value:"Module"}));export{h as B,r as I,U as M,a as N,m as W,i as a,s as b};
