import { TOGGLE_MODAL } from '../actions'

export default (state = {}, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        collapsed: !state.collapsed,
        body: action.results
      }
    default:
      return state
  }
}
