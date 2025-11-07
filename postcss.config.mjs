import tailwindcss from "@tailwindcss/postcss"
import autoprefixer from "autoprefixer"
import postcssNested from "postcss-nested"

import platformUIFunctions from "./postcss/functions.mjs"
import injectBreakpoints from "./postcss/injectBreakpoints.mjs"
import platformUIMixins from "./postcss/mixins.mjs"
import platformUILightDark from "./postcss/parseLightDark.mjs"
import wrapModulesInLayer from "./postcss/wrapModulesInLayer.mjs"

/**
 * @typedef {import('postcss').Plugin | import('postcss').Processor} PostcssPlugin
 * @typedef {{ breakpoints: Record<string, number>}} Config
 */

/** @type {Config} */
const DEFAULT_CONFIG = {
  breakpoints: {
    "xs": 380,
    "sm": 576,
    "md": 768,
    "lg": 1024,
    "xl": 1280,
    "2xl": 1536,
  },
}

/** @type {(config?: Partial<Config>) => PostcssPlugin[]} */
export function platformUIRequiredPlugins(config = {}) {
  const { breakpoints } = {
    breakpoints: {
      ...DEFAULT_CONFIG.breakpoints,
      ...config.breakpoints,
    },
  }

  return [
    injectBreakpoints({ breakpoints }), // Must run before tailwindcss
    tailwindcss(),
    platformUIFunctions(),
    platformUIMixins({ breakpoints }),
    postcssNested(),
    // When browser support becomes adequate to use light-dark() directly, remove this plugin.
    platformUILightDark(),
    autoprefixer(),
    wrapModulesInLayer(),
  ]
}

export default {
  plugins: platformUIRequiredPlugins({}),
}
