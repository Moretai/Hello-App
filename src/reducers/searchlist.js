import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import * as actions from '../actions/searchlist'

const initialState = Immutable.fromJS({
  addGoodsToCar: {
    data: null,
    loading: false,
    loaded: false,
    error: false,
    showError: false
  }
})

export default handleActions({
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
  }
}, initialState)
