import { delay } from 'redux-saga'
import { put , call, fork, takeLatest, takeEvery } from 'redux-saga/effects'
import * as actions from '../actions/hello'

function* helloRequested() {
  yield delay(3000)
  yield put(actions.helloSucceed())
}

export default function* helloSaga() {
  yield fork(takeEvery, String(actions.helloRequested), helloRequested)
}
