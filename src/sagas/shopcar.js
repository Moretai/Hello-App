import { delay } from 'redux-saga'
import { put , call, fork, takeLatest, takeEvery } from 'redux-saga/effects'
import { Toast } from 'antd-mobile'
import * as actions from '../actions/shopcar'
import * as api from '../utils/api'

function* fetchShopCar(action) {
  try {
    const result = yield call(api.fetchShopCarAll, action.payload)
    yield put(actions.shopCarSucceed(result))
  } catch(e) {
    yield put(actions.shopCarFailed(e.message))
  }
}

function* shopCarSucceed() {
  yield put(actions.getFeeInfoRequested())
}

function* addGoodsToshopCar(action) {
  // Toast.fail('Load failed !!!', 0.4)
  try {
    const result = yield call(api.addGoodsToCar, action.payload)
    yield put(actions.addGoodsToshopCarSucceed(result))
  } catch(e) {
    yield put(actions.addGoodsToshopCarFailed(e.message))
  }
}

function* addGoodsToshopCarSucceed() {
  yield fork(Toast.success, '加入购物车成功', 0.4)
}

function* addGoodsToshopCarFailed() {
  yield fork(Toast.fail, '加入购物车失败', 0.4)
}

function* addLotsGoods(action) {
  try {
    const result = yield call(api.addLotsGoodsToCar, action.payload)
    yield put(actions.addLotsGoodsSucceed(result))
  } catch(e) {
    yield put(actions.addLotsGoodsFailed(e.message))
  }
}

function* addLotsGoodsSucceed() {
  yield put(actions.shopCarRequested())
  yield fork(Toast.success, '数量设置成功', 0.4)
}

function* addLotsGoodsFailed(action) {
  const error = action.payload
  if (error === 'NOT_ENOUGH') {
    yield fork(Toast.fail, '此商品库存不足', 0.4)
  } else if (error === 'REFRESH_PAGE') {
    yield fork(Toast.fail, '此商品已下架', 0.4)
  } else {
    yield fork(Toast.fail, '数量设置失败', 0.4)
  }
  yield put(actions.shopCarRequested())
}

function* toggleOneGoodSelectedRequested(action) {
  try {
    const result = yield call(api.toggleOneGoodSelected, action.payload)
    yield put(actions.toggleOneGoodSelectedSucceed(result))
  } catch(e) {
    yield put(actions.toggleOneGoodSelectedFailed(e.message))
  }
}

function* toggleOneGoodSelectedSucceed() {
  yield fork(Toast.success, '操作成功', 0.4)
  yield put(actions.shopCarRequested())
}

function* deleteOneGoodOrAll(action) {
  try {
    const result = yield call(api.deleteGoodByIdOrAll, action.payload)
    yield put(actions.deleteOneGoodOrAllSucceed(result))
  } catch(e) {
    yield put(actions.deleteOneGoodOrAllFailed(e.message))
  }
}

function* deleteOneGoodOrAllSucceed() {
  yield fork(Toast.success, '操作成功', 0.4)
  yield put(actions.shopCarRequested())
}

function* deleteOneGoodOrAllFailed() {
  yield fork(Toast.fail, '操作失败', 0.4)
}

function* getFeeInfo(action) {
  try {
    const result = yield call(api.fetchFeeInfo, action.payload)
    yield put(actions.getFeeInfoSucceed(result))
  } catch(e) {
    yield put(actions.getFeeInfoFailed(e.message))
  }
}

function* getFeeInfoSucceed() {

}


export default function* shopCarSaga() {
  yield fork(takeEvery, String(actions.shopCarRequested), fetchShopCar)
  yield fork(takeEvery, String(actions.shopCarSucceed), shopCarSucceed)
  yield fork(takeEvery, String(actions.addGoodsToshopCarRequested), addGoodsToshopCar)
  yield fork(takeEvery, String(actions.addGoodsToshopCarSucceed), addGoodsToshopCarSucceed)
  yield fork(takeEvery, String(actions.addGoodsToshopCarFailed), addGoodsToshopCarFailed)
  yield fork(takeEvery, String(actions.addLotsGoodsRequested), addLotsGoods)
  yield fork(takeEvery, String(actions.addLotsGoodsSucceed), addLotsGoodsSucceed)
  yield fork(takeEvery, String(actions.addLotsGoodsFailed), addLotsGoodsFailed)
  yield fork(takeEvery, String(actions.toggleOneGoodSelectedRequested), toggleOneGoodSelectedRequested)
  yield fork(takeEvery, String(actions.toggleOneGoodSelectedSucceed), toggleOneGoodSelectedSucceed)
  // yield fork(takeEvery, String(actions.toggleOneGoodSelectedFailed), toggleOneGoodSelectedFailed)
  yield fork(takeEvery, String(actions.deleteOneGoodOrAllRequested), deleteOneGoodOrAll)
  yield fork(takeEvery, String(actions.deleteOneGoodOrAllSucceed), deleteOneGoodOrAllSucceed)
  yield fork(takeEvery, String(actions.deleteOneGoodOrAllFailed), deleteOneGoodOrAllFailed)
  yield fork(takeEvery, String(actions.getFeeInfoRequested), getFeeInfo)
  yield fork(takeEvery, String(actions.getFeeInfoSucceed), getFeeInfoSucceed)
  // yield fork(takeEvery, String(actions.getFeeInfoFailed), getFeeInfoFailed)
}
