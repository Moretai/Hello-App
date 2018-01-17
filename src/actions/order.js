import { createAction } from 'redux-actions'

export const generateOrderRequested = createAction('order/GENERATE_ORDER_REQUESTED')
export const generateOrderSucceed = createAction('order/GENERATE_ORDER_SUCCEED')
export const generateOrderFailed = createAction('order/GENERATE_ORDER_FAILED')
