const visibilityFilter = (state = {filterKind:'SHOW_ALL',id:-1}, action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

export default visibilityFilter
