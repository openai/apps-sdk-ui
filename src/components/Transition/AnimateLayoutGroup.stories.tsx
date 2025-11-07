import clsx from "clsx"
import { useState } from "react"

import { Button } from "../Button"
import { AnimateLayoutGroup } from "./AnimateLayoutGroup"

import type { Meta } from "@storybook/react"

const meta = {
  title: "Transitions/AnimateLayoutGroup",
  component: AnimateLayoutGroup,
} satisfies Meta<typeof AnimateLayoutGroup>

export default meta

export const VerticalList = () => {
  const [list, setList] = useState<{ id: string }[]>([])

  const handleRemove = (idToRemove: string) => {
    setList((c) => c.filter((item) => item.id !== idToRemove))
  }

  return (
    <div>
      <div className="text-center mb-6">
        <Button
          color="primary"
          className="w-[100px]"
          variant="outline"
          onClick={(evt) => {
            evt.preventDefault()
            setList((current) => [...current, { id: Math.random().toString(36).substr(2, 9) }])
          }}
        >
          Add item
        </Button>
        <p className="mt-2 opacity-50">(Click to remove)</p>
      </div>
      <div className="w-[450px]">
        <div className="py-2">
          <Secondary className="h-[50px]" />
        </div>
        <AnimateLayoutGroup
          initial={{ y: -10, opacity: 0, blur: 0 }}
          enter={{ y: 0, delay: 150, duration: 600 }}
          exit={{ scale: 0.8, blur: 10, duration: 400 }}
          layoutEnter={{ duration: 400, timingFunction: "ease" }}
          layoutExit={{ delay: 150 }}
        >
          {list.map(({ id }) => (
            <div className="py-2" key={id}>
              <Primary className="h-[50px] cursor-pointer" onClick={() => handleRemove(id)} />
            </div>
          ))}
        </AnimateLayoutGroup>
        <div className="py-2">
          <Secondary className="h-[50px]" />
        </div>
      </div>
    </div>
  )
}

export const HorizontalList = () => {
  const [list, setList] = useState<{ id: string }[]>([])

  const handleRemove = (idToRemove: string) => {
    setList((c) => c.filter((item) => item.id !== idToRemove))
  }

  return (
    <div>
      <div className="text-center mb-6">
        <Button
          color="primary"
          className="w-[100px]"
          variant="outline"
          onClick={(evt) => {
            evt.preventDefault()
            setList((current) => [...current, { id: Math.random().toString(36).substr(2, 9) }])
          }}
        >
          Add item
        </Button>
        <p className="mt-2 opacity-50">(Click to remove)</p>
      </div>
      <div className="h-[120px] flex">
        <div className="px-2">
          <Secondary className="w-[80px] h-[80px]" />
        </div>
        <AnimateLayoutGroup dimension="width">
          {list.map(({ id }) => (
            <div className="px-2" key={id}>
              <Primary
                className="w-[80px] h-[80px] cursor-pointer"
                onClick={() => handleRemove(id)}
              />
            </div>
          ))}
        </AnimateLayoutGroup>
        <div className="px-2">
          <Secondary className="w-[80px] h-[80px]" />
        </div>
      </div>
    </div>
  )
}

const Secondary = ({ className, ...restProps }: { className?: string }) => (
  <div className={clsx("story-example-secondary rounded-lg", className)} {...restProps} />
)

const Primary = ({ className, ...restProps }: { className?: string; onClick: () => void }) => (
  <div className={clsx("story-example-primary rounded-lg shadow-xl", className)} {...restProps} />
)
