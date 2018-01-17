import { createAction } from 'redux-actions'

export const carouselRequested = createAction('carousel/CAROUSEL_REQUESTED')
export const carouselSucceed = createAction('carousel/CAROUSEL_SUCCEED')
export const carouselFailed = createAction('carousel/CAROUSEL_FAILED')
