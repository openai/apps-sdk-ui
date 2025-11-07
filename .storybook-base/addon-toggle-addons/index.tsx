// organize-imports-ignore
// @ts-expect-error -- React import is required here
import React from "react"
import { IconButton } from "@storybook/components"
import { addons, types, useStorybookApi, useStorybookState } from "@storybook/manager-api"

addons.register("platform/toggle-addons", () => {
  addons.add("platform/toggle-addons/tool", {
    title: "Toggle addon panel",
    type: types.TOOL,
    match: ({ viewMode }) => viewMode === "story",

    render: Tool,
  })
})

export const Tool = () => {
  const api = useStorybookApi()
  const state = useStorybookState()
  const isOpen = state.layout.bottomPanelHeight > 0 || state.layout.rightPanelWidth > 0

  return (
    <IconButton
      key="toggle-addons"
      title="Show / hide addons panel (A)"
      active={isOpen}
      onClick={() => api.togglePanel()}
    >
      <Controls />
    </IconButton>
  )
}

export const Controls = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10.5 1a.5.5 0 01.5.5V2h1.5a.5.5 0 010 1H11v.5a.5.5 0 01-1 0V3H1.5a.5.5 0 010-1H10v-.5a.5.5 0 01.5-.5zM1.5 11a.5.5 0 000 1H10v.5a.5.5 0 001 0V12h1.5a.5.5 0 000-1H11v-.5a.5.5 0 00-1 0v.5H1.5zM1 7a.5.5 0 01.5-.5H3V6a.5.5 0 011 0v.5h8.5a.5.5 0 010 1H4V8a.5.5 0 01-1 0v-.5H1.5A.5.5 0 011 7z"
      fill="currentColor"
    ></path>
  </svg>
)
