import type { SVGProps } from "react"
const Expand = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      d="M12 7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V8h-3a1 1 0 0 1-1-1Zm-5 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1Z"
      clipRule="evenodd"
    />
  </svg>
)
export default Expand
