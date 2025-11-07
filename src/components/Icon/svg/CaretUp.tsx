import type { SVGProps } from "react"
const CaretUp = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="m12 10 5 6H7l5-6Z" />
    <path
      fillRule="evenodd"
      d="M6.094 16.424A1 1 0 0 0 7 17h10a1 1 0 0 0 .768-1.64l-5-6a1 1 0 0 0-1.536 0l-5 6a1 1 0 0 0-.138 1.064ZM9.135 15 12 11.562 14.865 15h-5.73Z"
      clipRule="evenodd"
    />
  </svg>
)
export default CaretUp
