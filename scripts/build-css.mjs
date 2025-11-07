import { mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

import postcss from "postcss"

import { platformUIRequiredPlugins } from "../postcss.config.mjs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PROJECT_ROOT = path.resolve(__dirname, "..")
const SRC_DIR = path.join(PROJECT_ROOT, "src")
const OUT_DIR = path.join(PROJECT_ROOT, "dist/es")

/**
 * Recursively collect every `.css` file within the provided directory.
 * @param {string} dir
 * @returns {Promise<string[]>}
 */
async function collectCssFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      files.push(...(await collectCssFiles(fullPath)))
      continue
    }

    if (entry.isFile() && entry.name.endsWith(".css")) {
      files.push(fullPath)
    }
  }

  return files
}

async function buildCss() {
  const cssFiles = (await collectCssFiles(SRC_DIR)).sort()

  if (cssFiles.length === 0) {
    console.warn("[build-css] No CSS files found – skipping PostCSS step.")
    return
  }

  const passthroughCssFiles = new Set(["styles/index.css"])

  for (const file of cssFiles) {
    const relativePath = path.relative(SRC_DIR, file)
    const normalizedRelativePath = relativePath.split(path.sep).join("/")
    const to = path.join(OUT_DIR, relativePath)
    const source = await readFile(file, "utf8")

    if (passthroughCssFiles.has(normalizedRelativePath)) {
      await mkdir(path.dirname(to), { recursive: true })
      await writeFile(to, source, "utf8")
      continue
    }

    const processor = postcss(platformUIRequiredPlugins())
    const result = await processor.process(source, {
      from: file,
      to,
      map: false,
    })

    for (const warning of result.warnings()) {
      console.warn(`[postcss] ${warning.toString()}`)
    }

    await mkdir(path.dirname(to), { recursive: true })
    await writeFile(to, result.css, "utf8")
  }

  console.log(
    `[build-css] Processed ${cssFiles.length} CSS file${cssFiles.length === 1 ? "" : "s"}.`,
  )
}

buildCss().catch((error) => {
  console.error("[build-css] Failed to process CSS", error)
  process.exitCode = 1
})
