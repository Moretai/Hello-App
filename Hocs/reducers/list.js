import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import * as actions from '../actions/list'

const initialState = Immutable.fromJS({
  category: {
    data: {},
    loading: false,
    loaded: false,
    error: null,
    showError: false
  },
  list: {
    data: {},
    loading: false,
    loaded: false,
    error: null,
    showError: false,
    loadMoreloading: false,
    loadMoreloaded: false,
    loadMoreError: null,
    loadMoreShowError: false,
    id: null,
    page: 1
  },
})

export default handleActions({
  [actions.fetchCategoryRequested](state, action) {
    return state.update('category', v => v
    .set('loading', true)
    .set('showError', false))
  },
  [actions.fetchCategorySucceed](state, action) {
    return state.update('category', v => v
    .set('loading', false)
    .set('loaded', true)
    .set('data', Immutable.fromJS(action.payload))
    .set('error', null)
    .set('showError', false))
  },
  [actions.fetchCategoryFailed](state, action) {
    return state.update('category', v => v
    .set('loading', false)
    .set('loaded', true)
    .set('data', null)
    .set('error', action.payload)
    .set('showError', true))
  },
  [actions.nowFetchCategoryIdAndPage](state, action) {
    return state.update('list', v => v
    .set('id', action.payload.id)
    .set('page', action.payload.page))
  },
  [actions.fetchListRequested](state, action) {
    return state.update('list', v => v
    .set('loading', true)
    .set('showError', false))
  },
  [actions.fetchListSucceed](state, action) {
    return state.update('list', v => v
    .set('loading', false)
    .set('loaded', true)
    .set('data', Immutable.fromJS(action.payload))
    .set('error', null)
    .set('showError', false))
  },
  [actions.fetchListFailed](state, action) {
    return state.update('list', v => v
    .set('loading', false)
    .set('loaded', true)
    .set('data', null)
    .set('error', action.payload)
    .set('showError', true))
  },
  [actions.loadMoreListRequested](state, action) {
    return state.update('list', v => v
    .set('loadMoreloading', true)
    .set('loadMoreloaded', false)
    .set('loadMoreShowError', false))
  },
  [actions.loadMoreListSucceed](state, action) {
    return state.update('list', v => v
    .set('loadMoreloading', false)
    .set('loadMoreloaded', true)
    .update('data', v => v.mergeDeep(Immutable.fromJS(action.payload)))
    .set('loadMoreError', null)
    .set('loadMoreShowError', false))
  },
  [actions.loadMoreListFailed](state, action) {
    return state.update('list', v => v
    .set('loadMoreloading', false)
    .set('loadMoreloaded', true)
    .set('error', action.payload)
    .set('loadMoreShowError', true))
  }
}, initialState)
