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
import * as Communications from 'react-native-communications'

export default class Help extends React.PureComponent {
  static navigationOptions = ({navigation}) => ({
      title: '客服与帮助',
      headerLeft: (
      <Button
        title="返回"
        color="#61b981"
        onPress={() => navigation.dispatch(NavigationActions.back())}
        />
      ),
    })

  phoneCall = () => {
    Communications.phonecall('051081002750', true)
  }

  render() {
    return (
      <View style={styles.wrap}>
        <View>
          <Text style={styles.text}>&nbsp;&nbsp;&nbsp;&nbsp;如果您在使用食客皆宜应用过程中，遇到任何的问题，欢迎您拨打我们的客服电话，我们将竭诚为您服务。</Text>
          <Text  style={styles.text}>&nbsp;&nbsp;&nbsp;&nbsp;我们也欢迎您对我们的产品和服务，提出任何的建议或意见，我们会认真听取每一位客户的意见，持续优化我们的产品。</Text>
        </View>
        <TouchableOpacity
          onPress={this.phoneCall}
          style={styles.phoneWrap}
          >
          <Image
            style={styles.icon}
            source={require('../../resources/images/phone-call.png')}
            />
          <Text style={styles.phoneNum}>0510-81002750</Text>
        </TouchableOpacity>
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
  },
  phoneWrap: {
    marginTop: 20,
    paddingTop: 1,
    paddingBottom: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    backgroundColor: '#61b981',
    borderRadius: 4
  },
  icon: {
    width: 30,
    height: 30
  },
  phoneNum: {
    color: '#fff',
  },
  text: {
    fontSize: 12,
    color: '#8a8a8a'
  }
})
