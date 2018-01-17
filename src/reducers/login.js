import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import * as actions from '../actions/login'

const initialState = Immutable.fromJS({
  loading: false,
  loaded: false,
  error: null,
  data: null
})

export default handleActions({
  [actions.loginRequested](state, action) {
    return state.set('loading', true).set('data', null)
  },
  [actions.loginSucceed](state, action) {
    return state.set('loading', false)
    .set('loaded', true)
    .set('data', Immutable.fromJS(action.payload))
  },
  [actions.loginFailed](state, action) {
    return state.set('loading', false)
    .set('loaded', true)
    .set('data', null)
    .set('error', action.payload)
  }
}, initialState)
