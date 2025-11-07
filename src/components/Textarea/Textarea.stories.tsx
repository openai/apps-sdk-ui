import { type Meta } from "@storybook/react"
import { useState } from "react"
import { Textarea, type TextareaProps } from "./"

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  args: {
    placeholder: "Enter text...",
    allowAutofillExtensions: false,
    disabled: false,
    invalid: false,
    rows: 3,
    autoResize: false,
  },
} satisfies Meta<typeof Textarea>

export default meta

export const Base = (args: TextareaProps) => (
  <div className="w-[400px]">
    <Textarea {...args} />
  </div>
)

Base.args = {
  autoResize: true,
}

const VARIANT_OPTIONS = ["outline", "soft"] as const

export const Variants = (args: TextareaProps) => (
  <div className="pt-1 pb-6 w-full max-w-[500px] mx-auto">
    <RowMatrix
      rowLabels={VARIANT_OPTIONS}
      renderRow={(row) => (
        <Textarea {...args} className="w-[400px]" variant={VARIANT_OPTIONS[row]} />
      )}
    />
  </div>
)

Variants.args = {
  placeholder: "Enter text...",
  rows: 3,
}

Variants.parameters = {
  controls: { include: ["variant"] },
}

export const Sizing = (args: TextareaProps) => {
  return (
    <div className="flex flex-col gap-2.5 justify-start items-start w-[400px]">
      <Textarea {...args} placeholder="Write a message..." />
    </div>
  )
}

Sizing.args = {
  size: "lg",
}

Sizing.parameters = {
  controls: { include: ["size", "gutterSize"] },
}

Sizing.argTypes = {
  size: { control: "select" },
  gutterSize: { control: "select" },
}

export const Disabled = (args: TextareaProps) => (
  <div className="w-[400px]">
    <Textarea {...args} />
  </div>
)
Disabled.args = {
  disabled: true,
  defaultValue: "Jane Doe",
}
Disabled.parameters = {
  controls: { include: ["disabled"] },
}

export const Invalid = (args: TextareaProps) => (
  <div className="w-[400px]">
    <Textarea {...args} />
  </div>
)
Invalid.args = {
  invalid: true,
  placeholder: "Invalid textarea",
}
Invalid.parameters = {
  controls: { include: ["invalid"] },
}

export const AutoSelect = (args: TextareaProps) => (
  <div className="w-[400px]">
    <Textarea {...args} defaultValue="Toggle to auto select" />
  </div>
)
AutoSelect.args = {
  autoSelect: false,
}
AutoSelect.parameters = {
  controls: { include: ["autoSelect"] },
}

export const AutofillExtensions = (args: TextareaProps) => (
  <div className="w-[400px]">
    <Textarea
      key={String(args.allowAutofillExtensions)}
      {...args}
      placeholder={args.allowAutofillExtensions ? "Allowed" : "Not allowed"}
      name="email"
    />
  </div>
)
AutofillExtensions.args = {
  allowAutofillExtensions: true,
}

AutofillExtensions.parameters = {
  controls: { include: ["allowAutofillExtensions"] },
}

export const AutoResize = (args: TextareaProps) => {
  const [value, setValue] = useState("Line 1\nLine 2\nLine 3")
  return (
    <div className="w-[400px]">
      <Textarea
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type to grow..."
      />
    </div>
  )
}

AutoResize.args = {
  autoResize: true,
  rows: 3,
  maxRows: 8,
}

AutoResize.parameters = {
  controls: { include: ["autoResize", "rows", "maxRows"] },
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
