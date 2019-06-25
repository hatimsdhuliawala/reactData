import { createStore, applyMiddleware } from 'redux'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import rootReducer from './index'
import ReduxThunk from 'redux-thunk'
import logger from 'redux-logger'

export const middleware = []

if (process.env.NODE_ENV !== 'production') {
  middleware.push(reduxImmutableStateInvariant())
  middleware.push(logger)
}
middleware.push(ReduxThunk)
export default function configureStore () {
  return createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(...middleware)
    ))
}
