import React from 'react'
import { connect } from 'react-redux';
import Footer from './Footer'
import AddTodo from '../containers/AddTodo';
import UpdateDB from '../containers/UpdateDB';
import VisibleTodoList from '../containers/VisibleTodoList'
import rest from "../actions/rest"
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

/*const App = () => (
	<div>
		<AddTodo />
		<VisibleTodoList />
		<Footer />
	</div>
)

export default App
*/
// contextmenu event not work ?
// try react-contextmenu

//===
class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isReady: false
		};
		this.handleClick=(e, data)=> {
			console.log(data);
		}
                this.handleClick2=(s) => { console.log(s);}


	}



	componentDidMount() {
		this.props.getTodosFromServer();
	}
	render() {
		return this.props.isReady
			?  (
				<div>
					<menu type="context" id="mycontextMenu">
						<menuitem label="edit" onClick={this.handleClick2('edit clicked')}></menuitem>
						<menuitem label="delete" onClick={this.handleClick2('delete clicked')}></menuitem>
					</menu>
					<div contextMenu="mycontextMenu" >right-click test</div>
					<ContextMenuTrigger id="some_unique_identifier">
						<div className="well">Right click to see the menu</div>
					</ContextMenuTrigger>

					<ContextMenu id="some_unique_identifier">
						<MenuItem data={{text:"some_data1"}} onClick={this.handleClick}>
							ContextMenu Item 1
						</MenuItem>
						<MenuItem data={{text:"some_data2"}} onClick={this.handleClick}>
							ContextMenu Item 2
						</MenuItem>
						<MenuItem divider />
						<MenuItem data={{text:"some_data3"}} onClick={this.handleClick}>
							ContextMenu Item 3
						</MenuItem>
					</ContextMenu>
					<span><AddTodo /><UpdateDB /></span>
					<VisibleTodoList />
					<Footer />
				</div>
			)
			: <div>not ready</div>
	}
}

const mapStateToProps = (state) => (
	{ isReady: state.isReady, }
)

const mapDispatchToProps = { 
	getTodosFromServer: rest.actions.todos,  
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
