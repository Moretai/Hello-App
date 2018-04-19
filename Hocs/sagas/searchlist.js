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

// INVALID_TOKEN 无效token
// REFRESH_PAGE 商品信息失效
// NOT_ENOUGH 库存不足
function* searchAddGoodsToshopCarFailed(action) {
  const errorMessage = action.payload
  if (errorMessage === 'INVALID_TOKEN') {
    yield fork(Toast.fail, '您还未登录~', 0.4)
    yield put({type: "Navigation/NAVIGATE", routeName: "Login"})
  }

  if (errorMessage === 'REFRESH_PAGE') {
    yield fork(Toast.fail, '商品信息已失效', 0.4)
  }

  if (errorMessage === 'NOT_ENOUGH') {
    yield fork(Toast.fail, '此商品库存不足', 0.4)
  }
}


export default function* shopCarSaga() {
  yield fork(takeEvery, String(actions.searchAddGoodsToshopCarRequested), searchAddGoodsToshopCar)
  yield fork(takeEvery, String(actions.searchAddGoodsToshopCarSucceed), searchAddGoodsToshopCarSucceed)
  yield fork(takeEvery, String(actions.searchAddGoodsToshopCarFailed), searchAddGoodsToshopCarFailed)
}
