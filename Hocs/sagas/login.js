import { eventChannel, END, delay } from 'redux-saga'
import { call, put, fork, take, takeEvery } from 'redux-saga/effects'
import { reset, destroy } from 'redux-form/es/immutable'
import { Action } from 'redux-actions'
import { setLocalToken, checkTokenExist } from '../utils/tools'
import { Toast } from 'antd-mobile'
import * as api from '../utils/api'
import * as actions from '../actions/login'
import * as vcodeActions from '../actions/vcode'

export function* checkHasLogined() {
  const result = yield checkTokenExist()
  // console.warn('result &&&&&&===>', result);
  if(!result) {
    yield put({type: "Navigation/NAVIGATE", routeName: "Login"})
  }
}

function* login(action) {
  try {
    const result = yield call(api.login, action.payload)
    yield put(actions.loginSucceed(result))
  } catch (e) {
    yield put(actions.loginFailed(e.message))
  }
}

function* loginSucceed(action) {
  const { token, name } = action.payload
  yield put(vcodeActions.stopVcodeCountDown())
  yield put(destroy('loginForm'))
  yield setLocalToken('token', token)
  yield put({type: "Navigation/NAVIGATE", routeName: "Home"})
}

function* loginFailed(action) {
  yield fork(Toast.fail, '验证码错误,请重新获取', 0.4)
}

function* validateToken() {
  try {
    yield call(api.validateToken)
    yield put(actions.validateTokenSucceed())
  } catch (e) {
    yield put(actions.validateTokenFailed(e.message))
  }
}

function* logOut() {
  yield setLocalToken('token', '')
  yield put({type: "Navigation/NAVIGATE", routeName: "User"})
}

export default function* loginSaga() {
  yield takeEvery(String(actions.loginRequested), login)
  yield takeEvery(String(actions.loginSucceed), loginSucceed)
  yield takeEvery(String(actions.loginFailed), loginFailed)
  yield takeEvery(String(actions.validateTokenRequested), validateToken)
  yield takeEvery(String(actions.logOut), logOut)
}
