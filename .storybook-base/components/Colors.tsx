import { Unstyled } from "@storybook/blocks"
import clsx from "clsx"
import { CopyButton } from "../../src/components/Button"
import { Tooltip } from "../../src/components/Tooltip"
import s from "./Colors.module.css"

export const Colors = () => {
  return (
    <>
      <h2 id="grayscale">Grayscale</h2>
      <Unstyled>
        <Grayscale />
      </Unstyled>
      <h2 id="alphas">Alphas</h2>
      <Unstyled>
        <Alphas />
      </Unstyled>
      <h2 id="primary-colors">Primary colors</h2>
      <Unstyled>
        <Red />
        <Orange />
        <Yellow />
        <Green />
        <Blue />
        <Purple />
        <Pink />
      </Unstyled>
    </>
  )
}

const Grayscale = () => {
  return (
    <>
      <div className="flex text-black dark:text-white">
        <Color
          color="gray"
          weight="0"
          value="light-dark(#ffffff, #0d0d0d)"
          className={s.LightColorBorder}
        />
        <Color color="gray" weight="25" value="light-dark(#fcfcfc, #101010)" />
        <Color color="gray" weight="50" value="light-dark(#f9f9f9, #131313)" />
        <Color color="gray" weight="75" value="light-dark(#f3f3f3, #161616)" />
        <Color color="gray" weight="100" value="light-dark(#ededed, #181818)" />
        <Color color="gray" weight="150" value="light-dark(#dfdfdf, #1c1c1c)" />
        <Color color="gray" weight="200" value="light-dark(#c4c4c4, #212121)" />
        <Color color="gray" weight="250" value="light-dark(#b9b9b9, #282828)" />
        <Color color="gray" weight="300" value="light-dark(#afafaf, #303030)" />
        <Color color="gray" weight="350" value="light-dark(#9f9f9f, #393939)" />
        <Color
          color="gray"
          weight="400"
          value="light-dark(#8f8f8f, #414141)"
          className={s.InvertLight}
        />
        <Color
          color="gray"
          weight="450"
          value="light-dark(#767676, #4f4f4f)"
          className={s.InvertLight}
        />
        <Color color="gray" weight="500" value="#5d5d5d" className={s.InvertLight} />
      </div>
      <div className="flex light:text-white dark:text-black">
        <Color
          color="gray"
          weight="550"
          value="light-dark(#4f4f4f, #767676)"
          className={clsx(s.InvertLight, s.InvertDark)}
        />
        <Color
          color="gray"
          weight="600"
          value="light-dark(#414141, #8f8f8f)"
          className={clsx(s.InvertLight, s.InvertDark)}
        />
        <Color
          color="gray"
          weight="650"
          value="light-dark(#393939, #9f9f9f)"
          className={clsx(s.InvertLight, s.InvertDark)}
        />
        <Color
          color="gray"
          weight="700"
          value="light-dark(#303030, #afafaf)"
          className={clsx(s.InvertLight, s.InvertDark)}
        />
        <Color
          color="gray"
          weight="750"
          value="light-dark(#282828, #b9b9b9)"
          className={clsx(s.InvertLight, s.InvertDark)}
        />
        <Color
          color="gray"
          weight="800"
          value="light-dark(#212121, #c4c4c4)"
          className={clsx(s.InvertLight, s.InvertDark)}
        />
        <Color
          color="gray"
          weight="850"
          value="light-dark(#1c1c1c, #dcdcdc)"
          className={clsx(s.InvertLight, s.InvertDark)}
        />
        <Color
          color="gray"
          weight="900"
          value="light-dark(#181818, #ededed)"
          className={clsx(s.InvertLight, s.InvertDark)}
        />
        <Color
          color="gray"
          weight="925"
          value="light-dark(#161616, #f3f3f3)"
          className={clsx(s.InvertLight, s.InvertDark)}
        />
        <Color
          color="gray"
          weight="950"
          value="light-dark(#131313, #f3f3f3)"
          className={clsx(s.InvertLight, s.InvertDark)}
        />
        <Color
          color="gray"
          weight="975"
          value="light-dark(#101010, #f9f9f9)"
          className={clsx(s.InvertLight, s.InvertDark)}
        />
        <Color
          color="gray"
          weight="1000"
          value="light-dark(#0d0d0d, #ffffff)"
          className={clsx(s.InvertLight, s.InvertDark)}
        />
      </div>
    </>
  )
}
const Alphas = () => {
  return (
    <div className="flex text-black dark:text-white">
      <div className={s.Alpha}>
        <Color
          color="alpha"
          weight="0"
          value="alpha(var(--alpha-base), 0%)"
          className={s.LightColorBorder}
        />
      </div>
      <div className={s.Alpha}>
        <Color color="alpha" weight="02" value="alpha(var(--alpha-base), 2%)" />
      </div>
      <div className={s.Alpha}>
        <Color color="alpha" weight="04" value="alpha(var(--alpha-base), 4%)" />
      </div>
      <div className={s.Alpha}>
        <Color color="alpha" weight="05" value="alpha(var(--alpha-base), 5%)" />
      </div>
      <div className={s.Alpha}>
        <Color color="alpha" weight="06" value="alpha(var(--alpha-base), 6%)" />
      </div>
      <div className={s.Alpha}>
        <Color color="alpha" weight="08" value="alpha(var(--alpha-base), 8%)" />
      </div>
      <div className={s.Alpha}>
        <Color color="alpha" weight="10" value="alpha(var(--alpha-base), 10%)" />
      </div>
      <div className={s.Alpha}>
        <Color color="alpha" weight="12" value="alpha(var(--alpha-base), 12%)" />
      </div>
      <div className={s.Alpha}>
        <Color color="alpha" weight="15" value="alpha(var(--alpha-base), 15%)" />
      </div>
      <div className={s.Alpha}>
        <Color color="alpha" weight="16" value="alpha(var(--alpha-base), 16%)" />
      </div>
      <div className={s.Alpha}>
        <Color color="alpha" weight="20" value="alpha(var(--alpha-base), 20%)" />
      </div>
      <div className={s.Alpha}>
        <Color color="alpha" weight="25" value="alpha(var(--alpha-base), 25%)" />
      </div>
      <div className={s.Alpha}>
        <Color color="alpha" weight="30" value="alpha(var(--alpha-base), 30%)" />
      </div>
      <div className={s.Alpha}>
        <Color color="alpha" weight="35" value="alpha(var(--alpha-base), 35%)" />
      </div>
      <div className={s.Alpha}>
        <Color color="alpha" weight="40" value="alpha(var(--alpha-base), 40%)" />
      </div>
      <div className={s.Alpha}>
        <Color color="alpha" weight="50" value="alpha(var(--alpha-base), 50%)" />
      </div>
    </div>
  )
}

const Green = () => {
  return (
    <>
      <div className="flex text-black dark:text-white">
        <Color color="green" weight="25" value="#edfaf2" className={s.InvertDark} />
        <Color color="green" weight="50" value="#d9f4e4" className={s.InvertDark} />
        <Color color="green" weight="75" value="#b8ebcc" className={s.InvertDark} />
        <Color color="green" weight="100" value="#8cdfad" className={s.InvertDark} />
        <Color color="green" weight="200" value="#66d492" className={s.InvertDark} />
        <Color color="green" weight="300" value="#40c977" className={s.InvertDark} />
        <Color color="green" weight="400" value="#04b84c" className={s.InvertLight} />
        <Color color="green" weight="500" value="#00a240" className={s.InvertLight} />
        <Color color="green" weight="600" value="#008635" className={s.InvertLight} />
        <Color color="green" weight="700" value="#00692a" className={s.InvertLight} />
        <Color color="green" weight="800" value="#004f1f" className={s.InvertLight} />
        <Color color="green" weight="900" value="#011c0b" className={s.InvertLight} />
        <Color color="green" weight="950" value="#003716" className={s.InvertLight} />
        <Color color="green" weight="1000" value="#001207" className={s.InvertLight} />
      </div>
      <div className="flex dark:flex-row-reverse dark:text-white">
        <div className={s.Alpha}>
          <Color color="green" weight="a25" value="alpha(var(--green-400), 8%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="green" weight="a50" value="alpha(var(--green-400), 15%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="green" weight="a75" value="alpha(var(--green-400), 29%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="green" weight="a100" value="alpha(var(--green-400), 45%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="green" weight="a200" value="alpha(var(--green-400), 60%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="green" weight="a300" value="alpha(var(--green-400), 75%)" />
        </div>
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
      </div>
    </>
  )
}

const Red = () => {
  return (
    <>
      <div className="flex text-black dark:text-white">
        <Color color="red" weight="25" value="#fff0f0" className={s.InvertDark} />
        <Color color="red" weight="50" value="#ffd9d9" className={s.InvertDark} />
        <Color color="red" weight="75" value="#ffc6c5" className={s.InvertDark} />
        <Color color="red" weight="100" value="#ffa4a2" className={s.InvertDark} />
        <Color color="red" weight="200" value="#ff8583" className={s.InvertDark} />
        <Color color="red" weight="300" value="#ff6764" className={s.InvertDark} />
        <Color color="red" weight="400" value="#fa423e" className={s.InvertLight} />
        <Color color="red" weight="500" value="#e02e2a" className={s.InvertLight} />
        <Color color="red" weight="600" value="#ba2623" className={s.InvertLight} />
        <Color color="red" weight="700" value="#911e1b" className={s.InvertLight} />
        <Color color="red" weight="800" value="#6e1615" className={s.InvertLight} />
        <Color color="red" weight="900" value="#4d100e" className={s.InvertLight} />
        <Color color="red" weight="950" value="#280b0a" className={s.InvertLight} />
        <Color color="red" weight="1000" value="#1f0909" className={s.InvertLight} />
      </div>
      <div className="flex dark:flex-row-reverse dark:text-white">
        <div className={s.Alpha}>
          <Color color="red" weight="a25" value="alpha(var(--red-400), 8%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="red" weight="a50" value="alpha(var(--red-400), 16%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="red" weight="a75" value="alpha(var(--red-400), 30%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="red" weight="a100" value="alpha(var(--red-400), 48%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="red" weight="a200" value="alpha(var(--red-400), 64%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="red" weight="a300" value="alpha(var(--red-400), 79%)" />
        </div>
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
      </div>
    </>
  )
}

const Pink = () => {
  return (
    <>
      <div className="flex text-black dark:text-white">
        <Color color="pink" weight="25" value="#fff4f9" className={s.InvertDark} />
        <Color color="pink" weight="50" value="#ffe8f3" className={s.InvertDark} />
        <Color color="pink" weight="75" value="#ffd4e8" className={s.InvertDark} />
        <Color color="pink" weight="100" value="#ffbada" className={s.InvertDark} />
        <Color color="pink" weight="200" value="#ffa3ce" className={s.InvertDark} />
        <Color color="pink" weight="300" value="#ff8cc1" className={s.InvertDark} />
        <Color color="pink" weight="400" value="#ff66ad" className={s.InvertLight} />
        <Color color="pink" weight="500" value="#e04c91" className={s.InvertLight} />
        <Color color="pink" weight="600" value="#ba437a" className={s.InvertLight} />
        <Color color="pink" weight="700" value="#963c67" className={s.InvertLight} />
        <Color color="pink" weight="800" value="#6e2c4a" className={s.InvertLight} />
        <Color color="pink" weight="900" value="#4d1f34" className={s.InvertLight} />
        <Color color="pink" weight="950" value="#29101c" className={s.InvertLight} />
        <Color color="pink" weight="1000" value="#1a0a11" className={s.InvertLight} />
      </div>
      <div className="flex dark:flex-row-reverse dark:text-white">
        <div className={s.Alpha}>
          <Color color="pink" weight="a25" value="alpha(var(--pink-400), 8%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="pink" weight="a50" value="alpha(var(--pink-400), 16%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="pink" weight="a75" value="alpha(var(--pink-400), 28%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="pink" weight="a100" value="alpha(var(--pink-400), 45%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="pink" weight="a200" value="alpha(var(--pink-400), 60%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="pink" weight="a300" value="alpha(var(--pink-400), 76%)" />
        </div>
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
      </div>
    </>
  )
}

const Orange = () => {
  return (
    <>
      <div className="flex text-black dark:text-white">
        <Color color="orange" weight="25" value="#fff5f0" className={s.InvertDark} />
        <Color color="orange" weight="50" value="#ffe7d9" className={s.InvertDark} />
        <Color color="orange" weight="75" value="#ffcfb4" className={s.InvertDark} />
        <Color color="orange" weight="100" value="#ffb790" className={s.InvertDark} />
        <Color color="orange" weight="200" value="#ff9e6c" className={s.InvertDark} />
        <Color color="orange" weight="300" value="#ff8549" className={s.InvertDark} />
        <Color color="orange" weight="400" value="#fb6a22" className={s.InvertLight} />
        <Color color="orange" weight="500" value="#e25507" className={s.InvertLight} />
        <Color color="orange" weight="600" value="#b9480d" className={s.InvertLight} />
        <Color color="orange" weight="700" value="#923b0f" className={s.InvertLight} />
        <Color color="orange" weight="800" value="#6d2e0f" className={s.InvertLight} />
        <Color color="orange" weight="900" value="#4a2206" className={s.InvertLight} />
        <Color color="orange" weight="950" value="#281105" className={s.InvertLight} />
        <Color color="orange" weight="1000" value="#211107" className={s.InvertLight} />
      </div>
      <div className="flex dark:flex-row-reverse dark:text-white">
        <div className={s.Alpha}>
          <Color color="orange" weight="a25" value="alpha(var(--orange-400), 7%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="orange" weight="a50" value="alpha(var(--orange-400), 16%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="orange" weight="a75" value="alpha(var(--orange-400), 33%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="orange" weight="a100" value="alpha(var(--orange-400), 48%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="orange" weight="a200" value="alpha(var(--orange-400), 65%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="orange" weight="a300" value="alpha(var(--orange-400), 81%)" />
        </div>
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
      </div>
    </>
  )
}

const Yellow = () => {
  return (
    <>
      <div className="flex text-black dark:text-white">
        <Color color="yellow" weight="25" value="#fffbed" className={s.InvertDark} />
        <Color color="yellow" weight="50" value="#fff6d9" className={s.InvertDark} />
        <Color color="yellow" weight="75" value="#ffeeb8" className={s.InvertDark} />
        <Color color="yellow" weight="100" value="#ffe48c" className={s.InvertDark} />
        <Color color="yellow" weight="200" value="#ffdb66" className={s.InvertDark} />
        <Color color="yellow" weight="300" value="#ffd240" className={s.InvertDark} />
        <Color color="yellow" weight="400" value="#ffc300" className={s.InvertDark} />
        <Color color="yellow" weight="500" value="#e0ac00" className={s.InvertDark} />
        <Color color="yellow" weight="600" value="#ba8e00" className={s.InvertLight} />
        <Color color="yellow" weight="700" value="#916f00" className={s.InvertLight} />
        <Color color="yellow" weight="800" value="#6e5400" className={s.InvertLight} />
        <Color color="yellow" weight="900" value="#4d3b00" className={s.InvertLight} />
        <Color color="yellow" weight="950" value="#261d00" className={s.InvertLight} />
        <Color color="yellow" weight="1000" value="#1a1400" className={s.InvertLight} />
      </div>
      <div className="flex dark:flex-row-reverse dark:text-white">
        <div className={s.Alpha}>
          <Color color="yellow" weight="a25" value="alpha(var(--yellow-400), 8%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="yellow" weight="a50" value="alpha(var(--yellow-400), 15%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="yellow" weight="a75" value="alpha(var(--yellow-400), 27%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="yellow" weight="a100" value="alpha(var(--yellow-400), 45%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="yellow" weight="a200" value="alpha(var(--yellow-400), 59%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="yellow" weight="a300" value="alpha(var(--yellow-400), 74%)" />
        </div>
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
      </div>
    </>
  )
}

const Purple = () => {
  return (
    <>
      <div className="flex text-black dark:text-white">
        <Color color="purple" weight="25" value="#f9f5fe" className={s.InvertDark} />
        <Color color="purple" weight="50" value="#efe5fe" className={s.InvertDark} />
        <Color color="purple" weight="75" value="#e0cefd" className={s.InvertDark} />
        <Color color="purple" weight="100" value="#ceb0fb" className={s.InvertDark} />
        <Color color="purple" weight="200" value="#be95fa" className={s.InvertDark} />
        <Color color="purple" weight="300" value="#ad7bf9" className={s.InvertDark} />
        <Color color="purple" weight="400" value="#924ff7" className={s.InvertLight} />
        <Color color="purple" weight="500" value="#8046d9" className={s.InvertLight} />
        <Color color="purple" weight="600" value="#6b3ab4" className={s.InvertLight} />
        <Color color="purple" weight="700" value="#532d8d" className={s.InvertLight} />
        <Color color="purple" weight="800" value="#3f226a" className={s.InvertLight} />
        <Color color="purple" weight="900" value="#2c184a" className={s.InvertLight} />
        <Color color="purple" weight="950" value="#160c25" className={s.InvertLight} />
        <Color color="purple" weight="1000" value="#100a19" className={s.InvertLight} />
      </div>
      <div className="flex dark:flex-row-reverse dark:text-white">
        <div className={s.Alpha}>
          <Color color="purple" weight="a25" value="alpha(var(--purple-400), 6%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="purple" weight="a50" value="alpha(var(--purple-400), 15%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="purple" weight="a75" value="alpha(var(--purple-400), 28%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="purple" weight="a100" value="alpha(var(--purple-400), 45%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="purple" weight="a200" value="alpha(var(--purple-400), 60%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="purple" weight="a300" value="alpha(var(--purple-400), 75%)" />
        </div>
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
      </div>
    </>
  )
}

const Blue = () => {
  return (
    <>
      <div className="flex text-black dark:text-white">
        <Color color="blue" weight="25" value="#f5faff" className={s.InvertDark} />
        <Color color="blue" weight="50" value="#e5f3ff" className={s.InvertDark} />
        <Color color="blue" weight="75" value="#cce6ff" className={s.InvertDark} />
        <Color color="blue" weight="100" value="#99ceff" className={s.InvertDark} />
        <Color color="blue" weight="200" value="#66b5ff" className={s.InvertDark} />
        <Color color="blue" weight="300" value="#339cff" className={s.InvertDark} />
        <Color color="blue" weight="400" value="#0285ff" className={s.InvertLight} />
        <Color color="blue" weight="500" value="#0169cc" className={s.InvertLight} />
        <Color color="blue" weight="600" value="#004f99" className={s.InvertLight} />
        <Color color="blue" weight="700" value="#003f7a" className={s.InvertLight} />
        <Color color="blue" weight="800" value="#013566" className={s.InvertLight} />
        <Color color="blue" weight="900" value="#00284d" className={s.InvertLight} />
        <Color color="blue" weight="950" value="#000e1a" className={s.InvertLight} />
        <Color color="blue" weight="1000" value="#000d19" className={s.InvertLight} />
      </div>
      <div className="flex dark:flex-row-reverse dark:text-white">
        <div className={s.Alpha}>
          <Color color="blue" weight="a25" value="alpha(var(--blue-400), 4%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="blue" weight="a50" value="alpha(var(--blue-400), 13%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="blue" weight="a75" value="alpha(var(--blue-400), 25%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="blue" weight="a100" value="alpha(var(--blue-400), 40%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="blue" weight="a200" value="alpha(var(--blue-400), 60%)" />
        </div>
        <div className={s.Alpha}>
          <Color color="blue" weight="a300" value="alpha(var(--blue-400), 80%)" />
        </div>
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
        <div className="flex-1" />
      </div>
    </>
  )
}

const Color = ({
  className,
  color,
  weight,
  value,
  invertText,
}: {
  className?: string
  color: string
  weight: string
  value: string
  invertText?: boolean
}) => {
  const token = `${color}-${weight}`
  const variable = `var(--${token})`

  return (
    <Tooltip
      interactive
      maxWidth="none"
      // forceOpen={token === "green-50"}
      sideOffset={-10}
      openDelay={300}
      contentClassName="p-2"
      content={
        <>
          <div>
            <CopyButton
              color="secondary"
              copyValue={variable}
              variant="ghost"
              size="2xs"
              className={s.CopyButton}
            >
              {token}
            </CopyButton>
          </div>
          <div className={s.TooltipValue}>
            <CopyButton
              color="secondary"
              copyValue={value}
              variant="ghost"
              size="2xs"
              className={s.CopyButton}
            >
              {value}
            </CopyButton>
          </div>
        </>
      }
    >
      <div
        className={clsx(s.Color, className)}
        style={{ backgroundColor: variable }}
        data-inverted={invertText ? "" : undefined}
      >
        <div className={s.Label}>{weight}</div>
      </div>
    </Tooltip>
  )
}
