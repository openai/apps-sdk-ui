import type { SVGProps } from "react"
const Robot = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M11 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm3.5 1.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
    <path
      fillRule="evenodd"
      d="M12 5.5a1 1 0 0 1 1 1V7h4a3 3 0 0 1 3 3v3.5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V10a3 3 0 0 1 3-3h4v-.5a1 1 0 0 1 1-1ZM7 9h10a1 1 0 0 1 1 1v3.5a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V10a1 1 0 0 1 1-1Z"
      clipRule="evenodd"
    />
  </svg>
)
export default Robot
