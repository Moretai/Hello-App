import { createAction } from 'redux-actions'

export const searchAddGoodsToshopCarRequested = createAction('search/SEARCH_ADD_GOODS_TO_SHOP_CAR_REQUESTED')
export const searchAddGoodsToshopCarSucceed = createAction('search/SEARCH_ADD_GOODS_TO_SHOP_CAR_SUCCEED')
export const searchAddGoodsToshopCarFailed = createAction('search/SEARCH_ADD_GOODS_TO_SHOP_CAR_FAILED')
export const hideSearchAddGoodsToshopCarError = createAction('search/HIDE_SEARCH_ADD_GOODS_TO_SHOP_CAR_ERROR')
