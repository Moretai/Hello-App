import { createAction } from 'redux-actions'

export const sendMsgRequested = createAction('vcode/SEND_MSG_REQUESTED')
export const sendMsgSucceed = createAction('vcode/SEND_MSG_SUCCEED')
export const sendMsgFailed = createAction('vcode/SEND_MSG_FAILED')

export const updateCountDownSeconds = createAction('vcode/UPDATE_COUNTDOWN_SECONDS')
