import { INCREASE, DECREASE } from '../actionType.js'
import _ from 'lodash'
const initialState = {
  number: 112313
}

export default function(state = initialState, action) {
  if(action.type === INCREASE) {
    return  _.assign({},state,{
    	number: state.number + action.amount
    })
  }
  else if(action.type === DECREASE) {
    return  _.assign({},state,{
    	number: state.number - action.amount
    })
  }
  return state
}