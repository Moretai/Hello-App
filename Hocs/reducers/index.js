// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable'
import { reducer as formReducer } from 'redux-form/es/immutable'
import navigator from './navigator'
import hello from './hello'
import carousel from './carousel'
import list from './list'
import shopcar from './shopcar'
import vcode from './vcode'
import order from './order'
import search from './search'
import searchlist from './searchlist'
import login from './login'
import address from './address'
import invoice from './invoice'
import info from './info'
import activity from './activity'
import fee from './fee'
import net from './net'
import pay from './pay'
import Immutable from 'immutable'
var installDevTools = require("immutable-devtools")
installDevTools(Immutable)

export default combineReducers({
  navigator,
  hello,
  carousel,
  list,
  shopcar,
  vcode,
  search,
  searchlist,
  login,
  address,
  invoice,
  order,
  info,
  activity,
  fee,
  net,
  pay,
  form: formReducer
})
