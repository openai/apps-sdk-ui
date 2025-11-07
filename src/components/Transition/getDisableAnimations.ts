import { isTest } from "../../lib/constants"

// By default, all tests will treat <TransitionGroup> as `disableAnimations={true}`,
// removing the need to be aware of misc. async animations happening across tests.
// We could add support for things like `prefers-reduced-motion` in the future here as well.
export default () => isTest
