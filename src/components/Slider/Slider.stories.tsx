import { type Meta } from "@storybook/react"
import { useState } from "react"
import { Tooltip } from "../Tooltip"
import { Slider, type SliderProps } from "./"

const meta = {
  title: "Components/Slider",
  component: Slider,
  args: {
    label: "Example field",
    min: 0,
    max: 2000,
    resetValue: 1000,
    step: 10,
    unit: "ms",
    disabled: false,
  },
  argTypes: {
    label: { control: "text" },
    className: { control: false },
    onFocus: { control: false },
    onBlur: { control: false },
    onChange: { control: false },
    value: { control: false },
    marks: { control: false },
    ref: { table: { disable: true } },
  },
} satisfies Meta<typeof Slider>

export default meta

export const Base = (args: SliderProps) => {
  const [a, setA] = useState(1000)
  return (
    <div style={{ width: 300 }}>
      <Slider {...args} value={a} onChange={setA} />
    </div>
  )
}

export const Tooltips = (args: SliderProps) => {
  const [a, setA] = useState(1000)
  return (
    <div style={{ width: 300 }}>
      <Slider
        {...args}
        label={
          <Tooltip content="More details about this field">
            <Tooltip.TriggerDecorator>{args.label}</Tooltip.TriggerDecorator>
          </Tooltip>
        }
        value={a}
        onChange={setA}
      />
    </div>
  )
}

export const Marks = () => {
  const [b, setB] = useState(3)
  const [c, setC] = useState(2)

  const widthExample = (
    <Slider
      value={c}
      label="Select the lowest passing grade"
      min={1}
      max={3}
      step={1}
      onChange={setC}
      marks={[
        { value: 1, label: "Inaccurate" },
        { value: 2, label: "Some inaccuracies" },
        { value: 3, label: "Accurate" },
      ]}
      trackColor="#61C454"
      rangeColor="#EF4146"
    />
  )

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-[400px]">
        <div className="pb-5">
          <Slider
            value={b}
            label="Passing grade"
            min={1}
            max={5}
            step={1}
            onChange={setB}
            marks={[
              { value: 1, label: "1" },
              { value: 2, label: "2" },
              { value: 3, label: "3" },
              { value: 4, label: "4" },
              { value: 5, label: "5" },
            ]}
            trackColor="#61C454"
            rangeColor="#EF4146"
          />
        </div>
        <div className="pb-5 w-[400px]">{widthExample}</div>
        <div className="pb-5 w-[230px]">{widthExample}</div>
        <div className="w-[100px]">{widthExample}</div>
      </div>
    </div>
  )
}
