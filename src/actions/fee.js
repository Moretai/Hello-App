import { createAction } from 'redux-actions'

export const fetchFeeIntroRequested = createAction('fee/FETCH_FEE_INTRO_REQUESTED')
export const fetchFeeIntroSucceed = createAction('fee/FETCH_FEE_INTRO_SUCCEED')
export const fetchFeeIntroFailed = createAction('fee/FETCH_FEE_INTRO_FAILED')
