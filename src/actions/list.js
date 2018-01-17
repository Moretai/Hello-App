import { createAction } from 'redux-actions'

export const fetchCategoryRequested = createAction('list/FETCH_CATEGORY_REQUESTED')
export const fetchCategorySucceed = createAction('list/FETCH_CATEGORY_SUCCEED')
export const fetchCategoryFailed = createAction('list/FETCH_CATEGORY_FAILED')

export const fetchListRequested = createAction('list/FETCH_LIST_REQUESTED')
export const fetchListSucceed = createAction('list/FETCH_LIST_SUCCEED')
export const fetchListFailed = createAction('list/FETCH_LIST_FAILED')

export const loadMoreListRequested = createAction('list/LOAD_MORE_LIST_REQUESTED')
export const loadMoreListSucceed = createAction('list/LOAD_MORE_LIST_SUCCEED')
export const loadMoreListFailed = createAction('list/LOAD_MORE_LIST_FAILED')
