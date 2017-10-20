import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions';
import rest from '../actions/rest';
import PropTypes from 'prop-types';

let updateDB = (props) => {
	//let todos=this.props.todos;
	return ( 
		<div>
			<form onSubmit={e => {
				e.preventDefault();

				console.log("onSubmit of UpdateDB form");
				//dispatch rest.actions or not ??
				props.dispatch(rest.actions.updatetodos({}, 
					{ body: JSON.stringify({todos:props.todos}) }
				) 
				); 
			}}>
			<button type="submit">
				update todos db 
			</button>
		</form>
	</div>
	)
}

updateDB.propTypes = {
	todos: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		completed: PropTypes.bool,
		text: PropTypes.string.isRequired
	}).isRequired).isRequired,
}


//============
const mapStateToProps = (state) => ({
	todos: state.todos
})

/*const mapDispatchToProps = {
	onSubmit: toggleTodo
}*/

const UpdateDB = connect(mapStateToProps)(updateDB)


export default UpdateDB
