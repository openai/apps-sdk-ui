import{j as o}from"./jsx-runtime-D_zvdyIk.js";import{r as l}from"./index-CDlOlYQx.js";import"./index-f1W-XCGd.js";import{S as a,B as c}from"./index-DSWOpmMK.js";const u={title:"Transitions/SlotTransitionGroup",component:a},t=()=>{const[r,i]=l.useState(!0);return o.jsxs("div",{className:"w-[200px]",children:[o.jsx("div",{className:"w-[100px] mx-auto mb-6",children:o.jsx(c,{block:!0,color:"primary",variant:"outline",onClick:()=>i(!r),children:r?"Hide":"Show"})}),o.jsx("div",{className:"h-[200px]",children:o.jsx(a,{enterDuration:2e3,exitDuration:1e3,children:r&&o.jsx("div",{className:"w-[200px] h-[200px] bg-gray-300 rounded-lg storybook-tg"},"s")})})]})};var e,s,n;t.parameters={...t.parameters,docs:{...(e=t.parameters)==null?void 0:e.docs,source:{originalSource:`() => {
  const [show, setShow] = useState(true);
  return <div className="w-[200px]">
      <div className="w-[100px] mx-auto mb-6">
        <Button block color="primary" variant="outline" onClick={() => setShow(!show)}>
          {show ? "Hide" : "Show"}
        </Button>
      </div>

      <div className="h-[200px]">
        <SlotTransitionGroup enterDuration={2000} exitDuration={1000}>
          {show && <div key="s" className="w-[200px] h-[200px] bg-gray-300 rounded-lg storybook-tg" />}
        </SlotTransitionGroup>
      </div>
    </div>;
}`,...(n=(s=t.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const p=["Base"],S=Object.freeze(Object.defineProperty({__proto__:null,Base:t,__namedExportsOrder:p,default:u},Symbol.toStringTag,{value:"Module"}));export{t as B,S};
