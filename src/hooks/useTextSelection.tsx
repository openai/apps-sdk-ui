import { type RefObject, useEffect, useId } from "react"
import { useLatestValue } from "./useLatestValue"

type Handler = {
  id: string
  callback: RefObject<(selection: Selection | null) => void>
}

let handlers: Handler[] = []
let listenerBound = false

const handleSelectionChange = () => {
  // Wait until the next tick
  setTimeout(() => {
    const selection = window.getSelection?.()
    const selectionEmpty = !selection || selection.rangeCount === 0

    handlers.forEach(({ callback }) => {
      callback.current(selectionEmpty ? null : selection)
    })
  })
}

const managerListener = () => {
  if (handlers.length > 0 && !listenerBound) {
    document.addEventListener("mouseup", handleSelectionChange)
    listenerBound = true
  } else if (handlers.length === 0 && listenerBound) {
    document.removeEventListener("mouseup", handleSelectionChange)
    listenerBound = false
  }
}

const registerHandler = (handler: Handler) => {
  handlers.push(handler)
  managerListener()
}

const unregisterHandler = ({ id }: Handler) => {
  handlers = handlers.filter((h) => h.id !== id)
  managerListener()
}

export const useTextSelection = (
  listening: boolean,
  cb: (currentSelection: Selection | null) => void,
) => {
  const id = useId()
  const latestCallback = useLatestValue(cb)

  useEffect(() => {
    if (!listening) {
      return
    }

    const handler = { id, callback: latestCallback }
    registerHandler(handler)

    return () => unregisterHandler(handler)
  }, [id, listening, latestCallback])
}

export const clearTextSelection = () => {
  const selection = window.getSelection?.()

  if (!selection || selection.type === "None") {
    return
  }

  selection.removeAllRanges()
}
