import { delay } from 'redux-saga'
import { put , call, fork, takeLatest, takeEvery } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import * as api from '../utils/api'
import * as actions from '../actions/fee'
import { checkHasLogined } from './login'

function* feeIntro(action) {
  yield checkHasLogined()
  try {
    const result = yield call(api.feeIntro, action.payload)
    yield put(actions.fetchFeeIntroSucceed(result))
  } catch (e) {
    yield put(actions.fetchFeeIntroFailed(e.message))
  }
}

export default function* feeSaga() {
  yield fork(takeEvery, String(actions.fetchFeeIntroRequested), feeIntro)
}
