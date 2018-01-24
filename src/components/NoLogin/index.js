import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { withNavigation } from 'react-navigation'

@withNavigation
export default class NoLogin extends React.PureComponent {
  navToLogin = () => {
    const { navigation } = this.props
    navigation.navigate('Login')
  }
  render() {
    return(
      <View>
        <Text>您还未登录~</Text>
      <TouchableOpacity
          onPress={this.navToLogin}
          >
          <Text>去登录</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
