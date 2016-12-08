import React from 'react'
import Header from './packages/header.jsx'
import {Link} from 'react-router'
class App extends React.Component {

  render() {
    return (
      <div>
      	{this.props.params.userID || <div>12313</div>}
      	<li><Link to={`/page/two`} activeClassName="active">bar task</Link></li>
      	<Header />
        <h2>App</h2>
        {this.props.children || <p>Choose an assignment from the sidebar.</p>}
      </div>
    )
  }

}

module.exports = App