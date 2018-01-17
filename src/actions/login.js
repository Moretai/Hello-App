import { createAction } from 'redux-actions'

export const loginRequested = createAction('login/LOGIN_REQUESTED')
export const loginSucceed = createAction('login/LOGIN_SUCCEED')
export const loginFailed = createAction('login/LOGIN_FAILED')
