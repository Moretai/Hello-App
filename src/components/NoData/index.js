import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import * as Animatable from 'react-native-animatable'

export default class NoData extends React.PureComponent {
  render() {
    return(
      <View
        style={styles.wrap}
        >
        <Image
        style={styles.icon}
        source={require('../../resources/images/no-data.png')}
      />
        <Text>暂无数据~</Text>
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
  }
})
