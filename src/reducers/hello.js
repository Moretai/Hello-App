import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import * as actions from '../actions/hello'

const initialState = Immutable.fromJS({
  status: false,
  flag: 1
})

export default handleActions({
  [actions.helloRequested](state, action) {
    return state.set('status', action.payload)
  }
}, initialState)
