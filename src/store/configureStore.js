import createHistory from 'history/lib/createBrowserHistory'
import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { reduxReactRouter } from 'redux-router'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'
import routes from '../routes'

const loggerMiddleware = createLogger({
  predicate: (getState, action) => {
    return true
  }
})

const createStoreWithMiddleware = compose(
  applyMiddleware(thunkMiddleware),
  reduxReactRouter({ routes, createHistory }),
  applyMiddleware(loggerMiddleware)
)(createStore)

export default (initialState) => {
  const store = createStoreWithMiddleware(rootReducer, initialState)
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
