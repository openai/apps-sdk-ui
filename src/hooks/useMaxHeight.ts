import { useOpenAiGlobal } from "./useOpenaiGlobal"

export const useMaxHeight = (): number | null => {
  return useOpenAiGlobal("maxHeight")
}
