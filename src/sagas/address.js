import { delay } from 'redux-saga'
import { put , call, fork, takeLatest, takeEvery } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import { reset } from 'redux-form/immutable'
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
  yield fork(Toast.success, '地址添加成功', 1)
  yield call(delay, 1000)
  yield reset('addAddress')
  //TODO route change
  yield put(locationChange('AddressList'))
}

function* addAddressFailed(action) {
  yield fork(Toast.fail, '地址添加失败', 1)
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
    yield fork(Toast.success, '设置地址成功', 1)
    yield put(actions.addressAllRequested())
}

function* setDefaultAddressFailed() {
    yield fork(Toast.fail, '设置地址失败', 1)
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
  yield fork(Toast.success, '删除地址成功', 1)
  yield put(actions.addressAllRequested())
}

function* removeAddressFailed() {
  yield fork(Toast.fail, '删除地址失败', 1)
}

function* getOneAddress(action) {
  try {
    const result = yield call(api.getOneAddress, action.payload)
    yield put(actions.getOneAddressSucceed(result))
  } catch (e) {
    yield put(actions.getOneAddressFailed(e.message))
  }
}

function* getOneAddressSucceed() {

}

function* getOneAddressFailed() {

}

function* updateAddress(action) {
  try {
    const result = yield call(api.updateOneAddress, action.payload)
    yield put(actions.updateAddressSucceed(result))
  } catch (e) {
    yield put(actions.updateAddressFailed(e.message))
  }
}

function* updateAddressSucceed() {
  yield fork(Toast.success, '更新地址成功', 1)
  yield reset('addAddress')
  yield put(locationChange('AddressList'))
}

function* updateAddressFailed() {
  yield fork(Toast.fail, '删除地址失败', 1)
}

function* addressDefault(action) {
  console.warn('addressDefault----->---->');
  try {
    const result = yield call(api.getDefaultAddress, action.payload)
    yield put(actions.addressDefaultSucceed(result))
  } catch (e) {
    yield put(actions.addressDefaultFailed(e.message))
  }
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
  yield fork(takeEvery, String(actions.getOneAddressRequested), getOneAddress)
  yield fork(takeEvery, String(actions.getOneAddressSucceed), getOneAddressSucceed)
  yield fork(takeEvery, String(actions.getOneAddressFailed), getOneAddressFailed)
  yield fork(takeEvery, String(actions.updateAddressRequested), updateAddress)
  yield fork(takeEvery, String(actions.updateAddressSucceed), updateAddressSucceed)
  yield fork(takeEvery, String(actions.updateAddressFailed), updateAddressFailed)
  yield fork(takeEvery, String(actions.addressDefaultRequested), addressDefault)
  // yield fork(takeEvery, String(actions.addressDefaultSucceed), addressDefaultSucceed)
  // yield fork(takeEvery, String(actions.addressDefaultFailed), addressDefaultFailed)
}

// export const addressDefaultRequested = createAction('address/ADDRESS_DEFAULT_REQUESTED')
// export const addressDefaultSucceed = createAction('address/ADDRESS_DEFAULT_SUCCEED')
// export const addressDefaultFailed = createAction('address/ADDRESS_DEFAULT_FAILED')
