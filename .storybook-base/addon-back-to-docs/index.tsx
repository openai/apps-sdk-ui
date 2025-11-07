// organize-imports-ignore
// @ts-expect-error -- React import is required here
import React from "react"
import { IconButton } from "@storybook/components"
import { addons, types, useStorybookApi } from "@storybook/manager-api"

addons.register("oai/back-to-docs", () => {
  addons.add("oai/back-to-docs/tool", {
    title: "Back to docs",
    type: types.TOOL,

    /* only show the button when someone is *inside* story view */
    match: ({ viewMode }) => viewMode === "story",

    render: () => <BackToDocs />,
  })
})

export const BackToDocs = () => {
  const api = useStorybookApi()
  const story = api.getCurrentStoryData() // active story

  if (!story) return null

  // transform "...--base" → "...--docs"
  const docsId = story.id.replace(/--[^-]+$/, "--docs")

  // If the docs page actually exists, render a button
  if (!api.getData(docsId, story.refId)) return null

  return (
    <span className="story-back-link">
      <IconButton onClick={() => api.selectStory(docsId, undefined, { viewMode: "docs" })}>
        <ArrowLeft /> Back to docs
      </IconButton>
    </span>
  )
}

export const ArrowLeft = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.354 2.146a.5.5 0 010 .708L1.707 6.5H13.5a.5.5 0 010 1H1.707l3.647 3.646a.5.5 0 01-.708.708l-4.5-4.5a.5.5 0 010-.708l4.5-4.5a.5.5 0 01.708 0z"
      fill="currentColor"
    ></path>
  </svg>
)
