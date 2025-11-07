import type { SVGProps } from "react"
const Workspace = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      d="M3 6a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v1h3a3 3 0 0 1 3 3v9h1a1 1 0 1 1 0 2H2a1 1 0 1 1 0-2h1V6Zm2 13h3v-2a1 1 0 1 1 2 0v2h3V6a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v13Zm10 0h4v-9a1 1 0 0 0-1-1h-3v10Z"
      clipRule="evenodd"
    />
  </svg>
)
export default Workspace
