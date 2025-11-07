import { useEffect, useState, type ComponentProps } from "react"
import ReactMarkdown from "react-markdown"

type MathPlugins = {
  remarkPlugins: NonNullable<ComponentProps<typeof ReactMarkdown>["remarkPlugins"]>
  rehypePlugins: NonNullable<ComponentProps<typeof ReactMarkdown>["rehypePlugins"]>
}

const DEFAULT_EMPTY_STATE = { remarkPlugins: [], rehypePlugins: [] }
let resolvedPluginsCache: MathPlugins | null = null

let pluginLoadPromise: Promise<MathPlugins> | null = null

async function loadMathDeps(): Promise<MathPlugins> {
  if (resolvedPluginsCache) return resolvedPluginsCache
  if (pluginLoadPromise) return pluginLoadPromise

  pluginLoadPromise = (async () => {
    const [{ default: remarkMath }, { default: rehypeKatex }] = await Promise.all([
      import("remark-math"),
      import("rehype-katex"),
    ])

    resolvedPluginsCache = {
      remarkPlugins: [[remarkMath, { singleDollarTextMath: false }]],
      rehypePlugins: [rehypeKatex],
    }
    return resolvedPluginsCache
  })()

  try {
    const plugins = await pluginLoadPromise
    return plugins
  } catch (err) {
    // Reset so a later attempt can retry
    pluginLoadPromise = null
    throw err
  }
}

export function useMathPlugins(enabled: boolean) {
  const [ready, setReady] = useState<boolean>(!!resolvedPluginsCache)

  useEffect(() => {
    if (!enabled || ready) {
      return
    }

    let alive = true
    loadMathDeps()
      .then(() => {
        if (alive) {
          // Force re-render once we have the updated plugins
          setReady(true)
        }
      })
      .catch(() => {})

    return () => {
      alive = false
    }
  }, [enabled, ready])

  return ready && enabled && !!resolvedPluginsCache ? resolvedPluginsCache : DEFAULT_EMPTY_STATE
}
