import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import * as actions from '../actions/vcode'

const initialState = Immutable.fromJS({
  loading: false,
  loaded: false,
  success: false,
  countDownSeconds: null
})
// sendMsg 与后端约定不处理失败状态
export default handleActions({
  [actions.sendMsgRequested](state, action) {
    return state.set('loading', true)
  },
  [actions.sendMsgSucceed](state, action) {
    return state.set('loading', false)
    .set('loaded', true)
    .set('success', true)
  },
  [actions.updateCountDownSeconds](state, action) {
    return state.set('countDownSeconds', action.payload)
  }
}, initialState)
