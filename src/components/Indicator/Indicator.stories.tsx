import { type Meta } from "@storybook/react"
import { useEffect, useState } from "react"
import { toCssVariables } from "../../lib/helpers"
import {
  CircularProgress,
  LoadingDots,
  LoadingIndicator,
  type CircularProgressProps,
  type LoadingDotsProps,
  type LoadingIndicatorProps,
} from "./"

const meta: Meta = {
  title: "Components/Indicators",
  component: LoadingIndicator,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof LoadingIndicator>

export default meta

export const Base = () => <LoadingIndicator />

Base.parameters = {
  docs: {
    source: {
      code: `<LoadingIndicator />`,
    },
  },
}

export const LoadingIndicatorBase = (args: LoadingIndicatorProps) => <LoadingIndicator {...args} />

LoadingIndicatorBase.args = {
  size: 24,
}

export const LoadingIndicatorSizing = (args: LoadingIndicatorProps) => (
  <LoadingIndicator {...args} />
)

LoadingIndicatorSizing.argTypes = {
  size: {
    control: { type: "range", min: 10, max: 50, step: 2 },
  },
  strokeWidth: {
    control: { type: "range", min: 1, max: 10, step: 1 },
  },
}

LoadingIndicatorSizing.args = {
  size: 30,
  strokeWidth: 2,
}

LoadingIndicatorSizing.parameters = {
  controls: { include: ["size", "strokeWidth"] },
}

export const LoadingIndicatorColor = (args: LoadingIndicatorProps) => (
  <div className="flex items-center gap-2 text-danger">
    <LoadingIndicator {...args} />
    Destroying forever...
  </div>
)

export const LoadingIndicatorSpeed = (args: LoadingIndicatorProps) => (
  <div style={toCssVariables({ "indicator-rotate-duration": "3s" })}>
    <LoadingIndicator {...args} />
  </div>
)

export const CircularProgressBase = (args: CircularProgressProps) => (
  <ContinuousCircularProgress {...args} />
)

CircularProgressBase.parameters = {
  docs: { source: { code: `<CircularProgress />` } },
}

export const CircularProgressStaticProgress = (_args: CircularProgressProps) => (
  <CircularProgress progress={25} />
)

export const CircularProgressSizing = (args: CircularProgressProps) => (
  <ContinuousCircularProgress {...args} />
)

CircularProgressSizing.argTypes = {
  size: {
    control: { type: "range", min: 10, max: 50, step: 2 },
  },
  strokeWidth: {
    control: { type: "range", min: 1, max: 4, step: 1 },
  },
}

CircularProgressSizing.args = {
  size: 30,
  strokeWidth: 2,
}

CircularProgressSizing.parameters = {
  controls: { include: ["size", "strokeWidth"] },
}

export const CircularProgressColor = (args: CircularProgressProps) => (
  <ContinuousCircularProgress {...args} />
)

CircularProgressColor.args = {
  trackColor: "var(--alpha-15)",
  trackActiveColor: "var(--gray-1000)",
}

export function ContinuousCircularProgress(props: CircularProgressProps) {
  const [done, setDone] = useState<boolean>(false)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setDone(true)

      setTimeout(() => {
        setDone(false)
        setTick((t) => t + 1)
      }, 500)
    }, 4000)

    return () => clearInterval(id)
  }, [])

  return <CircularProgress key={tick} {...props} done={done} />
}

export const LoadingDotsBase = (args: LoadingDotsProps) => <LoadingDots {...args} />

export const LoadingDotsColor = (args: LoadingDotsProps) => (
  <LoadingDots className="text-danger" {...args} />
)
