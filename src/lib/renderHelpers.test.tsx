import { render } from "@testing-library/react"
import React from "react"
import { describe, expect, it } from "vitest"
import { wrapTextNodeSiblings } from "./renderHelpers"

describe("wrapTextNodeSiblings()", () => {
  it("does not wrap single children", () => {
    const { container } = render(<>{wrapTextNodeSiblings(" hello  world ")}</>)
    expect(container.querySelectorAll("span").length).toBe(0)
    expect(container.textContent).toBe(" hello  world ")
  })

  it("does not wrap children that are all text", () => {
    const { container } = render(<>{wrapTextNodeSiblings([" hello", " world "])}</>)
    expect(container.querySelectorAll("span").length).toBe(0)
    expect(container.textContent).toBe(" hello world ")
  })

  it("ignores empty strings and whitespace-only strings", () => {
    const { container } = render(<>{wrapTextNodeSiblings(["   ", "foo", "\n", "bar "])}</>)
    const spans = container.querySelectorAll("span")
    expect(spans.length).toBe(0)
    expect(container.textContent).toBe("   foo\nbar ")
  })

  it("wraps multiple children and preserves whitespace", () => {
    const { container } = render(
      <>
        {wrapTextNodeSiblings(
          <>
            {" "}
            hello <strong>there</strong> world{" "}
          </>,
        )}
      </>,
    )
    expect(container.querySelectorAll("span").length).toBe(2)
    expect(container.textContent).toBe(" hello there world ")
  })

  it("preserves React elements and does not wrap their children", () => {
    const { container } = render(
      <>{wrapTextNodeSiblings([<strong key="1">foo</strong>, <em key="2">bar</em>, "baz"])}</>,
    )
    expect(container.querySelectorAll("span").length).toBe(1)
    expect(container.querySelectorAll("strong").length).toBe(1)
    expect(container.querySelectorAll("em").length).toBe(1)
    expect(container.textContent).toBe("foobarbaz")
  })

  it("recursively wraps nested content", () => {
    const { container } = render(
      wrapTextNodeSiblings(
        <div>
          <div>
            <div>
              foo <svg />
            </div>
          </div>
        </div>,
      ),
    )
    expect(container.querySelectorAll("span").length).toBe(1)
    expect(container.querySelectorAll("svg").length).toBe(1)
    expect(container.textContent).toBe("foo ")
  })

  it("collapses adjacent strings", () => {
    const fakeCondition = true
    const { container } = render(
      wrapTextNodeSiblings(
        <>
          <svg /> foo {fakeCondition ? "bar" : "baz"} test
        </>,
      ),
    )
    expect(container.querySelectorAll("span").length).toBe(1)
    expect(container.querySelectorAll("svg").length).toBe(1)
    expect(container.textContent).toBe(" foo bar test")
  })

  it("recursively wraps nested content with multiple children", () => {
    const { container } = render(
      wrapTextNodeSiblings(
        <div>
          <span>hello</span>
          world
          <strong>
            foo <svg />
          </strong>
          bar
        </div>,
      ),
    )
    expect(container.querySelectorAll("span").length).toBe(4) // one existing, three wrapped
    expect(container.querySelectorAll("strong").length).toBe(1)
    expect(container.querySelectorAll("svg").length).toBe(1)
    expect(container.textContent).toBe("helloworldfoo bar")
  })

  it("handles fragments and arrays", () => {
    const { container } = render(
      wrapTextNodeSiblings([
        <React.Fragment key="frag1">foo</React.Fragment>,
        "bar",
        ["baz", <em key="i">qux</em>],
      ]),
    )
    expect(container.querySelectorAll("span").length).toBe(1)
    expect(container.querySelectorAll("em").length).toBe(1)
    expect(container.textContent).toBe("foobarbazqux")
  })

  it("handles numbers, booleans, null, and undefined", () => {
    const { container } = render(<>{wrapTextNodeSiblings([123, false, null, undefined, "foo"])} </>)
    // Numbers and booleans are not wrapped, only strings
    expect(container.querySelectorAll("span").length).toBe(0)
    expect(container.textContent).toBe("123foo ")
  })

  it("preserves whitespace-only groups around elements without wrapping, and wraps mixed number+string groups across boundaries", () => {
    const { container } = render(
      <>
        {wrapTextNodeSiblings(["", "  ", <strong key="b" />, " ", "", <em key="i" />])}
        {wrapTextNodeSiblings(["a", 1, <u key="u" />, 2, "b"])}
      </>,
    )
    const spans = container.querySelectorAll("span")
    // Only the mixed number+string groups get wrapped into two spans; whitespace-only groups do not
    expect(spans.length).toBe(2)
    // There are b, i, and u elements present
    expect(container.querySelectorAll("strong").length).toBe(1)
    expect(container.querySelectorAll("em").length).toBe(1)
    expect(container.querySelectorAll("u").length).toBe(1)
    // Text content preserves whitespace groups ("  " + " ") and concatenated text around <u>
    // First part yields "   ", second part yields "a12b"
    expect(container.textContent).toBe("   a12b")
  })

  it("does not wrap when there are no text nodes", () => {
    const { container } = render(<>{wrapTextNodeSiblings([<strong key="b" />, <em key="i" />])}</>)
    expect(container.querySelectorAll("span").length).toBe(0)
    expect(container.querySelectorAll("strong").length).toBe(1)
    expect(container.querySelectorAll("em").length).toBe(1)
    expect(container.textContent).toBe("")
  })
})
