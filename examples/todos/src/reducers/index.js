//import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

//const todoApp = combineReducers({
const todoApp={
  todos,
  visibilityFilter
};

export default todoApp