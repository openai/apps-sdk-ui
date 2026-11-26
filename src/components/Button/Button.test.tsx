import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Button, ButtonLink } from "./Button"

describe("Button color defaults", () => {
  it("accepts omitted color on Button", () => {
    const { getByRole } = render(<Button variant="soft">Cancel</Button>)
    expect(getByRole("button")).toHaveAttribute("data-color", "primary")
  })

  it("accepts omitted color on ButtonLink", () => {
    const { getByRole } = render(
      <ButtonLink as="a" href="/help">
        Help
      </ButtonLink>,
    )
    expect(getByRole("link")).toHaveAttribute("data-color", "primary")
  })

  it("preserves explicitly chosen colors", () => {
    const { getByRole } = render(
      <>
        <Button color="secondary">Cancel</Button>
        <ButtonLink as="a" color="danger" href="/help">
          Help
        </ButtonLink>
      </>,
    )
    expect(getByRole("button")).toHaveAttribute("data-color", "secondary")
    expect(getByRole("link")).toHaveAttribute("data-color", "danger")
  })
})
