/* global ga */
import { takeEvery, put, fork } from 'redux-saga/effects'
import * as routerActions from '../actions/router'
import * as shopCarActions from '../actions/shopcar'
import * as addressActions from '../actions/address'
import * as searchActions from '../actions/search'

// function locationChange() {
//   window.scroll(0, 0)
// }

function* locationInit(action) {
  console.log(action)
}

function* locationChange(action) {
  const { routeName } = action
  console.warn('routeName==>', routeName);
  if (routeName === 'ShoppingCar') {
    yield put(shopCarActions.shopCarRequested())
    yield put(addressActions.addressDefaultRequested())
  }

  if (routeName === 'AddressList') {
    yield put(addressActions.addressAllRequested())
  }

  // if (routeName === 'Search') {
  //   yield put(searchActions.getHotsearchRequested())
  // }


}

export default function* routerSaga() {
  yield takeEvery(String(routerActions.locationInit), locationInit)
  yield fork(takeEvery, 'Navigation/NAVIGATE', locationChange)
}
