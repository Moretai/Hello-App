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
  Image,
  AlertIOS,
  Button,
  ScrollView
 } from 'react-native'
import { withNavigation, NavigationActions } from 'react-navigation'
import * as actions from '../../actions/order'
import Icon from 'react-native-vector-icons/Ionicons'

const { height, width } = Dimensions.get('window')

const mapTypeOrder = (type) => {
  switch (type) {
    case 'all':
      return '全部'
    case 'unPay':
      return '待付款'
    case 'unSend':
      return '待发货'
    case 'unReceive':
      return '已发/待收货'
    case 'done':
      return '已完成'
    default:
      return '全部'
  }
}

class ItemCell extends React.PureComponent {
  render() {
    return (
      <View style={styles.cell}>
        <View style={styles.time}>
          <Text style={styles.timeText}>2017-12-07 15:44:44</Text>
        </View>
        <FlatList
          data={[{key: 'a'}, {key: 'b'},{key: 'c'},{key: 'd'},{key: 'e'},{key: 'f'},{key: 'g'},{key: 'h'}]}
          style={styles.list}
          keyExtractor={this._keyExtractor}
          onPress={() => AlertIOS.alert('clicked')}
          renderItem={({item}) => <Image
            style={styles.img}
            source={require('../../resources/images/avatar.jpg')}
            style={{width: 60, height: 60, borderRadius: 30}}
           />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      <View style={styles.row}>
        <View style={styles.timeLine}>
          <View style={styles.statusCell}>
            <Icon style={styles.icon} name="ios-list-box-outline" size={22} color="#5dbb80" />
            <Text style={styles.statusText}>已提交</Text>
          </View>
          <View>
            <Icon style={styles.icon} name="ios-more-outline" size={22} color="#5dbb80" />
          </View>
          <View style={styles.statusCell}>
            <Icon style={styles.icon} name="ios-list-box-outline" size={22} color="#5dbb80" />
            <Text style={styles.statusText}>未支付</Text>
          </View>
          <View>
            <Icon style={styles.icon} name="ios-more-outline" size={22} color="#5dbb80" />
          </View>
          <View style={styles.statusCell}>
            <Icon style={styles.icon} name="ios-list-box-outline" size={22} color="#5dbb80" />
            <Text style={styles.statusText}>配送中</Text>
          </View>
          <View>
            <Icon style={styles.icon} name="ios-more-outline" size={22} color="#5dbb80" />
          </View>
          <View style={styles.statusCell}>
            <Icon style={styles.icon} name="ios-list-box-outline" size={22} color="#5dbb80" />
            <Text style={styles.statusText}>已签收</Text>
          </View>
        </View>
        <View style={styles.total}>
          <Text style={styles.totalMoney}>¥188</Text>
        </View>
      </View>
      <View style={styles.detail}>
        <TouchableOpacity
          onPress={this._viewDetail}
          >
          <Text style={styles.checkDetail}>查看详情</Text>
        </TouchableOpacity>
      </View>
    </View>
    )
  }
}

/**
 * 1 未付款
 * 2 已付款待发货
 * 3 已发货
 * 4 已完成
 * 5 已退款
 * 6 已取消
 **/

@connect(
  state => ({
    list: state.get('order').get('list')
  }),
  dispatch => ({
    actions: bindActionCreators({
      ...actions,
    }, dispatch)
  })
)
@withNavigation
export default class OrderList extends React.PureComponent {
  static navigationOptions = ({navigation}) => ({
      title: `${mapTypeOrder(navigation.state.params.type)}订单`,
      headerLeft: (
      <Button
        title="返回"
        onPress={() => navigation.dispatch(NavigationActions.back())}
      />
    )
    })

  _viewDetail = (id) => {
    const { navigation } = this.props
    navigation.navigate('OrderDetail',{ id })
  }

  _keyExtractor = (item, index) => item.id

  componentDidMount() {
    this.props.actions.fetchListOrdersRequested({ type: '1', page: 1, limit: 10 })
  }

  componentWillUnmount() {
    console.warn('componentWillUnmount----->');
  }

  render() {
    const { list } = this.props
    return (
      <ScrollView style={styles.wrap}>
        <ItemCell />
        <ItemCell />
        <ItemCell />
        <ItemCell />
        <ItemCell />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  cell: {
    backgroundColor: '#fff',
    marginBottom: 20,
  },

  time: {
    width: width - 10,
    marginLeft: 5,
    borderStyle: 'solid',
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1

  },

  timeText: {
    display: 'flex',
    paddingTop: 10,
    paddingBottom: 10,
  },

  list: {
    width: width - 10,
    marginLeft: 5,
    paddingTop: 15,
    paddingBottom: 15,
    borderStyle: 'solid',
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1
  },

  // img: {
  //   marginRight: 100,
  //   paddingRight: 100,
  // },

  detail: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },

  checkDetail: {
    color: '#fff',
    backgroundColor: '#5dbb80',
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 10
  },

  row: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  timeLine: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  statusCell: {
    alignItems: 'center'
  },

  statusText: {
    color: '#5dbb80',
    fontSize: 12
  },

  totalMoney: {
    fontSize: 16,
    color: 'red',
    paddingRight: 20
  }
})
