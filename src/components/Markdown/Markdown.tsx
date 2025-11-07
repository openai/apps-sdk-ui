import clsx from "clsx"
import { Children, useMemo, type ComponentProps, type FC, type ReactNode } from "react"
import ReactMarkdown from "react-markdown"
import remarkBreaks from "remark-breaks"
import remarkDirective from "remark-directive"
import remarkGfm from "remark-gfm"

import { CodeBlock, CodeBlockBase } from "../CodeBlock/CodeBlock"
import { TextLink } from "../TextLink/TextLink"
import { reactMarkdownRemarkDirective, type MarkdownDirective } from "./directives"
import s from "./Markdown.module.css"
import { defaultUrlTransform } from "./urlTransform"
import { useMathPlugins } from "./useMathPlugins"
import { useParseMarkdownPre } from "./useParseMarkdownPre"

const supportsLookbehind = (() => {
  try {
    new RegExp("(?<=a)b")
    return true
  } catch {
    return false
  }
})()

export type MarkdownComponent = FC<{
  children?: ReactNode
  className?: string
  node: Record<string, unknown>
}>

export type MarkdownProps = {
  children: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  directives?: MarkdownDirective<any>[]
  /** Determines if remark-math plugins should be loaded for rendering LaTeX */
  includeMath?: boolean
  /** Determines whether single newlines should insert <br> tags */
  breakNewLines?: boolean
  components?: Record<string, MarkdownComponent>
  remarkPlugins?: ComponentProps<typeof ReactMarkdown>["remarkPlugins"]
  rehypePlugins?: ComponentProps<typeof ReactMarkdown>["rehypePlugins"]
  allowedElements?: ComponentProps<typeof ReactMarkdown>["allowedElements"]
  disallowedElements?: ComponentProps<typeof ReactMarkdown>["disallowedElements"]
  urlTransform?: ComponentProps<typeof ReactMarkdown>["urlTransform"]
  skipHtml?: boolean
  className?: string
  copyableCodeBlocks?: boolean
}

export function Markdown({
  children,
  directives,
  includeMath = false,
  breakNewLines = false,
  components: propsComponents,
  remarkPlugins,
  rehypePlugins,
  allowedElements,
  disallowedElements,
  skipHtml,
  urlTransform = defaultUrlTransform,
  className,
  copyableCodeBlocks = true,
}: MarkdownProps) {
  const mathPlugins = useMathPlugins(includeMath)
  const baseComponents = {
    ...COMMON_COMPONENTS,
    ...(copyableCodeBlocks ? null : NON_COPYABLE_CODE_BLOCK_COMPONENTS),
    ...propsComponents,
  }
  const components =
    directives?.reduce((acc, directive) => {
      acc[directive.directiveName] = directive.render
      return acc
    }, baseComponents) ?? baseComponents

  const mergedRemarkPlugins = useMemo(() => {
    const baseRemarkPlugins = [
      remarkDirective,
      reactMarkdownRemarkDirective,
      ...mathPlugins.remarkPlugins,
    ]

    if (breakNewLines) {
      baseRemarkPlugins.push(remarkBreaks)
    }

    // remark-gfm requires lookbehind support, which will throw in <= Safari 16.4
    // with no easily available polyfill.
    if (supportsLookbehind) {
      // Do not treat single tilde as strikethrough to allow for more
      // conversational use cases such as "~$20-$30"
      baseRemarkPlugins.push([remarkGfm, { singleTilde: false }])
    }

    return [...baseRemarkPlugins, ...(remarkPlugins ?? [])]
  }, [mathPlugins.remarkPlugins, remarkPlugins, breakNewLines])

  return (
    <ReactMarkdown
      className={clsx(s.MarkdownContent, className)}
      remarkPlugins={mergedRemarkPlugins}
      rehypePlugins={[...(rehypePlugins ?? []), ...mathPlugins.rehypePlugins]}
      components={components}
      allowedElements={allowedElements}
      disallowedElements={disallowedElements}
      skipHtml={skipHtml}
      urlTransform={urlTransform}
    >
      {children}
    </ReactMarkdown>
  )
}

const Pre: MarkdownComponent = ({ children, className }) => {
  const { code, language } = useParseMarkdownPre(children)
  return (
    <CodeBlock language={language} className={className}>
      {code}
    </CodeBlock>
  )
}

const InlineCode: MarkdownComponent = ({ children, className }) => (
  <code className={clsx(s.InlineCode, className)}>{children}</code>
)

const Anchor: MarkdownComponent = ({ children, node: _node, ...props }) => (
  <TextLink as="a" {...props}>
    {children}
  </TextLink>
)

// Sourced from ChatGPT
const TableCell: MarkdownComponent = ({ node: _node, children, ...rest }) => {
  return (
    <td {...rest}>
      {Children.map(children, (child, i) =>
        // ReactMarkdown does not support <br> tags in tables without using
        // remark-html (which may not be safe), so we need to manually handle them
        child === "<br>" ? <br key={i} /> : child,
      )}
    </td>
  )
}

const COMMON_COMPONENTS: Record<string, MarkdownComponent> = {
  code: InlineCode,
  pre: Pre,
  a: Anchor,
  td: TableCell,
}

const NonCopyableCodeBlock: MarkdownComponent = ({ children, className }) => {
  const { code, language } = useParseMarkdownPre(children)
  return (
    <CodeBlockBase className={className}>
      <CodeBlockBase.Code language={language}>{code}</CodeBlockBase.Code>
    </CodeBlockBase>
  )
}

const NON_COPYABLE_CODE_BLOCK_COMPONENTS: Record<string, MarkdownComponent> = {
  pre: NonCopyableCodeBlock,
} as const
