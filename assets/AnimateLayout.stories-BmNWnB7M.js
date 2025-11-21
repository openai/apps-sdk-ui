import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{c as z}from"./clsx-B-dksMZM.js";import{r as n}from"./index-CDlOlYQx.js";import"./index-BNAx77fs.js";import{g as D,u as M}from"./index-vTu4Yset.js";import{T as i}from"./TextLink-_vsY4L_3.js";import{b as g,B as y}from"./index-DZdtDvV8.js";const U={title:"Transitions/AnimateLayout",component:g},c=()=>{const[r,o]=n.useState(!1);return e.jsxs("div",{className:"w-[450px] m-auto",children:[e.jsx("div",{className:"w-[100px] mx-auto mb-6",children:e.jsx(y,{block:!0,color:"primary",variant:"outline",onClick:()=>o(!r),children:r?"Hide":"Show"})}),e.jsx(s,{className:"w-full h-12"}),e.jsx(g,{transitionClassName:"pt-4",children:r&&e.jsx(a,{className:"w-full h-[80px]"},"box")}),e.jsx(s,{className:"w-full h-12 mt-4"})]})},d=()=>{const[r,o]=n.useState(!1);return e.jsxs("div",{children:[e.jsx("div",{className:"w-[100px] mx-auto mb-6",children:e.jsx(y,{block:!0,color:"primary",variant:"outline",onClick:()=>o(!r),children:r?"Hide":"Show"})}),e.jsxs("div",{className:"flex",children:[e.jsx(s,{className:"w-[200px] h-[200px]"}),e.jsx(g,{dimension:"width",transitionClassName:"pl-6",enter:{delay:200},layoutExit:{delay:75},children:r&&e.jsx(a,{className:"w-[200px] h-[200px]"},"box")}),e.jsx(s,{className:"w-[200px] h-[1200px00px] ml-6"})]})]})},m=()=>e.jsxs("div",{className:"max-w-[500px] m-auto",children:[e.jsx(l,{header:"Which model should I use?",children:e.jsxs("p",{children:["We recommend that developers use GPT-4o or GPT-4o mini for everyday tasks. GPT-4o generally performs better on a wide range of tasks, while GPT-4o mini is fast and inexpensive for simpler tasks. Our o1 reasoning models are ideal for complex, multi-step tasks and STEM use cases that require deep thinking about tough problems. We recommend experimenting with all of these models in the"," ",e.jsx(i,{underline:!0,color:"secondary",href:"#",children:"Playground"})," ","to explore which models provide the best price performance trade-off for your usage."]})}),e.jsx(l,{header:"Do you offer an enterprise package or SLAs?",children:e.jsxs("p",{children:["We offer different tiers of access to our enterprise customers that include SLAs, lower latency, and more. Please"," ",e.jsx(i,{underline:!0,color:"secondary",href:"#",children:"contact our sales team"})," ","to learn more."]})}),e.jsx(l,{header:"Will I be charged for API usage in the Playground?",children:e.jsx("p",{children:"Yes, we treat Playground usage the same as regular API usage. You will be billed at the per-token input and output prices mentioned above."})}),e.jsx(l,{header:"How will I know how many tokens I've used each month?",children:e.jsxs("p",{children:["A token is a mathematical representation of natural language. Log in to your account to view your"," ",e.jsx(i,{underline:!0,color:"secondary",href:"#",children:"usage tracking dashboard"})," ",". This dashboard will show you how many tokens you've used during the current and past billing cycles."]})}),e.jsxs(l,{header:"How can I manage my spending on the API platform?",children:[e.jsxs("p",{children:["You can set a monthly budget in"," ",e.jsx(i,{underline:!0,color:"secondary",href:"#",children:"your billing settings"}),", after which we'll stop serving your requests. There may be a delay in enforcing the limit, and you are responsible for any overage incurred. You can also configure an email notification threshold to receive an email alert once you cross that threshold each month. We recommend checking your"," ",e.jsx(i,{underline:!0,color:"secondary",href:"#",children:"usage tracking dashboard"})," ","regularly to monitor your spend."]}),e.jsx("p",{className:"mt-3",children:"For customers managing work with Projects, you can set and manage billing restrictions per project in the Dashboard."})]})]}),l=({header:r,children:o})=>{const[t,x]=n.useState(!1);return e.jsxs("div",{className:"border-0 border-b border-solid border-gray-150 hover:border-gray-350 overflow-hidden",style:{transition:"border-color .15s ease"},"data-state":t?"open":"closed",children:[e.jsxs("div",{className:"flex justify-between items-center pt-4 pb-3 cursor-pointer select-none",onClick:()=>x(!t),children:[e.jsx("div",{className:"font-[500]",children:r}),e.jsx("div",{className:"story-example-plus"})]}),e.jsx(g,{initial:{blur:0},enter:{y:0,delay:150,duration:450},exit:{y:-8,blur:2},layoutEnter:{duration:350},layoutExit:{duration:300},children:t&&e.jsx("div",{className:"pb-4 text-secondary text-[15px] leading-[1.6]",children:o},"content")}),e.jsx("div",{className:"mt-1"})]})},u=()=>e.jsx("div",{children:"Realtime playground controls, toggle to reveal more"}),h=()=>e.jsx("div",{children:"Form stuff here, submit button shows error fields"}),p=()=>{const[r,o]=n.useState(!1),[t,x]=n.useState(!1),q=()=>{if(!r){o(!0);return}x(!0),window.setTimeout(()=>{x(!1),o(!1)},800)};return e.jsx(y,{color:r?"danger":"primary",size:"xl",iconSize:"lg",onClick:q,loading:t,children:e.jsx(g,{dimension:"width",transitionClassName:"h-full flex items-center gap-2",children:r?e.jsx(D,{},"recording"):e.jsxs(n.Fragment,{children:[e.jsx(M,{})," Talk"]},"record")})})},s=({className:r,...o})=>e.jsx("div",{className:z("story-example-secondary rounded-lg",r),...o}),a=({className:r,...o})=>e.jsx("div",{className:z("story-example-primary rounded-lg shadow-xl",r),...o});var f,w,b;c.parameters={...c.parameters,docs:{...(f=c.parameters)==null?void 0:f.docs,source:{originalSource:`() => {
  const [show, setShow] = useState(false);
  return <div className="w-[450px] m-auto">
      <div className="w-[100px] mx-auto mb-6">
        <Button block color="primary" variant="outline" onClick={() => setShow(!show)}>
          {show ? "Hide" : "Show"}
        </Button>
      </div>
      <Secondary className="w-full h-12" />
      <AnimateLayout transitionClassName="pt-4">
        {show && <Primary key="box" className="w-full h-[80px]" />}
      </AnimateLayout>
      <Secondary className="w-full h-12 mt-4" />
    </div>;
}`,...(b=(w=c.parameters)==null?void 0:w.docs)==null?void 0:b.source}}};var v,k,j;d.parameters={...d.parameters,docs:{...(v=d.parameters)==null?void 0:v.docs,source:{originalSource:`() => {
  const [show, setShow] = useState(false);
  return <div>
      <div className="w-[100px] mx-auto mb-6">
        <Button block color="primary" variant="outline" onClick={() => setShow(!show)}>
          {show ? "Hide" : "Show"}
        </Button>
      </div>
      <div className="flex">
        <Secondary className="w-[200px] h-[200px]" />
        <AnimateLayout dimension="width" transitionClassName="pl-6" enter={{
        delay: 200
      }} layoutExit={{
        delay: 75
      }}>
          {show && <Primary key="box" className="w-[200px] h-[200px]" />}
        </AnimateLayout>
        <Secondary className="w-[200px] h-[1200px00px] ml-6" />
      </div>
    </div>;
}`,...(j=(k=d.parameters)==null?void 0:k.docs)==null?void 0:j.source}}};var S,N,A;m.parameters={...m.parameters,docs:{...(S=m.parameters)==null?void 0:S.docs,source:{originalSource:`() => {
  return <div className="max-w-[500px] m-auto">
      <AccordionItem header="Which model should I use?">
        <p>
          We recommend that developers use GPT-4o or GPT-4o mini for everyday tasks. GPT-4o
          generally performs better on a wide range of tasks, while GPT-4o mini is fast and
          inexpensive for simpler tasks. Our o1 reasoning models are ideal for complex, multi-step
          tasks and STEM use cases that require deep thinking about tough problems. We recommend
          experimenting with all of these models in the{" "}
          <TextLink underline color="secondary" href="#">
            Playground
          </TextLink>{" "}
          to explore which models provide the best price performance trade-off for your usage.
        </p>
      </AccordionItem>
      <AccordionItem header="Do you offer an enterprise package or SLAs?">
        <p>
          We offer different tiers of access to our enterprise customers that include SLAs, lower
          latency, and more. Please{" "}
          <TextLink underline color="secondary" href="#">
            contact our sales team
          </TextLink>{" "}
          to learn more.
        </p>
      </AccordionItem>
      <AccordionItem header="Will I be charged for API usage in the Playground?">
        <p>
          Yes, we treat Playground usage the same as regular API usage. You will be billed at the
          per-token input and output prices mentioned above.
        </p>
      </AccordionItem>
      <AccordionItem header="How will I know how many tokens I've used each month?">
        <p>
          A token is a mathematical representation of natural language. Log in to your account to
          view your{" "}
          <TextLink underline color="secondary" href="#">
            usage tracking dashboard
          </TextLink>{" "}
          . This dashboard will show you how many tokens you've used during the current and past
          billing cycles.
        </p>
      </AccordionItem>
      <AccordionItem header="How can I manage my spending on the API platform?">
        <p>
          You can set a monthly budget in{" "}
          <TextLink underline color="secondary" href="#">
            your billing settings
          </TextLink>
          , after which we'll stop serving your requests. There may be a delay in enforcing the
          limit, and you are responsible for any overage incurred. You can also configure an email
          notification threshold to receive an email alert once you cross that threshold each month.
          We recommend checking your{" "}
          <TextLink underline color="secondary" href="#">
            usage tracking dashboard
          </TextLink>{" "}
          regularly to monitor your spend.
        </p>
        <p className="mt-3">
          For customers managing work with Projects, you can set and manage billing restrictions per
          project in the Dashboard.
        </p>
      </AccordionItem>
    </div>;
}`,...(A=(N=m.parameters)==null?void 0:N.docs)==null?void 0:A.source}}};var T,P,I;u.parameters={...u.parameters,docs:{...(T=u.parameters)==null?void 0:T.docs,source:{originalSource:`() => {
  return <div>Realtime playground controls, toggle to reveal more</div>;
}`,...(I=(P=u.parameters)==null?void 0:P.docs)==null?void 0:I.source}}};var L,C,W;h.parameters={...h.parameters,docs:{...(L=h.parameters)==null?void 0:L.docs,source:{originalSource:`() => {
  return <div>Form stuff here, submit button shows error fields</div>;
}`,...(W=(C=h.parameters)==null?void 0:C.docs)==null?void 0:W.source}}};var B,H,E;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`() => {
  const [recording, setRecording] = useState(false);
  const [sending, setSending] = useState(false);
  const handleClick = () => {
    if (!recording) {
      setRecording(true);
      return;
    }
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setRecording(false);
    }, 800);
  };
  return <Button color={recording ? "danger" : "primary"} size="xl" iconSize="lg" onClick={handleClick} loading={sending}>
      <AnimateLayout dimension="width" transitionClassName="h-full flex items-center gap-2">
        {recording ? <ArrowUp key="recording" /> : <Fragment key="record">
            <Wave /> Talk
          </Fragment>}
      </AnimateLayout>
    </Button>;
}`,...(E=(H=p.parameters)==null?void 0:H.docs)==null?void 0:E.source}}};var F,G,Y;s.parameters={...s.parameters,docs:{...(F=s.parameters)==null?void 0:F.docs,source:{originalSource:`({
  className,
  ...restProps
}: {
  className?: string;
}) => <div className={clsx("story-example-secondary rounded-lg", className)} {...restProps} />`,...(Y=(G=s.parameters)==null?void 0:G.docs)==null?void 0:Y.source}}};var R,O,_;a.parameters={...a.parameters,docs:{...(R=a.parameters)==null?void 0:R.docs,source:{originalSource:`({
  className,
  ...restProps
}: {
  className?: string;
}) => <div className={clsx("story-example-primary rounded-lg shadow-xl", className)} {...restProps} />`,...(_=(O=a.parameters)==null?void 0:O.docs)==null?void 0:_.source}}};const J=["SimpleHeight","SimpleWidth","Accordion","Controls","Form","TalkButton","Secondary","Primary"],re=Object.freeze(Object.defineProperty({__proto__:null,Accordion:m,Controls:u,Form:h,Primary:a,Secondary:s,SimpleHeight:c,SimpleWidth:d,TalkButton:p,__namedExportsOrder:J,default:U},Symbol.toStringTag,{value:"Module"}));export{re as A,c as S,p as T,d as a,m as b};
