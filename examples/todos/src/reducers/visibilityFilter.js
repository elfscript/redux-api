import rest from '../actions/rest';

const visibilityFilter = (state = {filterKind:'SHOW_ALL',id:-1}, action) => {
	switch (action.type) {
		case 'SET_VISIBILITY_FILTER':
			return action.filter
		case rest.events.update_item.actionSuccess:
			console.log("caught by visibilityFilter reducer after update_item succeeded, id= " + action.data.id);
			return {filterKind:'SHOW_ALL', id:-1} ; //reset filterKind to show all todos after update_item
		default:
			return state
	}
}

export default visibilityFilter
