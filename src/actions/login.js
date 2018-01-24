import { createAction } from 'redux-actions'

export const loginRequested = createAction('login/LOGIN_REQUESTED')
export const loginSucceed = createAction('login/LOGIN_SUCCEED')
export const loginFailed = createAction('login/LOGIN_FAILED')

export const validateTokenRequested = createAction('auth/VALIDATE_TOKEN_REQUESTED')
export const validateTokenSucceed = createAction('auth/VALIDDATE_TOKEN_SUCCEED')
export const validateTokenFailed = createAction('auth/VALIDDATE_TOKEN_FAILED')

export const logOut = createAction('auth/LOG_OUT')
