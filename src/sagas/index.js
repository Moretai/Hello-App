import { fork, all } from 'redux-saga/effects'
import hello from './hello'
import carousel from './carousel'
import list from './list'
import shopcar from './shopcar'
import router from './router'
import vcode from './vcode'
import search from './search'
import searchlist from './searchlist'
import login from './login'
import info from './info'
import address from './address'
import logger from './logger'

let sagas = [
  fork(hello),
  fork(carousel),
  fork(list),
  fork(shopcar),
  fork(router),
  fork(vcode),
  fork(search),
  fork(searchlist),
  fork(login),
  fork(info),
  fork(address),
  fork(logger)
]

export default function* rootSaga() {
  yield all(sagas)
}
