//=================
//"use strict";
import React from "react";
import { render } from "react-dom";

// React-Router
//import Router from "react-router";

// Redux
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

// Redux-api
import reduxApi from "./actions/rest";
import adapterFetch from "redux-api/lib/adapters/fetch";
//import "isomorphic-fetch";

import App from './components/App'
//import reducer from './reducers'

import todoAppReducer from './reducers';

console.log(typeof todoAppReducer);
console.dir(todoAppReducer);


// Initialize react-api
reduxApi.use("fetch", adapterFetch(fetch));

//===================
function printObj2str(o) {
	if(!o) return "null object?";
	else{
		var out = '';
		for (var p in o) {
			// eslint-disable-next-line
			out += '\n' + ':: ' + p.toString() + '(' + typeof(o[p]).toString() + ') ::' + '\n' + o[p].toString() + '\n';
		}
		return out; 
	}
}

function printObj(o){
	console.log(printObj2str(o) );
}

printObj(todoAppReducer);


// Prepare store
const reducer = combineReducers({...reduxApi.reducers, ...todoAppReducer});
const finalCreateStore = applyMiddleware(thunk)(createStore);
const initialState = window.$REDUX_STATE;
const store = initialState ? finalCreateStore(reducer, initialState) : finalCreateStore(reducer);
delete window.$REDUX_STATE;

//===
for(var i=0; i< reduxApi.reducers.length; i++){
	printObj(reduxApi.reducers[i]);

}

//====
render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)




	/*var y={k1:"v1", k2:"v2"};
printObj(x);
printObj(reduxApi.reducers);
printObj(y);

var str1=printObj2str(x);
var str2=printObj2str(reduxApi.reducers);
var str3=printObj2str(y);

render (	<div>
	{str1},
	I am a pig.
	{str2}, 
	{str3}
</div>,
	document.getElementById('root')
)

*/

