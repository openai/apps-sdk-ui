import { create, themes, type ThemeVars } from "@storybook/theming"
import { type Theme } from "./constants"

const light = create({
  base: "light",
  // Logo
  brandTitle: "Apps SDK UI",
  brandImage: "https://openai.github.io/apps-sdk-ui/logo-storybook.svg",
  brandUrl: "https://developers.openai.com",
  brandTarget: "_self",

  // Typography
  fontBase: `ui-sans-serif, -apple-system, system-ui, "Segoe UI", "Noto Sans", "Helvetica",
    "Arial", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif`,
  fontCode: `ui-monospace, "SFMono-Regular", "SF Mono", "Menlo", "Monaco", "Consolas",
    "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace`,

  // Variables
  colorPrimary: "#3A10E5",
  colorSecondary: "#585C6D",

  // UI
  appBg: "#ffffff",
  appContentBg: "#ffffff",
  appPreviewBg: "#ffffff",
  appBorderColor: "#ededed",
  appBorderRadius: 6,

  // Toolbar default and active colors
  barTextColor: "#6e6e80",
  barBg: "#ffffff",
})

const dark = create({
  ...themes.dark,
  // Logo
  brandTitle: "Apps SDK UI",
  brandImage: "https://openai.github.io/apps-sdk-ui/logo-storybook-dark.svg",
  brandUrl: "https://platform.openai.com",
  brandTarget: "_self",

  // Typography
  fontBase: `ui-sans-serif, -apple-system, system-ui, "Segoe UI", "Noto Sans", "Helvetica",
    "Arial", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif`,
  fontCode: `ui-monospace, "SFMono-Regular", "SF Mono", "Menlo", "Monaco", "Consolas",
    "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace`,

  // Variables
  colorPrimary: "#3A10E5",
  colorSecondary: "#585C6D",

  // UI
  appBg: "#212121",
  appContentBg: "#212121",
  appPreviewBg: "#212121",
  appBorderColor: "#393939",
  appBorderRadius: 6,

  // Toolbar default and active colors
  barTextColor: "#c1c1c1",
  barBg: "#212121",
})

export const THEMES: Record<Theme, ThemeVars> = {
  light,
  dark,
}
