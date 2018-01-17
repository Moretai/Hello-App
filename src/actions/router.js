import { createAction } from 'redux-actions'

export const locationInit = createAction('router/LOCATION_INIT')

export const locationChange = (routeName) => ({
  type: 'Navigation/NAVIGATE',
  routeName
})
