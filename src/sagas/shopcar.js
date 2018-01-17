import { takeEvery, delay } from 'redux-saga'
import { put , call, fork, takeLatest } from 'redux-saga/effects'
import { Toast } from 'antd-mobile'
import * as actions from '../actions/shopcar'
import * as api from '../utils/api'

function* fetchShopCar(action) {
  try {
    const result = yield call(api.fetchShopCar, action.payload)
    yield put(actions.shopCarSucceed(result))
  } catch(e) {
    yield put(actions.shopCarFailed(e.message))
  }
}

function* addGoodsToshopCar(action) {
  // Toast.fail('Load failed !!!', 1)
  try {
    const result = yield call(api.addGoodsToCar, action.payload)
    yield put(actions.addGoodsToshopCarSucceed(result))
  } catch(e) {
    yield put(actions.addGoodsToshopCarFailed(e.message))
  }
}

function* addGoodsToshopCarSucceed() {
  yield call(Toast.success, '加入购物车成功', 1)
}

function* addGoodsToshopCarFailed() {
  yield call(Toast.fail, '加入购物车失败', 1)
}


export default function* shopCarSaga() {
  yield fork(takeEvery, String(actions.shopCarRequested), fetchShopCar)
  yield fork(takeEvery, String(actions.addGoodsToshopCarRequested), addGoodsToshopCar)
  yield fork(takeEvery, String(actions.addGoodsToshopCarSucceed), addGoodsToshopCarSucceed)
  yield fork(takeEvery, String(actions.addGoodsToshopCarFailed), addGoodsToshopCarFailed)
}
