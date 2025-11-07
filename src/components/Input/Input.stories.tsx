import { type Meta } from "@storybook/react"
import { useState } from "react"
import { Button } from "../Button"
import { Search, X } from "../Icon"
import { Input, type InputProps } from "./"

const meta = {
  title: "Components/Input",
  component: Input,
  args: {
    placeholder: "Enter text...",
    allowAutofillExtensions: false,
    disabled: false,
    invalid: false,
  },
} satisfies Meta<typeof Input>

export default meta

export const Base = (args: InputProps) => <Input {...args} />

export const Sizing = (args: InputProps) => {
  const [username, setUsername] = useState<string>("")

  return (
    <div className="flex flex-col gap-2.5 justify-start items-start w-[220px]">
      <Input {...args} />
      <Input
        {...args}
        placeholder="Search..."
        startAdornment={<Search className="fill-tertiary" />}
      />
      <Input
        {...args}
        value={username}
        placeholder="Username"
        onChange={(evt) => setUsername(evt.target.value)}
        maxLength={16}
        endAdornment={
          <span className="mt-[1.5px] tabular-nums text-tertiary text-[.875em]">
            {username.length}/16
          </span>
        }
      />
    </div>
  )
}

Sizing.args = {
  size: "lg",
  pill: false,
}

Sizing.parameters = {
  controls: { include: ["size", "gutterSize", "pill"] },
}

Sizing.argTypes = {
  size: { control: "select" },
  gutterSize: { control: "select" },
}

export const StartAdornment = (args: InputProps) => <Input {...args} />

StartAdornment.args = {
  startAdornment: <Search className="fill-tertiary" />,
  placeholder: "Start adornment",
}

StartAdornment.parameters = {
  docs: {
    source: {
      code: `<Input
  placeholder="Start adornment"
  startAdornment={<Search className="fill-tertiary" />}
/>`,
    },
  },
}

export const EndAdornment = () => {
  const [value, setValue] = useState<string>("Clearable value")

  return (
    <div className="w-[220px]">
      <Input
        placeholder="Enter text..."
        value={value}
        onChange={(evt) => setValue(evt.target.value)}
        pill
        endAdornment={
          value ? (
            <Button
              className="-mr-2.5"
              color="secondary"
              variant="soft"
              uniform
              size="3xs"
              onClick={() => setValue("")}
              pill
            >
              <X />
            </Button>
          ) : undefined
        }
      />
    </div>
  )
}

EndAdornment.parameters = {
  docs: {
    source: {
      code: `<Input
  placeholder="Enter text..."
  value={value}
  onChange={(evt) => setValue(evt.target.value)}
  pill
  endAdornment={
    value ? (
      <Button
        className="-mr-2.5"
        color="secondary"
        variant="soft"
        uniform
        size="3xs"
        onClick={() => setValue("")}
        pill
      >
        <X />
      </Button>
    ) : undefined
  }
/>`,
    },
  },
}

export const Disabled = (args: InputProps) => <Input {...args} />
Disabled.args = {
  disabled: true,
  defaultValue: "Jane Doe",
}
Disabled.parameters = {
  controls: { include: ["disabled"] },
}

export const Invalid = (args: InputProps) => <Input {...args} />
Invalid.args = {
  invalid: true,
  placeholder: "Invalid input",
}
Invalid.parameters = {
  controls: { include: ["invalid"] },
}

export const AutoSelect = (args: InputProps) => (
  <Input {...args} defaultValue="Toggle to auto select" />
)
AutoSelect.args = {
  autoSelect: false,
  placeholder: "Add text...",
}
AutoSelect.parameters = {
  controls: { include: ["autoSelect"] },
}

export const AutofillExtensions = (args: InputProps) => (
  <Input
    key={String(args.allowAutofillExtensions)}
    {...args}
    placeholder={args.allowAutofillExtensions ? "Allowed" : "Not allowed"}
  />
)
AutofillExtensions.args = {
  allowAutofillExtensions: true,
  name: "email",
}

AutofillExtensions.parameters = {
  controls: { include: ["allowAutofillExtensions"] },
}

export const WithButton = (args: InputProps) => (
  <div className="flex gap-2">
    <Input placeholder="jane.doe@gmail.com" size={args.size} variant={args.variant} />
    <Button color="primary" size={args.size} variant={args.variant}>
      Subscribe
    </Button>
  </div>
)

WithButton.args = {
  variant: "outline",
  size: "lg",
}

WithButton.parameters = {
  controls: { include: ["variant", "size"] },
}

WithButton.argTypes = {
  variant: { control: "select" },
  size: { control: "select" },
}

export const OpticalAlignment = (args: InputProps) => (
  <div className="flex flex-col gap-3 w-[360px]">
    <div className="border border-dashed border-alpha/20 rounded-md py-6 px-8">
      <div className="mb-4 text-secondary text-sm">Default</div>
      <label className="text-sm mb-1 block">Field 1</label>
      <Input {...args} pill />
      <label className="mt-3 text-sm mb-1 block">Field 2</label>
      <Input {...args} pill />
      <Button className="mt-3" color="primary" variant="soft" pill>
        Submit
      </Button>
    </div>
    <div className="border border-dashed border-alpha/20 rounded-md py-6 px-8">
      <div className="mb-4 text-secondary text-sm">opticallyAlign="start"</div>
      <label className="text-sm mb-1 block">Field 1</label>
      <Input {...args} opticallyAlign="start" pill />
      <label className="mt-3 text-sm mb-1 block">Field 2</label>
      <Input {...args} opticallyAlign="start" pill />
      <Button className="mt-3" color="primary" variant="soft" opticallyAlign="start" pill>
        Submit
      </Button>
    </div>
  </div>
)

OpticalAlignment.args = {
  placeholder: "Sample input",
}

const VARIANT_OPTIONS = ["outline", "soft"] as const

export const Variants = (args: InputProps) => (
  <div className="pt-1 pb-6 w-full max-w-[500px] mx-auto">
    <RowMatrix
      rowLabels={VARIANT_OPTIONS}
      renderRow={(row) => <Input {...args} className="w-[180px]" variant={VARIANT_OPTIONS[row]} />}
    />
  </div>
)

Variants.args = {
  placeholder: "Enter text...",
}

const RowMatrix = ({
  rowLabels,
  renderRow,
}: {
  rowLabels: Readonly<string[]>
  renderRow: (rowIndex: number) => React.ReactNode
}) => (
  <div className="flex flex-col gap-6">
    {rowLabels.map((row, ri) => (
      <div key={ri} className="flex items-center">
        <div className="text-right text-tertiary text-sm mr-8 -ml-3 min-w-[4rem]">{row}</div>
        <div className="flex-1">{renderRow(ri)}</div>
      </div>
    ))}
  </div>
)
