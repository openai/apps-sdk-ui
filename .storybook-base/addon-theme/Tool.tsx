// organize-imports-ignore
// @ts-expect-error -- React import is required here
import React from "react"
import { IconButton } from "@storybook/components"
import { type API, useGlobals } from "@storybook/manager-api"
import { memo, useLayoutEffect, useState } from "react"
import { type Theme } from "./constants"
import { THEMES } from "./themes"
import { applyManagerThemeClass, getThemeStore, setThemeStore } from "./themeStore"

export const Tool = memo(({ api }: { api: API }) => {
  const [, updateGlobals] = useGlobals()
  const [theme, setTheme] = useState<Theme>(getThemeStore())

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light"
    // Enable stories and docs to retrieve this value
    updateGlobals({ theme: nextTheme })
    // Visually apply the next theme
    applyTheme(nextTheme)
  }

  const applyTheme = (themeToApply: Theme) => {
    setTheme(themeToApply)
    // Update persistent storage
    setThemeStore(themeToApply)
    // Update manager frame class
    applyManagerThemeClass(themeToApply)
    // Update global theme config styles
    api.setOptions({ theme: THEMES[themeToApply] })
  }

  useLayoutEffect(() => {
    // Ensure the correct class is applied to manager state on load
    applyManagerThemeClass(theme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <IconButton
      active={false}
      title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
      onClick={toggleTheme}
    >
      {theme === "light" ? <LightMode /> : <DarkMode />}
    </IconButton>
  )
})

// Re-imported icons from our library, since we don't have the SVG Loader
const DarkMode = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16px"
    height="16px"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      fillRule="evenodd"
      d="M12.784 2.47a1 1 0 0 1 .047.975A8 8 0 0 0 20 15h.057a1 1 0 0 1 .902 1.445A10 10 0 0 1 12 22C6.477 22 2 17.523 2 12c0-5.499 4.438-9.961 9.928-10a1 1 0 0 1 .856.47ZM10.41 4.158a8 8 0 1 0 7.942 12.707C13.613 16.079 10 11.96 10 7c0-.986.143-1.94.41-2.842Z"
      clipRule="evenodd"
    ></path>
  </svg>
)

const LightMode = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16px"
    height="16px"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      fillRule="evenodd"
      d="M12 1a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V2a1 1 0 0 1 1-1ZM1 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H2a1 1 0 0 1-1-1Zm19 0a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1Zm-8 8a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Zm0-12a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-6 4a6 6 0 1 1 12 0 6 6 0 0 1-12 0Zm-.364-7.778a1 1 0 1 0-1.414 1.414l.707.707A1 1 0 0 0 6.343 4.93l-.707-.707ZM4.222 18.364a1 1 0 1 0 1.414 1.414l.707-.707a1 1 0 1 0-1.414-1.414l-.707.707ZM17.657 4.929a1 1 0 1 0 1.414 1.414l.707-.707a1 1 0 0 0-1.414-1.414l-.707.707Zm1.414 12.728a1 1 0 1 0-1.414 1.414l.707.707a1 1 0 0 0 1.414-1.414l-.707-.707Z"
      clipRule="evenodd"
    ></path>
  </svg>
)
