import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Button,
  ScrollView,
  Alert
 } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withNavigation, NavigationActions } from 'react-navigation'
import { Toast } from 'antd-mobile'
import Icon from 'react-native-vector-icons/Ionicons'
import * as addressActions from '../../actions/address'

const { height, width } = Dimensions.get('window')

// TODO BUG 输入完成 表单未销毁
// BUG 新增 -> 列表 -> 列表返回键9

@connect(
  state => ({
    addressList: state.get('address'),
    setDefault: state.get('address').get('setDefault')
  }),
  dispatch => ({
    actions: bindActionCreators({
      ...addressActions
    }, dispatch)
  })
)
@withNavigation
export default class AddressList extends React.PureComponent {
  // TODO 新增和更新
  static navigationOptions = ({ navigation }) => {
    console.warn('navigation---->', navigation);
    return ({
    headerLeft: (
      <Button
        title="返回"
        // onPress={() => navigation.dispatch(NavigationActions.navigate({routeName: 'User'}))}
        onPress={() => navigation.dispatch(NavigationActions.navigate(
          {routeName: `${navigation.state.params.from}`}
        ))}
      />
    ),
  })
}

  addNewAddress = () => {
    const { navigation } = this.props
    navigation.navigate('AddNewAddress', {name: '新增'})
  }

  modifyAddress(item) {
    const { navigation } = this.props
    // this.props.actions.getOneAddressRequested({ id })
    navigation.navigate('AddNewAddress', {name: '修改', item})
  }

  setDefaultAddress = (receiptinformationid) => {
    // this.props.actions.setDefaultAddressRequested({ receiptinformationid: id })
    // this.props.actions.setDefaultAddressRequested({ receiptinformationid: 110 })
    this.props.actions.setDefaultAddressRequested({ receiptinformationid })
  }

  delAddress = (id) => {
    Alert.alert(
      '确定删除收货信息',
      '还请客观三思~',
      [
        {text: '取消', onPress: () => console.log('cancel')},
        {text: '确定', onPress: () => this.props.actions.removeAddressRequested({ id })},
      ],
      { cancelable: true }
    )
  }


  // TODO ScrollView 不然不能滚动~！！
  // TODO 长地址省略。。。
  render() {
    const { addressList, setDefault } = this.props
    const addressListLoading = addressList.get('loading')
    const addressListData = addressList.get('data')
    const setDefaultLoading = setDefault.get('loading')
    return (
      <View style={styles.wrap}>
        { addressListData && addressListData.toJS().map((item, index) =>
        <View style={styles.cell} key={`${item.receiptinformationid}-${index}`}>
          <View style={styles.cellPart}>
            <TouchableOpacity
              // disabled={setDefaultLoading}
              // onPress={this.setDefaultAddress.bind(this, item.receiptinformationid)}
              onPress={this.setDefaultAddress.bind(this, item.receiptinformationid)}
              >
              <Icon style={styles.icon} name={item.isdefault === '1' ? "ios-checkmark-circle-outline" : "ios-radio-button-off-outline"} size={22} color="#5dbb80" />
            </TouchableOpacity>
            <View style={styles.content}>
              <View>
                <Text style={styles.text}>{item.consignee}</Text>
                <Text style={styles.text}>{item.telephone}</Text>
                <Text style={styles.text}><Text style={styles.locationType}>[{item.city}]</Text>{item.urbanarea}&nbsp; {item.detailedaddress}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={this.modifyAddress.bind(this, item)}
            >
            <View style={styles.editWrap}>
              <Text style={styles.edit}>编辑</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.delAddress.bind(this, item.receiptinformationid)}
            >
            <View style={styles.editWrap}>
              <Text style={styles.edit}>删除</Text>
            </View>
          </TouchableOpacity>
        </View>
        )}
        <View style={styles.btmBtn}>
          <TouchableOpacity
            stlye={styles.addAddressBtn}
            onPress={this.addNewAddress}
            >
              <Text style={styles.addNewAddress}>新增收货地址</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#fff',
    flex: 1
  },

  cell: {
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderStyle: 'solid',
    borderBottomColor: '#eaeaea',
    // borderBottomColor: 'red',
    borderBottomWidth: 1
  },

  cellPart: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  content: {
    paddingLeft: 10,
  },

  text: {
    paddingBottom: 2,
    paddingTop: 2,
    color: '#7e7e7e'
  },

  locationType: {
    color: '#5dbb80',
    marginRight: 20
  },

  editWrap: {
    borderStyle: 'solid',
    // borderRightColor: '#eaeaea',
    borderLeftColor: '#eee',
    // borderRightColor: 'red',
    borderLeftWidth: 1,

  },

  edit: {
    display: 'flex',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#aaa'

  },

  btmBtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 40,
    backgroundColor: '#5dbb80',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
  },

  addNewAddress: {
    color: '#fff',
    width: width,
    paddingTop: 10,
    paddingBottom: 10,
    display: 'flex',
    flex: 1,
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
  }
})
