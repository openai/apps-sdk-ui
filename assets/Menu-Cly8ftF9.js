import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as l}from"./index-ikABDTSQ.js";import{g as u,L as m}from"./index-vTu4Yset.js";import{M as i}from"./index-JgbsMnBD.js";import{l as x}from"./index-h17mY_kq.js";import{M as j,T as p,S as g,C as o,A as t,a as d}from"./index-BNUg4Y7r.js";import{H as b}from"./Hero-CxtmekiR.js";import{M as f,B as M,N as S,W as w,a as c,b as a,I as v}from"./Menu.stories-BAvjhrY2.js";import"./index-CDlOlYQx.js";import"./clsx-B-dksMZM.js";import"./useEscCloseStack-D1Z2m5Rr.js";import"./index-DpDpMmvd.js";import"./index-BGZCjPBa.js";import"./index-CA2ozmjx.js";import"./index-CAX21tL8.js";import"./index-Bo7e4fPN.js";import"./useLatestValue-DL0UuayD.js";import"./helpers-f26tJ_7u.js";import"./internal-DlOBqL0c.js";import"./AppsSDKUIContext-M1LWlfJD.js";import"./index-BNAx77fs.js";import"./index-DZdtDvV8.js";import"./renderHelpers-DMqZrfTK.js";import"./index-D7F-HZ0J.js";import"./index-K5-zvULe.js";import"./index-Bf2qc8Rt.js";import"./copyToClipboard-B2drfy3h.js";import"./index-CdQtMw5d.js";import"./index-C-_BHfSz.js";import"./index-CXgy4vRa.js";import"./index-KXolyfTN.js";import"./iframe-B-8_lDgr.js";import"./index-DgH-xKnr.js";function h(s){const n={blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...l(),...s.components};return i||r("Menu",!1),i.Content||r("Menu.Content",!0),i.Item||r("Menu.Item",!0),i.Separator||r("Menu.Separator",!0),i.Trigger||r("Menu.Trigger",!0),e.jsxs(e.Fragment,{children:[e.jsx(j,{of:f}),`
`,e.jsx(p,{children:"Menu"}),`
`,e.jsx(g,{children:"Structured actions in a dropdown list"}),`
`,e.jsx(b,{children:e.jsx("div",{style:{width:180,height:118},children:e.jsxs(i,{forceOpen:!0,children:[e.jsx(i.Trigger,{children:e.jsx("div",{})}),e.jsxs(i.Content,{align:"start",minWidth:"auto",children:[e.jsxs(i.Item,{onSelect:()=>{},children:[e.jsx(u,{height:20,width:20})," Upload image"]}),e.jsxs(i.Item,{onSelect:()=>{},children:[e.jsx(m,{height:20,width:20})," Link to image"]}),e.jsx(i.Separator,{}),e.jsx(i.Item,{className:"text-tertiary text-xs py-1",children:e.jsx(n.p,{children:"Supported formats: .jpeg .jpg .gif .png"})})]})]})})}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { Menu } from "@openai/apps-sdk-ui/components/Menu"
`})}),`
`,e.jsx(o,{of:M}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," Menu prevents ",e.jsx(n.code,{children:"Tab"})," presses from advancing focus. Because of this, ",e.jsx(n.code,{children:"Menu"})," isn't suitable for generic popover use-cases – use ",e.jsx("span",{className:"link",onClick:x("components-popover"),children:"Popover"})," instead."]}),`
`]}),`
`,e.jsx(n.h2,{id:"reference",children:"Reference"}),`
`,e.jsx("h3",{id:"menu-root","data-heading-label":"Root",children:e.jsx(n.code,{children:"Menu"})}),`
`,e.jsx(t,{of:i}),`
`,e.jsx("h3",{id:"menu-trigger","data-heading-label":"Trigger",children:e.jsx(n.code,{children:"Menu.Trigger"})}),`
`,e.jsx(n.p,{children:"Renders the element that toggles the menu open and closed. You can use any interactive element (e.g., a button or icon) as the trigger. The trigger should be the user's point of interaction for revealing the menu options."}),`
`,e.jsx("h3",{id:"menu-content","data-heading-label":"Content",children:e.jsx(n.code,{children:"Menu.Content"})}),`
`,e.jsxs(n.p,{children:["Renders the dynamic content for the menu. ",e.jsx(n.code,{children:"Menu.Content"})," is mounted only while the menu is open."]}),`
`,e.jsx(t,{of:i.Content}),`
`,e.jsx("h3",{id:"menu-item","data-heading-label":"Item",children:e.jsx(n.code,{children:"Menu.Item"})}),`
`,e.jsxs(n.p,{children:["Most common component for rendering menu list items. When ",e.jsx(n.code,{children:"onSelect"})," is omitted, the item is rendered as non-interactive."]}),`
`,e.jsx(t,{of:i.Item}),`
`,e.jsx("h3",{id:"menu-link","data-heading-label":"Link",children:e.jsx(n.code,{children:"Menu.Link"})}),`
`,e.jsxs(n.p,{children:["Renders a menu item as a navigational link. Use ",e.jsx(n.code,{children:"Menu.Link"})," to create items that navigate to another page or route when selected. Accepts all props supported by the application's router link component, such as ",e.jsx(n.code,{children:"to"})," or ",e.jsx(n.code,{children:"href"}),", and ensures proper accessibility roles and keyboard behavior within the menu."]}),`
`,e.jsx("h3",{id:"menu-separator","data-heading-label":"Separator",children:e.jsx(n.code,{children:"Menu.Separator"})}),`
`,e.jsx(n.p,{children:"Renders a divider between menu items"}),`
`,e.jsx(t,{of:i.Separator}),`
`,e.jsx("h3",{id:"menu-sub","data-heading-label":"Sub",children:e.jsx(n.code,{children:"Menu.Sub"})}),`
`,e.jsxs(n.p,{children:["Renders a wrapper for nested submenus within a menu. Use ",e.jsx(n.code,{children:"Menu.Sub"})," to group a ",e.jsx(n.code,{children:"Menu.SubTrigger"})," and a ",e.jsx(n.code,{children:"Menu.SubContent"}),"."]}),`
`,e.jsx(t,{of:i.Sub}),`
`,e.jsx("h3",{id:"menu-sub-trigger","data-heading-label":"SubTrigger",children:e.jsx(n.code,{children:"Menu.SubTrigger"})}),`
`,e.jsxs(n.p,{children:["Renders a menu item that toggles its associated submenu. Must be used inside a ",e.jsx(n.code,{children:"Menu.Sub"}),"."]}),`
`,e.jsx(t,{of:i.SubTrigger}),`
`,e.jsx("h3",{id:"menu-sub-content","data-heading-label":"SubContent",children:e.jsx(n.code,{children:"Menu.SubContent"})}),`
`,e.jsxs(n.p,{children:["Renders the content panel for a submenu. Must follow a ",e.jsx(n.code,{children:"Menu.SubTrigger"})," within a ",e.jsx(n.code,{children:"Menu.Sub"}),"."]}),`
`,e.jsx(t,{of:i.SubContent}),`
`,e.jsx("h3",{id:"menu-checkboxitem","data-heading-label":"CheckboxItem",children:e.jsx(n.code,{children:"Menu.CheckboxItem"})}),`
`,e.jsx(n.p,{children:"Renders a menu item with a checkbox indicator."}),`
`,e.jsx(t,{of:i.CheckboxItem}),`
`,e.jsx("h3",{id:"menu-radiogroup","data-heading-label":"RadioGroup",children:e.jsx(n.code,{children:"Menu.RadioGroup"})}),`
`,e.jsx(n.p,{children:"Renders a group of radio items in a menu."}),`
`,e.jsx(t,{of:i.RadioGroup}),`
`,e.jsx("h3",{id:"menu-radioitem","data-heading-label":"RadioItem",children:e.jsx(n.code,{children:"Menu.RadioItem"})}),`
`,e.jsxs(n.p,{children:["Renders a menu item with a radio indicator – used inside ",e.jsx(n.code,{children:"Menu.RadioGroup"}),"."]}),`
`,e.jsx(t,{of:i.RadioItem}),`
`,e.jsx("h3",{id:"menu-itemactions","data-heading-label":"ItemActions",children:e.jsx(n.code,{children:"Menu.ItemActions"})}),`
`,e.jsxs(n.p,{children:["Renders a container for additional actions that appear on the menu item. ",e.jsx(n.code,{children:"Menu.ItemActions"})," automatically handles visibility of the actions based on hover, and will not trigger the item's ",e.jsx(n.code,{children:"onSelect"})," behavior."]}),`
`,e.jsx(t,{of:i.ItemActions}),`
`,e.jsx("h3",{id:"menu-itemaction","data-heading-label":"ItemAction",children:e.jsx(n.code,{children:"Menu.ItemAction"})}),`
`,e.jsxs(n.p,{children:["Renders an action for use in the hover ",e.jsx(n.code,{children:"Menu.ItemActions"})," container. Child is most likely to be a simple icon, which is passed to a ",e.jsx(n.code,{children:"Button"})," component."]}),`
`,e.jsx(t,{of:i.ItemAction}),`
`,e.jsx(n.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(n.h3,{id:"sizing-the-menu",children:"Sizing the menu"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Natural sizing"})," – use ",e.jsx(n.code,{children:'minWidth="auto"'})," to have the menu fit naturally to the size of the content."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Fixed size"})," – use ",e.jsx(n.code,{children:"width"})," and ",e.jsx(n.code,{children:"minWidth"})," to set the menu to a fixed size, regardless of content size."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Flexible sizing"})," – ",e.jsx(n.code,{children:"minWidth"})," can be used by itself to describe a menu that must be a given size, but can grow larger depending on its content."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Max sizing"})," – apply ",e.jsx(n.code,{children:"max-width"})," to the ",e.jsx(n.code,{children:"children"})," of ",e.jsx(n.code,{children:"Menu.Content"}),". ",e.jsx(n.code,{children:"maxWidth"})," isn't exposed to props because it's reserved for Radix variables to limit width in collision detection."]}),`
`]}),`
`,e.jsx(o,{of:S}),`
`,e.jsx(n.h3,{id:"submenus",children:"Submenus"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"Menu.Sub"}),", ",e.jsx(n.code,{children:"Menu.SubTrigger"}),", and ",e.jsx(n.code,{children:"Menu.SubContent"})," to create nested menu items."]}),`
`,e.jsx(o,{of:w}),`
`,e.jsx(n.h3,{id:"checkbox-items",children:"Checkbox items"}),`
`,e.jsxs(n.p,{children:["You can render selectable menu items with ",e.jsx(n.code,{children:"Menu.CheckboxItem"}),"."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:"indicatorPosition"})," to control whether the indicator appears before or after the content of the item."]}),`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:"indicatorVariant"})," to switch between a solid and ghost checkmark indicator."]}),`
`,e.jsxs(n.li,{children:["Pass ",e.jsx(n.code,{children:"onSelect={(evt) => evt.preventDefault()}"})," to prevent the menu from closing when selecting."]}),`
`]}),`
`,e.jsx(o,{of:c}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(d,{of:c})}),`
`,e.jsx(n.h3,{id:"radio-items",children:"Radio items"}),`
`,e.jsxs(n.p,{children:["You can render radio options within a menu with ",e.jsx(n.code,{children:"Menu.RadioGroup"})," and ",e.jsx(n.code,{children:"Menu.RadioItem"}),"."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:"indicatorPosition"})," to control whether the indicator appears before or after the content of the item."]}),`
`,e.jsxs(n.li,{children:["Pass ",e.jsx(n.code,{children:"onSelect={(evt) => evt.preventDefault()}"})," to prevent the menu from closing when selecting."]}),`
`]}),`
`,e.jsx(o,{of:a}),`
`,e.jsx("div",{className:"canvas-controls-only",children:e.jsx(d,{of:a})}),`
`,e.jsx(n.h3,{id:"item-actions",children:"Item actions"}),`
`,e.jsxs(n.p,{children:["You can render additional actions on ",e.jsx(n.code,{children:"Menu.Item"})," by using the ",e.jsx(n.code,{children:"Menu.ItemActions"})," and ",e.jsx(n.code,{children:"Menu.ItemAction"})," components. This will render a special set of actions that display when a given item is highlighted."]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Accessibility note:"})," These actions are not keyboard accessible due to how Radix ",e.jsx(n.code,{children:"Menu"})," works, so these should not be critical actions with no other parity."]}),`
`]}),`
`,e.jsx(o,{of:v})]})}function te(s={}){const{wrapper:n}={...l(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(h,{...s})}):h(s)}function r(s,n){throw new Error("Expected "+(n?"component":"object")+" `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{te as default};
