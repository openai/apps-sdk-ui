const toUrlBase64 = (bin: string) =>
  btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")

const fromUrlBase64 = (b64: string) => atob(b64.replace(/-/g, "+").replace(/_/g, "/"))

export const encodeBase64 = (value: unknown): string => {
  if (value === undefined) {
    throw new TypeError(
      "encodeBase64: `undefined` cannot be encoded to valid JSON. Pass null instead.",
    )
  }
  const json = JSON.stringify(value)
  const bytes = new TextEncoder().encode(json)
  let bin = ""
  for (const b of bytes) bin += String.fromCharCode(b)
  return toUrlBase64(bin)
}

export const decodeBase64 = <T = unknown>(b64: string): T => {
  const bin = fromUrlBase64(b64)
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0))
  const json = new TextDecoder().decode(bytes)
  return JSON.parse(json) as T
}
