import { type DisplayMode } from "../types"
import { useOpenAiGlobal } from "./useOpenaiGlobal"

export const useDisplayMode = (): DisplayMode | null => {
  return useOpenAiGlobal("displayMode")
}
