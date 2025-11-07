import { addons } from "@storybook/manager-api"

// SOURCE: https://github.com/storybookjs/storybook/issues/6339

addons.register("TitleAddon", (api) => {
  const STORYBOOK_TITLE = "Apps SDK UI"

  const setTitle = () => {
    let sectionTitle = ""
    try {
      const storyData = api.getCurrentStoryData()
      // Grab the last piece of the title, which will exclude section headings (e.g., Overview, Concepts, Components)
      const pageTitleArr = storyData.title.split("/")
      sectionTitle = pageTitleArr[storyData.depth - 1]

      // Add story suffix, if present
      if (storyData.type === "story") {
        sectionTitle += `/${storyData.name}`
      }
    } catch (e) {
      // do nothing
    }

    document.title = sectionTitle ? `${sectionTitle} - ${STORYBOOK_TITLE}` : STORYBOOK_TITLE
  }

  return new MutationObserver(() => {
    if (document.title.endsWith("Storybook")) {
      setTitle()
    }
  }).observe(document.querySelector("title")!, {
    childList: true,
    subtree: true,
    characterData: true,
  })
})
