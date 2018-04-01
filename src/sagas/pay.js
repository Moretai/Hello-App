import { delay } from 'redux-saga'
import { put , call, fork, takeLatest, takeEvery } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import * as api from '../utils/api'
import * as actions from '../actions/pay'
import Alipay from 'react-native-alipay-zmt'
import { checkHasLogined } from './login'

// TODO

function* pay(action) {
  yield checkHasLogined()
  try {
    const result = yield call(api.pay, action.payload)
    console.warn('result', result);
    yield put(actions.paySucceed(result))
  } catch (e) {
    console.warn('payFailed..', e);
    yield put(actions.payFailed(e.message))
  }
}

function* paySucceed(action) {
  const result = action.payload
  // yield put(actions.jumpAlipayRequested(result))
  yield call(alipay, result)
}

function* alipay(action) {
  const queryString = action.data
  console.warn('queryString', queryString)
  try {
    const result = yield call(Alipay.pay, queryString.zfbKey)
    console.warn('alipay result', result)
    yield put({type: "Navigation/NAVIGATE", routeName: "PayResult", params: { result }})
    // if (result === '支付成功') {
    yield call(delay, 3000)
    yield put({type: "Navigation/NAVIGATE", routeName: "User"})
    // }

    // result 支付成功
    // result 已取消支付
    yield put(actions.jumpAlipaySucceed(result))
  } catch (e) {
    yield put(actions.jumpAlipayFailed(e.message))
  }
}

export default function* paySaga() {
  yield fork(takeEvery, String(actions.payRequested), pay)
  yield fork(takeEvery, String(actions.paySucceed), paySucceed)

  // yield fork(takeEvery, String(actions.jumpAlipayRequested), alipay)
}
