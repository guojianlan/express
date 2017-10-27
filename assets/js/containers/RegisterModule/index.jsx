import React from 'react'

export default class Index extends React.Component{
	render(){
		return (
				<div className="container">
			      <div className="form-signin" role="form">
			        <h2 className="form-signin-heading">Please sign in</h2>
			        <input type="email" className="form-control" placeholder="Email address" defaultValue="" />
			        <input type="password" className="form-control" placeholder="Password" defaultValue="" />
			        <div className="checkbox">
			          <label>
			            <input type="checkbox" value="remember-me" /> Remember me
			          </label>
			        </div>
			        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
			      </div>
    </div>
			)
	}
}