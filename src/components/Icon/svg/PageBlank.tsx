import type { SVGProps } from "react"
const PageBlank = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      d="M7 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8.828a3 3 0 0 0-.879-2.12l-3.828-3.83A3 3 0 0 0 13.172 2H7Zm5 2H7a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9h-3a3 3 0 0 1-3-3V4Zm5.586 4H15a1 1 0 0 1-1-1V4.414L17.586 8Z"
      clipRule="evenodd"
    />
  </svg>
)
export default PageBlank
