import { delay } from 'redux-saga'
import { put , call, fork, takeLatest, takeEvery } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import { reset } from 'redux-form/immutable'
import { Toast } from 'antd-mobile'
import * as api from '../utils/api'
import * as actions from '../actions/invoice'
import { locationChange } from '../actions/router'
import { checkHasLogined } from './login'

function* addInvoice(action) {
  try {
    const result = yield call(api.addInvoice, action.payload)
    yield put(actions.addInvoiceSucceed(result))
  } catch (e) {
    yield put(actions.addInvoiceFailed(e.message))
  }
}

function* addInvoiceSucceed() {
  yield fork(Toast.success, '发票添加成功', 1)
  yield call(delay, 1000)
  yield reset('addInvoice')
  //TODO route change
  yield put(locationChange('InvoiceList'))
}

function* addInvoiceFailed(action) {
  yield fork(Toast.fail, '发票添加失败', 1)
}

function* fetchAllInvoice(action) {
  try {
    const result = yield call(api.fetchAllInvoice, action.payload)
    yield put(actions.invoiceAllSucceed(result))
  } catch (e) {
    yield put(actions.invoiceAllFailed(e.message))
  }
}

function* invoiceAllFailed() {
  console.warn('FETCH All Invoice fail');
}

function* setDefaultInvoice(action) {
  try {
    const result = yield call(api.setDefaultInvoice, action.payload)
    yield put(actions.setDefaultInvoiceSucceed(result))
  } catch (e) {
    yield put(actions.setDefaultInvoiceFailed(e.message))
  }
}

function* setDefaultInvoiceSucceed() {
    yield fork(Toast.success, '设置发票成功', 1)
    yield put(actions.invoiceAllRequested())
}

function* setDefaultInvoiceFailed() {
    yield fork(Toast.fail, '设置发票失败', 1)
}

function* removeInvoice(action) {
  console.warn('action---->', action);
  try {
    const result = yield call(api.removeInvoice, action.payload)
    yield put(actions.removeInvoiceSucceed(result))
  } catch (e) {
    yield put(actions.removeInvoiceFailed(e.message))
  }
}

function* removeInvoiceSucceed() {
  yield fork(Toast.success, '删除发票成功', 1)
  yield put(actions.invoiceAllRequested())
}

function* removeInvoiceFailed() {
  yield fork(Toast.fail, '删除发票失败', 1)
}

function* getOneInvoice(action) {
  try {
    const result = yield call(api.getOneInvoice, action.payload)
    yield put(actions.getOneInvoiceSucceed(result))
  } catch (e) {
    yield put(actions.getOneInvoiceFailed(e.message))
  }
}

function* getOneInvoiceSucceed() {

}

function* getOneInvoiceFailed() {

}

function* updateInvoice(action) {
  try {
    const result = yield call(api.updateOneInvoice, action.payload)
    yield put(actions.updateInvoiceSucceed(result))
  } catch (e) {
    yield put(actions.updateInvoiceFailed(e.message))
  }
}

function* updateInvoiceSucceed() {
  yield fork(Toast.success, '更新发票成功', 1)
  yield reset('addInvoice')
  yield put(locationChange('InvoiceList'))
}

function* updateInvoiceFailed() {
  yield fork(Toast.fail, '删除发票失败', 1)
}

function* invoiceDefault(action) {
  console.warn('invoiceDefault----->---->');
  try {
    const result = yield call(api.getDefaultInvoice, action.payload)
    yield put(actions.invoiceDefaultSucceed(result))
  } catch (e) {
    yield put(actions.invoiceDefaultFailed(e.message))
  }
}

export default function* invoiceSaga() {
  yield fork(takeEvery, String(actions.addInvoiceRequested), addInvoice)
  yield fork(takeEvery, String(actions.addInvoiceSucceed), addInvoiceSucceed)
  yield fork(takeEvery, String(actions.addInvoiceFailed), addInvoiceFailed)
  yield fork(takeEvery, String(actions.invoiceAllRequested), fetchAllInvoice)
  yield fork(takeEvery, String(actions.invoiceAllFailed), invoiceAllFailed)
  yield fork(takeEvery, String(actions.setDefaultInvoiceRequested), setDefaultInvoice)
  yield fork(takeEvery, String(actions.setDefaultInvoiceSucceed), setDefaultInvoiceSucceed)
  yield fork(takeEvery, String(actions.setDefaultInvoiceFailed), setDefaultInvoiceFailed)
  yield fork(takeEvery, String(actions.removeInvoiceRequested), removeInvoice)
  yield fork(takeEvery, String(actions.removeInvoiceSucceed), removeInvoiceSucceed)
  yield fork(takeEvery, String(actions.removeInvoiceFailed), removeInvoiceFailed)
  yield fork(takeEvery, String(actions.getOneInvoiceRequested), getOneInvoice)
  yield fork(takeEvery, String(actions.getOneInvoiceSucceed), getOneInvoiceSucceed)
  yield fork(takeEvery, String(actions.getOneInvoiceFailed), getOneInvoiceFailed)
  yield fork(takeEvery, String(actions.updateInvoiceRequested), updateInvoice)
  yield fork(takeEvery, String(actions.updateInvoiceSucceed), updateInvoiceSucceed)
  yield fork(takeEvery, String(actions.updateInvoiceFailed), updateInvoiceFailed)
  yield fork(takeEvery, String(actions.invoiceDefaultRequested), invoiceDefault)
  // yield fork(takeEvery, String(actions.invoiceDefaultSucceed), invoiceDefaultSucceed)
  // yield fork(takeEvery, String(actions.invoiceDefaultFailed), invoiceDefaultFailed)
}

// export const invoiceDefaultRequested = createAction('invoice/ADDRESS_DEFAULT_REQUESTED')
// export const invoiceDefaultSucceed = createAction('invoice/ADDRESS_DEFAULT_SUCCEED')
// export const invoiceDefaultFailed = createAction('invoice/ADDRESS_DEFAULT_FAILED')
