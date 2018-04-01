import React from 'react'
import { Provider, connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  View,
  Text
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import SplashScreen from 'react-native-splash-screen'
import { AppInstalledChecker, CheckPackageInstallation } from 'react-native-check-app-install'
import AppWithNavigationState from './src/navigators'
import configure from './src/store'
import * as routerActions from './src/actions/router'
import sagas from './src/sagas'

EStyleSheet.build({})
const store = configure()
store.runSaga(sagas)
console.disableYellowBox = true
console.ignoredYellowBox = ['Remote debugger']

console.warn('SplashScreen',SplashScreen)

// AppInstalledChecker
// .isAppInstalled('alipay')
// .then((isInstalled) => {
//     // isInstalled is true if the app is installed or false if not
//     console.warn('alipay install------', isInstalled)
// })
// AppInstalledChecker
//     .checkURLScheme('alipay') // omit the :// suffix
//     .then((isInstalled) => {
//         console.warn('alipay install------', isInstalled)
//     })
// AppInstalledChecker
// .isAppInstalled('weixin')
// .then((isInstalled) => {
//     // isInstalled is true if the app is installed or false if not
//     console.warn('weixin install------', isInstalled)
// })
// AppInstalledChecker
//     .checkURLScheme('weixin') // omit the :// suffix
//     .then((isInstalled) => {
//         console.warn('weixin install------', isInstalled)
//     })

// AppInstalledChecker
// .isAppInstalled('alipayshare')
// .then((isInstalled) => {
//     // isInstalled is true if the app is installed or false if not
//     console.warn('alipayshare install------', isInstalled)
// })
// AppInstalledChecker
//     .checkURLScheme('alipayshare') // omit the :// suffix
//     .then((isInstalled) => {
//         console.warn('alipayshare install------', isInstalled)
//     })
@connect(
  undefined,
  dispatch => ({
    actions: bindActionCreators(routerActions, dispatch)
  })
)
class Conatienr extends React.PureComponent {

  constructor() {
      super()
      this.state = {
        storeCreated: false,
        storeRehydrated: false,
      }
    }

  componentDidMount() {
      configure (
        x => {
          this.setState({ storeCreated: true })

        }
      )
      // configure(
      //   (err,restoredState) => console.warn('restoredState',restoredState)
      // )
      this.props.actions.locationInit()
      AppInstalledChecker
          .checkURLScheme('alipay') // omit the :// suffix
          .then((isInstalled) => {
              console.warn('alipay install------', isInstalled)
          })
    }
  render() {
    if (!this.state.storeCreated) {
        return(
          <View
          style={{backgroundColor: 'pink'}}
            >
            <Text
              style={{fontSize: 40}}
              >componentDidMountcomponentDidMountcomponentDidMountcomponentDidMountcomponentDidMount</Text>
          </View>
        )
    }
    SplashScreen.hide()
    return (
      <AppWithNavigationState />
    )
  }
}

export default class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Conatienr />
      </Provider>
    )
  }
}
