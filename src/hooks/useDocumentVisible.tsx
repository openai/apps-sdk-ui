import { useEffect, useState } from "react"

export function useDocumentVisible(): boolean {
  const [visible, setVisible] = useState<boolean>(
    () => typeof document === "undefined" || document.visibilityState !== "hidden",
  )

  useEffect(() => {
    if (typeof document === "undefined") {
      return
    }

    const handleVisibility = () => {
      setVisible(document.visibilityState !== "hidden")
    }

    document.addEventListener("visibilitychange", handleVisibility)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility)
    }
  }, [])

  return visible
}
