/* eslint import/no-unresolved: 0 */
/* eslint import/extensions: 0 */
import reduxApi from "redux-api";

const headers = {
	"User-Agent": "redux-api"
};
const URL = "http://localhost:3000";

export default reduxApi({
	addtodo: {
		url: `${URL}/api/addtodo`,
		options:{ 
			method: 'POST',
			headers: {"Accept": "application/json", 
				"Content-Type": "application/json" }
		}
	},
	todos: {
		url: `${URL}/api/todos`,
		options:{ 
			method: 'GET',
			headers: {"Accept": "application/json", 
				"Content-Type": "application/json" }
		}
	}




});

/*
 *
 * dispatch(api.actions.addtodo({
 *
 * *    body: JSON.stringify({title: "Hello", message: "World"})
 *
 * *  }));
 * */
