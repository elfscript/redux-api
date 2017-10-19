import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'
import rest from '../actions/rest'

const getVisibleTodos = (todos, filter) => {
	switch (filter) {
		case 'SHOW_ALL':
			return todos
		case 'SHOW_COMPLETED':
			return todos.filter(t => t.completed)
		case 'SHOW_ACTIVE':
			return todos.filter(t => !t.completed)
		default:
			throw new Error('Unknown filter: ' + filter)
	}
}

const mapStateToProps = (state) => ({
	todos: getVisibleTodos(state.todos, state.visibilityFilter)
})

const mapDispatchToProps =(dispatch) => {
	return {
		onTodoClick: (id)=> dispatch(toggleTodo(id)),
		onEditItem: (data)=> dispatch(rest.actions.update_item({},{body:data})),
		onDeleteItem: (id) => dispatch(rest.actions.delete_item({id:id}))
	}
}

const VisibleTodoList = connect(
	mapStateToProps,
	mapDispatchToProps
)(TodoList)

export default VisibleTodoList

//=== verbose form of mapStateToProps
/*
 const mapStateToProps = (state) => {
   return {
	       todos: getVisibleTodos(state.todos, state.visibilityFilter)
	     }
 }

*/

//=== verbose form of mapDispatchToProps
/* const mapDispatchToProps = (dispatch) => {
	  return {
		      onTodoClick: (id) => {
				    dispatch(toggleTodo(id))
				  }
		    }
}
*/










