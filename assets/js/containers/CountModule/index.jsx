import React from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router'


class Index extends React.Component{
	render(){
		const {number,increase} = this.props;
		return (
				<div >
					{number}
					<div><Link to={`/page`} activeClassName="active">Two</Link></div>
					<div><Link to={`/page/two/user`} activeClassName="active">CHild</Link></div>
					<div onClick={() => increase()}>increase</div>
					{this.props.children}
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