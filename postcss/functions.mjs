import postcssFunctions from "postcss-functions"

/** @type {import('postcss').PluginCreator} */
export default function platformUIFunctions() {
  return {
    ...postcssFunctions({
      functions: {
        alpha: (value, amount) => {
          const formattedAmount = amount.includes("%")
            ? amount
            : amount.startsWith(".") || amount.startsWith("0.")
              ? `${parseFloat(amount) * 100}%`
              : `${amount}%`
          return `color-mix(in oklab, ${value} ${formattedAmount}, transparent)`
        },
        spacing: (value) => `calc(var(--spacing) * ${value})`,
      },
    }),
    postcssPlugin: "@openai/apps-sdk-ui/components/postcss-functions",
  }
}

platformUIFunctions.postcss = true
