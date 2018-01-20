
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
  return `${str.slice(0, num)}...`
}
