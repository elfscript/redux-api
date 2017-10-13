import rest from "../actions/rest";

const  appReady= (state_isready = false, action) => {
  switch (action.type) {
    case rest.events.todos.actionSuccess:
      return true;
    default:
      return state_isready;
  }
}

export default appReady
