import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'
import EdContextMenu from './EdContextMenu'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

//props={dispatch, todos, ....}
//const TodoList = ({ todos, onTodoClick }) => 
class TodoList extends React.Component {
	constructor(props){
		//todos=props.todos;
		//onTodoClick= props.onTodoClick;

		super(props);
		this.editItemClick = this.editItemClick.bind(this);
		this.deleteItemClick = this.deleteItemClick.bind(this);
		this.toggleItemClick = this.toggleItemClick.bind(this);

	}

	editItemClick(e,data, target) {
		//data === todo
		console.log("editItem clicked, "+ data.id + "," + data.text);
		this.props.onEditItem(data);
	}
	deleteItemClick(e,data, target) {
		console.log("deleteItem clicked, "+ data.id + "," + data.text);
		this.props.onDeleteItem(data.id);
	}
	toggleItemClick (e, data, target) {
		//if(data.id==target.id) ...
		this.props.onTodoClick(data.id);
	}
	render(){
		var todos=this.props.todos;
		var onTodoClick= this.props.onTodoClick;


		return ( <ul>
			{
				//var contextId="todo_context"+todo.id; not allow statements here
				todos.map(todo => {
					let  contextId="todo_context"+todo.id; 
					return 	(	
						<div key={"tododiv"+ todo.id}> 
							<ContextMenu id={contextId}> 
								<MenuItem data={todo} onClick={this.editItemClick}> 
									edit item </MenuItem>
								<MenuItem data={todo} onClick={this.deleteItemClick}>
									delete item
								</MenuItem>
								<MenuItem divider />
								<MenuItem data={todo} onClick={this.toggleItemClick}>
									toggle item
								</MenuItem>
							</ContextMenu>
							<ContextMenuTrigger id={contextId}><Todo
									key={"todo" + todo.id}
									id={todo.id}
									contextId={contextId}
									completed={todo.completed}
									text={todo.text}
									onClick={() => onTodoClick(todo.id)}
								/></ContextMenuTrigger>
						</div>
					);

				})
			}
		</ul>)
	}
}
TodoList.propTypes = {
	todos: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		completed: PropTypes.bool.isRequired,
		text: PropTypes.string.isRequired
	}).isRequired).isRequired,
	onTodoClick: PropTypes.func.isRequired,
	onEditItem: PropTypes.func,
	onDeleteItem: PropTypes.func


}

export default TodoList
