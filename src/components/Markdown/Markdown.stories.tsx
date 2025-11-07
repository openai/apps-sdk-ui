import type { Meta } from "@storybook/react"
import { Markdown } from "./Markdown"
import sampleLatex from "./sampleLatex.md?raw"
import sampleMarkdown from "./sampleMarkdown.md?raw"

const meta = {
  title: "Components/Markdown",
  component: Markdown,
  argTypes: {
    children: { control: false },
  },
} satisfies Meta<typeof Markdown>

export default meta

export const Base = () => <Markdown>{sampleMarkdown}</Markdown>

Base.parameters = {
  docs: {
    source: {
      code: `
  <Markdown>{markdownContent}</Markdown>
`,
    },
  },
}

export const Math = () => {
  return <Markdown includeMath>{sampleLatex}</Markdown>
}

Math.parameters = {
  docs: {
    source: {
      code: `
  <Markdown includeMath>{markdownWithLatex}</Markdown>
`,
    },
  },
}
