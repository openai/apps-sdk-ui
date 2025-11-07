// @ts-check
import postcss from "postcss"

/** @type {import('postcss').PluginCreator<{ layer?: string }>} */
export default function wrapModulesInLayer({ layer = "components" } = {}) {
  return {
    postcssPlugin: "@openai/apps-sdk-ui/components/postcss-wrap-modules-in-layer",
    Once(root, { result }) {
      const file = result.opts.from
      if (file && /\.module\.css$/.test(file)) {
        const layerAtRule = postcss.atRule({ name: "layer", params: layer })
        while (root.first) {
          layerAtRule.append(root.first)
        }
        root.append(layerAtRule)
      }
    },
  }
}

wrapModulesInLayer.postcss = true
