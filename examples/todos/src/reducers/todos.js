import rest from '../actions/rest';

const todos = (state = [], action) => {
	switch (action.type) {
		case rest.events.addtodo.actionSuccess:
			console.log("todos reducer catch rest.events.addtodo");
			console.log("action.data:" + JSON.stringify(action.data));
			//why action.data is empty ?
			return [
				...state,
				{
					id: action.data.id,
					text: action.data.text + action.data.date.toString(),
					completed: action.data.completed
				}
			]
		case rest.events.todos.actionSuccess:
			//get todos list
			console.log("todos reducer catch rest.events.todos");
			//console.log("action.data:" + JSON.stringify(action.data));
			//why action.data is empty ?
			console.log(typeof(action.data));
			console.log(action.data.data);

			return [
				...state, ...action.data.data
			]
		case rest.events.delete_item.actionSuccess:
			console.log("delete_item succeeded " + JSON.stringify(action.data));
			console.log("typeof action.id = " + typeof(action.data.id));
			return  state.filter(function(item) { return item.id !== action.data.id });
			//return state;

		case 'ADD_TODO':
			/*return [
				Object.assign({}, state,
					{
						id: action.id,
						text: action.text,
						completed: false
					})
			]*/
			//state is array instead of object
			return [
				...state,
				{
					id: action.id,
					text: action.text,
					completed: false
				}
			]

		case 'TOGGLE_TODO':
			return state.map(todo =>
				(todo.id === action.id) 
				? Object.assign({}, todo, {completed: !todo.completed})
				: todo
			)
		default:
			return state
	}
}

export default todos
