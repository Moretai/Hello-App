import { delay } from 'redux-saga'
import { put , call, fork, takeLatest, takeEvery } from 'redux-saga/effects'
import * as actions from '../actions/list'
import * as api from '../utils/api'

function* fetchCategory() {
  console.log('FETCH category')
  try {
    const result = yield call(api.fetchCategory)
    yield put(actions.fetchCategorySucceed(result))
  } catch (e) {
    yield put(actions.fetchCategoryFailed(e.message))
  }
}

function* fetchList(action) {
  console.warn('FETCH List%%%%%-->', action.payload)
  const { typeId, page } = action.payload
  try {
    const result = yield call(api.fetchList, action.payload)
    yield put(actions.nowFetchCategoryIdAndPage({ id: typeId, page }))
    yield put(actions.fetchListSucceed(result))
  } catch (e) {
    yield put(actions.fetchListFailed(e.message))
  }
}

function* handleFirstList(action) {
  const data = action.payload
  console.warn('handleFirstList=====>', action.payload);
  if( data && data.length ) {
    const firstId = data[0]['id']
    yield put(actions.nowFetchCategoryIdAndPage({ id: firstId, page: 1 }))
    console.warn('firstId is=====>', firstId);
    yield put(actions.fetchListRequested({ typeId: firstId, page: 1, limit: 10 }))
  }
}

function* loadMoreList(action) {
  console.log('FETCH LOAD MORE LIST')
  const { typeId, page } = action.payload
  try {
    const result = yield call(api.fetchList, action.payload)
    yield put(actions.nowFetchCategoryIdAndPage({ id: typeId, page }))
    yield put(actions.loadMoreListSucceed(result))
  } catch (e) {
    yield put(actions.loadMoreListFailed(e.message))
  }
}

export default function* listSaga() {
  yield fork(takeEvery, String(actions.fetchCategoryRequested), fetchCategory)
  yield fork(takeEvery, String(actions.fetchCategorySucceed), handleFirstList)
  yield fork(takeEvery, String(actions.fetchListRequested), fetchList)
  yield fork(takeEvery, String(actions.loadMoreListRequested), loadMoreList)
  // yield fork(takeEvery, String("{type:'list/LOAD_MORE_LIST_REQUESTED'}"), loadMoreList)
}
