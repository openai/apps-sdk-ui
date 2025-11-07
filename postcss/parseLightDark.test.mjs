// tests/parseLightDark.test.js
import { describe, expect, test } from "vitest"
import postcss from "postcss"
import platformUILightDark from "./parseLightDark.mjs"

const plugin = platformUILightDark()

function normalize(css) {
  return css
    .replace(/[ \t]+/g, " ") // collapse whitespace
    .replace(/;(?=\s*\})/g, "") // remove trailing semicolon before }
    .replace(/\s*\n\s*/g, "\n") // trim lines
    .replace(/,\s*\n\s*/g, ", ") // remove newline after commas in selectors
    .replace(/\n{2,}/g, "\n") // collapse blank lines
    .trim()
}

describe("parseLightDark plugin", () => {
  test("transforms root light-dark into grouped theme rules", async () => {
    const input = `
@layer theme {
  :root {
    --gray-0: light-dark(#fff, #000);
    --gray-1: light-dark(#aaa, #111);
  }
}`
    const output = `@layer theme {
  :where(:root),
  :where([data-theme="light"]) {
    --gray-0: #fff;
    --gray-1: #aaa
  }
  :where([data-theme="dark"]) {
    --gray-0: #000;
    --gray-1: #111
  }
}`
    const result = await postcss([plugin]).process(input, { from: undefined })
    expect(normalize(result.css)).toBe(normalize(output))
  })

  // preserves other declarations in :root
  test("preserves non-light-dark decls in :root", async () => {
    const input = `
@layer theme {
  :root {
    --gray-0: light-dark(#fff, #000);
    --foo: 42;
  }
}`
    const output = `@layer theme {
  :root {
    --foo: 42
  }
  :where(:root),
  :where([data-theme="light"]) {
    --gray-0: #fff
  }
  :where([data-theme="dark"]) {
    --gray-0: #000
  }
}`
    const result = await postcss([plugin]).process(input, { from: undefined })
    expect(normalize(result.css)).toBe(normalize(output))
  })

  // merges [data-theme] scope
  test("merges [data-theme] scope selector", async () => {
    const input = `
@layer theme {
  :root,
  [data-theme] {
    --gray-0: light-dark(#fff, #000);
    --foo: 42;
  }
}`
    const output = `@layer theme {
  :root,
  [data-theme] {
    --foo: 42
  }
  :where(:root),
  :where([data-theme="light"]) {
    --gray-0: #fff
  }
  :where([data-theme="dark"]) {
    --gray-0: #000
  }
}`
    const result = await postcss([plugin]).process(input, { from: undefined })
    expect(normalize(result.css)).toBe(normalize(output))
  })

  // [data-theme] only at top-level triggers replacement (root-like)
  test("replaces top-level [data-theme] selector (no other decls)", async () => {
    const input = `
@layer theme {
  [data-theme] {
    --gray-0: light-dark(#fff, #000);
  }
}`
    const output = `@layer theme {
  :where(:root),
  :where([data-theme="light"]) {
    --gray-0: #fff
  }
  :where([data-theme="dark"]) {
    --gray-0: #000
  }
}`
    const result = await postcss([plugin]).process(input, { from: undefined })
    expect(normalize(result.css)).toBe(normalize(output))
  })

  // preserves non-light-dark decls when [data-theme] is top-level
  test("preserves non-light-dark decls in top-level [data-theme]", async () => {
    const input = `
@layer theme {
  [data-theme] {
    --gray-0: light-dark(#fff, #000);
    --foo: 42;
  }
}`
    const output = `@layer theme {
  [data-theme] {
    --foo: 42
  }
  :where(:root),
  :where([data-theme="light"]) {
    --gray-0: #fff
  }
  :where([data-theme="dark"]) {
    --gray-0: #000
  }
}`
    const result = await postcss([plugin]).process(input, { from: undefined })
    expect(normalize(result.css)).toBe(normalize(output))
  })

  // guard: mixed selectors including [data-theme] should NOT trigger replacement
  test("does not replace when [data-theme] is mixed with other selectors", async () => {
    const input = `
[data-theme],
.foo {
  --gray-0: light-dark(#fff, #000);
}`
    const output = `
:where([data-theme="light"]),
:where([data-theme="light"]) .foo {
  --gray-0: #fff
}
:where([data-theme="dark"]),
:where([data-theme="dark"]) .foo {
  --gray-0: #000
}`
    const result = await postcss([plugin]).process(input, { from: undefined })
    expect(normalize(result.css)).toBe(normalize(output))
  })

  // guard: attribute-qualified [data-theme="light"] should NOT trigger replacement
  test('does not replace for [data-theme="light"] selector', async () => {
    const input = `
[data-theme="light"] {
  --gray-0: light-dark(#fff, #000);
}`
    const output = `
[data-theme="light"],
:where([data-theme="light"]) [data-theme="light"] {
  --gray-0: #fff
}
:where([data-theme="dark"]) [data-theme="light"] {
  --gray-0: #000
}`
    const result = await postcss([plugin]).process(input, { from: undefined })
    expect(normalize(result.css)).toBe(normalize(output))
  })

  // handles mixed values around light-dark()
  test("handles non-light-dark parts in shorthand values", async () => {
    const input = `
.foo {
  background: url(foo.png) light-dark(#fff, #000) no-repeat;
}`
    const output = `
.foo,
:where([data-theme="light"]) .foo {
  background: url(foo.png) #fff no-repeat
}
:where([data-theme="dark"]) .foo {
  background: url(foo.png) #000 no-repeat
}`
    const result = await postcss([plugin]).process(input, { from: undefined })
    expect(normalize(result.css)).toBe(normalize(output))
  })

  // flattens nested wrappers instead of nested &
  test("flattens nested wrappers to top-level rules", async () => {
    const input = `
.Container {
  --foo: light-dark(red, blue);
  color: green !important;
}`
    const output = `
.Container {
  color: green !important;
}
.Container,
:where([data-theme="light"]) .Container {
  --foo: red
}
:where([data-theme="dark"]) .Container {
  --foo: blue
}`
    const result = await postcss([plugin]).process(input, { from: undefined })
    expect(normalize(result.css)).toBe(normalize(output))
  })

  // supports nested functions in light-dark arguments
  test("supports nested functions in arguments", async () => {
    const input = `
.baz .bar {
  --baz: light-dark(rgba(0,0,0,0.5), rgba(255,255,255,0.8));
}`
    const output = `
.baz .bar,
:where([data-theme="light"]) .baz .bar {
  --baz: rgba(0,0,0,0.5)
}
:where([data-theme="dark"]) .baz .bar {
  --baz: rgba(255,255,255,0.8)
}`
    const result = await postcss([plugin]).process(input, { from: undefined })
    expect(normalize(result.css)).toBe(normalize(output))
  })

  test("preserves !important in nested", async () => {
    const input = `
.foo {
  background: pink;
  color: light-dark(red, blue);
}`
    const output = `
.foo {
  background: pink;
}
.foo,
:where([data-theme="light"]) .foo {
  color: red
}
:where([data-theme="dark"]) .foo {
  color: blue
}`
    const result = await postcss([plugin]).process(input, { from: undefined })
    expect(normalize(result.css)).toBe(normalize(output))
  })

  test("preserves !important in static example", async () => {
    const input = `
.foo {
  color: orange !important;
}`
    const output = `
.foo {
  color: orange !important
}`
    const result = await postcss([plugin]).process(input, { from: undefined })
    expect(normalize(result.css)).toBe(normalize(output))
  })

  test("preserves !important in mixed shorthand", async () => {
    const input = `
.foo {
  box-shadow: 0 0 0 1px light-dark(red, blue) inset !important;
}`
    const output = `
.foo,
:where([data-theme="light"]) .foo {
  box-shadow: 0 0 0 1px red inset !important
}
:where([data-theme="dark"]) .foo {
  box-shadow: 0 0 0 1px blue inset !important
}`

    const result = await postcss([plugin]).process(input, { from: undefined })
    expect(normalize(result.css)).toBe(normalize(output))
  })

  // supports nested comma separated lists
  test("supports nested functions in arguments", async () => {
    const input = `
.parent .nested .token.comment,
.another-parent > div:nth-child(2) .nested .token.comment {
  color: light-dark(var(--gray-400), var(--gray-600)) !important;
  background: light-dark(var(--gray-100), var(--gray-200));
  font-style: italic !important;
}`

    const output = `
.parent .nested .token.comment,
.another-parent > div:nth-child(2) .nested .token.comment {
  font-style: italic !important;
}
.parent .nested .token.comment,
.another-parent > div:nth-child(2) .nested .token.comment,
:where([data-theme="light"]) .parent .nested .token.comment,
:where([data-theme="light"]) .another-parent > div:nth-child(2) .nested .token.comment {
  color: var(--gray-400) !important;
  background: var(--gray-100);
}

:where([data-theme="dark"]) .parent .nested .token.comment,
:where([data-theme="dark"]) .another-parent > div:nth-child(2) .nested .token.comment {
  color: var(--gray-600) !important;
  background: var(--gray-200);
}`
    const result = await postcss([plugin]).process(input, { from: undefined })
    expect(normalize(result.css)).toBe(normalize(output))
  })

  // does not split on commas inside functional selectors (e.g., :not())
  test("handles commas inside :not() without corrupting selectors", async () => {
    const input = `
.root :where(p:not(.a, .b, .c p)) code,
.root :where(li:not(.a, .b li)) code {
  color: light-dark(red, blue);
}`
    const output = `
.root :where(p:not(.a, .b, .c p)) code,
.root :where(li:not(.a, .b li)) code,
:where([data-theme="light"]) .root :where(p:not(.a, .b, .c p)) code,
:where([data-theme="light"]) .root :where(li:not(.a, .b li)) code {
  color: red
}
:where([data-theme="dark"]) .root :where(p:not(.a, .b, .c p)) code,
:where([data-theme="dark"]) .root :where(li:not(.a, .b li)) code {
  color: blue
}`
    const result = await postcss([plugin]).process(input, { from: undefined })
    expect(normalize(result.css)).toBe(normalize(output))
  })
})
