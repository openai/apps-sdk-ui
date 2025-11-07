export type { Theme } from "./constants"
import { DEFAULT_THEME, type Theme } from "./constants"

const STORAGE_KEY = "sb-addon-oai-theme-1"

const getThemeFromUrl = (urlString: string): string | null => {
  const url = new URL(urlString)
  const params = url.searchParams
  const globals = params.get("globals")
  if (globals) {
    const pairs = globals.split(";")
    for (const pair of pairs) {
      const [key, value] = pair.split(":")
      if (key === "theme") {
        return value
      }
    }
  }
  return null
}

export const setThemeStore = (theme: Theme) => {
  window.localStorage.setItem(STORAGE_KEY, theme)
}

export const getThemeStore = (): Theme => {
  const themeFromURL = getThemeFromUrl(window.location.href)
  if (themeFromURL === "light" || themeFromURL === "dark") {
    setThemeStore(themeFromURL)
    return themeFromURL
  }

  const themeFromStorage = window.localStorage.getItem(STORAGE_KEY) as Theme | undefined
  return themeFromStorage || DEFAULT_THEME
}

export const applyManagerThemeClass = (nextTheme: Theme) => {
  const htmlTag = document.documentElement
  htmlTag.setAttribute("data-theme", nextTheme)
  htmlTag.style.colorScheme = nextTheme
}
