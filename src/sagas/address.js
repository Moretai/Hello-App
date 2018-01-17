import { takeEvery, delay } from 'redux-saga'
import { put , call, fork, takeLatest } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import { Toast } from 'antd-mobile'
import * as api from '../utils/api'
import * as actions from '../actions/address'
import { locationChange } from '../actions/router'
import { checkHasLogined } from './login'

function* addAddress(action) {
  try {
    const result = yield call(api.addAddress, action.payload)
    yield put(actions.addAddressSucceed(result))
  } catch (e) {
    yield put(actions.addAddressFailed(e.message))
  }
}

function* addAddressSucceed() {
  yield call(Toast.success, '地址添加成功', 1)
  yield call(delay, 1000)
  //TODO route change
  yield put(locationChange('AddressList'))
}

function* addAddressFailed() {
  yield call(Toast.fail, '地址添加失败', 1)
}

function* fetchAllAddress(action) {
  try {
    const result = yield call(api.fetchAllAddress, action.payload)
    yield put(actions.addressAllSucceed(result))
  } catch (e) {
    yield put(actions.addressAllFailed(e.message))
  }
}

function* addressAllFailed() {
  console.warn('FETCH All Address fail');
}

function* setDefaultAddress(action) {
  try {
    const result = yield call(api.setDefaultAddress, action.payload)
    yield put(actions.setDefaultAddressSucceed(result))
  } catch (e) {
    yield put(actions.setDefaultAddressFailed(e.message))
  }
}

function* setDefaultAddressSucceed() {
    yield call(Toast.success, '设置地址成功', 1)
    yield put(actions.addressAllRequested())
}

function* setDefaultAddressFailed() {
    yield call(Toast.fail, '设置地址失败', 1)
}

function* removeAddress(action) {
  console.warn('action---->', action);
  try {
    const result = yield call(api.removeAddress, action.payload)
    yield put(actions.removeAddressSucceed(result))
  } catch (e) {
    yield put(actions.removeAddressFailed(e.message))
  }
}

function* removeAddressSucceed() {
  yield call(Toast.success, '删除地址成功', 1)
  yield put(actions.addressAllRequested())
}

function* removeAddressFailed() {
  yield call(Toast.success, '删除地址失败', 1)
}

export default function* addressSaga() {
  yield fork(takeEvery, String(actions.addAddressRequested), addAddress)
  yield fork(takeEvery, String(actions.addAddressSucceed), addAddressSucceed)
  yield fork(takeEvery, String(actions.addAddressFailed), addAddressFailed)
  yield fork(takeEvery, String(actions.addressAllRequested), fetchAllAddress)
  yield fork(takeEvery, String(actions.addressAllFailed), addressAllFailed)
  yield fork(takeEvery, String(actions.setDefaultAddressRequested), setDefaultAddress)
  yield fork(takeEvery, String(actions.setDefaultAddressSucceed), setDefaultAddressSucceed)
  yield fork(takeEvery, String(actions.setDefaultAddressFailed), setDefaultAddressFailed)
  yield fork(takeEvery, String(actions.removeAddressRequested), removeAddress)
  yield fork(takeEvery, String(actions.removeAddressSucceed), removeAddressSucceed)
  yield fork(takeEvery, String(actions.removeAddressFailed), removeAddressFailed)
}
