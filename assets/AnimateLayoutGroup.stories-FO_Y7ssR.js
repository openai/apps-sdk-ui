import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{c as h}from"./clsx-B-dksMZM.js";import{r as N}from"./index-CDlOlYQx.js";import"./index-BNAx77fs.js";import{c as d,B as j}from"./index-DZdtDvV8.js";const S={title:"Transitions/AnimateLayoutGroup",component:d},i=()=>{const[s,t]=N.useState([]),c=n=>{t(a=>a.filter(l=>l.id!==n))};return e.jsxs("div",{children:[e.jsxs("div",{className:"text-center mb-6",children:[e.jsx(j,{color:"primary",className:"w-[100px]",variant:"outline",onClick:n=>{n.preventDefault(),t(a=>[...a,{id:Math.random().toString(36).substr(2,9)}])},children:"Add item"}),e.jsx("p",{className:"mt-2 opacity-50",children:"(Click to remove)"})]}),e.jsxs("div",{className:"w-[450px]",children:[e.jsx("div",{className:"py-2",children:e.jsx(o,{className:"h-[50px]"})}),e.jsx(d,{initial:{y:-10,opacity:0,blur:0},enter:{y:0,delay:150,duration:600},exit:{scale:.8,blur:10,duration:400},layoutEnter:{duration:400,timingFunction:"ease"},layoutExit:{delay:150},children:s.map(({id:n})=>e.jsx("div",{className:"py-2",children:e.jsx(L,{className:"h-[50px] cursor-pointer",onClick:()=>c(n)})},n))}),e.jsx("div",{className:"py-2",children:e.jsx(o,{className:"h-[50px]"})})]})]})},r=()=>{const[s,t]=N.useState([]),c=n=>{t(a=>a.filter(l=>l.id!==n))};return e.jsxs("div",{children:[e.jsxs("div",{className:"text-center mb-6",children:[e.jsx(j,{color:"primary",className:"w-[100px]",variant:"outline",onClick:n=>{n.preventDefault(),t(a=>[...a,{id:Math.random().toString(36).substr(2,9)}])},children:"Add item"}),e.jsx("p",{className:"mt-2 opacity-50",children:"(Click to remove)"})]}),e.jsxs("div",{className:"h-[120px] flex",children:[e.jsx("div",{className:"px-2",children:e.jsx(o,{className:"w-[80px] h-[80px]"})}),e.jsx(d,{dimension:"width",children:s.map(({id:n})=>e.jsx("div",{className:"px-2",children:e.jsx(L,{className:"w-[80px] h-[80px] cursor-pointer",onClick:()=>c(n)})},n))}),e.jsx("div",{className:"px-2",children:e.jsx(o,{className:"w-[80px] h-[80px]"})})]})]})},o=({className:s,...t})=>e.jsx("div",{className:h("story-example-secondary rounded-lg",s),...t}),L=({className:s,...t})=>e.jsx("div",{className:h("story-example-primary rounded-lg shadow-xl",s),...t});var m,p,x;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:`() => {
  const [list, setList] = useState<{
    id: string;
  }[]>([]);
  const handleRemove = (idToRemove: string) => {
    setList(c => c.filter(item => item.id !== idToRemove));
  };
  return <div>
      <div className="text-center mb-6">
        <Button color="primary" className="w-[100px]" variant="outline" onClick={evt => {
        evt.preventDefault();
        setList(current => [...current, {
          id: Math.random().toString(36).substr(2, 9)
        }]);
      }}>
          Add item
        </Button>
        <p className="mt-2 opacity-50">(Click to remove)</p>
      </div>
      <div className="w-[450px]">
        <div className="py-2">
          <Secondary className="h-[50px]" />
        </div>
        <AnimateLayoutGroup initial={{
        y: -10,
        opacity: 0,
        blur: 0
      }} enter={{
        y: 0,
        delay: 150,
        duration: 600
      }} exit={{
        scale: 0.8,
        blur: 10,
        duration: 400
      }} layoutEnter={{
        duration: 400,
        timingFunction: "ease"
      }} layoutExit={{
        delay: 150
      }}>
          {list.map(({
          id
        }) => <div className="py-2" key={id}>
              <Primary className="h-[50px] cursor-pointer" onClick={() => handleRemove(id)} />
            </div>)}
        </AnimateLayoutGroup>
        <div className="py-2">
          <Secondary className="h-[50px]" />
        </div>
      </div>
    </div>;
}`,...(x=(p=i.parameters)==null?void 0:p.docs)==null?void 0:x.source}}};var u,v,y;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`() => {
  const [list, setList] = useState<{
    id: string;
  }[]>([]);
  const handleRemove = (idToRemove: string) => {
    setList(c => c.filter(item => item.id !== idToRemove));
  };
  return <div>
      <div className="text-center mb-6">
        <Button color="primary" className="w-[100px]" variant="outline" onClick={evt => {
        evt.preventDefault();
        setList(current => [...current, {
          id: Math.random().toString(36).substr(2, 9)
        }]);
      }}>
          Add item
        </Button>
        <p className="mt-2 opacity-50">(Click to remove)</p>
      </div>
      <div className="h-[120px] flex">
        <div className="px-2">
          <Secondary className="w-[80px] h-[80px]" />
        </div>
        <AnimateLayoutGroup dimension="width">
          {list.map(({
          id
        }) => <div className="px-2" key={id}>
              <Primary className="w-[80px] h-[80px] cursor-pointer" onClick={() => handleRemove(id)} />
            </div>)}
        </AnimateLayoutGroup>
        <div className="px-2">
          <Secondary className="w-[80px] h-[80px]" />
        </div>
      </div>
    </div>;
}`,...(y=(v=r.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};const f=["VerticalList","HorizontalList"],C=Object.freeze(Object.defineProperty({__proto__:null,HorizontalList:r,VerticalList:i,__namedExportsOrder:f,default:S},Symbol.toStringTag,{value:"Module"}));export{C as A,r as H,i as V};
