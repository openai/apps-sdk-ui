import type { SVGProps } from "react"
const Suitcase = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <path
      fillRule="evenodd"
      d="M7 6V5a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1h2a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h2Zm2-1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1H9V5Zm10 3a1 1 0 0 1 1 1v3.5a2.5 2.5 0 0 1-2.5 2.5H6a2 2 0 0 1-2-2V9a1 1 0 0 1 1-1h14ZM4 16.465c.588.34 1.271.535 2 .535h11.5c.925 0 1.785-.28 2.5-.758V18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1.535Z"
      clipRule="evenodd"
    />
  </svg>
)
export default Suitcase
