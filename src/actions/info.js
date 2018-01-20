import { createAction } from 'redux-actions'

// 获取收费信息资讯
export const feeIntroRequested = createAction('info/FEE_INTRO_REQUESTED')
export const feeIntroSucceed = createAction('info/FEE_INTRO_SUCCEED')
export const feeIntroFailed = createAction('info/FEE_INTRO_FAILED')
