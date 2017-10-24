import React from 'react'
import PropTypes from 'prop-types'

const Todo = ({ id,onClick, completed, text, contextId }) => (
	<li
			onClick={onClick}
			contextmenu={contextId} 
			style={{
				textDecoration: completed ? 'line-through' : 'none'
			}}
		>
			<label>id={id},{text}</label>
		</li>


)

Todo.propTypes = {
	id: PropTypes.number,
	onClick: PropTypes.func.isRequired,
	completed: PropTypes.bool,
	text: PropTypes.string.isRequired,
	contextId: PropTypes.string.isRequired

}

export default Todo
