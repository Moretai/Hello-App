import { delay } from 'redux-saga'
import { put , call, fork, takeLatest, takeEvery } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import * as api from '../utils/api'
import * as actions from '../actions/activity'
import { checkHasLogined } from './login'

function* activity(action) {
  yield checkHasLogined()
  try {
    const result = yield call(api.activityDetail, action.payload)
    yield put(actions.activitySucceed(result))
  } catch (e) {
    yield put(actions.activityFailed(e.message))
  }
}

export default function* activitySaga() {
  yield fork(takeEvery, String(actions.activityRequested), activity)
}
