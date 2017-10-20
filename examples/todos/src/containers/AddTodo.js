import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions';
import rest from '../actions/rest';
import PropTypes from 'prop-types';

let AddTodo = ({ dispatch, inputTxt }) => {
	let myinput

	return ( 
		<div>
			<form onSubmit={e => {
				e.preventDefault();
				if (!myinput.value.trim()) {
					return
				}
				var data={title: "Hello", text: myinput.value, completed:false};
				console.log("onSubmit of AddTodo form");
				console.log(JSON.stringify(data)); 
				//dispatch rest.actions or not ??
				//dispatch(addTodo(data.msg));
				dispatch(rest.actions.addtodo({}, { body: JSON.stringify(data) } ) ); 
				myinput.value = '';
				}}>

				<input ref={node => { myinput = node } } value={inputTxt}/>
				<button type="submit">
					Add Todo
				</button>
			</form>
		</div>
	)
}
AddTodo.propTypes = {
	inputTxt:PropTypes.string,
}

//=======================
const mapStateToProps = (state) => ({
	        inputTxt: state.inputText
})


AddTodo = connect(mapStateToProps)(AddTodo)

export default AddTodo
