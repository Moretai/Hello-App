import { delay } from 'redux-saga'
import { put , call, fork, takeLatest, takeEvery } from 'redux-saga/effects'
import { Toast } from 'antd-mobile'
import * as actions from '../actions/searchlist'
import * as api from '../utils/api'

function* searchAddGoodsToshopCar(action) {
  // Toast.fail('Load failed !!!', 1)
  try {
    const result = yield call(api.addGoodsToCar, action.payload)
    yield put(actions.searchAddGoodsToshopCarSucceed(result))
  } catch(e) {
    yield put(actions.searchAddGoodsToshopCarFailed(e.message))
  }
}

function* searchAddGoodsToshopCarSucceed() {
  yield fork(Toast.success, '加入购物车成功', 0.4)
}

function* searchAddGoodsToshopCarFailed() {
  yield fork(Toast.fail, '加入购物车失败', 0.4)
}


export default function* shopCarSaga() {
  yield fork(takeEvery, String(actions.searchAddGoodsToshopCarRequested), searchAddGoodsToshopCar)
  yield fork(takeEvery, String(actions.searchAddGoodsToshopCarSucceed), searchAddGoodsToshopCarSucceed)
  yield fork(takeEvery, String(actions.searchAddGoodsToshopCarFailed), searchAddGoodsToshopCarFailed)
}
