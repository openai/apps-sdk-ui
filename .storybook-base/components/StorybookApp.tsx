// Controls are not working without this - if removing, ensure controls in stories update the component
"use no memo"
import { DocsContainer, type DocsContainerProps } from "@storybook/blocks"
import { type Decorator } from "@storybook/react"
import { useEffect, useLayoutEffect, useRef, type PropsWithChildren } from "react"
import { AppsSDKUIProvider } from "../../src/components/AppsSDKUIProvider"
import { applyDocumentTheme } from "../../src/lib/theme"
import type { Theme } from "../addon-theme/constants"
import { THEMES } from "../addon-theme/themes"
// Storybook overrides
import { DEFAULT_THEME } from "../addon-theme/constants"

interface DocsContextWithGlobals extends DocsContainerProps {
  context: DocsContainerProps["context"] & {
    store?: { userGlobals?: { globals?: { theme?: Theme } } }
  }
}

export const WithTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme

  useLayoutEffect(() => {
    applyDocumentTheme(theme || DEFAULT_THEME)
  }, [theme])

  return <Story />
}

export const WithAppsSDKUIContext: Decorator = (Story, { parameters }) => {
  return (
    <AppsSDKUIProvider linkComponent={parameters.linkComponent ?? "a"}>
      <Story />
    </AppsSDKUIProvider>
  )
}

export const CustomDocsContainer = ({
  children,
  context,
}: PropsWithChildren<DocsContextWithGlobals>) => {
  const themeColor = context?.store?.userGlobals?.globals?.theme ?? DEFAULT_THEME
  const wrapperRef = useRef<HTMLDivElement>(null)
  const observeRef = useRef<ResizeObserver | null>(null)

  // Fix scroll restoration being weird in Storybook
  useEffect(() => {
    const saveScroll = () => {
      sessionStorage.setItem("oai:storybook:scroll-top", window.scrollY.toString())
    }
    const applyScroll = () => {
      const scrollTop = parseInt(sessionStorage.getItem("oai:storybook:scroll-top") || "0", 10)
      if (!wrapperRef.current) return
      observeRef.current?.disconnect()
      observeRef.current = new ResizeObserver(([e]) => {
        if (e.contentRect.height >= scrollTop) {
          // Wait for a moment for rendering to complete
          setTimeout(() => {
            window.scrollTo(0, scrollTop)
          }, 100)
          sessionStorage.removeItem("oai:storybook:scroll-top")
          observeRef.current?.disconnect()
        }
      })
      observeRef.current.observe(wrapperRef.current)
    }
    applyScroll()
    import.meta.hot?.on("vite:beforeFullReload", saveScroll)
    import.meta.hot?.on("vite:beforeUpdate", saveScroll)
    return () => {
      observeRef.current?.disconnect()
      import.meta.hot?.off("vite:beforeFullReload", saveScroll)
      import.meta.hot?.off("vite:beforeUpdate", saveScroll)
    }
  }, [])

  useLayoutEffect(() => {
    applyDocumentTheme(themeColor || DEFAULT_THEME)
  }, [themeColor])

  return (
    <div ref={wrapperRef}>
      <DocsContainer context={context} theme={THEMES[themeColor]}>
        {children}
      </DocsContainer>
    </div>
  )
}
