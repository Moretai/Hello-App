import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  FlatList,
  ScrollView,
  RefreshControl,
  Button,
  AlertIOS,
  Image,
 } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { withNavigation, NavigationActions } from 'react-navigation'

const { height, width } = Dimensions.get('window')

export default class OrderDetail extends React.PureComponent {
  static navigationOptions = ({navigation}) => ({
      // title: `${navigation.state.params.name}收货地址`,
      title: '订单详情',
      headerLeft: (
      <Button
        title="返回"
        onPress={() => navigation.dispatch(NavigationActions.back())}
      />
    )
  })
  constructor(props) {
    super(props)
    this.state = {
      show: true
    }
  }

  _toggleShow = () => {
    this.setState(preState => ({
      show: !preState.show
    }))
  }

  render() {
    return (
      <View style={styles.wrap}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          >
          <View style={styles.address}>
            <Icon style={styles.icon} name="ios-locate-outline" size={22} color="#959595" />
            <View style={styles.rightLoca}>
              <Text>上海 &nbsp; 上海市&nbsp; 上海市&nbsp; 上海市</Text>
              <View style={styles.oneLine}>
                <Text style={styles.name}>邰相贤</Text>
                <Text>15252739492</Text>
              </View>
            </View>
          </View>
          <View style={styles.goodsList}>
            <Text style={styles.goodsTitle}>查看商品详情</Text>
            <TouchableOpacity onPress={this._toggleShow} style={styles.goodsRight}>
              <Text style={styles.goodsTotalNum}>8件</Text>
              {this.state.show ?
                <Icon style={styles.icon} name="ios-arrow-down-outline" size={22} color="#939393" />
                :
                <Icon style={styles.icon} name="ios-arrow-up-outline" size={22} color="#939393" />
              }
            </TouchableOpacity>
          </View>
          { this.state.show &&
            [1,2,3,4,5,6,7].map(item => (
              <View key={item} style={styles.cell}>
                <View style={styles.cellLeft}>
                  <Image
                    source={require('../../resources/images/avatar.jpg')}
                    style={styles.img}
                  />
                  <Text style={styles.cellTitle}>局乐宝</Text>
                </View>
                <View style={styles.cellRight}>
                  <Text style={styles.price}>价格¥5.9</Text>
                  <Text style={styles.number}>1袋&nbsp;X1</Text>
                </View>
              </View>
            ))
          }
          <View style={styles.goodsList}>
            <Text style={styles.goodsTitle}>订单号</Text>
            <TouchableOpacity onPress={this._toggleShow} style={styles.goodsRight}>
              <Text style={styles.goodsTotalNum}>DDTYUIBNMGN</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
        <View style={styles.btmBar}>
          <View style={styles.leftBar}>
            <Text style={styles.payNum}>付款</Text>
            <Text style={styles.payMoney}>¥127</Text>
          </View>
          <TouchableOpacity
            style={styles.rightBar}
            >
            <Text style={styles.goPay}>去支付</Text>
            <Icon style={styles.icon} name="ios-play" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    // overflow:'scroll',
    // height: 1500
    flex: 1,
  },

  scrollView: {
    flex: 1
  },

  address: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },

  rightLoca: {
    paddingLeft: 10
  },

  oneLine: {
    flexDirection: 'row',
    paddingTop: 10,
    alignItems: 'center'
  },

  name: {
    paddingRight: 10
  },

  goodsList: {
    marginTop: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
    borderStyle: 'solid',
  },

  goodsRight: {
    flexDirection: 'row',
    paddingRight: 10
  },

  goodsTotalNum: {
    paddingRight: 10,
    fontSize: 16,
    color: '#5dbb80'
  },

  cell: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
    borderStyle: 'solid',
  },

  cellLeft: {
    flexDirection: 'row',
  },

  img: {
    width: 60,
    height: 60
  },

  cellTitle: {
    paddingLeft: 10,
    fontSize: 16,
    color: '#404040'
  },

  cellRight: {

  },

  price: {
    color: '#5dbb80',
    paddingRight: 10
  },

  number: {
    paddingTop: 10,
    color: '#848484'
  },

  btmBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingTop: 10,
    // paddingBottom: 10
    height: 46,

  },

  leftBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  payNum: {
    color: '#222',
    fontSize: 14,
    fontWeight: '900',
    paddingLeft: 10
  },

  payMoney: {
    color: '#FF3C89',
    paddingLeft: 6,
    fontWeight: '900',
    fontSize: 16
  },

  rightBar: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff3c89',
    height: 46,
    width: 100,
  },

  goPay: {
    color: '#fff',
    paddingRight: 10,
  }


})
