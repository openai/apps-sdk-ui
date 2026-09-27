import { userEvent } from "@storybook/test"
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Base, FeedItemExample } from "./Feed.stories"

const getPost = (author = "Maya Chen") => screen.getByRole("article", { name: author })
const getReplyButton = (author = "Maya Chen") =>
  screen.getByRole("button", { name: `Reply to post by ${author}` })
const getMenuButton = (author = "Maya Chen") =>
  screen.getByRole("button", { name: `More actions for post by ${author}` })

const openReport = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(getMenuButton())
  await user.click(await screen.findByRole("menuitem", { name: "Report post" }))
  await waitFor(() => expect(screen.getByRole("button", { name: "Cancel" })).toHaveFocus())
}

describe("Feed item actions", () => {
  it("toggles likes without changing another post", async () => {
    const user = userEvent.setup()
    render(<Base />)
    const button = within(getPost()).getByRole("button", { name: "Like post by Maya Chen" })
    await user.click(button)
    expect(button).toHaveAttribute("aria-pressed", "true")
    expect(button).toHaveAccessibleDescription("13 likes")
    expect(
      within(getPost("Alex Rivera")).getByRole("button", { name: "Like post by Alex Rivera" }),
    ).toHaveAccessibleDescription("8 likes")
    await user.click(button)
    expect(button).toHaveAttribute("aria-pressed", "false")
    expect(button).toHaveAccessibleDescription("12 likes")
  })

  it("opens the editor and restores a draft after closing", async () => {
    const user = userEvent.setup()
    render(<Base />)
    await user.click(getReplyButton())
    const input = screen.getByRole("textbox", { name: "Your reply" })
    await waitFor(() => expect(input).toHaveFocus())
    expect(getReplyButton()).toHaveAttribute("aria-expanded", "true")
    await user.type(input, "An unfinished reply")
    await user.click(screen.getByRole("button", { name: "Close" }))
    expect(getReplyButton()).toHaveFocus()
    expect(getReplyButton()).toHaveAttribute("aria-expanded", "false")
    await user.click(getReplyButton())
    expect(screen.getByRole("textbox", { name: "Your reply" })).toHaveValue("An unfinished reply")
  })

  it("posts a multiline reply exactly once and resets the composer", async () => {
    const user = userEvent.setup()
    render(<Base />)
    await user.click(getReplyButton())
    const input = screen.getByRole("textbox", { name: "Your reply" })
    expect(screen.getByRole("button", { name: "Post reply" })).toBeDisabled()
    await user.type(input, "First line{Enter}Second line")
    expect(input).toHaveValue("First line\nSecond line")
    expect(within(getPost()).queryByRole("list")).not.toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: "Post reply" }))
    expect(within(getPost()).getByRole("list", { name: "Replies to Maya Chen" })).toHaveTextContent(
      "First line Second line",
    )
    expect(getReplyButton()).toHaveAccessibleDescription("1 reply")
    expect(getReplyButton()).toHaveFocus()
    await user.click(getReplyButton())
    expect(screen.getByRole("textbox", { name: "Your reply" })).toHaveValue("")
  })

  it("does not submit a blank reply", async () => {
    const user = userEvent.setup()
    render(<Base />)
    await user.click(getReplyButton())
    await user.type(screen.getByRole("textbox", { name: "Your reply" }), "   ")
    fireEvent.submit(screen.getByRole("form", { name: "Reply to Maya Chen" }))
    expect(screen.getByRole("button", { name: "Post reply" })).toBeDisabled()
    expect(getReplyButton()).toHaveAccessibleDescription("0 replies")
  })

  it("keeps separate drafts and unique labels for each item", async () => {
    const user = userEvent.setup()
    render(<Base />)
    await user.click(getReplyButton())
    await user.type(within(getPost()).getByRole("textbox"), "Maya draft")
    await user.click(getReplyButton("Alex Rivera"))
    await user.type(within(getPost("Alex Rivera")).getByRole("textbox"), "Alex draft")
    const first = within(getPost()).getByRole("textbox", { name: "Your reply" })
    const second = within(getPost("Alex Rivera")).getByRole("textbox", { name: "Your reply" })
    expect(first.id).not.toBe(second.id)
    expect(first).toHaveValue("Maya draft")
    expect(second).toHaveValue("Alex draft")
  })

  it("handles Escape in the editor without discarding the draft", async () => {
    const user = userEvent.setup()
    render(<Base />)
    await user.click(getReplyButton())
    await user.type(screen.getByRole("textbox"), "Keep me{Escape}")
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument()
    expect(getReplyButton()).toHaveFocus()
    await user.click(getReplyButton())
    expect(screen.getByRole("textbox")).toHaveValue("Keep me")
  })

  it("does not close the editor when Escape belongs to IME composition", async () => {
    const user = userEvent.setup()
    render(<Base />)
    await user.click(getReplyButton())
    const input = screen.getByRole("textbox")
    fireEvent.compositionStart(input)
    fireEvent.keyDown(input, { key: "Escape" })
    expect(input).toBeInTheDocument()
    fireEvent.compositionEnd(input)
    fireEvent.keyDown(input, { key: "Escape", isComposing: true })
    expect(input).toBeInTheDocument()
    fireEvent.keyDown(input, { key: "Escape", keyCode: 229 })
    expect(input).toBeInTheDocument()
    fireEvent.keyDown(input, { key: "Escape" })
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument()
  })

  it("saves from the menu and exposes the checked state", async () => {
    const user = userEvent.setup()
    render(<Base />)
    await user.click(getMenuButton())
    await user.click(await screen.findByRole("menuitemcheckbox", { name: "Save post" }))
    expect(within(getPost()).getByRole("status")).toHaveTextContent("Post saved.")
    await user.click(getMenuButton())
    expect(await screen.findByRole("menuitemcheckbox", { name: "Save post" })).toHaveAttribute(
      "aria-checked",
      "true",
    )
  })

  it("opens report confirmation using only the keyboard", async () => {
    const user = userEvent.setup()
    render(<Base />)
    getMenuButton().focus()
    await user.keyboard("{Enter}")
    await waitFor(() =>
      expect(screen.getByRole("menuitemcheckbox", { name: "Save post" })).toHaveFocus(),
    )
    await user.keyboard("{ArrowDown}{Enter}")
    await waitFor(() => expect(screen.getByRole("button", { name: "Cancel" })).toHaveFocus())
    await user.keyboard("{Tab}")
    expect(screen.getByRole("button", { name: "Report post" })).toHaveFocus()
  })

  it("does not dismiss a draft from another item or an already handled Escape", async () => {
    const user = userEvent.setup()
    render(<Base />)
    await user.click(getReplyButton())
    const input = screen.getByRole("textbox")
    input.addEventListener("keydown", (event) => event.preventDefault(), { once: true })
    fireEvent.keyDown(input, { key: "Escape" })
    expect(input).toBeInTheDocument()
    getReplyButton("Alex Rivera").focus()
    await user.keyboard("{Escape}")
    expect(input).toBeInTheDocument()
  })

  it("requires report confirmation and restores focus on Cancel", async () => {
    const user = userEvent.setup()
    render(<Base />)
    await openReport(user)
    expect(screen.getByRole("region", { name: "Report this post?" })).toBeInTheDocument()
    expect(within(getPost()).getByRole("status")).not.toHaveTextContent("Report recorded")
    await user.click(screen.getByRole("button", { name: "Cancel" }))
    expect(screen.queryByRole("region", { name: "Report this post?" })).not.toBeInTheDocument()
    expect(getMenuButton()).toHaveFocus()
    await user.click(getMenuButton())
    expect(await screen.findByRole("menuitem", { name: "Report post" })).not.toHaveAttribute(
      "aria-disabled",
      "true",
    )
  })

  it("cancels report confirmation with Escape", async () => {
    const user = userEvent.setup()
    render(<Base />)
    await openReport(user)
    await user.keyboard("{Escape}")
    expect(screen.queryByRole("region", { name: "Report this post?" })).not.toBeInTheDocument()
    expect(getMenuButton()).toHaveFocus()
  })

  it("records a confirmed report once and keeps the post visible", async () => {
    const user = userEvent.setup()
    render(<Base />)
    await openReport(user)
    await user.click(screen.getByRole("button", { name: "Report post" }))
    expect(within(getPost()).getByRole("status")).toHaveTextContent(
      "Report recorded for this post.",
    )
    expect(getPost()).toHaveTextContent("What small detail makes an app feel trustworthy?")
    expect(getMenuButton()).toHaveFocus()
    await user.click(getMenuButton())
    expect(await screen.findByRole("menuitem", { name: "Reported" })).toHaveAttribute(
      "aria-disabled",
      "true",
    )
    expect(within(getPost("Alex Rivera")).getByRole("status")).toBeEmptyDOMElement()
  })

  it("preserves a reply draft while report confirmation is opened and cancelled", async () => {
    const user = userEvent.setup()
    render(<Base />)
    await user.click(getReplyButton())
    await user.type(screen.getByRole("textbox"), "Still writing")
    await openReport(user)
    await user.click(screen.getByRole("button", { name: "Cancel" }))
    await user.click(getReplyButton())
    expect(screen.getByRole("textbox")).toHaveValue("Still writing")
  })

  it("clears composition state when the editor is replaced by confirmation", async () => {
    const user = userEvent.setup()
    render(<Base />)
    await user.click(getReplyButton())
    const input = screen.getByRole("textbox")
    await user.type(input, "계속 쓰는 중")
    fireEvent.compositionStart(input)
    await openReport(user)
    await user.keyboard("{Escape}")
    expect(screen.queryByRole("region", { name: "Report this post?" })).not.toBeInTheDocument()
    expect(getMenuButton()).toHaveFocus()
    await user.click(getReplyButton())
    expect(screen.getByRole("textbox")).toHaveValue("계속 쓰는 중")
    await user.click(screen.getByRole("button", { name: "Post reply" }))
    expect(getReplyButton()).toHaveAccessibleDescription("1 reply")
  })

  it("keeps the exact count accessible when displaying a compact count", async () => {
    const user = userEvent.setup()
    render(
      <FeedItemExample
        post={{ id: "popular", author: "Maya Chen", text: "A popular post", likes: 1200000 }}
      />,
    )
    const like = screen.getByRole("button", { name: "Like post by Maya Chen" })
    expect(like).toHaveTextContent("1.2M")
    expect(like).toHaveAccessibleDescription("1200000 likes")
    await user.click(like)
    expect(like).toHaveAccessibleDescription("1200001 likes")
  })
})
