import { call, put, fork, take, takeEvery } from 'redux-saga/effects'
import { Action } from 'redux-actions'
import * as api from '../utils/api'
import * as actions from '../actions/info'

function* feeIntro(action) {
  try {
    const result = yield call(api.fetchFeeIntro, action.payload)
    yield put(actions.feeIntroSucceed(result))
  } catch (e) {
    yield put(actions.feeIntroFailed(e.message))
  }
}

export default function* searchSaga() {
  yield takeEvery(String(actions.feeIntroRequested), feeIntro)
}
