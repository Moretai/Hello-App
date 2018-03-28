import React from 'react'
import { Provider, connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  View,
  Text
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import SplashScreen from 'react-native-splash-screen'
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
          SplashScreen.hide()
        }
      )
      // configure(
      //   (err,restoredState) => console.warn('restoredState',restoredState)
      // )
      this.props.actions.locationInit()
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
