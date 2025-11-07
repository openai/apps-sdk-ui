import { type ReactNode } from "react"
import { visit } from "unist-util-visit"
import { createId } from "../../lib/ids"
import { decodeBase64, encodeBase64 } from "../../lib/safeBase64"

type ValidDirectiveProps = { children?: string } & Partial<Record<string, unknown>>

export interface MarkdownDirective<T extends ValidDirectiveProps = ValidDirectiveProps> {
  directiveName: string
  render: (props: { attrs?: string; children?: ReactNode }) => ReactNode
  (props: T): string
}

export function createMarkdownDirective<T extends ValidDirectiveProps>({
  render,
  name,
  mode,
}: {
  render: (props: T) => ReactNode
  name: string
  mode: "inline" | "block"
}): MarkdownDirective<T> {
  const prefix = `OaiMdDirective_${name}`
  const uniqueName = createId(prefix, prefix.length + 6)

  function directive(props: T) {
    const { children, ...attributes } = props
    const attrs = Object.keys(attributes).length >= 0 ? `attrs="${encodeBase64(attributes)}"` : ""
    const leader = mode === "inline" ? " :" : "\n\n:::"

    return `${leader}${uniqueName}${children ? `[${children}]` : ""}{${attrs}}`
  }

  directive.directiveName = uniqueName
  directive.render = ({ children, attrs }: { children?: ReactNode; attrs?: string }) => {
    const parsedAttrs = attrs ? decodeBase64<T>(attrs) : ({} as T)
    return render({ ...parsedAttrs, children })
  }

  return directive
}

export function reactMarkdownRemarkDirective() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree: any) => {
    visit(tree, ["textDirective", "leafDirective", "containerDirective"], (node) => {
      node.data = {
        hName: node.name,
        hProperties: node.attributes,
        ...node.data,
      }
      return node
    })
  }
}
