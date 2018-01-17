import React from 'react'
import {
  View,
  Text,
  Button
 } from 'react-native'
import { withNavigation, NavigationActions } from 'react-navigation'

export default class Detail extends React.Component {
  static navigationOptions = ({navigation}) => ({
      title: `${navigation.state.params.id}详情`,
      headerLeft: (
        <Button
          title="返回"
          onPress={() => navigation.dispatch(NavigationActions.back())}
        />
    ),
  })
  render() {
    const { navigation } = this.props
    return (
      <View>
        <Text>{navigation.state.params.id}Detail Page</Text>
      </View>
    )
  }
}
