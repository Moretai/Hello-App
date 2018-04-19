import React from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Button,
  Image,
} from 'react-native'
import { withNavigation, NavigationActions } from 'react-navigation'
// import { Result } from 'antd-mobile'
import * as Communications from 'react-native-communications'



export default class PayResult extends React.PureComponent {
  static navigationOptions = ({navigation}) => ({
      title: '支付结果',
      // headerLeft: (
      // <Button
      //   title="返回"
      //   color="#61b981"
      //   onPress={() => navigation.dispatch(NavigationActions.back())}
      //   />
      // ),
    })
    // constructor(props) {
    //   super(props)
    //   this.state = {
    //     left: 3
    //   }
    // }

  // navToOrder = () => {
  //   const { navigation } = this.props
  //   navigation.navigate('User')
  // }

  // componentDidMount() {
  //
  // }
  //
  // componentWillReceiveProps() {
  //   console.warn('componentWillReceiveProps...')
  // }
  //
  // componentWillUnmount() {
  //   console.warn('componentWillUnmount..')
  //   if(this.timer) {
  //     return clearInterval(this.timer)
  //   }
  // }

  render() {
    const { navigation } = this.props
    const result = navigation.state.params.result
    return (
      <View style={styles.wrap}>
        {result === '支付成功' &&
          <View
            style={styles.result}
            >
            <Image
              style={styles.img}
              source={require('../../resources/images/pay-success.png')}
              />
            <Text style={styles.text}>支付成功,为您跳转到用户页面</Text>
          </View>}
        {result === '已取消支付' &&
          <View
            style={styles.result}
            >
            <Image
              style={styles.img}
              source={require('../../resources/images/pay-fail.png')}
              />
            <Text style={styles.text}>支付已取消,为您跳转到用户页面</Text>
          </View>}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  result: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop: 80,
    alignItems: 'center'
  },
  img: {
    width:100,
    height: 100
  },
  text: {
    fontSize: 14,
    paddingTop: 20
  }
})
