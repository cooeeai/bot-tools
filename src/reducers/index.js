import { combineReducers } from 'redux'
import { routerStateReducer as router } from 'redux-router'
import slots from './nodes'
import modal from './modal'
import firebase from './firebase'

export default combineReducers({
  router,
  slots,
  modal,
  firebase
})
