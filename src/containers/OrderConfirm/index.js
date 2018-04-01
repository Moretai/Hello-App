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
  Alert,
  Image,
 } from 'react-native'
import Alipay from 'react-native-alipay-zmt'
import Icon from 'react-native-vector-icons/Ionicons'
import { DatePicker, List } from 'antd-mobile'
import OneYearTimePicker from '../../components/OneYearTimePicker'
import OneDayTimePicker from '../../components/OneDayTimePicker'
import * as actions from '../../actions/order'
import * as payActions from '../../actions/pay'
import { withNavigation, NavigationActions } from 'react-navigation'
import { data as DayData } from '../../components/OneDayTimePicker'
import { timeStampToString } from '../../utils/tools'

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
      ...payActions
    }, dispatch)
  })
)
export default class OrderConfirm extends React.PureComponent {
  static navigationOptions = ({navigation}) => ({
      title: '填写订单',
      headerLeft: (
      <Button
        title="返回"
        color="#61b981"
        onPress={() => navigation.dispatch(NavigationActions.back())}
      />
    )
  })

  constructor(props) {
    super(props)
    this.state = {
      customChildValue: null,
      year: new Date(),
      day: ['a', '01'],
      chooseAlipay: false
    }

    this.goPay = this.goPay.bind(this)
  }

  goPay() {
    const { year, day } = this.state
    const label = DayData.find(x => x.value === day[0]).children.find(x => x.value === day[1]).label.split('-')
    const begin = label[0]
    const end = label[1]
    // '12.30-13.00' 前面 12.30
    const beginTimeStamp = Number(new Date(timeStampToString(year.getTime())).getTime()) + 1000 * 60 * 60 * Number(begin)
    const endTimeStamp = Number(new Date(timeStampToString(year.getTime())).getTime()) + 1000 * 60 * 60 * Number(end)

    this.props.actions.payRequested({ payWay: '1', deliverTimeForm: beginTimeStamp, deliverTimeTo: endTimeStamp })
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

  dayChange = (val) => {
  }

  dayOpacyChange = (val) => {
  }

  dayOk = (val) => {
    const { year, day } = this.state
    this.setState({
      day: val
    })
  }

  yearOk = (val) => {
    const { year, day } = this.state
    this.setState({
      year: val
    })
  }

  chooseAlipay() {
    this.setState(preState => ({
      chooseAlipay: !preState.chooseAlipay
    }))
  }

  render() {
    const { address, shopcar, fee } = this.props
    const { year, day, chooseAlipay } = this.state

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


    const label = DayData.find(x => x.value === day[0]).children.find(x => x.value === day[1]).label.split('-')[0]
    // '12.30-13.00' 前面 12.30
    const chooseTimeStamp = Number(new Date(timeStampToString(year.getTime())).getTime()) + 1000 * 60 * 60 * Number(label)

    let disabled = false
    if (chooseTimeStamp < Number(new Date().getTime())) {
      disabled = true
    }

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
          <OneYearTimePicker date={year} valueChange={this.dayOpacyChange} onOk={this.yearOk} />
          <OneDayTimePicker date={day} valueChange={this.dayChange} onOk={this.dayOk} />
          { disabled &&
          <View style={styles.disabledArea}>
              <Text style={styles.disabledTime}>收货时间不能小于当前时间</Text>
          </View>}
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
        <View style={styles.btmWrap}>
          <View style={styles.btmItem}>
            <Text style={styles.leftText}>商品总价</Text><Text style={styles.rightText}>¥{feeData && feeData.totalfee}</Text>
          </View>
          <View style={styles.btmItem}>
            <View style={styles.leftTextTwo}>
              <Text style={styles.leftText}>运费</Text>
            </View><Text style={styles.rightText}>¥{feeData && feeData.freightfee}</Text>
          </View>
          <View style={styles.btmItem}>
            <Text style={styles.leftText}>运费起步价折扣</Text><Text style={styles.rightText}>{feeData && feeData.discount}</Text>
          </View>
          <View style={[styles.btmItem, styles.btmItemTwo]}>
            <Text style={styles.leftText}>合计:</Text><Text style={[styles.rightText, styles.rightTextTwo]}>¥{feeData && feeData.finalfee}</Text>
          </View>
        </View>
        <View style={styles.payArea}>
          <View style={styles.payLeft}>
            <Image
              source={require('../../resources/images/alipay.png')}
              style={styles.pay}
            />
            <View style={styles.payWord}>
              <Text style={styles.payTitle}>支付宝</Text>
              <Text style={styles.subTitle}>数亿用户都在用，安全可托付</Text>
            </View>
          </View>
          <TouchableOpacity
             onPress={this.chooseAlipay.bind(this)}
            >
            <View
              style={styles.clickArea}
              >
              {
                chooseAlipay ?
                <Icon style={styles.icon} name="ios-checkmark-circle" size={30} color="#f0613a"  backgroundColor="#3b5998"/>
                :
                <Icon style={styles.icon} name="ios-radio-button-off-outline" size={30} color="#9a9a9a" backgroundColor="#3b5998"/>
              }
            </View>
          </TouchableOpacity>
        </View>

        </ScrollView>
        <View style={styles.btmBar}>
          <View style={styles.leftBar}>
            <Text style={styles.payNum}>付款</Text>
            <Text style={styles.payMoney}>¥{feeData && feeData.finalfee}</Text>
          </View>
          <TouchableOpacity
            style={[styles.rightBar, (disabled || !chooseAlipay) && styles.disabledBtn]}
            onPress={this.goPay}
            disabled={disabled || !chooseAlipay}
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
  clickArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 46,
    // backgroundColor: 'red',
  },
  payLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  payTitle: {
    fontSize: 14,
  },
  subTitle: {
    fontSize: 12,
    color: '#8a8a8a',
    paddingTop: 2,
    paddingBottom: 2
  },
  payWord: {
    paddingLeft: 10,
  },
  pay: {
    width: 36,
    height: 36,
  },
  payArea: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 30,
    paddingLeft: 20,
    // paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  disabledBtn: {
    backgroundColor: '#e2e2e2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
    width: 100,
  },
  disabledArea: {
    backgroundColor: '#fff',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
    borderStyle: 'solid',
  },
  disabledTime: {
    color: '#f5222d',
    fontSize: 12
  },
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
    paddingBottom: 10,
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
