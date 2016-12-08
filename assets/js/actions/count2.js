import { CHANGEDATA } from '../actionType.js'

export function changeData(n) {
  return {
    type: CHANGEDATA,
    data: n
  }
}