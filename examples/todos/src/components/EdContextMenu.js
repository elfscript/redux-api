import React from 'react'
import PropTypes from 'prop-types'
import rest from '../actions/rest'
import {connect} from 'react-redux'

/*
 * a React component without an upper case. React interprets it as a DOM tag
 */
//edmenu --> EdMenu
const EdMenu = ({menuId, onEdit, onDelete}) => (
	<menu type="context" id={menuId}>
		<menuitem label="edit" onClick={onEdit}></menuitem>
		<menuitem label="delete" onClick={onDelete}></menuitem>
	</menu>
)

EdMenu.propTypes = {
	menuId: PropTypes.string.isRequired,
	onEdit: PropTypes.func,
	onDelete: PropTypes.func,
}

//=============
function update_item(dispatch,itemid, text){
	dispatch(rest.actions.update_item({},{ body: JSON.stringify({id:itemid, data:text})}) );
}

function delete_item(dispatch, itemid){
	dispatch(rest.actions.delete_item({id:itemid}));
}

const EdContextMenu=({dispatch, menuId, itemId,text}) => (
<EdMenu menuId={menuId} 
		onEdit={update_item(dispatch, itemId, text)}
		onDelete={delete_item(dispatch, itemId)}
	/>  
)
EdContextMenu.propTypes = {
	menuId: PropTypes.string.isRequired,
	itemId: PropTypes.number.isRequired,
	text: PropTypes.string,
}

export default connect()(EdContextMenu)  
