import React from 'react'
import Header from '../packages/header.jsx'
import {Link} from 'react-router'
import { connect } from 'react-redux'
import { increase, decrease } from '../../actions/count.js'

const increaseAction = { type: 'increase' }
function mapStateToProps(state) {
  return {
    value: state.count
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction)
  }
}

export default class App extends React.Component {

  render() {
    const { value, onIncreaseClick } = this.props
    return (
      <div>
        <div>{value}</div>
        <div >xxxx</div>
      	{this.props.params.userID || <div>12313</div>}
      	<li><Link to={`/page/two`} activeClassName="active">bar task</Link></li>
      	<Header />
        <h2>App</h2>
      </div>
    )
  }

}
connect(mapStateToProps,mapDispatchToProps)(App)