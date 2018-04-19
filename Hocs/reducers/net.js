import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import * as actions from '../actions/net'

const initialState = Immutable.fromJS({
  ok: true
})

export default handleActions({
  [actions.network](state, action) {
    return state.set('ok', action.payload)
  }
}, initialState)
