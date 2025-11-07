import { useState } from "react"

import { Button } from "../Button"
import { SlotTransitionGroup } from "../Transition"

import type { Meta } from "@storybook/react"

const meta = {
  title: "Transitions/SlotTransitionGroup",
  component: SlotTransitionGroup,
} satisfies Meta<typeof SlotTransitionGroup>

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
        <SlotTransitionGroup enterDuration={2000} exitDuration={1000}>
          {show && (
            <div key="s" className="w-[200px] h-[200px] bg-gray-300 rounded-lg storybook-tg" />
          )}
        </SlotTransitionGroup>
      </div>
    </div>
  )
}
