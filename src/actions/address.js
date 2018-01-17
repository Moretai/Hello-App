import { createAction } from 'redux-actions'

// 获取用户收货信息列表
export const addressAllRequested = createAction('address/ADDRESS_ALL_REQUESTED')
export const addressAllSucceed = createAction('address/ADDRESS_ALL_SUCCEED')
export const addressAllFailed = createAction('address/ADDRESS_ALL_FAILED')

// 查询用户默认收货信息
export const addressDefaultRequested = createAction('address/ADDRESS_DEFAULT_REQUESTED')
export const addressDefaultSucceed = createAction('address/ADDRESS_DEFAULT_SUCCEED')
export const addressDefaultFailed = createAction('address/ADDRESS_DEFAULT_FAILED')

// TODO 删除用户收货信息 delete
export const removeAddressRequested = createAction('address/REMOVE_ADDRESS_REQUESTED')
export const removeAddressSucceed = createAction('address/REMOVE_ADDRESS_SUCCEED')
export const removeAddressFailed = createAction('address/REMOVE_ADDRESS_FAILED')

// 更新用户收货信息
export const updateAddressRequested = createAction('address/UPDATE_ADDRESS_REQUESTED')
export const updateAddressSucceed = createAction('address/UPDATE_ADDRESS_SUCCEED')
export const updateAddressDefaultFailed = createAction('address/UPDATE_ADDRESS_FAILED')

// 新增用户收货信息
export const addAddressRequested = createAction('address/ADD_ADDRESS_REQUESTED')
export const addAddressSucceed = createAction('address/ADD_ADDRESS_SUCCEED')
export const addAddressFailed = createAction('address/ADD_ADDRESS_FAILED')
export const hideAddAddressError = createAction('address/HIDE_ADD_ADDRESS_ERROR')

// 更新用户默认地址
export const setDefaultAddressRequested = createAction('address/SET_DEFAULT_ADDRESS_REQUESTED')
export const setDefaultAddressSucceed = createAction('address/SET_DEFAULT_ADDRESS_SUCCEED')
export const setDefaultAddressFailed = createAction('address/SET_DEFAULT_ADDRESS_FAILED')
