const stylelint = require("stylelint")

const ruleName = "oai/no-mixins-in-css"
const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected:
    "Do not use `@mixin` in `.css` files. Use `@variant` instead. Mixins are only allowed in `.module.css` files.",
})

/** @type {import('stylelint').Rule} */
const rule = (_primaryOption, _secondaryOptions, _context) => {
  return (root, result) => {
    const validOptions = stylelint.utils.validateOptions(result, ruleName, {
      actual: _primaryOption,
    })
    if (!validOptions) return

    const filePath = root && root.source && root.source.input && root.source.input.file
    if (typeof filePath !== "string") return

    const isModuleCss = /\.module\.css$/i.test(filePath)
    const isCss = /\.css$/i.test(filePath)

    // Only enforce for `.css` that are not CSS Modules
    if (!(isCss && !isModuleCss)) return

    root.walkAtRules("mixin", (atRule) => {
      stylelint.utils.report({
        ruleName,
        result,
        message: messages.rejected,
        node: atRule,
      })
    })
  }
}

rule.ruleName = ruleName
rule.messages = messages

/** @type {import('stylelint').Plugin} */
const plugin = stylelint.createPlugin(ruleName, rule)

module.exports = plugin
