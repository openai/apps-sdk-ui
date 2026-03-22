import { defineConfig } from "tsdown"

export default defineConfig({
  tsconfig: "./tsconfig.build.json",
  entry: [
    "./src/**/*.ts",
    "./src/**/*.tsx",
    "./src/styles/index.css",
    "!**/*.stories.tsx",
    "!**/*.test.ts",
    "!**/*.test.tsx",
    "!**/*.mdx",
    "!test",
    "!scripts",
    "!boilerplate-example",
    "!public",
    "!.storybook-base",
  ],
  outDir: "dist/es",
  platform: "neutral",
  css: {
    transformer: "postcss",
    splitting: true,
  },
  dts: true,
  sourcemap: true,
  unbundle: true,
})
