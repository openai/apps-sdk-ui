import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const noTopLevelBreakpointMixin = require("./config/stylelint/stylelint-no-top-level-breakpoint-mixin.js");
const noMixinsInCss = require("./config/stylelint/stylelint-no-mixins-in-css.js");

const CASE_ERROR_MESSAGE = `CSS modules should use PascalCase selectors and data attributes.

.MyComponent {
  [data-hidden] & {
    display: none;
  }
}`;

const PROPERTY_ORDER = [
  "composes",
  "all",
  "position",
  "inset",
  "top",
  "right",
  "bottom",
  "left",
  "z-index",
  "overflow",
  "display",
  "flex-direction",
  "flex-flow",
  "flex-wrap",
  "align-content",
  "align-items",
  "justify-content",
  "gap",
  "flex",
  "align-self",
  "flex-basis",
  "flex-grow",
  "flex-shrink",
  "order",
  "width",
  "min-width",
  "max-width",
  "height",
  "min-height",
  "max-height",
  "box-sizing",
  "padding",
  "padding-top",
  "padding-right",
  "padding-bottom",
  "padding-left",
  "border",
  "border-width",
  "border-style",
  "border-color",
  "border-radius",
  "border-top",
  "border-top-width",
  "border-top-style",
  "border-top-color",
  "border-top-radius",
  "border-right",
  "border-right-width",
  "border-right-style",
  "border-right-color",
  "border-right-radius",
  "border-bottom",
  "border-bottom-width",
  "border-bottom-style",
  "border-bottom-color",
  "border-bottom-radius",
  "border-left",
  "border-left-width",
  "border-left-style",
  "border-left-color",
  "border-left-radius",
  "margin",
  "margin-top",
  "margin-right",
  "margin-bottom",
  "margin-left",
];

/** @type {() => import('stylelint').Config} */
const config = () => ({
  extends: ["stylelint-config-standard", "stylelint-prettier/recommended"],
  plugins: ["stylelint-order", "stylelint-scss", noTopLevelBreakpointMixin, noMixinsInCss],
  ignoreFiles: ["node_modules/**", "dist/**", "build/**"],
  rules: {
    "oai/no-top-level-breakpoint-mixin": true,
    "oai/no-mixins-in-css": true,
    "import-notation": null,
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          // tailwind
          "theme",
          "source",
          "utility",
          "variant",
          "custom-variant",
          "plugin",
          "reference",
          // postcss mixin
          "mixin",
        ],
      },
    ],
    "function-no-unknown": [
      true,
      {
        ignoreFunctions: ["theme", "spacing", "alpha"],
      },
    ],
    "declaration-property-value-no-unknown": [
      true,
      {
        propertiesSyntax: {
          // Extend <length> with spacing()
          "padding": "[ <length> | <percentage> | <spacing()> ]{1,4}",
          "padding-top": "| <spacing()>",
          "padding-right": "| <spacing()>",
          "padding-bottom": "| <spacing()>",
          "padding-left": "| <spacing()>",
          "margin": "[ <length> | <percentage> | auto | <spacing()> ]{1,4}",
          "margin-top": "| <spacing()>",
          "margin-right": "| <spacing()>",
          "margin-bottom": "| <spacing()>",
          "margin-left": "| <spacing()>",
          "gap": "[ <length> | <percentage> | <spacing()> ]{1,2}",
          "row-gap": "| <spacing()>",
          "column-gap": "| <spacing()>",
          "inset": "[<length> | <percentage> | auto | <spacing()> ]{1,4}",
          "top": "| <spacing()>",
          "right": "| <spacing()>",
          "bottom": "| <spacing()>",
          "left": "| <spacing()>",
          // Extend <color> with alpha()
          "color": "| <alpha()>",
          "background": "| <alpha()>",
          "background-color": "| <alpha()>",
          "border": "<line-width> || <line-style> || [<color> | <alpha()>]",
          "border-top": "<line-width> || <line-style> || [<color> | <alpha()>]",
          "border-right": "<line-width> || <line-style> || [<color> | <alpha()>]",
          "border-bottom": "<line-width> || <line-style> || [<color> | <alpha()>]",
          "border-left": "<line-width> || <line-style> || [<color> | <alpha()>]",
          "border-top-color": "| <alpha()>",
          "border-right-color": "| <alpha()>",
          "border-bottom-color": "| <alpha()>",
          "border-left-color": "| <alpha()>",
          "border-block-start-color": "| <alpha()>",
          "border-block-end-color": "| <alpha()>",
          "border-inline-start-color": "| <alpha()>",
          "border-inline-end-color": "| <alpha()>",
          "box-shadow": "none | [ inset? && <length>{2,4} && [<color> | <alpha()>]? ]#",
          "text-shadow": "[ <length> <length> [ <length> ]? [<color> | <alpha()>]? ]#",
          "outline": "<line-style> || <line-width> || [<color> | <alpha()>]",
          "outline-color": "| <alpha()>",
          "text-decoration-color": "| <alpha()>",
          "column-rule-color": "| <alpha()>",
          "caret-color": "| <alpha()>",
          "text-emphasis-color": "| <alpha()>",
          "accent-color": "| <alpha()>",
          "fill": "| <alpha()>",
          "stroke": "| <alpha()>",
          "stop-color": "| <alpha()>",
          "flood-color": "| <alpha()>",
          "lighting-color": "| <alpha()>",
        },
        typesSyntax: {
          "spacing()": "spacing( <number> )",
          "alpha()": "alpha( <color>, [<percentage> | <number>] )",
        },
      },
    ],
    "declaration-block-no-redundant-longhand-properties": [
      true,
      {
        ignoreShorthands: ["place-self", "place-content", "place-items"],
      },
    ],
    "no-descending-specificity": null,
    "color-hex-length": "long",
    "comment-empty-line-before": null,
    "number-max-precision": null,
    "order/order": ["custom-properties", "declarations"],
    "order/properties-order": [PROPERTY_ORDER, { unspecified: "bottomAlphabetical" }],
    "scss/no-dollar-variables": true,
    "scss/no-global-function-names": true,
  },
  overrides: [
    {
      files: ["**/*.module.css"],
      rules: {
        "selector-class-pattern": ["^(?:[A-Z][a-zA-Z]*)+$", { message: CASE_ERROR_MESSAGE }],
        "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["global"] }],
      },
    },
  ],
});

export default config();
