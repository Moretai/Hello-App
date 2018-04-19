import React from 'react'
import { Provider, connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  NetInfo,
  AppState
} from 'react-native'
import codePush from 'react-native-code-push'
import EStyleSheet from 'react-native-extended-stylesheet'
import SplashScreen from 'react-native-splash-screen'
import { AppInstalledChecker, CheckPackageInstallation } from 'react-native-check-app-install'
import AppWithNavigationState from './src/navigators'
import configure from './src/store'
import * as routerActions from './src/actions/router'
import * as netActions from './src/actions/net'
import sagas from './src/sagas'

EStyleSheet.build({})
const store = configure()
store.runSaga(sagas)
console.disableYellowBox = true
console.ignoredYellowBox = ['Remote debugger']

@connect(
  undefined,
  dispatch => ({
    actions: bindActionCreators({
      ...routerActions,
      ...netActions,
    }, dispatch)
  })
)
class Conatienr extends React.PureComponent {

  constructor() {
      super()
      this.state = {
        storeCreated: false,
        storeRehydrated: false,
        // netState: false
      }
    }
  //   update() {
  //     codePush.sync({
  //     updateDialog: {
  //       appendReleaseDescription: true,
  //       descriptionPrefix:'更新内容:',
  //       title:'更新',
  //       mandatoryUpdateMessage:'',
  //       mandatoryContinueButtonLabel:'更新',
  //     },
  //     mandatoryInstallMode:codePush.InstallMode.IMMEDIATE,
  //   })
  // }

   componentDidMount() {
     // AppState.addEventListener("change", (newState) => {
     //   // newState === "active" && codePush.notifyAppReady();
     //   newState === "active" && this.update();
     // })
      configure (
        x => {
          this.setState({ storeCreated: true })

        }
      )
      this.props.actions.locationInit()
      NetInfo.addEventListener('connectionChange', (networkType) => {
          console.warn('networkType....', networkType);
          if (networkType.type === 'cellular' || networkType.type === 'wifi') {
             this.props.actions.network(true)
          } else {
            this.props.actions.network(false)
          }
      })
    }

  render() {
    SplashScreen.hide()
    if (!this.state.storeCreated) {
        return(
          <View
          style={{backgroundColor: '#fff', flex: 1}}
            >
              <ActivityIndicator color="#f8f8f8"/>
          </View>
        )
    }

    return (
      // <SafeAreaView style={styles.safeArea}>
        <AppWithNavigationState />
      // </SafeAreaView>
    )
  }
}

let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };
// APP在前台就检测热更新
@codePush(codePushOptions)
export default class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Conatienr />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
