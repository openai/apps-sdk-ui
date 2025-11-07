import { addons } from "@storybook/manager-api"
import { init as initThemeAddon } from "./addon-theme"

import "./addon-back-to-docs"
import "./addon-title"
import "./addon-toggle-addons"

addons.setConfig({
  navSize: 230,
  toolbar: {
    copy: { hidden: true },
    eject: { hidden: true },
    fullscreen: { hidden: true },
    createStory: { hidden: true },
  },
  sidebar: {
    showRoots: true,
    collapsedRoots: [],
  },
  docs: {
    isCodeExpanded: true,
    source: {
      state: "shown",
    },
  },
})

// Manually initialize local addons
initThemeAddon()

addons.register("view-mode", (api) => {
  const channel = addons.getChannel()

  const setAttr = (mode: "story" | "docs") =>
    document.documentElement.setAttribute("data-view-mode", mode)

  setAttr(api.getUrlState().viewMode === "docs" ? "docs" : "story")

  channel.on("docsRendered", () => setAttr("docs"))
  channel.on("storyRendered", () => {
    const { viewMode } = api.getUrlState() // 'story' | 'docs' | custom tabs :contentReference[oaicite:0]{index=0}
    setAttr(viewMode === "docs" ? "docs" : "story")
  })
})
