/**
 * @type {import('prettier').Options}
 */
module.exports = {
  printWidth: 100,
  quoteProps: "consistent",
  semi: false,
  plugins: [
    require.resolve("prettier-plugin-tailwindcss"),
    require.resolve("prettier-plugin-organize-imports"),
  ],
  tailwindFunctions: ["clsx"],
  tabWidth: 2,
}
