import React  from 'react'
import { Router, Route, browserHistory } from 'react-router';
import routeConfig from './common/routerConfig'
export default class Welcome extends React.Component {
  render(){
  	return (
  			<Router history={browserHistory} routes={routeConfig} />
  		)
  }
}