import { call, put, fork, take, takeEvery } from 'redux-saga/effects'
import { Toast } from 'antd-mobile'
import * as api from '../utils/api'
import * as actions from '../actions/order'

function* fetchListOrders(action) {
  console.warn('fetchListOrders ---action', action);
  try {
    const result = yield call(api.fetchListOrders, action.payload)
    yield put(actions.fetchListOrdersSucceed(result))
  } catch (e) {
    yield put(actions.fetchListOrdersFailed(e.message))
  }
}

function* fetchListOrdersFailed() {
  yield fork(Toast.fail, '获取订单列表失败', 0.4)
}

function* generateOrderRequested(action) {
  try {
    const result = yield call(api.generateOneOrder, { ...action.payload, deliverTimeForm: 1516802572437, deliverTimeTo: 1519902572437 })
    yield put(actions.generateOrderSucceed(result))
  } catch (e) {
    yield put(actions.generateOrderFailed(e.message))
  }
}

function* generateOrderSucceed() {
  yield fork(Toast.success, '生成订单成功', 0.4)
}

function* generateOrderFailed() {
  yield fork(Toast.fail, '生成订单失败', 0.4)
}

function* getOneOrder(action) {
  try {
    const result = yield call(api.fetchOneOrderDetail, action.payload)
    yield put(actions.getOneOrderSucceed(result))
  } catch (e) {
    yield put(actions.getOneOrderFailed(e.message))
  }
}

function* loadMoreOrderList(action) {
  const { type, page } = action.payload
  try {
    const result = yield call(api.fetchListOrders, action.payload)
    console.warn('-------->', result)
    yield put(actions.loadMorOrderListSucceed(result))
  } catch (e) {
    yield put(actions.loadMoreOrderListFailed(e.message))
  }
}


export default function* orderSaga() {
  yield takeEvery(String(actions.fetchListOrdersRequested), fetchListOrders)
  // yield takeEvery(String(actions.fetchListOrdersSucceed), fetchListOrdersSucceed)
  yield takeEvery(String(actions.fetchListOrdersFailed), fetchListOrdersFailed)
  yield takeEvery(String(actions.generateOrderRequested), generateOrderRequested)
  yield takeEvery(String(actions.generateOrderSucceed), generateOrderSucceed)
  yield takeEvery(String(actions.generateOrderFailed), generateOrderFailed)
  yield takeEvery(String(actions.getOneOrderRequested), getOneOrder)

  yield fork(takeEvery, String(actions.loadMoreOrderListRequested), loadMoreOrderList)
}

// export const getOneOrderRequested = createAction('order/GET_ONE_ORDER_REQUESTED')
// export const getOneOrderSucceed = createAction('order/GET_ONE_ORDER_SUCCEED')
// export const getOneOrderFailed = createAction('order/GET_ONE_ORDER_FAILED')
