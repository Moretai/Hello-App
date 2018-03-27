import { createStore, applyMiddleware, compose, Store } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import { persistStore, autoRehydrate } from 'redux-persist-immutable'
import { AsyncStorage } from 'react-native'
import rootReducer from '../reducers'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['login']
}

export default function configure(onComplete) {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware]
  const store = createStore(rootReducer, compose(applyMiddleware(...middlewares),autoRehydrate()))
  persistStore(store, persistConfig, onComplete)

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)

  return store
}
