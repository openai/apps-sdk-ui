import{j as o}from"./jsx-runtime-D_zvdyIk.js";import{r as c}from"./index-CDlOlYQx.js";import"./index-BNAx77fs.js";import{T as a,B as l}from"./index-DZdtDvV8.js";const u={title:"Transitions/TransitionGroup",component:a},r=()=>{const[e,i]=c.useState(!0);return o.jsxs("div",{className:"w-[200px]",children:[o.jsx("div",{className:"w-[100px] mx-auto mb-6",children:o.jsx(l,{block:!0,color:"primary",variant:"outline",onClick:()=>i(!e),children:e?"Hide":"Show"})}),o.jsx("div",{className:"h-[200px]",children:o.jsx(a,{className:"storybook-tg rounded-lg",enterDuration:2e3,exitDuration:1e3,children:e&&o.jsx("div",{className:"w-[200px] h-[200px] bg-gray-300 rounded-lg"},"s")})})]})};var s,t,n;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`() => {
  const [show, setShow] = useState(true);
  return <div className="w-[200px]">
      <div className="w-[100px] mx-auto mb-6">
        <Button block color="primary" variant="outline" onClick={() => setShow(!show)}>
          {show ? "Hide" : "Show"}
        </Button>
      </div>

      <div className="h-[200px]">
        <TransitionGroup className="storybook-tg rounded-lg" enterDuration={2000} exitDuration={1000}>
          {show && <div key="s" className="w-[200px] h-[200px] bg-gray-300 rounded-lg" />}
        </TransitionGroup>
      </div>
    </div>;
}`,...(n=(t=r.parameters)==null?void 0:t.docs)==null?void 0:n.source}}};const d=["Base"],w=Object.freeze(Object.defineProperty({__proto__:null,Base:r,__namedExportsOrder:d,default:u},Symbol.toStringTag,{value:"Module"}));export{r as B,w as T};
