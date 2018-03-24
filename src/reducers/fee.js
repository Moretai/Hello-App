import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import * as actions from '../actions/fee'

const initialState = Immutable.fromJS({
  data: null,
  loading: true,
  loaded: false,
  error: null
})

export default handleActions({
  [actions.fetchFeeIntroRequested](state, action) {
    return state.set('loading', true)
  },
  [actions.fetchFeeIntroSucceed](state, action) {
    return state.set('loading', false)
    .set('loaded', true)
    .set('data', Immutable.fromJS(action.payload))
  },
  [actions.fetchFeeIntroFailed](state, action) {
    return state.set('loading', false)
    .set('loaded', true)
    .set('data', null)
    .set('error', action.payload)
  }
}, initialState)
