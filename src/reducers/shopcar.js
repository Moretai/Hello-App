import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import * as actions from '../actions/shopcar'

const initialState = Immutable.fromJS({
  data: null,
  loading: false,
  loaded: false,
  error: false,
  showError: false,
  addGoodsToCar: {
    data: null,
    loading: false,
    loaded: false,
    error: false,
    showError: false
  },
  addLotsGoods: {
    success: false,
    loading: false,
    loaded: false,
    error: false,
  },
  toggleOne: {
    success: false,
    loading: false,
    loaded: false,
    error: false,
  },
  deleteGood: {
    success: false,
    loading: false,
    loaded: false,
    error: false,
  },
  fee: {
    data: null,
    loading: false,
    loaded: false,
    error: false,
    // showError: false
  }
})

export default handleActions({
  [actions.shopCarRequested](state, action) {
    return state.set('loading', true)
  },
  [actions.shopCarSucceed](state, action) {
    return state.set('loading', false)
    .set('loaded', true)
    .set('data', Immutable.fromJS(action.payload))
    .set('error', false)
    .set('showError', false)
  },
  [actions.shopCarFailed](state, action) {
    return state.set('loading', false)
    .set('loaded', true)
    .set('data', null)
    .set('error', action.payload)
    .set('showError', true)
  },
  [actions.addGoodsToshopCarRequested](state, action) {
    return state.update('addGoodsToCar', v =>
    v.set('loading', true))
  },
  [actions.addGoodsToshopCarSucceed](state, action) {
    return state.update('addGoodsToCar', v =>
    v.set('loading', false)
    .set('loaded', true)
    .set('data', Immutable.fromJS(action.payload)))
  },
  [actions.addGoodsToshopCarFailed](state, action) {
    return state.update('addGoodsToCar', v =>
    v.set('loading', false)
    .set('loaded', true)
    .set('data', null)
    .set('error', action.payload)
    .set('showError', true))
  },
  [actions.hideAddGoodsToshopCarError](state, action) {
    return state.update('addGoodsToCar', v =>
    v.set('showError', true))
  },
  [actions.addLotsGoodsRequested](state, action) {
    return state.update('addLotsGoods', v =>
    v.set('loading', true)
    .set('loaded', false)
    .set('success', false))
  },
  [actions.addLotsGoodsSucceed](state, action) {
    return state.update('addLotsGoods', v =>
    v.set('loading', false)
    .set('loaded', true)
    .set('success', true))
  },
  [actions.addLotsGoodsFailed](state, action) {
    return state.update('addLotsGoods', v =>
    v.set('loading', false)
    .set('loaded', true)
    .set('success', false)
    .set('error', action.payload))
  },
  [actions.toggleOneGoodSelectedRequested](state, action) {
    return state.update('toggleOne', v =>
    v.set('loading', true)
    .set('loaded', false)
    .set('success', false))
  },
  [actions.toggleOneGoodSelectedSucceed](state, action) {
    return state.update('toggleOne', v =>
    v.set('loading', false)
    .set('loaded', true)
    .set('success', true))
  },
  [actions.toggleOneGoodSelectedFailed](state, action) {
    return state.update('toggleOne', v =>
    v.set('loading', false)
    .set('loaded', true)
    .set('success', false)
    .set('error', action.payload))
  },
  [actions.deleteOneGoodOrAllRequested](state, action) {
    return state.update('deleteGood', v =>
    v.set('loading', true)
    .set('loaded', false)
    .set('success', false))
  },
  [actions.deleteOneGoodOrAllSucceed](state, action) {
    return state.update('deleteGood', v =>
    v.set('loading', false)
    .set('loaded', true)
    .set('success', true))
  },
  [actions.deleteOneGoodOrAllFailed](state, action) {
    return state.update('deleteGood', v =>
    v.set('loading', false)
    .set('loaded', true)
    .set('success', false)
    .set('error', action.payload))
  },
  [actions.getFeeInfoRequested](state, action) {
    return state.update('fee', v => v.set('loading', true))
  },
  [actions.getFeeInfoSucceed](state, action) {
    return state.update('fee', v =>
    v.set('loading', false)
    .set('loaded', true)
    .set('data', Immutable.fromJS(action.payload)))
  },
  [actions.getFeeInfoFailed](state, action) {
    return state.update('fee', v =>
    v.set('loading', false)
    .set('loaded', true)
    .set('error', action.payload))
  }
}, initialState)
