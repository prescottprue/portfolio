import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'
import tabs from './tabs'

const rootReducer = combineReducers({
  tabs,
  router: routeReducer
})

export default rootReducer
