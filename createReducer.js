//handlers are action types you're listening for
//removes the need for many switch statements when creating reducers
export default function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
      if (handlers.hasOwnProperty(action.type)) {
        return handlers[action.type](state, action)
      } else {
        return state
      }
    }
  }