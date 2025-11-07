import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react"

const flattenTextNodes = (children: ReactNode): ReactNode[] => {
  const nodes = Children.toArray(children)
  const result: ReactNode[] = []
  let buffer = ""

  const flush = () => {
    if (buffer !== "") {
      result.push(buffer)
      buffer = ""
    }
  }

  for (const node of nodes) {
    if (node == null || typeof node === "boolean") {
      continue
    }

    if (typeof node === "string" || typeof node === "number") {
      buffer += String(node)
      continue
    }

    // Boundary encountered: output any accumulated text, then the node
    flush()
    result.push(node)
  }

  flush()
  return result
}

// Helper to wrap text node siblings of other elements in a tag,
// which enables sibling selectors to behave as expected for certain conditions
export const wrapTextNodeSiblings = (children: ReactNode): ReactNode => {
  const flattenedChildren = flattenTextNodes(children)
  const childrenCount = Children.count(flattenedChildren)

  return Children.map(flattenedChildren, (child) => {
    if (typeof child === "string" && !!child.trim()) {
      // Children with no siblings can immediately return
      if (childrenCount <= 1) {
        return child
      }

      // Wrap text nodes that have siblings
      return <span>{child}</span>
    }

    // For valid elements, recursively render to capture wrapped children
    if (isValidElement(child)) {
      const element = child as ReactElement<{ children?: ReactNode }>
      const { children: innerChildren, ...restProps } = element.props

      if (innerChildren != null) {
        return cloneElement(element, restProps, wrapTextNodeSiblings(innerChildren))
      }

      return element
    }

    return child
  })
}
