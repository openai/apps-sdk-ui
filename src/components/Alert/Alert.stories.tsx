import { type Meta } from "@storybook/react"
import { Button } from "../Button"
import { Lightbulb } from "../Icon"
import { TextLink } from "../TextLink"
import { Alert, type AlertProps } from "./"

const meta: Meta<AlertProps> = {
  title: "Components/Alert",
  component: Alert,
  argTypes: {
    actions: { control: false },
  },
} satisfies Meta<typeof Alert>

export default meta

export const Base = (args: AlertProps) => <Alert {...args} />

Base.args = {
  title: "Scheduled maintenance",
  description: "We'll be offline 2 - 4 AM UTC on July 14 while we upgrade our database.",
  actions: (
    <Button color="primary" variant="soft" pill>
      Dismiss
    </Button>
  ),
}

export const TitleOnly = (args: AlertProps) => (
  <div className="mt-4">
    <Alert {...args} />
  </div>
)

TitleOnly.args = {
  title: "Your current access level limits what you can view or modify",
}

TitleOnly.parameters = {
  layout: "padded",
  docs: {
    source: {
      code: `<Alert title="Your current access level limits what you can view or modify" />`,
    },
  },
}

export const DescriptionOnly = (args: AlertProps) => <Alert {...args} />

DescriptionOnly.args = {
  description: (
    <>
      We're working on centralizing SCIM and invite settings. For now, setup is handled within
      individual product settings. <TextLink href="#">Learn more</TextLink>
    </>
  ),
}

export const DismissibleActions = (args: AlertProps) => <Alert {...args} />

DismissibleActions.args = {
  className: "items-start",
  title: "Try our new dashboard layout",
  description:
    "We've introduced a streamlined layout that makes using the dashboard even easier. You can switch back any time.",
  actions: (
    <>
      <Button color="primary" variant="soft" pill>
        Dismiss
      </Button>
      <Button color="primary" variant="solid" pill>
        Try it
      </Button>
    </>
  ),
}

DismissibleActions.parameters = {
  layout: "padded",
  docs: {
    source: {
      code: `<Alert
  className="items-start"
  title="Try our new dashboard layout"
  description="We've introduced a streamlined layout that makes using the dashboard even easier. You can switch back any time."
  actions={(
    <>
      <Button color="primary" variant="soft" pill>
        Dismiss
      </Button>
      <Button color="primary" variant="solid" pill>
        Try it
      </Button>
    </>
  )},
/>`,
    },
  },
}

export const Dismissible = (args: AlertProps) => <Alert {...args} />

Dismissible.args = {
  title: "Thank you!",
  description:
    "Your application has been received. We will review your application and respond within the next 48 hours.",
  onDismiss: () => {},
}

export const Actions = (args: AlertProps) => <Alert {...args} />

Actions.args = {
  title: "Password expires in 3 days",
  description: "Update it now to avoid losing access to your account.",
  color: "warning",
  variant: "soft",
  actions: (
    <Button color="primary" pill>
      Update password
    </Button>
  ),
}

Actions.parameters = {
  layout: "padded",
  docs: {
    source: {
      code: `<Alert
  variant="soft"
  color="warning"
  title="Password expires in 3 days"
  description="Update it now to avoid losing access to your account."
  actions={<Button color="primary" pill>Update password</Button>}
/>`,
    },
  },
}

export const ActionsPlacement = (args: AlertProps) => <Alert {...args} />

ActionsPlacement.args = {
  title: "Our terms of service has been updated",
  description:
    "We've updated our terms to clarify how we handle data, billing, and user permissions. Please review and accept the latest terms to avoid impacting your service.",
  actionsPlacement: "bottom",
  actions: (
    <>
      <Button color="primary" variant="soft" pill>
        Set reminder
      </Button>
      <Button color="primary" variant="solid" pill>
        Review terms
      </Button>
    </>
  ),
}

ActionsPlacement.parameters = {
  docs: {
    source: {
      code: `<Alert
  title="Our terms of service has been updated"
  description="We've updated our terms to clarify how we handle data, billing, and user permissions. Please review and accept the latest terms to avoid impacting your service."
  actions={(
    <>
      <Button color="primary" pill variant="soft">Set reminder</Button>
      <Button color="primary" pill variant="solid">Review terms</Button>
    </>
  )}
  actionsPlacement="bottom"
/>`,
    },
  },
}

export const Indicator = (args: AlertProps) => <Alert {...args} />

Indicator.args = {
  description: (
    <>
      We're working on centralizing SCIM and invite settings. For now, setup is handled within
      individual product settings. <TextLink href="#">Learn more</TextLink>
    </>
  ),
  indicator: <Lightbulb />,
}

Indicator.parameters = {
  docs: {
    source: {
      code: `<Alert
  indicator={<Lightbulb />}
  description={(
    <>
      We're working on centralizing SCIM and invite settings. For now, setup is handled within
      individual product settings. <TextLink href="#">Learn more</TextLink>
    </>
  )}
/>`,
    },
  },
}

export const NoIndicator = (args: AlertProps) => <Alert {...args} />

NoIndicator.args = {
  description:
    "Version 2.18.5 rolls out behind-the-scenes tweaks to caching and background sync. You don’t need to do anything—updates apply automatically the next time you open the app. Most changes are performance-related; if you notice smoother scrolling or slightly faster load times, that's why.",
  indicator: false,
}

NoIndicator.parameters = {
  docs: {
    source: {
      code: `<Alert
  indicator={false}
  description="Version 2.18.5 rolls out behind-the-scenes tweaks to caching and background sync. You don’t need to do anything—updates apply automatically the next time you open the app. Most changes are performance-related; if you notice smoother scrolling or slightly faster load times, that's why."
/>`,
    },
  },
}

const COLOR_OPTIONS = [
  "primary",
  "success",
  "danger",
  "warning",
  "caution",
  "info",
  "discovery",
] as const

export const Colors = (args: AlertProps) => (
  <div className="pt-1 pb-6 w-full max-w-[500px] mx-auto">
    <RowMatrix
      rowLabels={COLOR_OPTIONS}
      renderRow={(row) => (
        <Alert
          color={COLOR_OPTIONS[row]}
          {...args}
          description={
            <>
              Track status updates on <TextLink color="currentcolor">status.openai.com</TextLink>
            </>
          }
        />
      )}
    />
  </div>
)

Colors.args = {
  variant: "outline",
  title: "Scheduled maintenance on Saturday, 2-4 AM PT",
}

Colors.parameters = {
  layout: "padded",
  controls: { include: ["variant"] },
}

Colors.argTypes = {
  variant: { control: "select" },
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
        <div className="text-right text-tertiary text-sm mr-4 -ml-3 min-w-[4rem]">{row}</div>
        <div className="flex-1">{renderRow(ri)}</div>
      </div>
    ))}
  </div>
)
