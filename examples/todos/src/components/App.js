import React from 'react'
import { connect } from 'react-redux';
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import rest from "../actions/rest"

/*const App = () => (
	<div>
		<AddTodo />
		<VisibleTodoList />
		<Footer />
	</div>
)

export default App
*/
//===
class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isReady: false
		};
	}



	componentDidMount() {
		this.props.getTodosFromServer();
	}

	render() {
		return this.props.isReady
			?  (
				<div>
					<AddTodo />
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
