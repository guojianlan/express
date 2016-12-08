import React from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router'
import { increase, decrease } from '../../actions/count'

class Index extends React.Component{
	render(){
		const { number,increase ,decrease} = this.props;
		return (
				<div >
					<div><Link to={`/page/two`} activeClassName="active">Two</Link></div>
					<div onClick={() => increase(1)}>increase</div>
					<div onClick={() => decrease(1)}>decrease</div>
					{number}
				</div>
			)
	}
}
export default connect(
	state => ({ number: state.count.number }),
	{increase,decrease}
)(Index)