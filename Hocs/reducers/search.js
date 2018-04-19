import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import * as actions from '../actions/search'

const initialState = Immutable.fromJS({
  loading: false,
  loaded: false,
  error: null,
  data: null,
  hotSearch: {
    loading: false,
    loaded: false,
    error: null,
    data: null,
  }
})

export default handleActions({
  [actions.searchRequested](state, action) {
    return state.set('loading', true).set('data', null)
  },
  [actions.searchSucceed](state, action) {
    return state.set('loading', false)
    .set('loaded', true)
    .set('data', Immutable.fromJS(action.payload))
  },
  [actions.searchFailed](state, action) {
    return state.set('loading', false)
    .set('loaded', true)
    .set('data', null)
    .set('error', action.payload)
  },
  [actions.getHotsearchRequested](state, action) {
    return state.update('hotSearch', v => v.set('loading', true).set('data', null))
  },
  [actions.getHotsearchSucceed](state, action) {
    return state.update('hotSearch', v => v.set('loading', false)
    .set('loaded', true)
    .set('data', Immutable.fromJS(action.payload)))
  },
  [actions.getHotsearchFailed](state, action) {
    return state.update('hotSearch', v => v.set('loading', false)
    .set('loaded', true)
    .set('data', null)
    .set('error', action.payload))
  }
}, initialState)
