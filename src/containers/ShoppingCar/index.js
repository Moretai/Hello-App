import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  View,
  Text,
  Button,
  StyleSheet,
  DatePickerIOS,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  Keyboard
 } from 'react-native'
 import { SwipeAction } from 'antd-mobile'
 import { stringCut } from '../../utils/tools'
 import * as shopCarActions from '../../actions/shopcar'
 import * as addressActions from '../../actions/address'
 import * as infoActions from '../../actions/info'
 import Icon from 'react-native-vector-icons/Ionicons'
 import { withNavigation } from 'react-navigation'
 import Swipeout from 'react-native-swipeout'
 import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog'

const { height, width } = Dimensions.get('window')

@connect(
  state => ({
    shopcar: state.get('shopcar'),
    address: state.get('address').get('getDefault'),
  }),
  dispatch => ({
    actions: bindActionCreators({
      ...shopCarActions,
      ...addressActions,
      ...infoActions
    }, dispatch)
  })
)
@withNavigation
export default class ShoppingCar extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      scrollEnabled: true,
      flag: false,
      text: null,
      item: null
    }
  }

  // componentDidMount() {
  //   this.props.actions.addressDefaultRequested()
  // }

  _keyExtractor = (item, index) => index

  showDialog() {
    this.props.actions.feeIntroRequested()
    this.popupDialog.show()
  }

  _changeAddress = () => {
    const { navigation } = this.props
    navigation.navigate('AddressList', {from: 'ShoppingCar'})
  }
  // TODO 购物车为空判断
  _renderHeader = (data) => {
    const dataLength = data && data.length
    const status =data && data.filter(x => x.checked === '1')
    const statusLength = status && status.length
    return (
      <View style={styles.listHeader}>
        <TouchableOpacity
          style={styles.chooseAll}
          >
            {
              (dataLength && statusLength && dataLength === statusLength) ?
              <Icon style={styles.icon} onPress={this.toggleOneSelected.bind(this, 'all')} name="ios-checkmark-circle-outline" size={30} color="#5dbb80" />
              :
              <Icon style={styles.icon} onPress={this.toggleOneSelected.bind(this, 'all')} name="ios-radio-button-off-outline" size={30} color="#9a9a9a" />
            }
        </TouchableOpacity>
        <Text>全选</Text>
        <TouchableOpacity
          style={styles.chooseAll}
          onPress={this.deleteOne.bind(this, 'all')}
          >
            <Text>清空购物车</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // this.popupDialogGood.show()

  _onOpen = () => {
    this.setState({
      flag: false
    })
  }

  _showNumberInput = (item) => {
    this.popupDialogGood.show()
    this.setState({
      item: item
    })
  }

  _onDismissed = () => {
    console.warn('_onDismissed--->');
    Keyboard.dismiss()
  }

  _onShown = () => {
    this.input.focus()
    // this.setState({
    //
    // })
  }

  _confirmNumber = () => {
    const { text, item } = this.state
    this.props.actions.addLotsGoodsRequested({ goodsid: item.id, goodsnum: text})
    this.popupDialogGood.dismiss()
  }

  toggleOneSelected(id, selectStatus) {
    if (id === 'all') {
      return this.props.actions.toggleOneGoodSelectedRequested({ goodsid: id})
    }
    const status = selectStatus === '1' ? '2' : '1'
    this.props.actions.toggleOneGoodSelectedRequested({ goodsid: id, ischeck: status })
  }

  deleteOne(id) {
    console.warn('deleteOne----->');
    this.props.actions.deleteOneGoodOrAllRequested({ id })
  }

  _renderItem = ({item}) => {
    return (
      <SwipeAction
        right={[
          {
            text: 'Cancel',
            onPress: () => console.log('cancel'),
            style: { backgroundColor: '#ddd', color: 'white' },
          },
          {
            text: 'Delete',
            onPress: () => this.deleteOne.bind(this, item.id)(),
            // onPress: () => console.log('DELETE'),
            style: { backgroundColor: '#F4333C', color: 'white' },
          }
        ]}
        autoClose
        // onOpen={this._onOpen}
        // close={this.state.flag}
        // scroll={(scrollEnabled) => { this.setState({ scrollEnabled: false })}}
        >
        <View style={styles.rightItemWrap}>
          <View style={styles.rightItemLeft}>
            <TouchableOpacity
              style={styles.chooseDot}
              >
                {
                  item.checked === '1'?
                  <Icon style={styles.icon} onPress={this.toggleOneSelected.bind(this, item.id, item.checked)} name="ios-checkmark-circle-outline" size={30} color="#5dbb80" />
                  :
                  <Icon style={styles.icon} onPress={this.toggleOneSelected.bind(this, item.id, item.checked)} name="ios-radio-button-off-outline" size={30} color="#9a9a9a" />
                }
            </TouchableOpacity>
            <TouchableOpacity onPress={this._navToDetail}>
              <Image
                source={{ uri: item.imgpath }}
                style={{ width: 60, height: 60 }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.rightItemRight}>
            <TouchableOpacity onPress={this._navToDetail}>
              <Text style={styles.rightItemTitle}>{item.goodsname}</Text>
              <Text style={styles.rightItemDesc}>{item.introduce}</Text>
            </TouchableOpacity>
            <Text style={styles.rightItemPrice}>
              <Text style={styles.currency}>¥</Text>
              <Text style={styles.number}>{item.unitprice}</Text>
              <Text style={styles.currency}>/{item.company}</Text>
            </Text>
          </View>
          <View style={styles.operatorArea}>
            <TouchableOpacity
              onPress={this._showNumberInput.bind(this, item)}
              >
              <Text>输入数量</Text>
            </TouchableOpacity>
            <Icon onPress={this._minusGoods} name="ios-remove-circle-outline" size={22} color="#4F8EF7" />
            <Text style={styles.addNumber}>{item.goodsnum}</Text>
            <Icon onPress={this._addGoods} name="ios-add-circle" size={22} color="#4F8EF7" />
          </View>
        </View>
      </SwipeAction>
    )
  }

  _closeSwipe = () => {
    if (this.state.flag) return;
    this.setState({
      flag: true
    })
  }

  render() {
    console.log('scrollEnabled...', this.state.scrollEnabled)
    console.log('flag...', this.state.flag)
    const { shopcar, address } = this.props
    const data = shopcar.get('data')
    const error = shopcar.get('error')
    const loaded = shopcar.get('loaded')
    const loading = shopcar.get('loading')
    const showError = shopcar.get('showError')
    const fee = shopcar.get('fee').get('data')
    const feeData = fee && fee.size && fee.toJS()
    const dataJs = data && data.toJS()
    const addressData = address && address.get('data')
    const addressInfo = addressData && `${addressData.get('city')} ${addressData.get('urbanarea')} ${addressData.get('detailedaddress')}`
    console.warn('address ==>', address);
    return (
    <View style={styles.wrap}>
      <ScrollView
        onScroll={this._closeSwipe}
        scrollEventThrottle={30}
        onMomentumScrollBegin={() => console.log("start..ScrollView. onMomentumScrollBegin.")}
        // scrollEnabled={this.state.scrollEnabled}
        // scrollEnabled={false}
        style={styles.scrollView}>
        <View style={styles.address}>
          <Icon style={styles.icon} name="ios-locate-outline" size={22} color="#959595" />
        <Text style={styles.addressInfo}>{stringCut(addressInfo, 20)}</Text>
          <Button style={styles.btn} onPress={this._changeAddress} title="更换地址" />
        </View>
        <FlatList
          style={styles.list}
          data={dataJs}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          showsVerticalScrollIndicator={false}
          // scrollEnabled={this.state.scrollEnabled}
          //scrollEnabled={false}
          //onMomentumScrollStart={this._closeSwipe}
          //onMomentumScrollBegin={() => console.log("start....")}
          // onScroll={this._closeSwipe}
          //onScroll={() => console.log('scroll.........')}
          //onScrollEndDrag={() => console.log("end%%%%%%%%%%%")}
          //onScrollBeginDrag={() => console.log("start^^^^^^^^^^")}
          //scrollEnabled={this.state.scrollEnabled}
          // onEndReached={this._endReach}
          // onEndReachedThreshold={0.1}
          // onRefresh={this._onRefresh}
          // onEndReachedThreshold={0.1}
          // refreshing={false}
          // scrollToEnd={this._scrollToEnd}
          // bounces={false}
          ListHeaderComponent={this._renderHeader.bind(this, dataJs)}
          // ListFooterComponent={this._renderFooter}
          // ListEmptyComponent={this._renderPlaceholder}
        />
      <View style={styles.btmWrap}>
        <View style={styles.btmItem}>
          <Text style={styles.leftText}>商品总价</Text><Text style={styles.rightText}>¥{feeData && feeData.totalfee}</Text>
        </View>
        <View style={styles.btmItem}>
          <View style={styles.leftTextTwo}>
            <Text style={styles.leftText}>运费</Text>
            <TouchableOpacity
              onPress={this.showDialog.bind(this)}
              style={styles.transferFeeTip}

              >
                <Icon style={styles.icon} name="ios-information-circle-outline" size={18} color="#5dbb80" />
                <Text style={styles.feeExpress}>计费说明</Text>
            </TouchableOpacity>
          </View><Text style={styles.rightText}>¥{feeData && feeData.freightfee}</Text>
        </View>
        <View style={styles.btmItem}>
          <Text style={styles.leftText}>折扣</Text><Text style={styles.rightText}>{feeData && feeData.discount}</Text>
        </View>
        <View style={[styles.btmItem, styles.btmItemTwo]}>
          <Text style={styles.leftText}>合计:</Text><Text style={[styles.rightText, styles.rightTextTwo]}>¥{feeData && feeData.finalfee}</Text>
        </View>
      </View>
      </ScrollView>
      <View style={styles.btmBar}>
        <View style={styles.leftBar}>
          <View style={styles.listHeader}>
            <TouchableOpacity
              style={styles.chooseAll}
              >
                <Icon style={styles.icon} name="ios-checkmark-circle-outline" size={22} color="#5dbb80" />
              {false && <Icon style={styles.icon} name="ios-radio-button-off-outline" size={22} color="#5dbb80" />}
            </TouchableOpacity>
            <Text>全选</Text>
          </View>
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
      <View style={styles.container}>
        <PopupDialog
          ref={(popupDialog) => { this.popupDialog = popupDialog }}
          dialogTitle={<DialogTitle title="计费规则" />}
          width={0.8}
          height={0.5}
          dialogStyle={styles.dialogStyle}
          containerStyle={styles.popStyle}
          // dialogAnimation={SlideAnimation}
        >
          <View>
            <Text>Hello</Text>
          </View>
        </PopupDialog>
      </View>
      <View style={styles.container}>
        <PopupDialog
          ref={(popupDialog) => { this.popupDialogGood = popupDialog }}
          dialogTitle={<DialogTitle title="输入数量" />}
          width={0.8}
          height={0.5}
          dialogStyle={styles.dialogStyle}
          containerStyle={styles.popStyle}
          onDismissed={this._onDismissed}
          onShown={this._onShown}
          // dialogAnimation={SlideAnimation}
        >
          <View>
            <TextInput
              ref={(input) => this.input = input}
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
              keyboardType='numeric'
            />
            <TouchableOpacity
              onPress={this._confirmNumber.bind(this)}
              >
              <View>
                <Text>确认</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View>
                <Text>取消</Text>
              </View>
            </TouchableOpacity>
          </View>
        </PopupDialog>
      </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
    flexDirection: 'row',
  },

  scrollView: {
    flex: 1,
    width: width,
    zIndex: -1,
  },

  btmBar: {
    position: 'absolute',
    flex: 1,
    width: width,
    backgroundColor: '#fff',
    height: 46,
    left: 0,
    top: height - 164,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopColor: '#f3f3f3',
    borderStyle: 'solid',
    borderTopWidth: 1
  },

  address: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },

  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },

  chooseAll: {
    paddingLeft: 20,
    paddingRight: 20
  },

  addressInfo: {
    paddingLeft: 10
  },

  list: {
    marginBottom: 20,
    backgroundColor: '#fff'
  },

  btn: {
    width: 100,
    height: 40
  },

  rightItemWrap: {
    position: 'relative',
    display:'flex',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#f3f3f3',
    borderStyle: 'solid',
    backgroundColor: '#fff'
  },

  rightItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  chooseDot: {
    marginRight: 20,
    marginLeft: 20,
  },

  rightItemRight: {
    paddingLeft: 10,
  },

  rightItemTitle: {
    fontSize: 14,
    color: '#3c3c3c',
    fontWeight: '800',
    paddingBottom: 6,
  },

  rightItemDesc: {
    color: '#9a9a9a',
    fontSize: 12,
    paddingBottom: 5,
  },

  rightItemPrice: {
    color: '#fa4e4c',
    fontSize: 12,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },

  number: {
    fontSize: 22,
    marginLeft: 100,
  },

  operatorArea: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: '',
    justifyContent: 'space-around',
    alignItems: 'center',
    bottom: 10,
    right: 16,
  },

  addNumber: {
    paddingLeft: 10,
    paddingRight: 10,
  },

  btmWrap: {
    paddingBottom: 100
  },

  btmItem: {
    paddingTop: 8,
    paddingBottom: 8,
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

  transferFeeTip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12
  },

  rightText: {
    paddingRight: 10
  },

  rightTextTwo: {
    paddingLeft: 6,
    color: '#ff3687'
  },

  feeExpress: {
    fontSize: 12,
    color: '#333',
    paddingLeft: 6
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

  container: {
    position: 'absolute',
  },

  dialogStyle: {
    position: 'absolute',
    top: height * 0.1
  }
})
