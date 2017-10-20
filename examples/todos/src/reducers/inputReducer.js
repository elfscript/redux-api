const inputReducer = (state = '', action) => {
	switch (action.type) {
	
		case 'SET_INPUT_TEXT':
			return action.text; 
		default:
			return state
	}
}

export default inputReducer 
