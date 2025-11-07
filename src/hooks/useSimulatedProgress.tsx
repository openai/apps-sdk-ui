import { useState } from "react"
import { useInterval } from "usehooks-ts"

/**
 * Deterministically returns a progress value between 0 and 100 that decays as it approaches 100,
 * based on a maximum duration and the elapsed time.
 *
 * @param maxTime - The maximum duration (in ms) after which the progress will be 100
 * @param elapsedTime - The elapsed time (in ms) since the start time
 * @returns The simulated progress percentage
 */
export function getSimulatedProgress(maxTime: number, elapsedTime: number) {
  // Parameters
  const P_max = 99.9 // Maximum percentage to approach (less than 100%)
  const P1 = 35 // Percentage at which the rate slows down
  const initialRate = (3 * 100) / maxTime // Initial rate (% per second)
  const t1 = P1 / initialRate // Time when progress reaches P1

  let percentage

  if (elapsedTime <= t1) {
    // **Phase 1:** Linear increase at the start to show consistency in progress
    percentage = initialRate * elapsedTime
  } else {
    // **Phase 2:** Progress slows down, approaching P_max
    const k = 4 // Controls how quickly progress approaches P_max
    const remainingTime = maxTime - t1
    const timeSinceT1 = elapsedTime - t1
    const exponent = -k * (timeSinceT1 / remainingTime)
    percentage = P1 + (P_max - P1) * (1 - Math.exp(exponent))
  }

  // Ensure the percentage does not exceed P_max
  return Math.min(percentage, P_max)
}

/**
 * Returns a number that will increase over time, decaying as it approaches 100,
 * withouth ever reaching the end.
 *
 * @param startAt - The time at which the progress started
 * @param maxDuration - The maximum duration (in ms) after which the progress will be 100
 * @param completed - Sets progress to 100% immediately
 */
export const useSimulatedProgress = (startAt: number, maxDuration: number, completed?: boolean) => {
  const elapsedStartTime = +new Date() - startAt
  const [progress, setProgress] = useState(getSimulatedProgress(maxDuration, elapsedStartTime))

  const incrementProgress = () => {
    const elapsedTime = +new Date() - startAt
    const newProgress =
      elapsedTime >= maxDuration ? 100 : getSimulatedProgress(maxDuration, elapsedTime)
    setProgress(newProgress)
  }

  useInterval(incrementProgress, completed ? null : 100)

  return completed ? 100 : progress
}
