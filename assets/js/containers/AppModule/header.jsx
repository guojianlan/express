import React from 'react'
import { Link } from 'react-router'
export default class Index extends React.Component{
	render(){

		return (
				<nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">我的项目</a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li className="active">
							<Link to={`/page`}>page</Link>
          	</li>
            <li>
            	<Link to={`/page/register`}>register</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
			)
	}
}