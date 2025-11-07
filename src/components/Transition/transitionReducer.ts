export type TransitionState = {
  enter: boolean
  enterActive: boolean
  exit: boolean
  exitActive: boolean
  interrupted: boolean
}

export type TransitionStateAction =
  | { type: "enter-before" }
  | { type: "enter-active" }
  | { type: "exit-before" }
  | { type: "exit-active" }
  | { type: "done" }

export const RESTING_TRANSITION_STATE: TransitionState = {
  enter: false,
  enterActive: false,
  exit: false,
  exitActive: false,
  interrupted: false,
}

export const getInitialTransitionState = (preventMountTransition: boolean): TransitionState => ({
  ...RESTING_TRANSITION_STATE,
  enter: !preventMountTransition,
})

export const transitionReducer = (
  state: TransitionState,
  action: TransitionStateAction,
): TransitionState => {
  switch (action.type) {
    case "enter-before":
      return {
        enter: true,
        enterActive: false,
        exit: false,
        exitActive: false,
        interrupted: state.interrupted || state.exit,
      }
    case "enter-active":
      return {
        enter: true,
        enterActive: true,
        exit: false,
        exitActive: false,
        interrupted: false,
      }
    case "exit-before":
      return {
        enter: false,
        enterActive: false,
        exit: true,
        exitActive: false,
        interrupted: state.interrupted || state.enter,
      }
    case "exit-active":
      return {
        enter: false,
        enterActive: false,
        exit: true,
        exitActive: true,
        interrupted: false,
      }
    case "done":
    default:
      return RESTING_TRANSITION_STATE
  }
}
