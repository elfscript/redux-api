const inputReducer = (state ={id:-1,} , action) => {
	switch (action.type) {
	
		case 'SET_INPUT':
			console.log("SET_INPUT " + JSON.stringify(action.data));
			return action.data; 
		default:
			return state
	}
}

export default inputReducer 
