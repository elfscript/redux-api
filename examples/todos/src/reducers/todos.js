import rest from '../actions/rest';

const todos = (state = [], action) => {
	switch (action.type) {
		case rest.events.myreduxapiReducer.actionSuccess:
			console.log("todos reducer catch rest.events.myreduxapiReducer");
			//console.log(JSON.stringify(rest.reducers.myreduxapiReducer.data));
			console.log("action.data:" + JSON.stringify(action.data));
			//why action.data is empty ?
			return [
				Object.assign({}, state,
					{
						id: action.data.id,
						text: action.data.msg + action.data.date.toString(),
						completed: false
					})
			]

		case 'ADD_TODO':
			return [
				Object.assign({}, state,
					{
						id: action.id,
						text: action.text,
						completed: false
					})
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
