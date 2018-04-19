import React from 'react'
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'

export default class Loading extends React.PureComponent {
  render() {
    return(
      <View
        style={styles.wrap}
        >
        <ActivityIndicator
          color="#61ba83"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
})
