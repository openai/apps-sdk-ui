import type { SVGProps } from "react"
const SquareText = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 6a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6Zm2 12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12Z" />
    <path d="M15 9a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h6Zm-3 4a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h3Z" />
  </svg>
)
export default SquareText
