import clsx from "clsx"
import { useRef, useState } from "react"

import { Button } from "../Button"
import { Check, Copy } from "../Icon"
import { Animate } from "../Transition"

import type { Meta } from "@storybook/react"

const meta = {
  title: "Transitions/Animate",
  component: Animate,
} satisfies Meta<typeof Animate>

export default meta

export const Fade = () => {
  const [show, setShow] = useState(true)

  return (
    <div className="w-[200px]">
      <div className="w-[100px] mx-auto mb-6">
        <Button block color="primary" variant="outline" onClick={() => setShow(!show)}>
          {show ? "Hide" : "Show"}
        </Button>
      </div>

      <Animate className="w-[200px] h-[200px]">
        {show && <Primary key="s" className="w-[200px] h-[200px]" />}
      </Animate>
    </div>
  )
}

export const Grow = () => {
  const [show, setShow] = useState(true)

  return (
    <div className="w-[200px]">
      <div className="w-[100px] mx-auto mb-6">
        <Button block color="primary" variant="outline" onClick={() => setShow(!show)}>
          {show ? "Hide" : "Show"}
        </Button>
      </div>

      <Animate
        className="w-[200px] h-[200px]"
        enter={{ scale: 1 }}
        exit={{ scale: 0.5, blur: 20 }}
        forceCompositeLayer
      >
        {show && <Primary key="s" className="w-[200px] h-[200px]" />}
      </Animate>
    </div>
  )
}

export const Continuous = () => {
  const [show, setShow] = useState(true)

  return (
    <div className="w-[200px]">
      <div className="w-[100px] mx-auto mb-6">
        <Button block color="primary" variant="outline" onClick={() => setShow(!show)}>
          {show ? "Hide" : "Show"}
        </Button>
      </div>

      <Animate
        className="w-[200px] h-[200px]"
        initial={{ x: 120, skewX: 30 }}
        enter={{ duration: 800 }}
        exit={{ x: -120, skewX: -8, duration: 500 }}
        forceCompositeLayer
      >
        {show && <Primary key="s" className="w-[200px] h-[200px]" />}
      </Animate>
    </div>
  )
}

export const CrossFade = () => {
  const [copied, setCopied] = useState(false)
  const copiedTimeout = useRef<number | null>(null)

  const handleClick = () => {
    // No-op when copied is true
    if (copied) {
      return
    }

    setCopied(true)

    copiedTimeout.current = window.setTimeout(() => {
      setCopied(false)
    }, 1300)
  }

  return (
    <Button size="2xl" iconSize="xl" variant="soft" color="secondary" onClick={handleClick}>
      <Animate
        className="w-[var(--button-icon-size)] h-[var(--button-icon-size)]"
        enter={{ scale: 1, delay: 150, duration: 300 }}
        exit={{ scale: 0.6, duration: 150 }}
        forceCompositeLayer
      >
        {copied ? <Check key="copied-icon" /> : <Copy key="copy-icon" />}
      </Animate>
    </Button>
  )
}

const Primary = ({ className, ...restProps }: { className?: string }) => (
  <div className={clsx("story-example-primary rounded-lg shadow-xl", className)} {...restProps} />
)
