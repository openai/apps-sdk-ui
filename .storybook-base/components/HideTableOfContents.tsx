// Controls are not working without this - if removing, ensure controls in stories update the component
"use no memo"
import { useLayoutEffect } from "react"

export const HideTableOfContents = () => {
  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-docs-toc", "hidden")

    return () => {
      document.documentElement.removeAttribute("data-docs-toc")
    }
  }, [])

  return (
    <style>
      {`
    .sbdocs-wrapper > div:has(div > .toc-wrapper) {
      display: none;
    }
  `}
    </style>
  )
}
