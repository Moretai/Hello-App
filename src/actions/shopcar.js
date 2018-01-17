import { createAction } from 'redux-actions'

export const shopCarRequested = createAction('shopcar/SHOP_CAR_REQUESTED')
export const shopCarSucceed = createAction('shopcar/SHOP_CAR_SUCCEED')
export const shopCarFailed = createAction('shopcar/SHOP_CAR_FAILED')


export const addGoodsToshopCarRequested = createAction('shopcar/ADD_GOODS_TO_SHOP_CAR_REQUESTED')
export const addGoodsToshopCarSucceed = createAction('shopcar/ADD_GOODS_TO_SHOP_CAR_SUCCEED')
export const addGoodsToshopCarFailed = createAction('shopcar/ADD_GOODS_TO_SHOP_CAR_FAILED')
export const hideAddGoodsToshopCarError = createAction('shopcar/HIDE_ADD_GOODS_TO_SHOP_CAR_ERROR')
