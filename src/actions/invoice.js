import { createAction } from 'redux-actions'

// 获取用户收货信息列表
export const invoiceAllRequested = createAction('invoice/INVOICE_ALL_REQUESTED')
export const invoiceAllSucceed = createAction('invoice/INVOICE_ALL_SUCCEED')
export const invoiceAllFailed = createAction('invoice/INVOICE_ALL_FAILED')

// 查询用户默认收货信息
export const invoiceDefaultRequested = createAction('invoice/INVOICE_DEFAULT_REQUESTED')
export const invoiceDefaultSucceed = createAction('invoice/INVOICE_DEFAULT_SUCCEED')
export const invoiceDefaultFailed = createAction('invoice/INVOICE_DEFAULT_FAILED')

// TODO 删除用户收货信息 delete
export const removeInvoiceRequested = createAction('invoice/REMOVE_INVOICE_REQUESTED')
export const removeInvoiceSucceed = createAction('invoice/REMOVE_INVOICE_SUCCEED')
export const removeInvoiceFailed = createAction('invoice/REMOVE_INVOICE_FAILED')

// 更新用户收货信息
export const updateInvoiceRequested = createAction('invoice/UPDATE_INVOICE_REQUESTED')
export const updateInvoiceSucceed = createAction('invoice/UPDATE_INVOICE_SUCCEED')
export const updateInvoiceFailed = createAction('invoice/UPDATE_INVOICE_FAILED')

// 新增用户收货信息
export const addInvoiceRequested = createAction('invoice/ADD_INVOICE_REQUESTED')
export const addInvoiceSucceed = createAction('invoice/ADD_INVOICE_SUCCEED')
export const addInvoiceFailed = createAction('invoice/ADD_INVOICE_FAILED')
export const hideAddInvoiceError = createAction('invoice/HIDE_ADD_INVOICE_ERROR')

// 更新用户默认地址
export const setDefaultInvoiceRequested = createAction('invoice/SET_DEFAULT_INVOICE_REQUESTED')
export const setDefaultInvoiceSucceed = createAction('invoice/SET_DEFAULT_INVOICE_SUCCEED')
export const setDefaultInvoiceFailed = createAction('invoice/SET_DEFAULT_INVOICE_FAILED')

// 获取用户默认地址 REMOVE
export const getOneInvoiceRequested = createAction('invoice/GET_ONE_INVOICE_REQUESTED')
export const getOneInvoiceSucceed = createAction('invoice/GET_ONE_INVOICE_SUCCEED')
export const getOneInvoiceFailed = createAction('invoice/GET_ONE_INVOICE_FAILED')

// setDefaultOneInvoice
export const setSelectedOneInvoice = createAction('invoice/SET_SELECTED_ONE_INVOICE')
