const stylelint = require("stylelint")

const ruleName = "oai/no-top-level-breakpoint-mixin"
const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected:
    "Do not use `@mixin breakpoint` at the top level; nest inside a selector. If you need to use a global breakpoint, use the global suffix (e.g. `@mixin breakpoint {size} global`).",
})

/** @type {import('stylelint').Rule} */
const rule = (_primaryOption, _secondaryOptions, _context) => {
  return (root, result) => {
    // Validate primary option for type-safety, even though the rule does not use it
    const validOptions = stylelint.utils.validateOptions(result, ruleName, {
      actual: _primaryOption,
    })
    if (!validOptions) return

    root.walkAtRules("mixin", (atRule) => {
      // Matches: @mixin breakpoint md { ... }
      const params = atRule.params || ""
      const isBreakpoint = /^\s*breakpoint\b/.test(params)
      const includesGlobal = /\bglobal\b/i.test(params)
      // Consider mixins inside wrappers like @layer/@media/@supports as top-level too
      // unless we encounter a selector rule before reaching the root.
      let parent = atRule.parent
      let isNestedInsideSelectorRule = false
      while (parent) {
        if (parent.type === "rule") {
          isNestedInsideSelectorRule = true
          break
        }
        if (parent.type === "root") {
          break
        }
        parent = parent.parent
      }

      if (isBreakpoint && !includesGlobal && !isNestedInsideSelectorRule) {
        stylelint.utils.report({
          ruleName,
          result,
          message: messages.rejected,
          node: atRule,
        })
      }
    })
  }
}

// Attach rule metadata as required by Stylelint typings
rule.ruleName = ruleName
rule.messages = messages

/** @type {import('stylelint').Plugin} */
const plugin = stylelint.createPlugin(ruleName, rule)

module.exports = plugin
