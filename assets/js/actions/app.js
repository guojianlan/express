import { CHANGELOADING } from '../actionType.js'

export function changeLoading(flag){
	return {
		type:CHANGELOADING,
		loading:flag
	}
}