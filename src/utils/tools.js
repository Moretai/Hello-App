
import {
  AsyncStorage
} from 'react-native'

export const getLocalToken = async(key) => await AsyncStorage.getItem(key)
export const setLocalToken = async(key, value) => await AsyncStorage.setItem(key, value)

export const checkTokenExist = () => {
  const token = getLocalToken('token')
  if (token) {
    return true
  } else {
    return false
  }
}

export const  mergeArray = (A = [],B = []) => {
  if (B == null) {
    return A
  }

  if (B.length === 0) {
    return A
  }

  return A.map(x => {
    let id = x.id
    if(B.map(y => y.id).includes(id)) {
      return Object.assign({}, x ,B.filter(x => x.id === id )[0] )
    }
    return x
  })
}

export const stringCut = (str, num = 10) => {
  if(!str) return '-----'
  const len = str.length
  if(len <= num) return str
  return `${str.slice(0, num)}...`
}

export const timeStampToString = (time) => {
  const datetime = new Date()
  datetime.setTime(time)
  const year = datetime.getFullYear()
  const month = datetime.getMonth() + 1
  const date = datetime.getDate()
  const hour = datetime.getHours() >= 10 ? datetime.getHours() : `0${datetime.getHours()}`
  const minute = datetime.getMinutes() >= 10 ? datetime.getMinutes() : `0${datetime.getMinutes()}`
  const second = datetime.getSeconds() >= 10 ? datetime.getSeconds() : `0${datetime.getSeconds()}`
  // return `${year}-${month}-${date} ${hour}:${minute}:${second}`
  return `${year}-${month}-${date}`
}

export const timeStampToStringDetail = (time) => {
  const datetime = new Date()
  datetime.setTime(time)
  const endTime = new Date()
  endTime.setTime(Number(time) + 30 * 60 * 1000)

  const year = datetime.getFullYear()
  const month = datetime.getMonth() + 1
  const date = datetime.getDate()
  const hour = datetime.getHours() >= 10 ? datetime.getHours() : `0${datetime.getHours()}`
  const endHour = endTime.getHours() >= 10 ? endTime.getHours() : `0${endTime.getHours()}`
  const minute = datetime.getMinutes() >= 10 ? datetime.getMinutes() : `0${datetime.getMinutes()}`
  const endMinute = endTime.getMinutes() >= 10 ? endTime.getMinutes() : `0${endTime.getMinutes()}`
  const second = datetime.getSeconds() >= 10 ? datetime.getSeconds() : `0${datetime.getSeconds()}`
  return `${year}-${month}-${date} ${hour}:${minute}~${endHour}:${endMinute}`
}
