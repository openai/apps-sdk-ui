import { type ReactNode } from "react"

export function useParseMarkdownPre(children: ReactNode) {
  if (
    !children ||
    typeof children !== "object" ||
    !("props" in children) ||
    typeof children.props !== "object" ||
    !children.props
  ) {
    return { code: "", language: "text" }
  }

  const code =
    "children" in children.props && typeof children.props.children === "string"
      ? children.props.children.replaceAll(/\n$/g, "") // remove trailing newlines
      : ""
  const language =
    "className" in children.props && typeof children.props.className === "string"
      ? children.props.className.match(/language-(.*)$/)?.[1] ?? "text"
      : "text"

  return { code, language }
}
