import React from 'react'
import { render } from 'react-dom';
import { createStore, applyMiddleware,combineReducers } from 'redux' 
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import rootRoute from './routes.js'
import * as reducers from './reducers'
const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
})
const store = createStore(reducer)

const history = syncHistoryWithStore(browserHistory, store)
render(
  <Provider store={store}>
  	<div>
  		<Router history={history} routes={rootRoute} />
  	</div>
  </Provider>,
  document.getElementById('react-root')
);

