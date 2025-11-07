import { Button } from "../Button"
import { ArrowUpRight, Beta, Explore, Mic, Plus, Search } from "../Icon"
import { TextLink } from "../TextLink"
import { EmptyMessage } from "./EmptyMessage"

export default {
  title: "Components/EmptyMessage",
}

export const Base = () => (
  <EmptyMessage>
    <EmptyMessage.Icon>
      <Explore />
    </EmptyMessage.Icon>
    <EmptyMessage.Title>Your evaluations will appear here</EmptyMessage.Title>
    <EmptyMessage.Description>
      Create an evaluation to assess your model's responses
    </EmptyMessage.Description>
    <EmptyMessage.ActionRow>
      <Button color="primary" onClick={() => {}} size="lg">
        <Plus className="mr-[-2px]" />
        Create
      </Button>
    </EmptyMessage.ActionRow>
  </EmptyMessage>
)

export const Error = () => (
  <EmptyMessage>
    <EmptyMessage.Icon color="danger">
      <Mic />
    </EmptyMessage.Icon>
    <EmptyMessage.Title color="danger">
      Enable microphone access in your browser's settings.
    </EmptyMessage.Title>
  </EmptyMessage>
)

export const Warning = () => (
  <EmptyMessage>
    <EmptyMessage.Icon color="warning">
      <Beta />
    </EmptyMessage.Icon>
    <EmptyMessage.Title>o1-preview is in beta</EmptyMessage.Title>
    <EmptyMessage.Description>
      System instructions and model configuration are not available yet. Responses may take longer.
    </EmptyMessage.Description>
    <EmptyMessage.ActionRow className="text-sm">
      <TextLink href="/">
        Learn more
        <ArrowUpRight />
      </TextLink>
    </EmptyMessage.ActionRow>
  </EmptyMessage>
)

export const Empty = () => (
  <EmptyMessage fill="none">
    <EmptyMessage.Icon size="sm">
      <Search />
    </EmptyMessage.Icon>
    <EmptyMessage.Description>
      No icons found matching <span className="font-semibold">"pizza"</span>
    </EmptyMessage.Description>
  </EmptyMessage>
)
