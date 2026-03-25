import { readdir, readFile, rename, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { defineConfig } from "tsdown"

/**
 * Renames module css files after build, to prevent consuming projects from treating them as working
 * css modules files.
 *
 * @see https://github.com/rolldown/tsdown/issues/864
 */
async function renameCssModulesOnDisk(outDir) {
  const files = await readdir(outDir, { recursive: true })
  const renames = new Map()

  // Rename .module.css files to .css
  for (const file of files) {
    if (file.endsWith(".module.css")) {
      const oldPath = join(outDir, file)
      const newFile = file.replace(/\.module\.css$/, ".css")
      const newPath = join(outDir, newFile)
      renames.set(file, newFile)
      await rename(oldPath, newPath)

      // Also rename the sourcemap if it exists
      const oldMapPath = oldPath + ".map"
      const newMapPath = newPath + ".map"
      try {
        await rename(oldMapPath, newMapPath)
      } catch {
        // sourcemap may not exist
      }
    }
  }

  if (renames.size === 0) return

  // Update import references in JS files
  const jsFiles = files.filter((f) => f.endsWith(".mjs") || f.endsWith(".js") || f.endsWith(".cjs"))
  for (const file of jsFiles) {
    const filePath = join(outDir, file)
    let content = await readFile(filePath, "utf-8")
    let changed = false

    for (const [oldName, newName] of renames) {
      // Match the basename since imports are typically relative
      const oldBasename = oldName.split("/").pop()
      const newBasename = newName.split("/").pop()
      if (content.includes(oldBasename)) {
        content = content.replaceAll(oldBasename, newBasename)
        changed = true
      }
    }

    if (changed) {
      await writeFile(filePath, content, "utf-8")
    }
  }
}

export default defineConfig({
  tsconfig: "./tsconfig.build.json",
  entry: [
    "./src/**/*.ts",
    "./src/**/*.tsx",
    "./src/styles/index.css",
    "!**/*.stories.tsx",
    "!**/*.test.ts",
    "!**/*.test.tsx",
    "!**/*.mdx",
    "!test",
    "!scripts",
    "!boilerplate-example",
    "!public",
    "!.storybook-base",
  ],
  outDir: "dist/es",
  platform: "neutral",
  css: {
    transformer: "postcss",
    inject: true,
    splitting: true,
  },
  dts: true,
  sourcemap: true,
  unbundle: true,
  hooks: {
    "build:done": async () => {
      await renameCssModulesOnDisk("dist/es")
    },
  },
})
