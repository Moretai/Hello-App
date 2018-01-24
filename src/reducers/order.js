import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import * as actions from '../actions/order'

const initialState = Immutable.fromJS({
  list: {
    loading: false,
    loaded: false,
    error: null,
    data: null,
  },
  detail: {
    loading: false,
    loaded: false,
    error: null,
    data: null,
  },
  generate: {
    loading: false,
    loaded: false,
    error: null,
    success: false,
  }
})

export default handleActions({
  [actions.fetchListOrdersRequested](state, action) {
    return state.update('list', v => v
    .set('loading', true))
  },
  [actions.fetchListOrdersSucceed](state, action) {
    return state.update('list', v => v
    .set('loading', false)
    .set('loaded', true)
    .set('data', Immutable.fromJS(action.payload))
    .set('error', null))
  },
  [actions.fetchListOrdersFailed](state, action) {
    return state.update('list', v => v
    .set('loading', false)
    .set('loaded', true)
    .set('data', null)
    .set('error', action.payload))
  },
  [actions.generateOrderRequested](state, action) {
    return state.update('generate', v => v
    .set('loading', true))
  },
  [actions.generateOrderSucceed](state, action) {
    return state.update('generate', v => v
    .set('loading', false)
    .set('loaded', true)
    .set('success', true)
    .set('error', null))
  },
  [actions.generateOrderFailed](state, action) {
    return state.update('generate', v => v
    .set('loading', false)
    .set('loaded', true)
    .set('success', false)
    .set('error', action.payload))
  },
  [actions.getOneOrderRequested](state, action) {
    return state.update('detail', v => v
    .set('loading', true))
  },
  [actions.getOneOrderSucceed](state, action) {
    return state.update('detail', v => v
    .set('loading', false)
    .set('loaded', true)
    .set('data', Immutable.fromJS(action.payload))
    .set('error', null))
  },
  [actions.getOneOrderFailed](state, action) {
    return state.update('detail', v => v
    .set('loading', false)
    .set('loaded', true)
    .set('data', null)
    .set('error', action.payload))
  },
}, initialState)
//
// export const getOneOrderRequested = createAction('order/GET_ONE_ORDER_REQUESTED')
// export const getOneOrderSucceed = createAction('order/GET_ONE_ORDER_SUCCEED')
// export const getOneOrderFailed = createAction('order/GET_ONE_ORDER_FAILED')
