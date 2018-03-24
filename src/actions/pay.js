import { createAction } from 'redux-actions'

export const payRequested = createAction('pay/PAY_REQUESTED')
export const paySucceed = createAction('pay/PAY_SUCCEED')
export const payFailed = createAction('pay/PAY_FAILED')

export const jumpAlipayRequested = createAction('pay/JUMP_ALIPAY_REQUESTED')
export const jumpAlipaySucceed = createAction('pay/JUMP_ALIPAY_SUCCEED')
export const jumpAlipayFailed = createAction('pay/JUMP_ALIPAY_FAILED')
