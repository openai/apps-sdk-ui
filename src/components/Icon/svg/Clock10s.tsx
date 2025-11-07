import type { SVGProps } from "react"
const Clock10s = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM17.1962 9C17.4723 9.47829 17.3084 10.0899 16.8301 10.366L12.5001 12.866C12.0218 13.1422 11.4102 12.9783 11.134 12.5C10.8579 12.0217 11.0218 11.4101 11.5 11.134L15.8301 8.63398C16.3084 8.35783 16.92 8.5217 17.1962 9Z"
      fill="currentColor"
    />
  </svg>
)
export default Clock10s
