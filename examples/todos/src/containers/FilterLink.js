import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import Link from '../components/Link'
//ownProps.filterKind  --> <FilterLink filterKind='SHOW_ALL'>
const mapStateToProps = (state, ownProps) => ({
         active: ownProps.filterKind === state.visibilityFilter.filterKind
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	onClick: () => {
		dispatch(setVisibilityFilter({filterKind:ownProps.filterKind, id:-1}))
	}
})

const FilterLink = connect(
	mapStateToProps,
	mapDispatchToProps
)(Link)

export default FilterLink
