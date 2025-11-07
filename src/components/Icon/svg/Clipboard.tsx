import type { SVGProps } from "react"
const Clipboard = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      d="M12 4a2 2 0 0 0-2 2h4a2 2 0 0 0-2-2ZM8.535 4A3.998 3.998 0 0 1 12 2c1.48 0 2.773.804 3.465 2H17a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1.535ZM8 6H7a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2Z"
      clipRule="evenodd"
    />
  </svg>
)
export default Clipboard
