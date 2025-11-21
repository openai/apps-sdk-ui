import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{c as b}from"./clsx-B-dksMZM.js";import{r as i}from"./index-CDlOlYQx.js";import"./index-f1W-XCGd.js";import{s as A,t as B}from"./index-vTu4Yset.js";import{A as c,B as l}from"./index-DSWOpmMK.js";const z={title:"Transitions/Animate",component:c},n=()=>{const[s,o]=i.useState(!0);return e.jsxs("div",{className:"w-[200px]",children:[e.jsx("div",{className:"w-[100px] mx-auto mb-6",children:e.jsx(l,{block:!0,color:"primary",variant:"outline",onClick:()=>o(!s),children:s?"Hide":"Show"})}),e.jsx(c,{className:"w-[200px] h-[200px]",children:s&&e.jsx(m,{className:"w-[200px] h-[200px]"},"s")})]})},t=()=>{const[s,o]=i.useState(!0);return e.jsxs("div",{className:"w-[200px]",children:[e.jsx("div",{className:"w-[100px] mx-auto mb-6",children:e.jsx(l,{block:!0,color:"primary",variant:"outline",onClick:()=>o(!s),children:s?"Hide":"Show"})}),e.jsx(c,{className:"w-[200px] h-[200px]",enter:{scale:1},exit:{scale:.5,blur:20},forceCompositeLayer:!0,children:s&&e.jsx(m,{className:"w-[200px] h-[200px]"},"s")})]})},a=()=>{const[s,o]=i.useState(!0);return e.jsxs("div",{className:"w-[200px]",children:[e.jsx("div",{className:"w-[100px] mx-auto mb-6",children:e.jsx(l,{block:!0,color:"primary",variant:"outline",onClick:()=>o(!s),children:s?"Hide":"Show"})}),e.jsx(c,{className:"w-[200px] h-[200px]",initial:{x:120,skewX:30},enter:{duration:800},exit:{x:-120,skewX:-8,duration:500},forceCompositeLayer:!0,children:s&&e.jsx(m,{className:"w-[200px] h-[200px]"},"s")})]})},r=()=>{const[s,o]=i.useState(!1),f=i.useRef(null),j=()=>{s||(o(!0),f.current=window.setTimeout(()=>{o(!1)},1300))};return e.jsx(l,{size:"2xl",iconSize:"xl",variant:"soft",color:"secondary",onClick:j,children:e.jsx(c,{className:"w-[var(--button-icon-size)] h-[var(--button-icon-size)]",enter:{scale:1,delay:150,duration:300},exit:{scale:.6,duration:150},forceCompositeLayer:!0,children:s?e.jsx(A,{},"copied-icon"):e.jsx(B,{},"copy-icon")})})},m=({className:s,...o})=>e.jsx("div",{className:b("story-example-primary rounded-lg shadow-xl",s),...o});var u,p,d;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`() => {
  const [show, setShow] = useState(true);
  return <div className="w-[200px]">
      <div className="w-[100px] mx-auto mb-6">
        <Button block color="primary" variant="outline" onClick={() => setShow(!show)}>
          {show ? "Hide" : "Show"}
        </Button>
      </div>

      <Animate className="w-[200px] h-[200px]">
        {show && <Primary key="s" className="w-[200px] h-[200px]" />}
      </Animate>
    </div>;
}`,...(d=(p=n.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var x,w,h;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`() => {
  const [show, setShow] = useState(true);
  return <div className="w-[200px]">
      <div className="w-[100px] mx-auto mb-6">
        <Button block color="primary" variant="outline" onClick={() => setShow(!show)}>
          {show ? "Hide" : "Show"}
        </Button>
      </div>

      <Animate className="w-[200px] h-[200px]" enter={{
      scale: 1
    }} exit={{
      scale: 0.5,
      blur: 20
    }} forceCompositeLayer>
        {show && <Primary key="s" className="w-[200px] h-[200px]" />}
      </Animate>
    </div>;
}`,...(h=(w=t.parameters)==null?void 0:w.docs)==null?void 0:h.source}}};var y,v,S;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`() => {
  const [show, setShow] = useState(true);
  return <div className="w-[200px]">
      <div className="w-[100px] mx-auto mb-6">
        <Button block color="primary" variant="outline" onClick={() => setShow(!show)}>
          {show ? "Hide" : "Show"}
        </Button>
      </div>

      <Animate className="w-[200px] h-[200px]" initial={{
      x: 120,
      skewX: 30
    }} enter={{
      duration: 800
    }} exit={{
      x: -120,
      skewX: -8,
      duration: 500
    }} forceCompositeLayer>
        {show && <Primary key="s" className="w-[200px] h-[200px]" />}
      </Animate>
    </div>;
}`,...(S=(v=a.parameters)==null?void 0:v.docs)==null?void 0:S.source}}};var C,k,N;r.parameters={...r.parameters,docs:{...(C=r.parameters)==null?void 0:C.docs,source:{originalSource:`() => {
  const [copied, setCopied] = useState(false);
  const copiedTimeout = useRef<number | null>(null);
  const handleClick = () => {
    // No-op when copied is true
    if (copied) {
      return;
    }
    setCopied(true);
    copiedTimeout.current = window.setTimeout(() => {
      setCopied(false);
    }, 1300);
  };
  return <Button size="2xl" iconSize="xl" variant="soft" color="secondary" onClick={handleClick}>
      <Animate className="w-[var(--button-icon-size)] h-[var(--button-icon-size)]" enter={{
      scale: 1,
      delay: 150,
      duration: 300
    }} exit={{
      scale: 0.6,
      duration: 150
    }} forceCompositeLayer>
        {copied ? <Check key="copied-icon" /> : <Copy key="copy-icon" />}
      </Animate>
    </Button>;
}`,...(N=(k=r.parameters)==null?void 0:k.docs)==null?void 0:N.source}}};const g=["Fade","Grow","Continuous","CrossFade"],X=Object.freeze(Object.defineProperty({__proto__:null,Continuous:a,CrossFade:r,Fade:n,Grow:t,__namedExportsOrder:g,default:z},Symbol.toStringTag,{value:"Module"}));export{X as A,a as C,n as F,t as G,r as a};
