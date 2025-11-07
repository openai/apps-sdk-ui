import { describe, expect, it } from "vitest"

import { decodeBase64, encodeBase64 } from "./safeBase64"

describe("frameEncoding", () => {
  it("handles `null` value", () => {
    const token = encodeBase64(null as unknown as Record<string, unknown>)
    const result = decodeBase64(token)
    expect(result).toBe(null)
  })

  it("encodes data as expected", () => {
    const SAMPLE_OBJECT = {
      foo: "lorem",
      bar: 42,
      baz: { qux: true, utf8: "🚀✨漢字", more: { nesting: 15 } },
      sample: [1, true, "👩🏽‍🚀✨漢字\u202E"],
    }

    const token = encodeBase64(SAMPLE_OBJECT)
    const result = decodeBase64(token)
    expect(result).toEqual(SAMPLE_OBJECT)
  })

  it("produces URL-safe (RFC 4648 §5) base64", () => {
    const NON_URL_SAFE_CHARS = /[+=/]/
    const input = 'a>"?'
    const token = encodeBase64(input)
    const output = decodeBase64(token)
    // should all be stripped or substituted
    expect(token).not.toMatch(NON_URL_SAFE_CHARS)
    expect(output).toBe(input)
  })

  it("encodeBase64 throws on undefined", () => {
    expect(() => encodeBase64(undefined)).toThrow()
  })

  it("decodeBase64 throws on malformed input", () => {
    expect(() => decodeBase64("not-base64!")).toThrow()
  })
})
