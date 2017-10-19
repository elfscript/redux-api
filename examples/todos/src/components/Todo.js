import React from 'react'
import PropTypes from 'prop-types'

const Todo = ({ onClick, completed, text, contextId }) => (
	<li
		onClick={onClick}
		contextmenu={contextId} 
		style={{
			textDecoration: completed ? 'line-through' : 'none'
		}}
	>
		{text}
	</li>
)

Todo.propTypes = {
	onClick: PropTypes.func.isRequired,
	completed: PropTypes.bool,
	text: PropTypes.string.isRequired,
	contextId: PropTypes.string.isRequired

}

export default Todo
