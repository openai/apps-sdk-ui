import react from "@vitejs/plugin-react"

import { resolve } from "node:path"
import tsconfigPaths from "vite-tsconfig-paths"

/**
 * @type {import('vite').UserConfig}
 */
export default {
  root: ".",
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [react(), tsconfigPaths({ root: __dirname })],
}
