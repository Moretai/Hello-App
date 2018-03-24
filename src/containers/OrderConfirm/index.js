import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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
import { DatePicker, List } from 'antd-mobile'
import OneYearTimePicker from '../../components/OneYearTimePicker'
import OneDayTimePicker from '../../components/OneDayTimePicker'
import * as actions from '../../actions/order'
import { withNavigation, NavigationActions } from 'react-navigation'

import letterBgImg from '../../resources/images/letter-3x.png'

const { height, width } = Dimensions.get('window')

@connect(
  state => ({
    address: state.get('address').get('getDefault'),
    shopcar: state.get('shopcar').get('data'),
    fee: state.get('shopcar').get('fee'),
  }),
  dispatch => ({
    actions: bindActionCreators({
      ...actions,
    }, dispatch)
  })
)
export default class OrderConfirm extends React.PureComponent {
  static navigationOptions = ({navigation}) => ({
      // title: `${navigation.state.params.name}收货地址`,
      title: '填写订单',
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
      customChildValue: null
    }
  }

  // _toggleShow = () => {
  //   this.setState(preState => ({
  //     show: !preState.show
  //   }))
  // }

  componentDidMount() {
    this.props.actions.getOneOrderRequested({ id: '24'})
  }

  // listFooter = () => {
  //   return (
  //     <View>
  //       <Text>共14件</Text>
  //     </View>
  //   )
  // }
  navGoodsList = () => {
    const { navigation } = this.props
    navigation.navigate('GoodsList')
  }

  render() {
    const { address, shopcar, fee } = this.props

    const addressInfo = address && address.get('data')
    const city = addressInfo && addressInfo.get('city')
    const consignee = addressInfo && addressInfo.get('consignee')
    const detailedaddress = addressInfo && addressInfo.get('detailedaddress')
    const urbanarea = addressInfo && addressInfo.get('urbanarea')
    const telephone = addressInfo && addressInfo.get('telephone')
    const distance = addressInfo && addressInfo.get('distance')

    const shopcarJs = shopcar && shopcar.toJS()
    const imgs = shopcarJs && shopcarJs.filter(x => x.checked === '1')
    console.warn('imgs-->', imgs)
    const sumTotal = imgs && imgs.reduce((sum, x) => {
      return sum += Number(x.goodsnum)
    }, 0)

    const feeInfo = fee.get('data')
    const feeData = feeInfo && feeInfo.size && feeInfo.toJS()

    return (
      <View style={styles.wrap}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          >
          <View style={styles.address}>
            <Icon style={styles.icon} name="ios-locate-outline" size={22} color="#5dbb80" />
            <View style={styles.rightLoca}>
              <Text style={styles.fontSizeSmal}>{city}&nbsp;{urbanarea}&nbsp;{detailedaddress}</Text>
              <View style={styles.oneLine}>
                <Text style={[styles.name, styles.fontSizeSmal]}>{consignee}</Text>
                <Text style={[styles.name, styles.fontSizeSmal]}>{telephone}</Text>
                <Text style={styles.fontSizeSmal}>距离送货中心:&nbsp;{distance}公里</Text>
              </View>
              <Image
                source={require('../../resources/images/letter-3x.png')}
                style={{width: width - 40, height: 2, marginTop: 10}}
              />
            </View>
          </View>
          <OneYearTimePicker />
          <OneDayTimePicker />
          <View
            style={styles.oneLineWrap}
            >
            <View
              style={styles.listWrap}
              >
              <FlatList
                data={imgs}
                style={styles.list}
                keyExtractor={this._keyExtractor}
                onPress={() => AlertIOS.alert('clicked')}
                renderItem={({item}) => <Image
                  style={styles.img}
                  source={{ uri: item.imgpath }}
                  style={styles.imgWrap}
                 />}
                horizontal={true}
                // ListFooterComponent={this.listFooter}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <TouchableOpacity
              style={styles.rightPart}
              onPress={this.navGoodsList}
              >
              <Text>共计{sumTotal}件</Text>
              <Icon style={styles.icon} name="ios-arrow-forward-outline" size={22} color="#959595" />
            </TouchableOpacity>
          </View>
          {/* <View style={styles.goodsList}>
            <Text style={styles.goodsTitle}>查看商品详情</Text>
            <TouchableOpacity onPress={this._toggleShow} style={styles.goodsRight}>
              <Text style={styles.goodsTotalNum}>8件</Text>
              {this.state.show ?
                <Icon style={styles.icon} name="ios-arrow-down-outline" size={22} color="#939393" />
                :
                <Icon style={styles.icon} name="ios-arrow-up-outline" size={22} color="#939393" />
              }
            </TouchableOpacity>
          </View> */}
          {/* <View style={styles.goodsList}>
            <Text style={styles.goodsTitle}>订单号</Text>
            <TouchableOpacity onPress={this._toggleShow} style={styles.goodsRight}>
              <Text style={styles.goodsTotalNum}>DDTYUIBNMGN</Text>
            </TouchableOpacity>
          </View> */}
        <View style={styles.btmWrap}>
          <View style={styles.btmItem}>
            <Text style={styles.leftText}>商品总价</Text><Text style={styles.rightText}>¥{feeData && feeData.totalfee}</Text>
          </View>
          <View style={styles.btmItem}>
            <View style={styles.leftTextTwo}>
              <Text style={styles.leftText}>运费</Text>
              {/* <TouchableOpacity
                onPress={this.showDialog.bind(this)}
                style={styles.transferFeeTip}

                >
                  <Icon style={styles.icon} name="ios-information-circle-outline" size={18} color="#5dbb80" />
                  <Text style={styles.feeExpress}>计费说明</Text>
              </TouchableOpacity> */}
            </View><Text style={styles.rightText}>¥{feeData && feeData.freightfee}</Text>
          </View>
          <View style={styles.btmItem}>
            <Text style={styles.leftText}>运费起步价折扣</Text><Text style={styles.rightText}>{feeData && feeData.discount}</Text>
          </View>
          <View style={[styles.btmItem, styles.btmItemTwo]}>
            <Text style={styles.leftText}>合计:</Text><Text style={[styles.rightText, styles.rightTextTwo]}>¥{feeData && feeData.finalfee}</Text>
          </View>
        </View>

        </ScrollView>
        <View style={styles.btmBar}>
          <View style={styles.leftBar}>
            <Text style={styles.payNum}>付款</Text>
            <Text style={styles.payMoney}>¥{feeData && feeData.finalfee}</Text>
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

  oneLineWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    // paddingTop: 16,
    backgroundColor: '#fff'
  },

  listWrap: {
    width: width - 90,
    paddingBottom: 16,
    paddingLeft: 10,
    paddingTop: 16,
    overflow: 'hidden',
  },

  rightPart: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  address: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    marginBottom: 10
  },

  rightLoca: {
    paddingLeft: 10,
    // fontSize:10
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
    width: 40,
    height: 40
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
    backgroundColor: '#fff',
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
  },

  block: {
    paddingLeft: 10,
    width: width,
    // marginLeft: 5,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,

  },

  blockCell: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingRight: 10,
    justifyContent: 'space-between'
  },

  arrowBtn: {
    // backgroundColor: 'red',
    // width: 50,
    flexDirection: 'row',
    width: width - 30,
    justifyContent: 'space-between'
  },

  cellPart: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  addressInfo: {
    paddingLeft: 10
  },

  fontSizeSmal: {
    fontSize: 12
  },

  imgWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10
  },
  btmWrap: {
    paddingBottom: 100,
  },

  btmItem: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 8,
    borderTopWidth: 1,
    borderTopColor: '#f3f3f3',
    borderStyle: 'solid',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  btmItemTwo: {
    justifyContent: 'flex-end',
  },

  leftText: {
    color: '#3c3c3c',
    paddingLeft: 10
  },

  leftTextTwo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
})
