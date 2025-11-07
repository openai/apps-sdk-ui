import type { SVGProps } from "react"
const CaretDown = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="m12 16 5-6H7l5 6Z" />
    <path
      fillRule="evenodd"
      d="M6.094 9.576A1 1 0 0 1 7 9h10a1 1 0 0 1 .768 1.64l-5 6a1 1 0 0 1-1.536 0l-5-6a1 1 0 0 1-.138-1.064ZM9.135 11 12 14.438 14.865 11h-5.73Z"
      clipRule="evenodd"
    />
  </svg>
)
export default CaretDown
