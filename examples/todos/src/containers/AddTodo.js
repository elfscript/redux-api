import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions';
import rest from '../actions/rest';
import PropTypes from 'prop-types';

let AddTodo = ({ dispatch, inputData }) => {
	let myinput, mybtn;
	let mybtn_value, myinput_value;

	if(!inputData || inputData=={} || inputData.id==-1) myinput_value= '';
	else myinput_value=inputData.text;

	if(!inputData || inputData=={} || inputData.id==-1) mybtn_value= 'Add Todo';
	else{
		mybtn_value= 'Update Todo';
		console.log("inputData.text = " + inputData.text);
		console.log("inputData=" + JSON.stringify(inputData));
	}

	//mybtn.value=mybtn_value;
	//	if(myinput) myinput.value=myinput_value;
	myinput_value="this is a test";
	return ( <div>{ (()=>{ if(myinput) myinput_value=myinput.value;
console.log("this is myinput_value, "+ myinput_value)})() }
			<form onSubmit={e => {
				e.preventDefault();
				if (!myinput.value.trim()) {
					return
				}
				//dispatch rest.actions or not ??
				//dispatch(addTodo(data.msg));
				if(mybtn_value=='Add Todo'){
					var data={ title: "Hello", text: myinput.value, completed:false};
					dispatch(rest.actions.addtodo({}, { body: JSON.stringify(data) } ) ); 
					console.log("onSubmit of AddTodo form");
					console.log(JSON.stringify(data)); 

				}else if(mybtn_value=='Update Todo'){
					inputData.text=myinput.value;
					dispatch(rest.actions.update_item({}, { body: JSON.stringify(inputData) } ) ); 
					console.log("onSubmit of Update form");
					console.log(JSON.stringify(inputData)); 

					}

					myinput.value = '';
					mybtn.value='Add Todo';
					mybtn.innerHTML='Add Todo';
					if(inputData) inputData.id=-1;
					}}>


					<input type='text' ref={node => { myinput = node } } defaultValue={myinput_value}/>
					<button ref={x=> {mybtn=x}} value={mybtn_value} type="submit">
						{ mybtn_value}
					</button>
				</form>
			</div>
	)
}
AddTodo.propTypes = {
	inputData: PropTypes.shape({
		id: PropTypes.number.isRequired,
		completed: PropTypes.bool,
		text: PropTypes.string
	}),
}

//=======================
const mapStateToProps = (state) => ({
	inputData: state.inputData
})


AddTodo = connect(mapStateToProps)(AddTodo)

export default AddTodo
