import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { withNavigation } from 'react-navigation'

@withNavigation
export default class NetError extends React.PureComponent {

  navToNetHelper = () => {
    const { navigation } = this.props
    navigation.navigate('NetHelper')
  }

  render() {
    return(
      <View
        style={styles.wrap}
        >
        <Image
        style={styles.icon}
        source={require('../../resources/images/net-error.png')}
      />
      <Text style={styles.error}>网络状态待提升，点击重试</Text>
        <TouchableOpacity
          onPress={this.navToNetHelper}
          style={styles.btn}
          >
          <Text style={styles.solve}>查看解决方式</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
  },
  error: {
    color: '#818181',
  },
  icon: {
    marginBottom: 10,
    width: 80,
    height: 80,
  },
  btn: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#b9b9b9',
    borderStyle: 'solid',
    paddingVertical: 4,
    paddingHorizontal: 10
  },
  solve: {
    color: '#909090'
  }
})
