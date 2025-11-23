"use client"

import clsx from "clsx"
import { type ComponentProps } from "react"
import { createElement, PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash"
import c from "react-syntax-highlighter/dist/esm/languages/prism/c"
import clike from "react-syntax-highlighter/dist/esm/languages/prism/clike"
import css from "react-syntax-highlighter/dist/esm/languages/prism/css"
import diff from "react-syntax-highlighter/dist/esm/languages/prism/diff"
import docker from "react-syntax-highlighter/dist/esm/languages/prism/docker"
import go from "react-syntax-highlighter/dist/esm/languages/prism/go"
import java from "react-syntax-highlighter/dist/esm/languages/prism/java"
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript"
import json from "react-syntax-highlighter/dist/esm/languages/prism/json"
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx"
import kotlin from "react-syntax-highlighter/dist/esm/languages/prism/kotlin"
import markdown from "react-syntax-highlighter/dist/esm/languages/prism/markdown"
import markup from "react-syntax-highlighter/dist/esm/languages/prism/markup"
import php from "react-syntax-highlighter/dist/esm/languages/prism/php"
import python from "react-syntax-highlighter/dist/esm/languages/prism/python"
import ruby from "react-syntax-highlighter/dist/esm/languages/prism/ruby"
import scss from "react-syntax-highlighter/dist/esm/languages/prism/scss"
import sql from "react-syntax-highlighter/dist/esm/languages/prism/sql"
import toml from "react-syntax-highlighter/dist/esm/languages/prism/toml"
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx"
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript"
import yaml from "react-syntax-highlighter/dist/esm/languages/prism/yaml"

import { CopyButton } from "../Button"
import s from "./CodeBlock.module.css"

SyntaxHighlighter.registerLanguage("javascript", javascript)
SyntaxHighlighter.registerLanguage("jsx", jsx)
SyntaxHighlighter.registerLanguage("typescript", typescript)
SyntaxHighlighter.registerLanguage("tsx", tsx)
SyntaxHighlighter.registerLanguage("markup", markup)
SyntaxHighlighter.registerLanguage("css", css)
SyntaxHighlighter.registerLanguage("scss", scss)
SyntaxHighlighter.registerLanguage("c", c)
SyntaxHighlighter.registerLanguage("clike", clike)
SyntaxHighlighter.registerLanguage("bash", bash)
SyntaxHighlighter.registerLanguage("json", json)
SyntaxHighlighter.registerLanguage("jsonc", json)
SyntaxHighlighter.registerLanguage("python", python)
SyntaxHighlighter.registerLanguage("sql", sql)
SyntaxHighlighter.registerLanguage("diff", diff)
SyntaxHighlighter.registerLanguage("markdown", markdown)
SyntaxHighlighter.registerLanguage("yaml", yaml)
SyntaxHighlighter.registerLanguage("toml", toml)
SyntaxHighlighter.registerLanguage("docker", docker)
SyntaxHighlighter.registerLanguage("java", java)
SyntaxHighlighter.registerLanguage("go", go)
SyntaxHighlighter.registerLanguage("php", php)
SyntaxHighlighter.registerLanguage("ruby", ruby)
SyntaxHighlighter.registerLanguage("kotlin", kotlin)

export function CodeBlock({
  children,
  language,
  className,
}: {
  children: string
  language?: string
  className?: string
}) {
  return (
    <CodeBlockBase className={className}>
      <CodeBlockBase.Code language={language}>{children}</CodeBlockBase.Code>
      <CodeBlockBase.CopyButton copyValue={children} />
    </CodeBlockBase>
  )
}

export function CodeBlockBase({ className, children, ...restProps }: ComponentProps<"div">) {
  return (
    <div className={clsx(s.CodeBlock, className)} {...restProps}>
      {children}
    </div>
  )
}

CodeBlockBase.CopyButton = function CodeBlockCopyButton({
  className,
  copyValue,
  loading,
  disabled,
}: {
  className?: string
  copyValue: string
  disabled?: boolean
  loading?: boolean
}) {
  return (
    <div className={clsx(s.CopyButtonContainer, className)}>
      <CopyButton
        copyValue={copyValue}
        variant="ghost"
        color="secondary"
        pill={false}
        size="md"
        uniform
        loading={loading}
        disabled={disabled}
      />
    </div>
  )
}

CodeBlockBase.Code = function CodeBlockCode({
  className,
  children,
  language,
  codeTagProps,
}: {
  className?: string
  children: string
  language?: string
  codeTagProps?: React.HTMLProps<HTMLElement>
}) {
  return (
    <SyntaxHighlighter
      className={clsx(s.SyntaxHighlighter, className)}
      language={language}
      showLineNumbers={false}
      showInlineLineNumbers={false}
      useInlineStyles={false}
      codeTagProps={codeTagProps}
      renderer={({ rows }) => {
        return (
          <>
            {rows.map((r, i) =>
              createElement({
                key: i,
                stylesheet: {},
                useInlineStyles: true,
                node: r,
              }),
            )}
          </>
        )
      }}
    >
      {children}
    </SyntaxHighlighter>
  )
}
