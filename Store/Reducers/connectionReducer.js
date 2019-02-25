const initialState = { email: "null", connected: false }

function connectionReducer(state = initialState, action){
  let nextState

  switch(action.type) {
    case 'login':
      nextState = {
        ...state,
        email: action.value,
        connected: true
      }
      return nextState
    case 'logoff':
      nextState = {
        ...state,
        email: "null",
        connected:false
      }
      return nextState
    default:
      return state
  }
}

export default connectionReducer
