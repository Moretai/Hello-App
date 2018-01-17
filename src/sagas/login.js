import { eventChannel, END, delay } from 'redux-saga'
import { call, put, fork, take, takeEvery } from 'redux-saga/effects'
import { Action } from 'redux-actions'
import { setLocalToken, checkTokenExist } from '../utils/tools'
import * as api from '../utils/api'
import * as actions from '../actions/login'

export function* checkHasLogined() {
  const result = yield checkTokenExist()
  console.warn('result &&&&&&===>', result);
  if(!result) {
    yield put({type: "Navigation/NAVIGATE", routeName: "Login"})
  }
}

function* login(action) {
  try {
    console.warn('in saga login--->=====>', action.payload);
    // const result = yield call(api.login, action.payload)
    const result = yield call(api.login, action.payload)
    yield put(actions.loginSucceed(result))
  } catch (e) {
    yield put(actions.loginFailed(e.message))
  }
}

function* loginSucceed(action) {
  console.warn('result ---->', action);
  const { token, tokenvalidtime, freshtoken, freshtokenvalidtime } = action.payload
  yield setLocalToken('token', token)
}

export default function* loginSaga() {
  yield takeEvery(String(actions.loginRequested), login)
  yield takeEvery(String(actions.loginSucceed), loginSucceed)
}
