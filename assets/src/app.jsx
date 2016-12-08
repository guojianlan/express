import React  from 'react'
import { createStore,combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
function counter(state = { count: 0 }, action) {
  const count = state.count
  switch (action.type) {
    case 'increase':
      return { count: count + 1 }
    default:
      return state
  }
}
var reducers = combineReducers({
  counter
  })
console.log(reducers);
const store = createStore(
    reducers
  );

console.log(store);
const increaseAction = { type: 'increase' }
export default class IndexApp extends React.Component{
  render(){
    return (
        <Provider store={store}>
          <App />
        </Provider>
      )
  }
}
class Counter extends React.Component {
  render() {
    const { value, onIncreaseClick } = this.props
    return (
      <div>
        <span>{value}</span>
        <button onClick={onIncreaseClick}>Increase</button>
      </div>
    )
  }
}
const App = connect(
  (state) => {
    return{
      value:state.counter.count
    }
    },
  (dispatch) => {
    return {
      onIncreaseClick: () => dispatch(increaseAction)
    }
  }
)(Counter)

