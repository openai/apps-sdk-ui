import { useEffect, useState } from "react"

export type DocumentTheme = "light" | "dark"

export function useDocumentTheme() {
  const [theme, setTheme] = useState<"dark" | "light">(getDocumentTheme)

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(getDocumentTheme())
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
      characterData: false,
      childList: false,
      subtree: false,
    })

    return () => observer.disconnect()
  })

  return theme
}

export function getDocumentTheme() {
  const theme = document.documentElement.getAttribute("data-theme")

  if (theme === "dark" || theme === "light") {
    return theme
  }

  const darkMode = document.documentElement.classList.contains("dark")

  return darkMode ? "dark" : "light"
}

export function applyDocumentTheme(theme: "light" | "dark") {
  const htmlTag = document.documentElement
  htmlTag.setAttribute("data-theme", theme)
  htmlTag.style.colorScheme = theme
}
