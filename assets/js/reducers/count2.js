import { CHANGEDATA } from '../actionType.js'

const initialState = {
  objData: 12313
}

export default function(state = initialState, action) {
  if(action.type === 'CHANGEDATA') {
    return { objData:action.data }
  }
  return state
}