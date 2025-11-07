import { useState } from "react"

import { Button } from "../Button"
import { TransitionGroup } from "../Transition"

import type { Meta } from "@storybook/react"

const meta = {
  title: "Transitions/TransitionGroup",
  component: TransitionGroup,
} satisfies Meta<typeof TransitionGroup>

export default meta

export const Base = () => {
  const [show, setShow] = useState(true)

  return (
    <div className="w-[200px]">
      <div className="w-[100px] mx-auto mb-6">
        <Button block color="primary" variant="outline" onClick={() => setShow(!show)}>
          {show ? "Hide" : "Show"}
        </Button>
      </div>

      <div className="h-[200px]">
        <TransitionGroup
          className="storybook-tg rounded-lg"
          enterDuration={2000}
          exitDuration={1000}
        >
          {show && <div key="s" className="w-[200px] h-[200px] bg-gray-300 rounded-lg" />}
        </TransitionGroup>
      </div>
    </div>
  )
}
