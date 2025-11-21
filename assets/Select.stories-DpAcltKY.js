import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{r as p}from"./index-CDlOlYQx.js";import{P as R,o as k,U as I,p as L}from"./index-vTu4Yset.js";import{S as c}from"./index-BkZfx_Ho.js";const T={title:"Components/Select",component:c,args:{disabled:!1,loading:!1,pill:!1,clearable:!1,block:!0,multiple:!0},argTypes:{listMinWidth:{control:{type:"range",min:100,max:400,step:5}},listWidth:{control:{type:"range",min:100,max:400,step:5}},alignOffset:{control:{type:"range",min:0,max:40,step:1}},value:{control:!1},multiple:{control:!1},options:{control:!1},onChange:{control:!1},actions:{control:!1},searchEmptyMessage:{control:!1},searchPredicate:{control:!1},triggerClassName:{control:!1},TriggerView:{control:!1},OptionView:{control:!1},avoidCollisions:{table:{disable:!0}}}},s=e=>{const[l,a]=p.useState("");return t.jsx("div",{style:{width:200},children:t.jsx(c,{placeholder:"Select a fruit...",...e,multiple:!1,value:l,options:M,name:"fruits",onChange:o=>{a(o.value)}})})};s.parameters={docs:{source:{code:`
<Select
  value={fruit}
  options={fruits}
  onChange={handleChange}
  placeholder="Select a fruit..."
  variant="solid"
/>
  `}}};const r=()=>{const[e,l]=p.useState(()=>"");return t.jsx("div",{style:{width:150},children:t.jsx(c,{variant:"soft",value:e,block:!0,options:W,placeholder:"Select...",align:"start",listMinWidth:240,onChange:a=>l(a.value),triggerClassName:"font-semibold",actions:[{id:"create",label:"Create project",Icon:R,onSelect:()=>{}},{id:"overview",label:"Organization overview",Icon:k,onSelect:()=>{}}]})})};r.parameters={docs:{source:{code:`
<Select
  value={value}
  onChange={handleChange}
  options={items}
  placeholder="Select..."
  align="start"
  listMinWidth={240}
  triggerClassName="font-semibold"
  actions={[
    {
      id: "create",
      label: "Create project",
      Icon: Plus,
      onSelect: () => {},
    },
    {
      id: "overview",
      label: "Organization overview",
      Icon: Workspace,
      onSelect: () => {},
    },
  ]}
/>`}}};const i=()=>{const[e,l]=p.useState("reader");return t.jsx("div",{style:{width:200},children:t.jsx(c,{value:e,options:z,placeholder:"Select role...",align:"start",listMinWidth:260,variant:"ghost",size:"lg",onChange:({value:a})=>l(a),TriggerStartIcon:e==="owner"?I:L,triggerClassName:"font-semibold",optionClassName:"font-semibold"})})};i.parameters={docs:{source:{code:`
const RoleOptionDescription = ({ children }: { children: React.ReactNode }) => (
  <div className="font-normal text-secondary py-px text-[0.935em] leading-[1.45]">
    {children}
  </div>
);

const roles: Role[] = [
  {
    value: "owner",
    label: "Owner",
    description: (
      <RoleOptionDescription>
        Can modify project information and manage project members
      </RoleOptionDescription>
    ),
  },
  {
    value: "reader",
    label: "Reader",
    description: (
      <RoleOptionDescription>
        Can make API requests that read or modify data
      </RoleOptionDescription>
    ),
  },
];

const CustomSelect = () => (
  <Select
    value={role}
    options={roles}
    placeholder="Select role..."
    align="start"
    listMinWidth={260}
    variant="ghost"
    size="lg"
    onChange={({ value }) => setRole(value)}
    TriggerStartIcon={role === "owner" ? UserLock : User}
    triggerClassName="font-semibold"
    optionClassName="font-semibold"
  />
)
`}}};const n=()=>{const[e,l]=p.useState(()=>W[0].value);return t.jsx("div",{style:{width:200},children:t.jsx(c,{variant:"outline",value:e,side:"bottom",size:"lg",options:P,listMinWidth:300,searchPlaceholder:"Select a model...",clearable:!0,onChange:a=>{const o=a.value;l(o)}})})};n.parameters={docs:{source:{code:`
const groupedItems = [
  {
    label: "Models",
    options: [
      ...
    ],
    // Custom limits
    optionsLimit: {
      limit: 7,
      label: "Show all models",
    },
  },
  {
    label: "Fine-tunes",
    options: [
      ...
    ],
    // Default
    optionsLimit: {
      limit: 100,
      label: "Show all",
    },
  },
];

const GroupedOptions = () => {
  const [value, setValue] = useState<string>("");

  return (
    <Select
      value={value}
      options={groupedItems}
      onChange={(v) => setValue(v.value)}
      variant="outline"
      size="lg"
      side="bottom"
      listMinWidth={300}
      searchPlaceholder="Select a model..."
      clearable
    />
  );
};`}}};const N=({values:e,selectedAll:l})=>{const a=l?"All fruits":e.length===1?e[0].label:`${e.length} fruits`;return t.jsx(t.Fragment,{children:a})},u=()=>{const[e,l]=p.useState([]);return t.jsx("div",{style:{width:200},children:t.jsx(c,{variant:"soft",placeholder:"Select fruits...",options:M,name:"fruits",multiple:!0,clearable:!0,value:e,onChange:a=>{l(a.map(({value:o})=>o))},TriggerView:N})})};u.parameters={docs:{source:{code:`
const MultiFruitTriggerView = ({
  values,
  selectedAll,
}: {
  values: { label: string }[];
  selectedAll: boolean;
}) => {
  const displayValue = selectedAll
    ? "All fruits"
    : values.length === 1
    ? values[0].label
    : \`\${values.length} fruits\`;

  return <>{displayValue}</>;
};

const MultiFruitSelect = () => {
  const [fruits, setFruits] = useState<string[]>([]);

  return (
    <Select
      variant="solid"
      placeholder="Select fruits..."
      options={fruitsOptions}
      name="fruits"
      multiple
      clearable
      value={fruits}
      onChange={(values) => {
          setFruits(values.map(({ value }) => value));
      }}
      TriggerView={MultiFruitTriggerView}
    />
  );
};`}}};const M=[{label:"Apple",value:"apple"},{label:"Banana",value:"banana"},{label:"Blueberry",value:"blueberry"},{label:"Grapes",value:"grapes"},{label:"Mango",value:"mango"},{label:"Pineapple",value:"pineapple"},{label:"Watermelon",value:"watermelon"}],W=[{label:"List item 1",value:"1"},{label:"List item 2",value:"2"},{label:"List item 3",value:"3",disabled:!0},{label:"List item 4",value:"4"},{label:"List item 5",value:"5"},{label:"List item 6",value:"6"},{label:"List item 7",value:"7"},{label:"List item 8",value:"8"}],P=[{label:"Models",options:[{label:"gpt-4o",value:"1",tooltip:{content:"Our high-intelligence flagship model for complex, multi‑step tasks",maxWidth:248}},{label:"gpt-4o-mini",value:"1o",tooltip:{content:"Our affordable and intelligent small model for fast, lightweight tasks",maxWidth:248}},{label:"gpt-4-turbo",value:"2"},{label:"gpt-4-32k",value:"3"},{label:"gpt-4",value:"4"},{label:"gpt-3.5-turbo-16k",value:"5"},{label:"gpt-3.5-turbo-0125",value:"6"},{label:"gpt-3.5-turbo",value:"7"},{label:"gpt-4a",value:"4a"},{label:"gpt-4b",value:"4b"},{label:"gpt-4c",value:"4c"},{label:"gpt-4d",value:"4d"},{label:"gpt-4e",value:"4e"},{label:"gpt-4f",value:"4f"},{label:"gpt-4g",value:"4g"},{label:"gpt-4h",value:"4h"},{label:"gpt-4-omega",value:"4omega"},{label:"gpt-4-ultra",value:"4ultra"}],optionsLimit:{limit:7,label:"Show all models"}},{label:"Fine-tunes",options:[{label:"ft:gpt-3.5-turbo-0125-alpha:openai::8nu8CTNj",value:"ft1"},{label:"ft:gpt-3.5-turbo-0125-alpha:openai::8oz5FXdb",value:"ft2"},{label:"ft:gpt-3.5-turbo-0125-alpha:openai::8ozVmSUp",value:"ft3"},{label:"ft:gpt-3.5-turbo-0125-alpha:openai::8pMlpiKm",value:"ft4"},{label:"ft:gpt-3.5-turbo-0125:openai",value:"ft5"}],optionsLimit:{limit:100,label:"Show all"}}],d=({children:e})=>t.jsx("div",{className:"font-normal text-secondary py-px text-[0.935em] leading-[1.45]",children:e}),z=[{value:"owner",label:"Owner",description:t.jsx(d,{children:"Can modify project information and manage project members"})},{value:"reader",label:"Reader",description:t.jsx(d,{children:"Can make API requests that read or modify data"})}];var m,g,v;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`(args: Omit<SelectProps<Option>, "multiple" | "value" | "onChange" | "TriggerView">) => {
  const [fruit, setFruit] = useState<string>("");
  return <div style={{
    width: 200
  }}>
      <Select placeholder="Select a fruit..." {...args} multiple={false} value={fruit} options={fruitsOptions} name="fruits" onChange={params => {
      setFruit(params.value);
    }} />
    </div>;
}`,...(v=(g=s.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};var b,h,f;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`() => {
  const [value, setValue] = useState<string>(() => "");
  return <div style={{
    width: 150
  }}>
      <Select variant="soft" value={value} block options={items} placeholder="Select..." align="start" listMinWidth={240} onChange={v => setValue(v.value)} triggerClassName="font-semibold" actions={[{
      id: "create",
      label: "Create project",
      Icon: Plus,
      onSelect: () => {}
    }, {
      id: "overview",
      label: "Organization overview",
      Icon: Workspace,
      onSelect: () => {}
    }]} />
    </div>;
}`,...(f=(h=r.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var S,C,w;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`() => {
  const [role, setRole] = useState<string>("reader");
  return <div style={{
    width: 200
  }}>
      <Select value={role} options={roles} placeholder="Select role..." align="start" listMinWidth={260} variant="ghost" size="lg" onChange={({
      value
    }) => setRole(value)} TriggerStartIcon={role === "owner" ? UserLock : User} triggerClassName="font-semibold" optionClassName="font-semibold" />
    </div>;
}`,...(w=(C=i.parameters)==null?void 0:C.docs)==null?void 0:w.source}}};var x,y,O;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`() => {
  const [valueFour, setValueFour] = useState<string>(() => items[0].value);
  return <div style={{
    width: 200
  }}>
      <Select variant="outline" value={valueFour} side="bottom" size="lg" options={groupedItems} listMinWidth={300} searchPlaceholder="Select a model..." clearable onChange={v => {
      const val = v.value;
      if (!val) {
        setValueFour(val);
      } else {
        setValueFour(val);
      }
    }} />
    </div>;
}`,...(O=(y=n.parameters)==null?void 0:y.docs)==null?void 0:O.source}}};var j,V,F;u.parameters={...u.parameters,docs:{...(j=u.parameters)==null?void 0:j.docs,source:{originalSource:`() => {
  const [fruits, setFruits] = useState<string[]>([]);
  return <div style={{
    width: 200
  }}>
      <Select variant="soft" placeholder="Select fruits..." options={fruitsOptions} name="fruits" multiple clearable value={fruits} onChange={values => {
      setFruits(values.map(({
        value
      }) => value));
    }} TriggerView={MultiFruitTriggerView} />
    </div>;
}`,...(F=(V=u.parameters)==null?void 0:V.docs)==null?void 0:F.source}}};const A=["Base","Actions","CustomViews","GroupedOptions","MultiSelect"],G=Object.freeze(Object.defineProperty({__proto__:null,Actions:r,Base:s,CustomViews:i,GroupedOptions:n,MultiSelect:u,__namedExportsOrder:A,default:T},Symbol.toStringTag,{value:"Module"}));export{r as A,s as B,i as C,n as G,u as M,G as S};
