import clsx from "clsx"
import { Fragment, type ReactNode, useState } from "react"

import { Button } from "../Button"
import { ArrowUp, Wave } from "../Icon"
import { TextLink } from "../TextLink"
import { AnimateLayout } from "../Transition"

import type { Meta } from "@storybook/react"

const meta = {
  title: "Transitions/AnimateLayout",
  component: AnimateLayout,
} satisfies Meta<typeof AnimateLayout>

export default meta

export const SimpleHeight = () => {
  const [show, setShow] = useState(false)

  return (
    <div className="w-[450px] m-auto">
      <div className="w-[100px] mx-auto mb-6">
        <Button block color="primary" variant="outline" onClick={() => setShow(!show)}>
          {show ? "Hide" : "Show"}
        </Button>
      </div>
      <Secondary className="w-full h-12" />
      <AnimateLayout transitionClassName="pt-4">
        {show && <Primary key="box" className="w-full h-[80px]" />}
      </AnimateLayout>
      <Secondary className="w-full h-12 mt-4" />
    </div>
  )
}

export const SimpleWidth = () => {
  const [show, setShow] = useState(false)

  return (
    <div>
      <div className="w-[100px] mx-auto mb-6">
        <Button block color="primary" variant="outline" onClick={() => setShow(!show)}>
          {show ? "Hide" : "Show"}
        </Button>
      </div>
      <div className="flex">
        <Secondary className="w-[200px] h-[200px]" />
        <AnimateLayout
          dimension="width"
          transitionClassName="pl-6"
          enter={{ delay: 200 }}
          layoutExit={{ delay: 75 }}
        >
          {show && <Primary key="box" className="w-[200px] h-[200px]" />}
        </AnimateLayout>
        <Secondary className="w-[200px] h-[1200px00px] ml-6" />
      </div>
    </div>
  )
}

export const Accordion = () => {
  return (
    <div className="max-w-[500px] m-auto">
      <AccordionItem header="Which model should I use?">
        <p>
          We recommend that developers use GPT-4o or GPT-4o mini for everyday tasks. GPT-4o
          generally performs better on a wide range of tasks, while GPT-4o mini is fast and
          inexpensive for simpler tasks. Our o1 reasoning models are ideal for complex, multi-step
          tasks and STEM use cases that require deep thinking about tough problems. We recommend
          experimenting with all of these models in the{" "}
          <TextLink underline color="secondary" href="#">
            Playground
          </TextLink>{" "}
          to explore which models provide the best price performance trade-off for your usage.
        </p>
      </AccordionItem>
      <AccordionItem header="Do you offer an enterprise package or SLAs?">
        <p>
          We offer different tiers of access to our enterprise customers that include SLAs, lower
          latency, and more. Please{" "}
          <TextLink underline color="secondary" href="#">
            contact our sales team
          </TextLink>{" "}
          to learn more.
        </p>
      </AccordionItem>
      <AccordionItem header="Will I be charged for API usage in the Playground?">
        <p>
          Yes, we treat Playground usage the same as regular API usage. You will be billed at the
          per-token input and output prices mentioned above.
        </p>
      </AccordionItem>
      <AccordionItem header="How will I know how many tokens I've used each month?">
        <p>
          A token is a mathematical representation of natural language. Log in to your account to
          view your{" "}
          <TextLink underline color="secondary" href="#">
            usage tracking dashboard
          </TextLink>{" "}
          . This dashboard will show you how many tokens you've used during the current and past
          billing cycles.
        </p>
      </AccordionItem>
      <AccordionItem header="How can I manage my spending on the API platform?">
        <p>
          You can set a monthly budget in{" "}
          <TextLink underline color="secondary" href="#">
            your billing settings
          </TextLink>
          , after which we'll stop serving your requests. There may be a delay in enforcing the
          limit, and you are responsible for any overage incurred. You can also configure an email
          notification threshold to receive an email alert once you cross that threshold each month.
          We recommend checking your{" "}
          <TextLink underline color="secondary" href="#">
            usage tracking dashboard
          </TextLink>{" "}
          regularly to monitor your spend.
        </p>
        <p className="mt-3">
          For customers managing work with Projects, you can set and manage billing restrictions per
          project in the Dashboard.
        </p>
      </AccordionItem>
    </div>
  )
}

const AccordionItem = ({ header, children }: { header: string; children: ReactNode }) => {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="border-0 border-b border-solid border-gray-150 hover:border-gray-350 overflow-hidden"
      style={{ transition: "border-color .15s ease" }}
      data-state={open ? "open" : "closed"}
    >
      <div
        className="flex justify-between items-center pt-4 pb-3 cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        <div className="font-[500]">{header}</div>
        <div className="story-example-plus" />
      </div>
      <AnimateLayout
        initial={{ blur: 0 }}
        enter={{ y: 0, delay: 150, duration: 450 }}
        exit={{ y: -8, blur: 2 }}
        layoutEnter={{ duration: 350 }}
        layoutExit={{ duration: 300 }}
      >
        {open && (
          <div key="content" className="pb-4 text-secondary text-[15px] leading-[1.6]">
            {children}
          </div>
        )}
      </AnimateLayout>
      <div className="mt-1" />
    </div>
  )
}

export const Controls = () => {
  return <div>Realtime playground controls, toggle to reveal more</div>
}

export const Form = () => {
  return <div>Form stuff here, submit button shows error fields</div>
}

export const TalkButton = () => {
  const [recording, setRecording] = useState(false)
  const [sending, setSending] = useState(false)

  const handleClick = () => {
    if (!recording) {
      setRecording(true)
      return
    }

    setSending(true)

    window.setTimeout(() => {
      setSending(false)
      setRecording(false)
    }, 800)
  }

  return (
    <Button
      color={recording ? "danger" : "primary"}
      size="xl"
      iconSize="lg"
      onClick={handleClick}
      loading={sending}
    >
      <AnimateLayout dimension="width" transitionClassName="h-full flex items-center gap-2">
        {recording ? (
          <ArrowUp key="recording" />
        ) : (
          <Fragment key="record">
            <Wave /> Talk
          </Fragment>
        )}
      </AnimateLayout>
    </Button>
  )
}

export const Secondary = ({ className, ...restProps }: { className?: string }) => (
  <div className={clsx("story-example-secondary rounded-lg", className)} {...restProps} />
)

export const Primary = ({ className, ...restProps }: { className?: string }) => (
  <div className={clsx("story-example-primary rounded-lg shadow-xl", className)} {...restProps} />
)
