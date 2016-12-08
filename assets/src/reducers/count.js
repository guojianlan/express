import { INCREASE, DECREASE } from '../storyActionType.js'

const initialState = {
  number: 1
}

export default function(state = initialState, action) {
  if(action.type === INCREASE) {
    return { number: state.number + action.amount }
  }
  else if(action.type === DECREASE) {
    return { number: state.number - action.amount }
  }
  return state
}