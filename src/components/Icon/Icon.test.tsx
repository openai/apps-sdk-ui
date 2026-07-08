import { render, screen } from "@testing-library/react"
import { readdirSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { describe, expect, it } from "vitest"

const iconDir = dirname(fileURLToPath(import.meta.url))
const svgDir = join(iconDir, "svg")
const packageJson = JSON.parse(readFileSync(join(iconDir, "../../../package.json"), "utf-8")) as {
  exports: Record<string, Record<string, string> | string>
}

const svgEntries = readdirSync(svgDir, { withFileTypes: true })
const svgIconNames = svgEntries.map((entry) => entry.name.replace(/\.tsx$/, "")).sort()
const barrelSource = readFileSync(join(iconDir, "index.tsx"), "utf-8")
const barrelIconNames = [...barrelSource.matchAll(/from "\.\/svg\/([^"]+)"/g)]
  .map(([, name]) => name)
  .sort()

describe("icon subpath exports", () => {
  it("exposes ./icons/* mapping to the per-icon dist modules", () => {
    expect(packageJson.exports["./icons/*"]).toEqual({
      types: "./dist/types/components/Icon/svg/*.d.ts",
      default: "./dist/es/components/Icon/svg/*.js",
    })
  })

  it("lists the types condition before default so TypeScript resolves declarations", () => {
    expect(Object.keys(packageJson.exports["./icons/*"])).toEqual(["types", "default"])
  })

  it("keeps every pre-existing subpath export intact", () => {
    for (const subpath of [
      "./css",
      "./components/*",
      "./hooks/*",
      "./theme",
      "./helpers",
      "./userAgent",
      "./dateUtils",
    ]) {
      expect(packageJson.exports, `missing exports entry for ${subpath}`).toHaveProperty([subpath])
    }
  })
})

describe("icon modules exposed by the ./icons/* wildcard", () => {
  it("contains only icon component files in svg/", () => {
    const unexpected = svgEntries.filter((entry) => !entry.isFile() || !entry.name.endsWith(".tsx"))
    expect(unexpected.map((entry) => entry.name)).toEqual([])
  })

  it("has no icon filenames that collide on case-insensitive filesystems", () => {
    const lowercased = svgIconNames.map((name) => name.toLowerCase())
    expect(new Set(lowercased).size).toBe(svgIconNames.length)
  })

  it("keeps every icon module free of runtime imports so subpath imports skip the barrel", () => {
    const iconsWithRuntimeImports = svgIconNames.filter((name) => {
      const source = readFileSync(join(svgDir, `${name}.tsx`), "utf-8")
      return /^import(?!\s+type\s)|^export\b(?!\s+type\b).*\bfrom\b/m.test(source)
    })
    expect(iconsWithRuntimeImports).toEqual([])
  })

  it("default-exports a component from every icon module", () => {
    const iconsWithoutDefaultExport = svgIconNames.filter(
      (name) => !readFileSync(join(svgDir, `${name}.tsx`), "utf-8").includes("export default"),
    )
    expect(iconsWithoutDefaultExport).toEqual([])
  })
})

describe("barrel and svg directory drift", () => {
  it("re-exports only icon files that exist on disk, so every barreled name is reachable via ./icons/*", () => {
    const missingFiles = barrelIconNames.filter((name) => !svgIconNames.includes(name))
    expect(missingFiles).toEqual([])
  })
})

describe("icon rendering through standalone modules", () => {
  it("renders a barreled icon imported directly from its svg module", async () => {
    const { default: Calendar } = await import("./svg/Calendar")
    render(<Calendar className="custom-icon" data-testid="calendar-icon" />)
    const svg = screen.getByTestId("calendar-icon")
    expect(svg.tagName.toLowerCase()).toBe("svg")
    expect(svg).toHaveAttribute("viewBox", "0 0 24 24")
    expect(svg).toHaveAttribute("width", "1em")
    expect(svg).toHaveAttribute("height", "1em")
    expect(svg).toHaveAttribute("fill", "currentColor")
    expect(svg).toHaveClass("custom-icon")
  })

  it("renders the icon barreled as Object from its ObjectIcon module", async () => {
    const { default: ObjectIcon } = await import("./svg/ObjectIcon")
    render(<ObjectIcon data-testid="object-icon" />)
    const svg = screen.getByTestId("object-icon")
    expect(svg.tagName.toLowerCase()).toBe("svg")
    expect(svg).toHaveAttribute("viewBox", "0 0 24 24")
  })
})
