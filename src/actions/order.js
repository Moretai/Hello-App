import { createAction } from 'redux-actions'

export const generateOrderRequested = createAction('order/GENERATE_ORDER_REQUESTED')
export const generateOrderSucceed = createAction('order/GENERATE_ORDER_SUCCEED')
export const generateOrderFailed = createAction('order/GENERATE_ORDER_FAILED')

export const fetchListOrdersRequested = createAction('order/FETCH_LIST_ORDERS_REQUESTED')
export const fetchListOrdersSucceed = createAction('order/FETCH_LIST_ORDERS_SUCCEED')
export const fetchListOrdersFailed = createAction('order/FETCH_LIST_ORDERS_FAILED')

export const getOneOrderRequested = createAction('order/GET_ONE_ORDER_REQUESTED')
export const getOneOrderSucceed = createAction('order/GET_ONE_ORDER_SUCCEED')
export const getOneOrderFailed = createAction('order/GET_ONE_ORDER_FAILED')
