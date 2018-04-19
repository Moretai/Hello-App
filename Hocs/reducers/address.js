import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import * as actions from '../actions/address'

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
  [actions.addAddressRequested](state, action) {
    return state.update('add', v =>
    v.set('loading', true))
  },
  [actions.addAddressSucceed](state, action) {
    return state.update('add', v =>
    v.set('loading', false)
    .set('loaded'. true)
    .set('data', Immutable.fromJS(action.payload)))
  },
  [actions.addAddressFailed](state, action) {
    return state.update('add', v =>
    v.set('loading', false)
    .set('loaded'. true)
    .set('error', action.payload)
    .set('showError', true))
  },
  [actions.hideAddAddressError](state) {
    return state.update('add', v => v.set('showError', false))
  },
  [actions.addressAllRequested](state) {
    return state.set('loading', true)
  },
  [actions.addressAllSucceed](state, action) {
    return state.set('loading', false)
    .set('loaded', true)
    .set('data', Immutable.fromJS(action.payload))
  },
  [actions.addressAllFailed](state, action) {
    return state.set('loading', false)
    .set('loaded', true)
    .set('error', action.payload)
  },
  [actions.setDefaultAddressRequested](state) {
    return state.update('setDefault', v => v.set('loading', true))
  },
  [actions.setDefaultAddressSucceed](state, action) {
    return state.update('setDefault', v => v.set('loading', false)
    .set('loaded', true)
    .set('data', Immutable.fromJS(action.payload)))
  },
  [actions.setDefaultAddressFailed](state, action) {
    return state.update('setDefault', v => v.set('loading', false)
    .set('loaded', true)
    .set('error', action.payload))
  },
  [actions.removeAddressRequested](state) {
    return state.update('remove', v =>
    v.set('loading', true)
    .set('success', false)
    .set('error', null)
  )
  },
  [actions.removeAddressSucceed](state, action) {
    return state.update('remove', v =>
    v.set('loading', false)
    .set('loaded', true)
    .set('success', true)
    .set('error', null))
  },
  [actions.removeAddressFailed](state, action) {
    return state.update('remove', v =>
    v.set('loading', false)
    .set('loaded', true)
    .set('success', false)
    .set('error', action.payload))
  },
  [actions.updateAddressRequested](state) {
    return state.update('update', v =>
    v.set('loading', true)
    .set('success', false)
    .set('error', null)
  )
  },
  [actions.updateAddressSucceed](state, action) {
    return state.update('update', v =>
    v.set('loading', false)
    .set('loaded', true)
    .set('success', true)
    .set('error', null))
  },
  [actions.updateAddressFailed](state, action) {
    return state.update('update', v =>
    v.set('loading', false)
    .set('loaded', true)
    .set('success', false)
    .set('error', action.payload))
  },
  [actions.getOneAddressRequested](state) {
    return state.update('one', v => v.set('loading', true))
  },
  [actions.getOneAddressSucceed](state, action) {
    return state.update('one', v => v.set('loading', false)
    .set('loaded', true)
    .set('data', Immutable.fromJS(action.payload)))
  },
  [actions.getOneAddressFailed](state, action) {
    return state.update('one', v => v.set('loading', false)
    .set('loaded', true)
    .set('error', action.payload))
  },
  [actions.setSelectedOneAddress](state, action) {
    return state.set('oneItem', Immutable.fromJS(action.payload))
  },
  [actions.addressDefaultRequested](state) {
    return state.update('getDefault', v => v.set('loading', true))
  },
  [actions.addressDefaultSucceed](state, action) {
    return state.update('getDefault', v => v.set('loading', false)
    .set('loaded', true)
    .set('data', Immutable.fromJS(action.payload)))
  },
  [actions.addressDefaultFailed](state, action) {
    return state.update('getDefault', v => v.set('loading', false)
    .set('loaded', true)
    .set('error', action.payload))
  },
}, initialState)

// export const addressDefaultRequested = createAction('address/ADDRESS_DEFAULT_REQUESTED')
// export const addressDefaultSucceed = createAction('address/ADDRESS_DEFAULT_SUCCEED')
// export const addressDefaultFailed = createAction('address/ADDRESS_DEFAULT_FAILED')
