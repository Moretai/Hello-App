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
    v.set('loading', false))
    .set('loaded', true)
    .set('data', Immutable.fromJS(action.payload))
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
  }
}, initialState)
