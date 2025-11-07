import { type Meta } from "@storybook/react"
import { EMAIL_REGEX } from "../../lib/constants"
import { TagInput, type TagInputProps } from "./"

const meta: Meta<TagInputProps> = {
  title: "Components/TagInput",
  component: TagInput,
  args: {
    placeholder: "example@openai.com",
    validator: (email) => EMAIL_REGEX.test(email),
    rows: 3,
    autoFocus: true,
  },
} satisfies Meta<typeof TagInput>

export default meta

export const Base = (args: TagInputProps) => (
  <div style={{ width: 350 }}>
    <TagInput {...args} />
  </div>
)
