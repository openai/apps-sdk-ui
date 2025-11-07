import type { SVGProps } from "react"
const Tag = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      d="M4 5a1 1 0 0 1 1-1h6.172a1 1 0 0 1 .707.293l8 8a1 1 0 0 1 0 1.414l-6.172 6.172a1 1 0 0 1-1.414 0l-8-8A1 1 0 0 1 4 11.172V5Zm1-3a3 3 0 0 0-3 3v6.172a3 3 0 0 0 .879 2.12l8 8a3 3 0 0 0 4.242 0l6.172-6.17a3 3 0 0 0 0-4.243l-8-8A3 3 0 0 0 11.172 2H5Zm3 7a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm1-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
      clipRule="evenodd"
    />
  </svg>
)
export default Tag
