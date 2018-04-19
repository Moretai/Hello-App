import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import * as actions from '../actions/info'

const initialState = Immutable.fromJS({
  fee: {
    data: null,
    loading: false,
    loaded: false,
    error: null
  }
})

export default handleActions({
  [actions.feeIntroRequested](state) {
    return state.update('fee', v => v.set('loading'. true))
  },
  [actions.feeIntroSucceed](state, action) {
    return state.update('fee', v =>
    v.set('loading'. false)
    .set('loaded', true)
    .set('data', Immutable.fromJS(action.payload)))
  },
  [actions.feeIntroFailed](state, action) {
    return state.update('fee', v =>
    v.set('loading'. false)
    .set('loaded', true)
    .set('error', action.payload))
  }
}, initialState)
