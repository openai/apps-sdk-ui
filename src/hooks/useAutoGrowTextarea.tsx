import { type RefObject, useCallback, useEffect, useLayoutEffect, useRef } from "react"

export const useAutoGrowTextarea = (ref: RefObject<HTMLTextAreaElement | null>, value: string) => {
  const lastScrollHeight = useRef<number>(0)
  const lastWidth = useRef<number | null>(null)

  const measureAndMutate = useCallback(
    (textarea: HTMLTextAreaElement, controlledValue: string = "") => {
      textarea.style.height = "0px"
      const { scrollHeight, offsetHeight, offsetWidth, clientHeight } = textarea
      const targetHeight = scrollHeight + (offsetHeight - clientHeight)
      // @ts-expect-error -- This custom value is intentional
      textarea.__autoGrowHeightValue = targetHeight
      textarea.style.height = `${targetHeight}px`

      if (
        lastScrollHeight.current < scrollHeight &&
        textarea.selectionEnd === controlledValue.length
      ) {
        textarea.scrollTop = scrollHeight
      }
      lastScrollHeight.current = textarea.scrollHeight
      lastWidth.current = offsetWidth
    },
    [],
  )

  // Consumers pass us the value, which they are using as a controlled component.
  // React will commit this value into the DOM before this hook is fired.
  useLayoutEffect(() => {
    const textarea = ref.current
    if (!textarea) {
      return
    }

    measureAndMutate(textarea, value)
  }, [ref, value, measureAndMutate])

  useEffect(() => {
    const textarea = ref.current
    if (!textarea) {
      return
    }

    const observer = new ResizeObserver(() => {
      const nextWidth = textarea.offsetWidth
      // Only concerned with width changes that might affect the last measured height
      if (lastWidth.current == null || nextWidth !== lastWidth.current) {
        measureAndMutate(textarea, textarea.value)
      }
    })

    observer.observe(textarea)

    return () => {
      observer.disconnect()
    }
  }, [ref, measureAndMutate])
}

export const unsafeForceCalculateAutoGrowHeight = (textarea: HTMLTextAreaElement) => {
  // Reset the height to baseline (min-height will apply)
  textarea.style.height = "0px"
  // scrollHeight does not account for border thickness, which we can
  // calculate by comparing offset and client height.
  const { scrollHeight, offsetHeight, clientHeight } = textarea
  const targetHeight = scrollHeight + (offsetHeight - clientHeight)
  // @ts-expect-error -- This custom value is intentional
  textarea.__autoGrowHeightValue = targetHeight
  textarea.style.height = `${targetHeight}px`
}

export const getAutoGrowTextareaHeight = (textarea: HTMLTextAreaElement) =>
  // @ts-expect-error -- Avoid unnecessary paints by reading stored height
  textarea.__autoGrowHeightValue || textarea.clientHeight
