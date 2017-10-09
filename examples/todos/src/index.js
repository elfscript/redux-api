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

import todoAppReducers from './reducers';

console.log(typeof todoAppReducers);
console.dir(todoAppReducers);

//x={...todoAppReducers};
function myspread(o1,o2){
	return Object.assign({}, o1 , o2);
}

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

console.log("todoAppReducers");
printObj(todoAppReducers);


// Prepare store
const reducer = combineReducers(myspread(reduxApi.reducers, todoAppReducers));
const finalCreateStore = applyMiddleware(thunk)(createStore);
const initialState = window.$REDUX_STATE;
const store = initialState ? finalCreateStore(reducer, initialState) : finalCreateStore(reducer);
delete window.$REDUX_STATE;

//===
/* reduxApi.reducers is not an array, it is an object
 * for(var i=0; i< reduxApi.reducers.length; i++){
	console.log(i);
	printObj(reduxApi.reducers[i]);

}*/

console.log("reduxApi.reducers");
printObj(reduxApi.reducers);

console.log("the combined reducer");
//reducer is not an object? it is a function
//printObj(reducer);
console.log(reducer.toString());


//====
/*render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)
*/



var y={k1:"v1", k2:"v2"};
var str2=printObj2str(reduxApi.reducers);
var str3=printObj2str(y);

render (	<div>
	I am a pig.
	{str2}, 
	{str3}
</div>,
	document.getElementById('root')
)



