import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import * as actions from '../actions/login'

const initialState = Immutable.fromJS({
  loading: false,
  loaded: false,
  error: null,
  data: null,
  validate: {
    loading: false,
    loaded: false,
    error: null,
    success: false,
  }
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
  },
  [actions.validateTokenRequested](state) {
    return state.update('validate', v => v.set('loading'. true))
  },
  [actions.validateTokenSucceed](state, action) {
    return state.update('validate', v =>
    v.set('loading'. false)
    .set('loaded', true)
    .set('success', true))
  },
  [actions.validateTokenFailed](state, action) {
    return state.update('validate', v =>
    v.set('loading'. false)
    .set('loaded', true)
    .set('success', false)
    .set('error', action.payload))
  }
}, initialState)
