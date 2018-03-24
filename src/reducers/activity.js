import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import * as actions from '../actions/activity'

const initialState = Immutable.fromJS({
  data: null,
  loading: true,
  loaded: false,
  error: null
})

export default handleActions({
  [actions.activityRequested](state, action) {
    return state.set('loading', true)
  },
  [actions.activitySucceed](state, action) {
    return state.set('loading', false)
    .set('loaded', true)
    .set('data', Immutable.fromJS(action.payload))
  },
  [actions.activityFailed](state, action) {
    return state.set('loading', false)
    .set('loaded', true)
    .set('data', null)
    .set('error', action.payload)
  }
}, initialState)
