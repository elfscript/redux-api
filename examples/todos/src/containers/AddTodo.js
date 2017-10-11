import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions';
import rest from '../actions/rest';
//const {actions} =rest;
//
let AddTodo = ({ dispatch }) => {
	let input

	return ( 
		<div>
			<form onSubmit={e => {
				e.preventDefault();
				if (!input.value.trim()) {
					return
				}
				var data={title: "Hello", msg: input.value};
				console.log("onSubmit of AddTodo form");
				console.log(JSON.stringify(data)); 
				//dispatch rest.actions or not ??
				dispatch(addTodo(data.msg));
				dispatch(rest.actions.addtodo({}, { body: JSON.stringify(data) } ) ); 
				input.value = '';
				}}>
				<input ref={node => {
					input = node
				}} />
			<button type="submit">
				Add Todo
			</button>
		</form>
	</div>
	)
}
AddTodo = connect()(AddTodo)

export default AddTodo
