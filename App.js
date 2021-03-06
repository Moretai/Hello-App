import React from 'react'
import { Provider, connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EStyleSheet from 'react-native-extended-stylesheet'
import AppWithNavigationState from './src/navigators'
import configure from './src/store'
import * as routerActions from './src/actions/router'
import sagas from './src/sagas'

EStyleSheet.build({})
const store = configure()
store.runSaga(sagas)
console.disableYellowBox = true
console.ignoredYellowBox = ['Remote debugger']

@connect(
  undefined,
  dispatch => ({
    actions: bindActionCreators(routerActions, dispatch)
  })
)
class Conatienr extends React.PureComponent {
  componentDidMount() {
    this.props.actions.locationInit()
    console.log('App componentDidMount...')
  }
  render() {
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
