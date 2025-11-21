import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as N}from"./index-CDlOlYQx.js";import{W as S,L as j,a as z}from"./index-vTu4Yset.js";import{S as w}from"./index-BkZfx_Ho.js";import"./clsx-B-dksMZM.js";import"./useEscCloseStack-D1Z2m5Rr.js";import"./index-DpDpMmvd.js";import"./index-BGZCjPBa.js";import"./index-CA2ozmjx.js";import"./index-CAX21tL8.js";import"./index-Bo7e4fPN.js";import"./useLatestValue-DL0UuayD.js";import"./helpers-f26tJ_7u.js";import"./index-C2jLX_4z.js";import"./index-Bf2qc8Rt.js";import"./index-C9ZQDE51.js";import"./index-BNAx77fs.js";import"./index-DZdtDvV8.js";import"./renderHelpers-DMqZrfTK.js";import"./internal-DlOBqL0c.js";import"./AppsSDKUIContext-M1LWlfJD.js";import"./index-D7F-HZ0J.js";import"./index-K5-zvULe.js";import"./copyToClipboard-B2drfy3h.js";import"./index-5083RxDK.js";import"./index-CXgy4vRa.js";import"./index-DvP4gEHi.js";import"./index-C-_BHfSz.js";const se={title:"Foundations/Typography",component:()=>null},n=()=>e.jsxs(e.Fragment,{children:[e.jsx("h5",{className:"text-secondary mb-1",children:"Get started"}),e.jsx("h2",{className:"heading-xl mb-3",children:"Building your first app"}),e.jsx("p",{className:"text-md",children:"Inline cards in Apps SDK UI keep copy short and actionable. Provide just enough context for the task, then pair it with a clear next step."})]}),i=()=>e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"font-normal",children:"font-normal"}),e.jsx("p",{className:"font-medium",children:"font-medium"}),e.jsx("p",{className:"font-semibold",children:"font-semibold"}),e.jsx("p",{className:"font-bold",children:"font-bold"})]}),r=()=>e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"text-default",children:"text-default"}),e.jsx("p",{className:"text-secondary",children:"text-secondary"}),e.jsx("p",{className:"text-tertiary",children:"text-tertiary"})]}),k=[{label:"text-3xs",value:"3xs"},{label:"text-2xs",value:"2xs"},{label:"text-xs",value:"xs"},{label:"text-sm",value:"sm"},{label:"text-md",value:"md"},{label:"text-lg",value:"lg"}],I={lg:24,md:18,sm:18,xs:16,"2xs":14,"3xs":12},a=()=>{const[s,b]=N.useState("md"),t=I[s]??20;return e.jsxs("div",{style:{maxWidth:560},children:[e.jsx("div",{className:"mb-6 max-w-[120px]",children:e.jsx(w,{block:!0,value:s,options:k,onChange:v=>b(v.value),placeholder:"Font size"})}),e.jsxs("div",{style:{fontSize:`var(--font-text-${s}-size)`,lineHeight:`var(--font-text-${s}-line-height)`,letterSpacing:`var(--font-text-${s}-tracking)`},children:[e.jsx("div",{className:"mb-8",children:e.jsxs("div",{children:[e.jsx("p",{className:"text-secondary mb-2",children:"Prose"}),e.jsx("p",{children:"Typography is the silent art that shapes how we experience written language. Beyond mere letters, it orchestrates rhythm, hierarchy, and emotion—guiding the reader’s eye and setting the tone before a single word is read. The beauty of typography lies in its subtlety: the careful balance of space and form, the harmony between font size and line height, and the way thoughtfully chosen type can make content feel effortless, inviting, and human. When typography is done well, it disappears, letting the message shine—yet its influence is always felt, elevating both clarity and aesthetic pleasure."})]})}),e.jsx("p",{className:"text-secondary mb-3",children:"Icon & text"}),e.jsxs("p",{className:"flex items-center gap-2 mb-1.5",children:[e.jsx(S,{width:t,height:t}),"Writing style"]}),e.jsxs("p",{className:"flex items-center gap-2 mb-1.5",children:[e.jsx(j,{width:t,height:t}),"Hyperlink"]}),e.jsxs("p",{className:"flex items-center gap-2",children:[e.jsx(z,{width:t,height:t}),"Label"]})]})]})};a.parameters={layout:"padded"};var o,l,c;n.parameters={...n.parameters,docs:{...(o=n.parameters)==null?void 0:o.docs,source:{originalSource:`() => <>
    <h5 className="text-secondary mb-1">Get started</h5>
    <h2 className="heading-xl mb-3">Building your first app</h2>
    <p className="text-md">
      Inline cards in Apps SDK UI keep copy short and actionable. Provide just enough context for
      the task, then pair it with a clear next step.
    </p>
  </>`,...(c=(l=n.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var m,p,d;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:`() => <>
    <p className="font-normal">font-normal</p>
    <p className="font-medium">font-medium</p>
    <p className="font-semibold">font-semibold</p>
    <p className="font-bold">font-bold</p>
  </>`,...(d=(p=i.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var h,x,g;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`() => <>
    <p className="text-default">text-default</p>
    <p className="text-secondary">text-secondary</p>
    <p className="text-tertiary">text-tertiary</p>
  </>`,...(g=(x=r.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};var u,f,y;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`() => {
  const [size, setSize] = useState<string>("md");
  const iconSize = ICON_SIZE[size] ?? 20;
  return <div style={{
    maxWidth: 560
  }}>
      <div className="mb-6 max-w-[120px]">
        <Select block value={size} options={FONT_SIZES} onChange={(v: Option) => setSize(v.value)} placeholder="Font size" />
      </div>
      <div style={{
      fontSize: \`var(--font-text-\${size}-size)\`,
      lineHeight: \`var(--font-text-\${size}-line-height)\`,
      letterSpacing: \`var(--font-text-\${size}-tracking)\`
    }}>
        <div className="mb-8">
          <div>
            <p className="text-secondary mb-2">Prose</p>
            <p>
              Typography is the silent art that shapes how we experience written language. Beyond
              mere letters, it orchestrates rhythm, hierarchy, and emotion—guiding the reader’s eye
              and setting the tone before a single word is read. The beauty of typography lies in
              its subtlety: the careful balance of space and form, the harmony between font size and
              line height, and the way thoughtfully chosen type can make content feel effortless,
              inviting, and human. When typography is done well, it disappears, letting the message
              shine—yet its influence is always felt, elevating both clarity and aesthetic pleasure.
            </p>
          </div>
        </div>
        <p className="text-secondary mb-3">Icon &amp; text</p>
        <p className="flex items-center gap-2 mb-1.5">
          <WriteAlt width={iconSize} height={iconSize} />
          Writing style
        </p>
        <p className="flex items-center gap-2 mb-1.5">
          <Link width={iconSize} height={iconSize} />
          Hyperlink
        </p>
        <p className="flex items-center gap-2">
          <Tag width={iconSize} height={iconSize} />
          Label
        </p>
      </div>
    </div>;
}`,...(y=(f=a.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};const ae=["Sizes","Weights","Colors","LineHeight"];export{r as Colors,a as LineHeight,n as Sizes,i as Weights,ae as __namedExportsOrder,se as default};
