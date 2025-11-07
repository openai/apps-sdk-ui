import { useEffect, useState, type RefObject } from "react"

export const useScrollable = (ref: RefObject<HTMLElement | null>) => {
  const [isScrollable, setIsScrollable] = useState(false)
  const [isAtStart, setIsAtStart] = useState(true)
  const [isAtEnd, setIsAtEnd] = useState(false)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const checkScroll = () => {
      const { scrollHeight, clientHeight, scrollTop } = container
      setIsScrollable(scrollHeight > clientHeight)
      setIsAtStart(scrollTop === 0)
      setIsAtEnd(scrollTop + clientHeight >= scrollHeight)
    }

    checkScroll()

    container.addEventListener("scroll", checkScroll, { passive: true })
    const resizeObserver = new ResizeObserver(checkScroll)
    resizeObserver.observe(container)

    return () => {
      container.removeEventListener("scroll", checkScroll)
      resizeObserver.disconnect()
    }
  }, [ref])

  return { isScrollable, isAtStart, isAtEnd }
}
