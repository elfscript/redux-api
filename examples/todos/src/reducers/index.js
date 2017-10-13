//import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import appReady from "./appReady";
//const todoApp = combineReducers({
const todoApp={
	todos,
	visibilityFilter,
	isReady:appReady, //(state.isReady, action);
};

export default todoApp

/*
function todoApp(state = {}, action) {
	  return {
		      visibilityFilter: visibilityFilter(state.visibilityFilter, action),
		      todos: todos(state.todos, action)
		    }
}
*/
