import { Heading, Unstyled } from "@storybook/blocks"
import { useMemo, useState } from "react"
import { Button, CopyButton } from "../../src/components/Button"
import { Search } from "../../src/components/Icon"
import s from "./DesignTokens.module.css"
import { BREAKPOINTS, FONTS, MOTION, RADIUS, SEMANTIC_COLORS, SHADOWS, TEXT_COLORS } from "./tokens"

export const DesignTokens = () => {
  const [search, setSearch] = useState<string>("")
  const [view, setView] = useState<string>("all")

  return (
    <>
      <div className={s.StickyContainer}>
        <div className={s.Container}>
          <Search className={s.InputIcon} />
          <input
            className={s.Input}
            value={search}
            onChange={(evt) => setSearch(evt.target.value)}
            placeholder="Search..."
          />
        </div>
      </div>
      <Unstyled>
        <div className="flex flex-wrap gap-1">
          <Button
            variant="soft"
            pill
            color={view === "all" ? "info" : "secondary"}
            onClick={() => setView("all")}
          >
            All
          </Button>
          <Button
            variant="soft"
            pill
            color={view === "text" ? "info" : "secondary"}
            onClick={() => setView("text")}
          >
            Text colors
          </Button>
          <Button
            variant="soft"
            pill
            color={view === "semantic" ? "info" : "secondary"}
            onClick={() => setView("semantic")}
          >
            Semantic colors
          </Button>
          <Button
            variant="soft"
            pill
            color={view === "fonts" ? "info" : "secondary"}
            onClick={() => setView("fonts")}
          >
            Fonts
          </Button>
          <Button
            variant="soft"
            pill
            color={view === "radius" ? "info" : "secondary"}
            onClick={() => setView("radius")}
          >
            Radius
          </Button>
          <Button
            variant="soft"
            pill
            color={view === "shadows" ? "info" : "secondary"}
            onClick={() => setView("shadows")}
          >
            Shadows
          </Button>
          <Button
            variant="soft"
            pill
            color={view === "motion" ? "info" : "secondary"}
            onClick={() => setView("motion")}
          >
            Motion
          </Button>
        </div>
      </Unstyled>
      {(view === "all" || view === "text") && <TextColors filter={search} />}
      {(view === "all" || view === "semantic") && <SemanticColors filter={search} />}
      {(view === "all" || view === "fonts") && <TypographyTokens filter={search} />}
      {(view === "all" || view === "radius") && <RadiusTokens filter={search} />}
      {(view === "all" || view === "shadows") && <ShadowTokens filter={search} />}
      {(view === "all" || view === "breakpoints") && <BreakpointTokens filter={search} />}
      {(view === "all" || view === "motion") && <MotionTokens filter={search} />}
    </>
  )
}

const TextColors = ({ filter }: { filter: string }) => {
  const filtered = useMemo(() => TEXT_COLORS.filter(({ name }) => name.includes(filter)), [filter])

  if (!filtered.length) {
    return null
  }

  return (
    <>
      {/* @ts-expect-error -- it does exist */}
      <Heading id="text-colors" as="h2">
        Text colors
      </Heading>
      <Unstyled>
        <table className={s.Table}>
          <tbody>
            {filtered.map(({ name, value }) => (
              <tr key={name}>
                <td width="50">
                  <ColorDisplay value={value} />
                </td>
                <td>
                  <CopyButton
                    className={s.CopyButton}
                    color="secondary"
                    variant="soft"
                    size="2xs"
                    copyValue={`var(--${name})`}
                  >
                    {name}
                  </CopyButton>
                </td>
                <td>
                  <ValueDisplay value={value} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Unstyled>
    </>
  )
}

const SemanticColors = ({ filter }: { filter: string }) => {
  const filtered = useMemo(
    () => SEMANTIC_COLORS.filter(({ name }) => name.includes(filter)),
    [filter],
  )

  if (!filtered.length) {
    return null
  }

  return (
    <>
      {/* @ts-expect-error -- it does exist */}
      <Heading id="semantic-colors" as="h2">
        Semantic colors
      </Heading>
      <Unstyled>
        <table className={s.Table}>
          <tbody>
            {filtered.map(({ name, value }) => (
              <tr key={name}>
                <td width="50">
                  <ColorDisplay value={value} />
                </td>
                <td>
                  <CopyButton
                    className={s.CopyButton}
                    color="secondary"
                    variant="soft"
                    size="2xs"
                    copyValue={`var(--${name})`}
                  >
                    {name}
                  </CopyButton>
                </td>
                <td>
                  <ValueDisplay value={value} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Unstyled>
    </>
  )
}

const RadiusTokens = ({ filter }: { filter: string }) => {
  const filtered = useMemo(() => RADIUS.filter(({ name }) => name.includes(filter)), [filter])

  if (!filtered.length) {
    return null
  }

  return (
    <>
      {/* @ts-expect-error -- it does exist */}
      <Heading id="radius" as="h2">
        Radius
      </Heading>
      <Unstyled>
        <table className={s.Table}>
          <tbody>
            {filtered.map(({ name, value }) => (
              <tr key={name}>
                <td width="80">
                  <div className={s.RadiusDisplay} style={{ borderRadius: `var(--${name})` }} />
                </td>
                <td>
                  <CopyButton
                    className={s.CopyButton}
                    color="secondary"
                    variant="soft"
                    size="2xs"
                    copyValue={`var(--${name})`}
                  >
                    {name}
                  </CopyButton>
                </td>
                <td>
                  <ValueDisplay value={value} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Unstyled>
    </>
  )
}

const TypographyTokens = ({ filter }: { filter: string }) => {
  const filtered = useMemo(() => FONTS.filter(({ name }) => name.includes(filter)), [filter])

  if (!filtered.length) {
    return null
  }

  return (
    <>
      {/* @ts-expect-error -- it does exist */}
      <Heading id="Fonts" as="h2">
        Fonts
      </Heading>
      <Unstyled>
        <table className={s.Table}>
          <tbody>
            {filtered.map(({ name, value }) => (
              <tr key={name}>
                <td>
                  <CopyButton
                    className={s.CopyButton}
                    color="secondary"
                    variant="soft"
                    size="2xs"
                    copyValue={`var(--${name})`}
                  >
                    {name}
                  </CopyButton>
                </td>
                <td>
                  <ValueDisplay value={value} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Unstyled>
    </>
  )
}

const ShadowTokens = ({ filter }: { filter: string }) => {
  const filtered = useMemo(() => SHADOWS.filter(({ name }) => name.includes(filter)), [filter])

  if (!filtered.length) {
    return null
  }

  return (
    <>
      {/* @ts-expect-error -- it does exist */}
      <Heading id="shadows" as="h2">
        Shadows
      </Heading>
      <Unstyled>
        <table className={s.Table}>
          <tbody>
            {filtered.map(({ name }) => (
              <tr key={name}>
                <td>
                  <CopyButton
                    className={s.CopyButton}
                    color="secondary"
                    variant="soft"
                    size="2xs"
                    copyValue={`var(--${name})`}
                  >
                    {name}
                  </CopyButton>
                </td>
                <td>
                  <div className={s.ShadowDisplayWrapper}>
                    <div className={s.ShadowDisplay} style={{ boxShadow: `var(--${name})` }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Unstyled>
    </>
  )
}

const BreakpointTokens = ({ filter }: { filter: string }) => {
  const filtered = useMemo(() => BREAKPOINTS.filter(({ name }) => name.includes(filter)), [filter])

  if (!filtered.length) {
    return null
  }

  return (
    <>
      {/* @ts-expect-error -- it does exist */}
      <Heading id="breakpoints" as="h2">
        Breakpoints
      </Heading>
      <Unstyled>
        <table className={s.Table}>
          <tbody>
            {filtered.map(({ name, value }) => (
              <tr key={name}>
                <td>
                  <CopyButton
                    className={s.CopyButton}
                    color="secondary"
                    variant="soft"
                    size="2xs"
                    copyValue={`var(--${name})`}
                  >
                    {name}
                  </CopyButton>
                </td>
                <td>
                  <ValueDisplay value={value} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Unstyled>
    </>
  )
}

const MotionTokens = ({ filter }: { filter: string }) => {
  const filtered = useMemo(() => MOTION.filter(({ name }) => name.includes(filter)), [filter])

  if (!filtered.length) {
    return null
  }

  return (
    <>
      {/* @ts-expect-error -- it does exist */}
      <Heading id="motion" as="h2">
        Motion
      </Heading>
      <Unstyled>
        <table className={s.Table}>
          <tbody>
            {filtered.map(({ name, value }) => (
              <tr key={name}>
                <td>
                  <CopyButton
                    className={s.CopyButton}
                    color="secondary"
                    variant="soft"
                    size="2xs"
                    copyValue={`var(--${name})`}
                  >
                    {name}
                  </CopyButton>
                </td>
                <td>
                  <ValueDisplay value={value} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Unstyled>
    </>
  )
}

const ColorDisplay = ({ value }: { value: { light: string; dark: string } }) => {
  const { light, dark } = value
  return (
    <div className={s.ColorDisplay} style={{ backgroundColor: `light-dark(${light}, ${dark})` }} />
  )
}

const ValueDisplay = ({ value }: { value: string | { light: string; dark: string } }) => {
  if (typeof value === "string") {
    const displayValue = value.replace(/var\(--(.*?)\)/g, "$1")
    const translatedValue = displayValue.endsWith("rem") ? `${parseFloat(displayValue) * 16}px` : ""

    return (
      <>
        <span className={s.ValueDisplay}>{displayValue}</span>
        {translatedValue && (
          <>
            <span className="text-tertiary mx-1">≈</span>
            <span className={s.ValueDisplay}>{translatedValue}</span>
          </>
        )}
      </>
    )
  }

  const { light, dark } = value

  return (
    <span className={s.ValueDisplay}>
      <span data-light>{light.replace(/var\(--(.*?)\)/g, "$1")}</span>
      <span data-dark>{dark.replace(/var\(--(.*?)\)/g, "$1")}</span>
    </span>
  )
}
