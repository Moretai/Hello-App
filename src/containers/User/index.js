import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  View,
  Text,
  NetInfo,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
 } from 'react-native'
 import Icon from 'react-native-vector-icons/Ionicons'
 import * as actions from '../../actions/login'
import { withNavigation, NavigationActions} from 'react-navigation'

const { height, width } = Dimensions.get('window')

// @withNavigation
@connect(
  state => ({
    login: state.get('login').get('data')
  }),
  dispatch => ({
    actions: bindActionCreators({
      ...actions
    }, dispatch)
  })
)
export default class User extends React.PureComponent {
  fnPress = (type) => {
    const { navigation } = this.props
    navigation.dispatch(NavigationActions.navigate({
      routeName: 'OrderList',
      params: { type }
    }))
  }

  manageAddress = () => {
    const { navigation } = this.props
    navigation.navigate('AddressList',{from: 'User'})
  }

  logOut = () => {
    this.props.actions.logOut()
  }
  render() {
    const name = this.props.login && this.props.login.get('name')
    console.warn('name====>', name);
    return (
      <ScrollView style={styles.wrap}>
        <View style={styles.topWrap}>
          <Image
            source={require('../../resources/images/test.jpg')}
            style={styles.topBg}
            resizeMode='stretch'
          />
          <View style={styles.topContentBg}>
            <Image
              source={require('../../resources/images/avatar.jpg')}
              style={styles.avatar}
            />
            <Text style={styles.nickname}>{name || '您还未登录'}</Text>
            <TouchableOpacity
              onPress={this.logOut}
              style={styles.touchCell}
            >
              <Text style={styles.checkAllOrder}>退出</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.block}>
          <View style={styles.cell}>
            <View style={styles.cellPart}>
              <Icon style={styles.icon} name="ios-paper-outline" size={22} color="#959595" />
              <Text style={styles.myOrder}>我的订单</Text>
            </View>
            <View style={styles.cellPart}>
              <TouchableOpacity
                onPress={this.fnPress.bind(this, 'all')}
                style={styles.touchCell}
              >
                <Text style={styles.checkAllOrder}>查看所有订单</Text>
                <Icon style={styles.icon} name="ios-arrow-forward-outline" size={22} color="#959595" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.list}>
            <TouchableOpacity
              style={styles.listCell}
              onPress={this.fnPress.bind(this, 'unPay')}
              >
              <Icon style={styles.icon} name="ios-card-outline" size={30} color="#959595" />
            <Text style={styles.listCellText}>待付款</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.listCell}
              onPress={this.fnPress.bind(this, 'unSend')}
              >
              <Icon style={styles.icon} name="ios-car-outline" size={30} color="#959595" />
              <Text style={styles.listCellText}>待发货</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.listCell}
              onPress={this.fnPress.bind(this, 'unReceive')}
              >
              <Icon style={styles.icon} name="ios-clipboard-outline" size={30} color="#959595" />
              <Text style={styles.listCellText}>已发/待收货</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.listCell}
              onPress={this.fnPress.bind(this, 'done')}
              >
              <Icon style={styles.icon} name="ios-clipboard-outline" size={30} color="#959595" />
            <Text style={styles.listCellText}>已完成</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.block, styles.blockCell]}>
          <TouchableOpacity
            style={styles.arrowBtn}
            onPress={this.manageAddress}
            >
            <View style={styles.cellPart}>
              <Icon style={styles.icon} name="ios-locate-outline" size={22} color="#959595" />
              <Text style={styles.addressInfo}>我的地址</Text>
            </View>
            <View style={styles.cellPart}>
                <Icon style={styles.icon} name="ios-arrow-forward-outline" size={22} color="#959595" />
            </View>
        </TouchableOpacity>
        </View>
        <View style={[styles.block, styles.hello]}>
          <TouchableOpacity
            style={styles.arrowBtn}
            >
          <View style={[styles.last, styles.firstLast]}>
            <View style={styles.cellPart}>
              <Icon style={styles.icon} name="ios-call-outline" size={22} color="#959595" />
              <Text style={styles.addressInfo}>客服与帮助</Text>
            </View>
            <View style={styles.cellPart}>
                <Icon style={styles.icon} name="ios-arrow-forward-outline" size={22} color="#959595" />
            </View>
          </View>
        </TouchableOpacity>
          <View style={[styles.last, styles.firstLast]}>
            <TouchableOpacity
              style={styles.arrowBtn}
              >
              <View style={styles.cellPart}>
                <Icon style={styles.icon} name="ios-share-alt" size={22} color="#959595" />
              <Text style={styles.addressInfo}>欢迎分享</Text>
              </View>
              <View style={styles.cellPart}>
                  <Icon style={styles.icon} name="ios-arrow-forward-outline" size={22} color="#959595" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.last}>
            <TouchableOpacity
              style={styles.arrowBtn}
              >
              <View style={styles.cellPart}>
                <Icon style={styles.icon} name="ios-thumbs-up-outline" size={22} color="#959595" />
                <Text style={styles.addressInfo}>欢迎评分</Text>
              </View>
              <View style={styles.cellPart}>
                  <Icon style={styles.icon} name="ios-arrow-forward-outline" size={22} color="#959595" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.block, styles.blockCell]}>
          <TouchableOpacity
            style={styles.arrowBtn}
            >
            <View style={styles.cellPart}>
              <Icon style={styles.icon} name="ios-settings-outline" size={22} color="#959595" />
              <Text style={styles.addressInfo}>设置</Text>
            </View>
            <View style={styles.cellPart}>
                <Icon style={styles.icon} name="ios-arrow-forward-outline" size={22} color="#959595" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#f0f0f0',
  },

  topWrap: {
    position: 'relative',
    height: 150,
  },

  topContentBg: {
    position: 'absolute',
    top: 50,
    left: 10,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center'
  },

  topBg: {
    width: width,
    height: 150,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },

  nickname: {
    color: '#fff',
    paddingLeft: 10
  },

  block: {
    paddingLeft: 10,
    width: width - 10,
    marginLeft: 5,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,

  },

  cell: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
    paddingBottom: 10,
    borderStyle: 'solid',
    borderBottomColor: '#eaeaea',
    // borderBottomColor: 'red',
    borderBottomWidth: 1
  },

  cellPart: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  myOrder: {
    paddingLeft: 10,
    fontSize: 16,
    color: '#232323'
  },

  touchCell: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  checkAllOrder: {
    color: '#909090',
    fontSize: 14,
    paddingRight: 10
  },

  list: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 12
  },

  listCell: {
    alignItems: 'center'
  },

  listCellText: {
    paddingTop: 10
  },

  blockCell: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingRight: 10,
    justifyContent: 'space-between'
  },

  addressInfo: {
    paddingLeft: 10
  },

  arrowBtn: {
    // backgroundColor: 'red',
    // width: 50,
    flexDirection: 'row',
    width: width - 30,
    justifyContent: 'space-between'
  },

  hello: {
    marginBottom: 10,
    marginTop: 10,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 10
  },

  last: {
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  firstLast: {
    flex: 1,
    borderStyle: 'solid',
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1
  }

})
