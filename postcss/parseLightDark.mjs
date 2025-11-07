import postcss from "postcss"
import selectorParser from "postcss-selector-parser"
import valueParser from "postcss-value-parser"

/** @type {import('postcss').PluginCreator} */
export default function platformUILightDark() {
  return {
    postcssPlugin: "@openai/apps-sdk-ui/components/parse-light-dark",
    OnceExit(root) {
      const stringifyThemeValue = (tokens, which) =>
        tokens.map((tok) => (tok.isLD ? tok[which] : tok.raw)).join("")
      // Split selector list into individual strings using selector parser
      const splitSelectorList = (selector) => {
        const list = []
        selectorParser((rootSel) => {
          rootSel.each((sel) => list.push(sel.toString().trim()))
        }).processSync(selector)
        return list
      }

      // Determine if selector is exactly :root or [data-theme], optionally wrapped in :where()
      const isSimpleThemeScopeUsingParser = (selectorStr) => {
        let result = false
        selectorParser((rootSel) => {
          if (rootSel.nodes.length !== 1) return
          const sel = rootSel.nodes[0]
          const onlyNode = () => (sel.nodes.length === 1 ? sel.nodes[0] : null)
          const isSimpleNode = (node) =>
            !!node &&
            ((node.type === "pseudo" && node.value === ":root") ||
              (node.type === "attribute" && node.attribute === "data-theme" && !node.operator))
          // Direct simple
          const n = onlyNode()
          if (isSimpleNode(n)) {
            result = true
            return
          }
          // :where(simple)
          if (n && n.type === "pseudo" && n.value === ":where" && n.nodes && n.nodes.length === 1) {
            const innerSel = n.nodes[0]
            if (innerSel.nodes.length === 1 && isSimpleNode(innerSel.nodes[0])) {
              result = true
            }
          }
        }).processSync(selectorStr)
        return result
      }
      /** @type {Map<import('postcss').Rule, Array<{ prop: string; full: Array<any>; important: boolean }>>} */
      const themeMap = new Map()

      // 1) Collect & remove light-dark() decls, capturing !important
      root.walkDecls((decl) => {
        if (!decl.value.includes("light-dark(")) return

        const parsed = valueParser(decl.value)
        let sawLD = false
        const tokens = []

        for (const node of parsed.nodes) {
          if (node.type === "function" && node.value === "light-dark") {
            // inside node.nodes we expect [lightArg, comma, darkArg]
            const [lightNode, , darkNode] = node.nodes
            const light = valueParser.stringify(lightNode).trim()
            const dark = valueParser.stringify(darkNode).trim()
            tokens.push({ isLD: true, light, dark })
            sawLD = true
          } else {
            tokens.push({ isLD: false, raw: valueParser.stringify(node) })
          }
        }
        if (!sawLD) return

        // store entries
        const arr = themeMap.get(decl.parent) || []
        arr.push({ prop: decl.prop, full: tokens, important: decl.important })
        themeMap.set(decl.parent, arr)
        decl.remove()
      })

      // 2) Emit transformed rules
      const isSimpleThemeScope = (s) => isSimpleThemeScopeUsingParser(s)
      const appendThemeRules = (parent, afterNode, entries, lightSelector, darkSelector) => {
        const lightRule = postcss.rule({ selector: lightSelector })
        const darkRule = postcss.rule({ selector: darkSelector })
        for (const { prop, full, important } of entries) {
          lightRule.append(
            postcss.decl({ prop, value: stringifyThemeValue(full, "light"), important }),
          )
          darkRule.append(
            postcss.decl({ prop, value: stringifyThemeValue(full, "dark"), important }),
          )
        }
        parent.insertAfter(afterNode, lightRule)
        parent.insertAfter(lightRule, darkRule)
      }
      for (const [rule, entries] of themeMap) {
        const parent = rule.parent
        if (!parent || !rule.selector) continue

        // root selector
        if (rule.selector === ":root") {
          appendThemeRules(
            parent,
            rule,
            entries,
            ':where(:root), :where([data-theme="light"])',
            ':where([data-theme="dark"])',
          )

          if (rule.nodes.length === 0) {
            rule.remove()
          }
        } else {
          // non-root selector: flatten to top-level grouped theme rules
          const selList = splitSelectorList(rule.selector)

          // Special-case: when selectors are only top-level theme scopes
          // (:root and/or [data-theme]), treat them like :root by replacing
          // with :where(:root) and :where([data-theme="light"]) instead of nesting.
          const simpleScopes = selList.filter((s) => isSimpleThemeScope(s))
          const otherSelectors = selList.filter((s) => !isSimpleThemeScope(s))
          if (simpleScopes.length > 0 && otherSelectors.length === 0) {
            appendThemeRules(
              parent,
              rule,
              entries,
              ':where(:root), :where([data-theme="light"])',
              ':where([data-theme="dark"])',
            )
            if (rule.nodes.length === 0) {
              rule.remove()
            }
          } else {
            // Mixed or no simple scopes.
            // - Include base selectors (light defaults) ONLY when there are no simple scopes.
            // - Never nest simple scopes; instead add bare replacements.
            const lightParts = []
            const darkParts = []

            // Base selectors (light defaults) only if no simple scopes are present
            if (simpleScopes.length === 0) {
              lightParts.push(...selList)
            }

            // Bare replacements for simple scopes
            if (simpleScopes.includes(":root")) {
              lightParts.push(":where(:root)")
            }
            if (simpleScopes.length > 0) {
              lightParts.push(':where([data-theme="light"])')
              darkParts.push(':where([data-theme="dark"])')
            }

            // Themed nested only for non-simple selectors
            lightParts.push(...otherSelectors.map((s) => `:where([data-theme="light"]) ${s}`))
            darkParts.push(...otherSelectors.map((s) => `:where([data-theme="dark"]) ${s}`))

            // Dedupe while preserving order
            const uniq = (arr) => Array.from(new Set(arr))
            const lightSelector = uniq(lightParts).join(", ")
            const darkSelector = uniq(darkParts).join(", ")

            appendThemeRules(parent, rule, entries, lightSelector, darkSelector)
            if (rule.nodes.length === 0) {
              rule.remove()
            }
          }
        }
      }
    },
  }
}

platformUILightDark.postcss = true
