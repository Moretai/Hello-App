// import fetch from 'isomorphic-fetch'
// import cookie from 'react-cookie'
// import { GATEWAY_API_URL } from 'constants/env'
import { SECRET } from './config'
import { getLocalToken } from './tools'
// const getLocalToken = (key) => AsyncStorage.getItem(key)

export const fetchJxy = async(method = 'GET', endPoint = '/hello', params = {}, customeHeaders = {}) => {
  // let url = 'http://localhost:8888/api' + endPoint
  let url = 'http://120.78.166.233:8080/api' + endPoint
  // let url = 'http://192.168.102.36:8888/api' + endPoint
  // const token = getLocalToken || null
  const token = await getLocalToken('token') || null
  // const token = cookie.load('dae_crm_t') ? `Bearer ${cookie.load('dae_crm_t')}` : null
  console.warn('token is ==>', token);
  const headers = Object.assign({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: token,
    'X-secret': SECRET
  }, customeHeaders)

  const options = { method, headers }

  if (method === 'GET') {
    const queryString = Object.keys(params).length === 0 ? '' : `?${Object.keys(params).map(k => [k, params[k]].map(encodeURIComponent).join('=')).join('&')}`
    url += queryString
  } else if (method === 'POST' || method === 'PUT') {
    if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      options.body = `${Object.keys(params).map(k => [k, params[k]].join('=')).join('&')}`
    } else if (headers['Content-Type'] === 'multipart/form-data') {
      delete headers['Content-Type']
      const formData = new FormData()
      Object.keys(params).forEach(key => formData.append(key, params[key]))
      options.body = formData
    } else {
      options.body = JSON.stringify(params)
    }
  }

  return fetch(url, options).then((res) => {
    console.warn('res is=======>', res)
    if (!res.ok) {
      return res.json().then(e => Promise.reject({ message: e.msg }))
    }
    // console.warn('content-type------>',res.headers)
    const contentType = res.headers.get('content-type')

    if (/json/.test(contentType)) {
      return res.json().then(values => values)
    }

    return null
  })
}

export const fetchBase = (method = 'GET', endPoint = '/hello', params = {}, customeHeaders = {}) => {
  let url = 'http://192.168.0.107:8888/api' + endPoint
  // let url = 'http://192.168.0.102:8081/' + endPoint
  // let url = 'http://192.168.102.36:8888/api' + endPoint
  // const token = cookie.load('dae_crm_t') ? `Bearer ${cookie.load('dae_crm_t')}` : null
  const token =  null

  const headers = Object.assign({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: token,
    'X-secret': 'secret'
  }, customeHeaders)

  const options = { method, headers }

  if (method === 'GET') {
    const queryString = Object.keys(params).length === 0 ? '' : `?${Object.keys(params).map(k => [k, params[k]].map(encodeURIComponent).join('=')).join('&')}`
    url += queryString
  } else if (method === 'POST' || method === 'PUT') {
    if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      options.body = `${Object.keys(params).map(k => [k, params[k]].join('=')).join('&')}`
    } else if (headers['Content-Type'] === 'multipart/form-data') {
      delete headers['Content-Type']
      const formData = new FormData()
      Object.keys(params).forEach(key => formData.append(key, params[key]))
      options.body = formData
    } else {
      options.body = JSON.stringify(params)
    }
  }

  return fetch(url, options).then((res) => {
    if (!res.ok) {
      return res.json().then(e => Promise.reject({ message: e.error }))
    }

    const contentType = res.headers.get('content-type')

    if (/json/.test(contentType)) {
      return res.json().then(values => values)
    }

    return null
  })
}

export const fetchCategory = (params) => fetchJxy('GET', '/selectappgoodsclassificationarr')

export const fetchList = (params) => fetchJxy('GET', `/selectappgoodslistbygoodsclassificationid/${params.typeId}`, params)

// 查询用户购物车列表
export const fetchShopCar = (params) => fetchBase('GET', `/selectshoppingcatall`)

export const fetchCarousel = (params) => fetchJxy('GET','/selectappcarouselarr')

export const sendMsg = (params) => fetchJxy('GET', `/sendmsg/${params.phone}`)

// 模糊查询接口
export const search = (params) => fetchBase('GET',`/selectgoodsinfovague`, params)

// 获取热门搜索关键词
export const getHotSearch = (params) => fetchBase('GET', '/hotsearchwords')

export const login = (params) => fetchJxy('POST',`/loginbyphone`, params)

export const addGoodsToCar = (params) => fetchBase('POST',`/insertshoppingcat`, params)

// 查询用户购物车列表
export const fetchShopCarAll = (params) => fetchBase('GET', '/selectshoppingcatall')

// 去结算生产订单
export const generateOrder = (params) => fetchBase('POST', '/insertorder', params)

// 新增用户收货信息
export const addAddress = (params) => fetchBase('POST', '/insertreceiptinformation', params)

// 获取用户收货信息列表
export const fetchAllAddress = (params) => fetchBase('GET','/selectreceiptinformationlist')

// 更新用户默认地址
export const setDefaultAddress = (params) => fetchBase('PUT','/updatadefaultreceiptinformation', params)

//删除用户收货信息 TODO DELETE ?
export const removeAddress = (params) => fetchBase('DELETE',`/deleteuserreceiptinformation/${params.id}`)