import { useEffect, useRef } from "react"

const MIN_TIME_DELTA = 10
const MIN_CHARS_DELTA = 1
const MAX_SAMPLES = 30
const OUTLIER_STD_DEVS = 2

export function useCharactersPerSecond(text: string, streaming: boolean): () => number {
  const samplesRef = useRef<number[]>([])
  const lastLengthRef = useRef(text.length)
  const lastTimeRef = useRef(Date.now())

  useEffect(() => {
    if (!streaming) return

    const now = Date.now()
    const length = text.length
    const charsDelta = length - lastLengthRef.current
    const timeDelta = now - lastTimeRef.current
    if (charsDelta < MIN_CHARS_DELTA || timeDelta < MIN_TIME_DELTA) return

    const timeDeltaSeconds = timeDelta / 1000
    const cps = charsDelta / timeDeltaSeconds

    const samples = samplesRef.current
    samples.push(cps)
    if (samples.length > MAX_SAMPLES) samples.shift()

    lastLengthRef.current = length
    lastTimeRef.current = now
  }, [text, streaming])

  return () => {
    const samples = samplesRef.current
    const currentMean = mean(samples)
    const currentStdDev = standardDeviation(samples, currentMean)

    const filteredSamples = samples.filter((val) => {
      const distance = Math.abs(val - currentMean)
      return distance <= OUTLIER_STD_DEVS * currentStdDev
    })

    return mean(filteredSamples)
  }
}

function mean(values: number[]): number {
  if (!values.length) return 0
  const sum = values.reduce((acc, val) => acc + val, 0)
  return sum / values.length
}

function standardDeviation(values: number[], avg: number): number {
  if (!values.length) return 0
  const variance = values.reduce((acc, val) => acc + (val - avg) ** 2, 0) / values.length
  return Math.sqrt(variance)
}
