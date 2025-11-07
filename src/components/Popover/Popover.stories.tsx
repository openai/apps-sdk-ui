import { useState, type FormEvent } from "react"
import { Button } from "../Button"
import { Beta, Code, Functions, Globe, ImageSquare, Search, Tools } from "../Icon"
import { Popover } from "../Popover"
import { usePopoverController } from "./usePopoverController"

export default {
  title: "Components/Popover",
}

export const Base = () => (
  <Popover>
    <Popover.Trigger>
      <Button color="primary">Generate</Button>
    </Popover.Trigger>
    <Popover.Content side="right">
      <Textarea />
      <ActionBar />
    </Popover.Content>
  </Popover>
)

export const NaturalSizing = () => (
  <Popover>
    <Popover.Trigger>
      <Button color="primary" size="lg" variant="ghost" className="font-semibold gap-1.5">
        <Tools /> Actions
      </Button>
    </Popover.Trigger>
    <Popover.Content className="flex p-2" minWidth="auto" side="top">
      <Button color="primary" variant="ghost" gutterSize="sm">
        <Functions height={18} width={18} />
      </Button>
      <Button color="primary" variant="ghost" gutterSize="sm">
        <Search height={18} width={18} />
      </Button>
      <Button color="primary" variant="ghost" gutterSize="sm">
        <Globe height={18} width={18} />
      </Button>
      <Button color="primary" variant="ghost" gutterSize="sm">
        <Code height={18} width={18} />
      </Button>
      <Button color="primary" variant="ghost" gutterSize="sm">
        <ImageSquare height={18} width={18} />
      </Button>
    </Popover.Content>
  </Popover>
)

NaturalSizing.parameters = {
  docs: {
    source: {
      code: `<Popover>
  <Popover.Trigger>
    ...
  </Popover.Trigger>
  <Popover.Content minWidth="auto" side="top">
    ...
  </Popover.Content>
</Popover>`,
    },
  },
}

export const Hover = () => (
  <div className="flex flex-col gap-4">
    <Popover showOnHover>
      <Popover.Trigger>
        <Button color="primary">Static content</Button>
      </Popover.Trigger>
      <Popover.Content width={320} side="right">
        <div className="p-3">
          <h3 className="mb-0.5 font-semibold">Popover Title</h3>
          <p className="text-sm text-secondary">
            This is an example of a hoverable popover containing presentational content.
          </p>
          <footer className="mt-2 text-xs text-tertiary">Last updated June 20, 2025</footer>
        </div>
      </Popover.Content>
    </Popover>
    <Popover showOnHover>
      <Popover.Trigger>
        <Button color="primary">Interactive content</Button>
      </Popover.Trigger>
      <Popover.Content minWidth={230} side="right">
        <InteractiveContent />
      </Popover.Content>
    </Popover>
  </div>
)

const InteractiveContent = () => {
  const { close } = usePopoverController()
  return (
    <div className="p-4 p-6">
      <h3 className="mb-1 heading-sm font-semibold">Popover with actions</h3>
      <p className="text-sm text-secondary">Try using tab to navigate</p>
      <div className="mt-4 flex gap-2">
        <Button color="secondary" variant="soft" onClick={close}>
          Cancel
        </Button>
        <Button color="primary" onClick={close}>
          Confirm
        </Button>
      </div>
    </div>
  )
}

Hover.parameters = {
  docs: {
    source: {
      code: `<Popover showOnHover>
  <Popover.Trigger>
    ...
  </Popover.Trigger>
  <Popover.Content>
    ...
  </Popover.Content>
</Popover>  
  `,
    },
  },
}

export const Controller = () => {
  return (
    <Popover>
      <Popover.Trigger>
        <Button color="primary">Generate</Button>
      </Popover.Trigger>
      <Popover.Content side="right">
        <ControllerForm />
      </Popover.Content>
    </Popover>
  )
}

const ControllerForm = () => {
  const [value, setValue] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const { shake, close } = usePopoverController()

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault()

    if (!value) {
      shake()
      return
    }

    setSubmitting(true)

    setTimeout(close, 2000)
  }
  return (
    <form onSubmit={handleSubmit}>
      <Textarea value={value} onChange={setValue} />
      <ActionBar loading={submitting} />
    </form>
  )
}

Controller.parameters = {
  docs: {
    source: {
      code: `
const Example = () => {
  return (
    <Popover>
      <Popover.Trigger>
        <Button color="primary">Generate</Button>
      </Popover.Trigger>
      <Popover.Content side="right" surface="glass">
        <ControllerForm />
      </Popover.Content>
    </Popover>
  )
}

const ControllerForm = () => {
  const [value, setValue] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const { shake, close } = usePopoverController()

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault()

    if (!value) {
      shake()
      return
    }

    setSubmitting(true)
    setTimeout(close, 2000)
  }
  return (
    <form onSubmit={handleSubmit}>
      <Textarea value={value} onChange={setValue} />
      <ActionBar loading={submitting} />
    </form>
  )
}
  `,
    },
  },
}

const Textarea = ({
  value,
  onChange,
}: {
  value?: string
  onChange?: (nextValue: string) => void
}) => (
  <textarea
    value={value}
    onChange={(evt) => onChange?.(evt.target.value)}
    placeholder="Describe what you're using the model for, and we'll generate system instructions."
    style={{
      width: "100%",
      height: 80,
      background: "none",
      padding: "8px 12px 12px",
      border: 0,
      fontSize: 14,
      lineHeight: "20px",
      resize: "none",
      outline: 0,
    }}
  />
)

const ActionBar = ({ loading }: { loading?: boolean }) => {
  return (
    <div className="px-2 pb-2 flex items-center justify-between">
      <div className="flex gap-1 items-center font-normal text-sm text-tertiary">
        <Beta width={16} height={16} />
        Free beta
      </div>
      <Button color="primary" size="xs" loading={loading} type="submit">
        Create
      </Button>
    </div>
  )
}
