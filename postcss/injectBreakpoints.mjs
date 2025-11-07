// @ts-check
import postcss from "postcss"

/**
 * @typedef {import('postcss').PluginCreator<{ breakpoints: Record<string, number> }>} PostcssPluginCreator
 */

/**
 * Injects the breakpoint variables into the CSS. Must run before tailwindcss.
 *
 * @type {PostcssPluginCreator}
 */
export default function injectBreakpoints(
  /** @type {{ breakpoints: Record<string, number> }} */
  { breakpoints },
) {
  return {
    postcssPlugin: "@openai/apps-sdk-ui/components/inject-breakpoints",
    Once(root) {
      root.walkComments((comment) => {
        // Look for comment containing "@inject_breakpoints"
        if (comment.text.trim() === "@inject_breakpoints") {
          // Generate breakpoint declarations
          const declarations = []
          for (const [key, value] of Object.entries(breakpoints)) {
            declarations.push(
              postcss.decl({
                prop: `--breakpoint-${key}`,
                value: `${value}px`,
              }),
            )
          }

          // Insert all declarations after the comment
          declarations.reverse().forEach((decl) => {
            comment.parent.insertAfter(comment, decl)
          })

          // Remove the comment
          comment.remove()
        }
      })
    },
  }
}

injectBreakpoints.postcss = true
