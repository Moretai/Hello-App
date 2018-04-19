import { createAction } from 'redux-actions'

export const shopCarRequested = createAction('shopcar/SHOP_CAR_REQUESTED')
export const shopCarSucceed = createAction('shopcar/SHOP_CAR_SUCCEED')
export const shopCarFailed = createAction('shopcar/SHOP_CAR_FAILED')


export const addGoodsToshopCarRequested = createAction('shopcar/ADD_GOODS_TO_SHOP_CAR_REQUESTED')
export const addGoodsToshopCarSucceed = createAction('shopcar/ADD_GOODS_TO_SHOP_CAR_SUCCEED')
export const addGoodsToshopCarFailed = createAction('shopcar/ADD_GOODS_TO_SHOP_CAR_FAILED')
export const hideAddGoodsToshopCarError = createAction('shopcar/HIDE_ADD_GOODS_TO_SHOP_CAR_ERROR')

// 在购物车列表输入数量
export const addLotsGoodsRequested = createAction('shopcar/ADD_LOTS_GOODS_REQUESTED')
export const addLotsGoodsSucceed = createAction('shopcar/ADD_LOTS_GOODS_SUCCEED')
export const addLotsGoodsFailed = createAction('shopcar/ADD_LOTS_GOODS_FAILED')

// 选中 check 单个 商品
export const toggleOneGoodSelectedRequested = createAction('shopcar/TOGGLE_ONE_GOODS_SELECTED_REQUESTED')
export const toggleOneGoodSelectedSucceed = createAction('shopcar/TOGGLE_ONE_GOODS_SELECTED_SUCCEED')
export const toggleOneGoodSelectedFailed = createAction('shopcar/TOGGLE_ONE_GOODS_SELECTED_FAILED')

// delete 以物品id删除购物车的商品 或者所有
export const deleteOneGoodOrAllRequested = createAction('shopcar/DELETE_ONE_GOOD_OR_ALL_REQUESTED')
export const deleteOneGoodOrAllSucceed = createAction('shopcar/DELETE_ONE_GOOD_OR_ALL_SUCCEED')
export const deleteOneGoodOrAllFailed = createAction('shopcar/DELETE_ONE_GOOD_OR_ALL_FAILED')

// 获取费用信息
export const getFeeInfoRequested = createAction('shopcar/GET_FEE_INFO_REQUESTED')
export const getFeeInfoSucceed = createAction('shopcar/GET_FEE_INFO_SUCCEED')
export const getFeeInfoFailed = createAction('shopcar/GET_FEE_INFO_FAILED')
