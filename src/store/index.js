// import { createStore, applyMiddleware, compose } from 'redux'
// // import { createStore } from 'redux'
// // import { createStore } from 'redux-immutable'
// import createSagaMiddleware from 'redux-saga'
// // import { createLogger } from 'redux-logger'
// import rootReducer from '../reducers'
// import allSaga from '../sagas'
//
// const sagaMiddleware = createSagaMiddleware()
// const store =  createStore(
//   rootReducer,
//   compose(
//     // applyMiddleware(sagaMiddleware,createLogger()),
//     applyMiddleware(sagaMiddleware),
//     window.devToolsExtension ? window.devToolsExtension() : f => f
//   )
// )
//
// sagaMiddleware.run(allSaga)
//
// export default store

import { createStore, applyMiddleware, compose, Store } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import rootReducer from '../reducers'

export default function configure(initialState, history) {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware]
  const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
  const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middlewares)))

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)

  // if (module.hot) {
  //   module.hot.accept('reducers', () => {
  //     const nextReducer = require('reducers').default
  //     store.replaceReducer(nextReducer)
  //   })
  // }

  return store
}
