import { createAction } from 'redux-actions'

export const activityRequested = createAction('activity/ACTIVITY_REQUESTED')
export const activitySucceed = createAction('activity/ACTIVITY_SUCCEED')
export const activityFailed = createAction('activity/ACTIVITY_FAILED')
