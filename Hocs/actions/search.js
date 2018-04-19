import { createAction } from 'redux-actions'

export const searchRequested = createAction('search/SEARCH_REQUESTED')
export const searchSucceed = createAction('search/SEARCH_SUCCEED')
export const searchFailed = createAction('search/SEARCH_FAILED')

// 获取热门搜索
export const getHotsearchRequested = createAction('search/GET_HOT_SEARCH_REQUESTED')
export const getHotsearchSucceed = createAction('search/GET_HOT_SEARCH_SUCCEED')
export const getHotsearchFailed = createAction('search/GET_HOT_SEARCH_FAILED')
