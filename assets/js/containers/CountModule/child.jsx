import React from 'react';
import { connect } from 'react-redux'

class Index extends React.Component{
	render(){
		const {number,increase} = this.props;
		return (
				<div >
					child
				</div>
			)
	}
}
export default connect(
	state => ({ number: state.count.number }),
	dispatch =>({increase(){
		dispatch({type:'INCREASE',amount:1})
		}})
)(Index)