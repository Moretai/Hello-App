import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import * as actions from '../actions/pay'

const cell = Immutable.fromJS({
  data: null,
  loading: true,
  loaded: false,
  error: null
})

const initialState = Immutable.fromJS({
  pay: cell,
  alipay: cell
})

const pay = {
  [actions.payRequested](state, action) {
    return state.update('pay', v => v.set('loading', true))
  },
  [actions.paySucceed](state, action) {
    return state.update('pay', v => v.set('loading', false)
    .set('loaded', true)
    .set('data', Immutable.fromJS(action.payload)))
  },
  [actions.payFailed](state, action) {
    return state.update('pay', v => v.set('loading', false)
    .set('loaded', true)
    .set('data', null)
    .set('error', action.payload))
  }
}

const alipay = {
  [actions.jumpAlipayRequested](state, action) {
    return state.update('alipay', v => v.set('loading', true))
  },
  [actions.jumpAlipaySucceed](state, action) {
    return state.update('alipay', v => v.set('loading', false)
    .set('loaded', true)
    .set('data', Immutable.fromJS(action.payload)))
  },
  [actions.jumpAlipayFailed](state, action) {
    return state.update('alipay', v => v.set('loading', false)
    .set('loaded', true)
    .set('data', null)
    .set('error', action.payload))
  }
}

export default handleActions({
  ...pay,
  ...alipay
}, initialState)
