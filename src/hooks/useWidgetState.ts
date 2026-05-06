import { useCallback, useEffect, useState, type SetStateAction } from "react"
import type { UnknownObject } from "../types"
import { useOpenAiGlobal } from "./useOpenaiGlobal"

export function useWidgetState<T extends UnknownObject>(
  defaultState: T | (() => T),
): readonly [T, (state: SetStateAction<T>) => void]
export function useWidgetState<T extends UnknownObject>(
  defaultState?: T | (() => T | null) | null,
): readonly [T | null, (state: SetStateAction<T | null>) => void]
export function useWidgetState<T extends UnknownObject>(
  defaultState?: T | (() => T | null) | null,
): readonly [T | null, (state: SetStateAction<T | null>) => void] {
  const widgetStateFromWindow = useOpenAiGlobal("widgetState") as T

  const [widgetState, _setWidgetState] = useState<T | null>(() => {
    if (widgetStateFromWindow != null) {
      return widgetStateFromWindow
    }

    return typeof defaultState === "function" ? defaultState() : defaultState ?? null
  })

  useEffect(() => {
    _setWidgetState(widgetStateFromWindow)
  }, [widgetStateFromWindow])

  const setWidgetState = useCallback(
    (state: SetStateAction<T | null>) => {
      _setWidgetState((prevState) => {
        const newState = typeof state === "function" ? state(prevState) : state

        if (newState != null) {
          window.openai.setWidgetState(newState)
        }

        return newState
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [window.openai.setWidgetState],
  )

  return [widgetState, setWidgetState] as const
}
