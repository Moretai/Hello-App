import { takeEvery, delay } from 'redux-saga'
import { put , call, fork, takeLatest } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import * as api from '../utils/api'
import * as actions from '../actions/carousel'
import { checkHasLogined } from './login'

function* carouselRequested() {
  yield checkHasLogined()
  try {
    const result = yield call(api.fetchCarousel)
    yield put(actions.carouselSucceed(result))
  } catch (e) {
    yield put(actions.carouselFailed(e.message))
  }
}

export default function* carouselSaga() {
  yield fork(takeEvery, String(actions.carouselRequested), carouselRequested)
}
