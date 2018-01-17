import { eventChannel, END, delay } from 'redux-saga'
import { call, put, fork, take, takeEvery } from 'redux-saga/effects'
import { Action } from 'redux-actions'
import * as api from '../utils/api'
import * as actions from '../actions/search'

function* search(action) {
  try {
    const result = yield call(api.search, action.payload)
    yield put(actions.searchSucceed(result))
  } catch (e) {
    yield put(actions.searchFailed(e.message))
  }
}

function* getHotSearch(action) {
  try {
    const result = yield call(api.getHotSearch)
    yield put(actions.getHotsearchSucceed(result))
  } catch (e) {
    yield put(actions.getHotsearchFailed(e.message))
  }
}


export default function* searchSaga() {
  yield takeEvery(String(actions.searchRequested), search)
  yield takeEvery(String(actions.getHotsearchRequested), getHotSearch)
}
