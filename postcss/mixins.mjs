// @ts-check
import postcssMixins from "postcss-mixins"

/**
 * @typedef {import('postcss').PluginCreator<{ breakpoints: Record<string, number> }>} PostcssPluginCreator
 */

/** @type {PostcssPluginCreator} */
export default function platformUIMixins(
  /** @type {{ breakpoints: Record<string, number> }} */
  { breakpoints },
) {
  /** @type {Record<string, string | undefined>} */
  const mediaQueries = Object.entries(breakpoints).reduce((acc, [key, value]) => {
    acc[key] = `(min-width: ${value}px)`
    return acc
  }, {})

  const supportedBreakpoints = Object.keys(mediaQueries)
    .join(", ")
    .replace(/, ([^,]*)$/, " and $1")

  return {
    ...postcssMixins({
      mixins: {
        // @mixin breakpoint md { ... }            // scoped to current selector (default)
        // @mixin breakpoint md global { ... }     // global (no selector wrapper)
        breakpoint(_, targetBreakpointAndScope) {
          const [breakpointName, scope = "scoped"] = targetBreakpointAndScope.trim().split(" ")

          const mediaQuery = mediaQueries[breakpointName]

          if (!mediaQuery) {
            throw new Error(
              `"${breakpointName}" is not a valid breakpoint. Supported breakpoints are ${supportedBreakpoints}.`,
            )
          }

          const isGlobal = typeof scope === "string" && scope.toLowerCase() === "global"

          return isGlobal
            ? {
                [`@media ${mediaQuery}`]: {
                  "@mixin-content": {},
                },
              }
            : {
                [`@media ${mediaQuery}`]: {
                  "&": {
                    "@mixin-content": {},
                  },
                },
              }
        },

        light() {
          return {
            ':where([data-theme="light"]) &': {
              "@mixin-content": {},
            },
          }
        },

        dark() {
          return {
            ':where([data-theme="dark"]) &': {
              "@mixin-content": {},
            },
          }
        },

        hover() {
          return {
            "@media (hover: hover) and (pointer: fine)": {
              "&:hover": {
                "@mixin-content": {},
              },
            },
          }
        },

        autofill() {
          return {
            "&:-webkit-autofill, &:-webkit-autofill:focus, &:-webkit-autofill:hover": {
              "@mixin-content": {},
            },
            // Identical to block above, but must keep separate for browsers to recognize their own selector
            "&:-webkit-autofill-and-obscured, &:-webkit-autofill-strong-password, &:-webkit-autofill-strong-password-viewable":
              {
                "@mixin-content": {},
              },
          }
        },
      },
    }),
    postcssPlugin: "@openai/apps-sdk-ui/components/postcss-mixins",
  }
}

platformUIMixins.postcss = true
