import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import * as actions from '../actions/invoice'

const initialState = Immutable.fromJS({
  data: null,
  loading: false,
  loaded: false,
  error: null,
  add: {
    data: null,
    loading: false,
    loaded: false,
    error: null,
    showError: false
  },
  setDefault: {
    data: null,
    loading: false,
    loaded: false,
    error: null,
  },
  remove: {
    success: false,
    loading: false,
    loaded: false,
    error: null,
  },
  update: {
    success: false,
    loading: false,
    loaded: false,
    error: null,
  },
  one: {
    data: null,
    loading: false,
    loaded: false,
    error: null,
  },
  oneItem: {
    city: '无锡市'
  },
  getDefault: {
    data: null,
    loading: false,
    loaded: false,
    error: null,
  }
})

export default handleActions({
  [actions.addInvoiceRequested](state, action) {
    return state.update('add', v =>
    v.set('loading', true))
  },
  [actions.addInvoiceSucceed](state, action) {
    return state.update('add', v =>
    v.set('loading', false)
    .set('loaded'. true)
    .set('data', Immutable.fromJS(action.payload)))
  },
  [actions.addInvoiceFailed](state, action) {
    return state.update('add', v =>
    v.set('loading', false)
    .set('loaded'. true)
    .set('error', action.payload)
    .set('showError', true))
  },
  [actions.hideAddInvoiceError](state) {
    return state.update('add', v => v.set('showError', false))
  },
  [actions.invoiceAllRequested](state) {
    return state.set('loading', true)
  },
  [actions.invoiceAllSucceed](state, action) {
    return state.set('loading', false)
    .set('loaded', true)
    .set('data', Immutable.fromJS(action.payload))
  },
  [actions.invoiceAllFailed](state, action) {
    return state.set('loading', false)
    .set('loaded', true)
    .set('error', action.payload)
  },
  [actions.setDefaultInvoiceRequested](state) {
    return state.update('setDefault', v => v.set('loading', true))
  },
  [actions.setDefaultInvoiceSucceed](state, action) {
    return state.update('setDefault', v => v.set('loading', false)
    .set('loaded', true)
    .set('data', Immutable.fromJS(action.payload)))
  },
  [actions.setDefaultInvoiceFailed](state, action) {
    return state.update('setDefault', v => v.set('loading', false)
    .set('loaded', true)
    .set('error', action.payload))
  },
  [actions.removeInvoiceRequested](state) {
    return state.update('remove', v =>
    v.set('loading', true)
    .set('success', false)
    .set('error', null)
  )
  },
  [actions.removeInvoiceSucceed](state, action) {
    return state.update('remove', v =>
    v.set('loading', false)
    .set('loaded', true)
    .set('success', true)
    .set('error', null))
  },
  [actions.removeInvoiceFailed](state, action) {
    return state.update('remove', v =>
    v.set('loading', false)
    .set('loaded', true)
    .set('success', false)
    .set('error', action.payload))
  },
  [actions.updateInvoiceRequested](state) {
    return state.update('update', v =>
    v.set('loading', true)
    .set('success', false)
    .set('error', null)
  )
  },
  [actions.updateInvoiceSucceed](state, action) {
    return state.update('update', v =>
    v.set('loading', false)
    .set('loaded', true)
    .set('success', true)
    .set('error', null))
  },
  [actions.updateInvoiceFailed](state, action) {
    return state.update('update', v =>
    v.set('loading', false)
    .set('loaded', true)
    .set('success', false)
    .set('error', action.payload))
  },
  [actions.getOneInvoiceRequested](state) {
    return state.update('one', v => v.set('loading', true))
  },
  [actions.getOneInvoiceSucceed](state, action) {
    return state.update('one', v => v.set('loading', false)
    .set('loaded', true)
    .set('data', Immutable.fromJS(action.payload)))
  },
  [actions.getOneInvoiceFailed](state, action) {
    return state.update('one', v => v.set('loading', false)
    .set('loaded', true)
    .set('error', action.payload))
  },
  [actions.setSelectedOneInvoice](state, action) {
    return state.set('oneItem', Immutable.fromJS(action.payload))
  },
  [actions.invoiceDefaultRequested](state) {
    return state.update('getDefault', v => v.set('loading', true))
  },
  [actions.invoiceDefaultSucceed](state, action) {
    return state.update('getDefault', v => v.set('loading', false)
    .set('loaded', true)
    .set('data', Immutable.fromJS(action.payload)))
  },
  [actions.invoiceDefaultFailed](state, action) {
    return state.update('getDefault', v => v.set('loading', false)
    .set('loaded', true)
    .set('error', action.payload))
  },
}, initialState)
