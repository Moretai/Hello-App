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
import * as payActions from '../../actions/pay'
import * as orderActions from '../../actions/order'
import { withNavigation, NavigationActions } from 'react-navigation'
import { timeStampToStringDetail } from '../../utils/tools'
import Loading from '../../components/Loading'

import letterBgImg from '../../resources/images/letter-3x.png'

const { height, width } = Dimensions.get('window')

@connect(
  state => ({
    order: state.get('order').get('detail'),
  }),
  dispatch => ({
    actions: bindActionCreators({
      ...payActions,
      ...orderActions
    }, dispatch)
  })
)
export default class OrderDetail extends React.PureComponent {
  static navigationOptions = ({navigation}) => ({
      title: '订单详情',
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
    this.goPay = this.goPay.bind(this)
  }

  goPay() {
    const { navigation } = this.props
    const id = navigation.state.params.id

    this.props.actions.payRequested({ orderNumber: id })
  }

  // _toggleShow = () => {
  //   this.setState(preState => ({
  //     show: !preState.show
  //   }))
  // }

  componentDidMount() {
    const { navigation } = this.props
    const id = navigation.state.params.id
    this.props.actions.getOneOrderRequested({ id })
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
    navigation.navigate('AnthorGoodsList')
  }




  render() {
    const { order } = this.props

    const orderLoading = order.get('loading')
    const orderData = order.get('data')
    const data = orderData && orderData.toJS()
    const time = data && data.deliverytime.split('|')
    const begin = time && timeStampToStringDetail(time[0])
    if(!data) {
      return <Loading />
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
              <Text style={styles.fontSizeSmal}>{data.city}&nbsp;{data.urbanarea}&nbsp;{data.detailedaddress}</Text>
              <View style={styles.oneLine}>
                <Text style={[styles.name, styles.fontSizeSmal]}>{data.consignee}</Text>
                <Text style={[styles.name, styles.fontSizeSmal]}>{data.telephone}</Text>
                <Text style={styles.fontSizeSmal}>距离送货中心:&nbsp;{data.distance}公里</Text>
              </View>
              <Image
                source={require('../../resources/images/letter-3x.png')}
                style={{width: width - 40, height: 2, marginTop: 10}}
              />
            </View>
          </View>
          <View style={styles.disabledArea}>
              <Text>收货时间: {begin}</Text>
          </View>
          <View
            style={styles.oneLineWrap}
            >
            <View
              style={styles.listWrap}
              >
              <FlatList
                data={data.goodslist}
                style={styles.list}
                keyExtractor={this._keyExtractor}
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
              <Text>查看详情</Text>
              <Icon style={styles.icon} name="ios-arrow-forward-outline" size={22} color="#959595" />
            </TouchableOpacity>
          </View>
        <View style={styles.btmWrap}>
          <View style={styles.btmItem}>
            <Text style={styles.leftText}>商品总价</Text><Text style={styles.rightText}>¥{data.totalprice}</Text>
          </View>
          <View style={styles.btmItem}>
            <View style={styles.leftTextTwo}>
              <Text style={styles.leftText}>运费</Text>
            </View>
              <Text style={styles.rightText}>¥{data.freightprice}</Text>
          </View>
          <View style={styles.btmItem}>
            <Text style={styles.leftText}>运费起步价折扣</Text><Text style={styles.rightText}>{data.orderdiscount}</Text>
          </View>
          <View style={[styles.btmItem, styles.btmItemTwo]}>
            <Text style={styles.leftText}>合计:</Text><Text style={[styles.rightText, styles.rightTextTwo]}>¥{data.discountprice}</Text>
          </View>
        </View>
        {data.orderstatus === '1' &&
        <View>
          <Text style={styles.payway}>支付方式</Text>
        </View>}
        {data.orderstatus === '1' &&
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
        </View>}
        </ScrollView>
        {data.orderstatus === '1' &&
        <View style={styles.btmBar}>
          <View style={styles.leftBar}>
            <Text style={styles.payNum}>付款</Text>
            <Text style={styles.payMoney}>¥{data.discountprice}</Text>
          </View>
          <TouchableOpacity
            style={[styles.rightBar]}
            onPress={this.goPay}
            >
            <Text style={styles.goPay}>去支付</Text>
            <Icon style={styles.icon} name="ios-play" size={22} color="#fff" />
          </TouchableOpacity>
        </View>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  payway: {
    paddingTop: 6,
    paddingBottom: 6,
    fontSize: 12
  },
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
