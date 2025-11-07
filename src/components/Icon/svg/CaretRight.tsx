import type { SVGProps } from "react"
const CaretRight = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M15 12 9 7v10l6-5Z" />
    <path
      fillRule="evenodd"
      d="M8.576 6.094a1 1 0 0 1 1.064.138l6 5a1 1 0 0 1 0 1.536l-6 5A1 1 0 0 1 8 17V7a1 1 0 0 1 .576-.906ZM10 9.135v5.73L13.438 12 10 9.135Z"
      clipRule="evenodd"
    />
  </svg>
)
export default CaretRight
