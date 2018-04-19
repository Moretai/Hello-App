import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
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
      <View
        style={styles.wrap}
        >
        <Image
        style={styles.icon}
        source={require('../../resources/images/no-login.png')}
      />
        <Text>您还未登录~</Text>
        <TouchableOpacity
          onPress={this.navToLogin}
          >
          <Text style={styles.nav}>去登录</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    marginBottom: 10,
  },
  nav: {
    color: '#61ba82',
    paddingBottom: 10,
    paddingTop: 10
  }
})
