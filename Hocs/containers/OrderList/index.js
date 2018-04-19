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
  ScrollView,
  ActivityIndicator
 } from 'react-native'
import { withNavigation, NavigationActions } from 'react-navigation'
import * as actions from '../../actions/order'
import NoLogin from '../../components/NoLogin'
import NoData from '../../components/NoData'
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

@withNavigation
class ItemCell extends React.PureComponent {
  _keyExtractor = (item, index) => (item + `?id=${Math.random()}`)

  _viewDetail = (id) => {
    const { navigation } = this.props
    navigation.navigate('OrderDetail',{ id })
  }

  render() {
    const { createtime, ordernum, imgpathlist, finalfee, orderId} = this.props.item
    const imgsOrigin = imgpathlist && imgpathlist.split(',')
    const imgs = imgsOrigin && imgsOrigin.map(x => (x + `?id=${Math.random()}`))
    return (
      <View style={styles.cell}>
        <View style={styles.time}>
          <Text style={styles.timeText}>{createtime && createtime.split('.')[0]}</Text>
        </View>
        {imgs &&
        <FlatList
          data={imgs}
          style={styles.list}
          keyExtractor={this._keyExtractor}
          renderItem={({item, index}) => <Image
            key={Math.random()}
            style={styles.img}
            source={{ uri: item}}
            style={{width: 60, height: 60, borderRadius: 30}}
           />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />}
      {/* <View style={styles.row}>
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

      </View> */}
      <View style={styles.detail}>
        <View style={styles.total}>
          <Text style={styles.totalMoney}>¥{finalfee || '---'}</Text>
        </View>
        <TouchableOpacity
          onPress={this._viewDetail.bind(this, orderId)}
          >
          <Text style={styles.checkDetail}>查看详情</Text>
        </TouchableOpacity>
      </View>
    </View>
    )
  }
}

/**
1 未付款
2 已付款待确认
3 已确认待发货
4 已发货
5 已完成
6 已退款
// 7 已取消
all 全部
 **/

 const mapTypeToRequest = (type) => {
   switch (type) {
     case 'all':
       return 'all'
     case 'unPay':
       return '1'
     case 'unSend':
       return '2'
     case 'unReceive':
       return '3-4'
     case 'done':
       return '5'
     default:
       return '全部'
   }
 }

@connect(
  state => ({
    list: state.get('order').get('list'),
    logined: state.get('login').get('logined'),
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
        color="#61b981"
        onPress={() => navigation.dispatch(NavigationActions.back())}
      />
    )
    })



  _keyExtractor = (item, index) => (item.ordernum + Math.random())

  componentDidMount() {
    const { navigation, logined } = this.props
    if(!logined) return
    const { type } = navigation.state.params
    if (!type) {return navigation.navigate('User')}
    this.props.actions.fetchListOrdersRequested({ type: mapTypeToRequest(type), page: 1, limit: 3 })
  }

  _renderItem = ({item}) => {
    return(
    <ItemCell item={item} />
  )}

  hasMore = () => {
    const { list, navigation } = this.props
    const total = list.get('data').get('count')
    const data = list.get('data').get('data')
    const length = data && data.size
    return length < Number(total)
  }

  _endReach = ({ distanceFromEnd }) => {
    console.warn('distanceFromEnd-->', distanceFromEnd)
    if (distanceFromEnd < -10) return
    const { list, navigation } = this.props
    const { type } = navigation.state.params
    const pageNum = list.get('page')
    const loadMoreLoading = list.get('loadMoreloading')

    if (loadMoreLoading || !this.hasMore()) {
      return
    }

    this.props.actions.loadMoreOrderListRequested({ type: mapTypeToRequest(type), page: pageNum + 1, limit: 3 })
  }

  // _renderHeader = () => (
  //   <View>
  //     <Text style={styles.mainTitle}>食客皆宜</Text>
  //   </View>
  // )

  _renderFooter = () => {
    const { list } = this.props
    const loadMoreLoading = list.get('loadMoreloading')
    const loadMoreLoaded = list.get('loadMoreloaded')
    const loadMoreError = list.get('loadMoreError')
    const loadMoreShowError = list.get('loadMoreShowError')

    if (loadMoreLoading) {
      return <View style={styles.loadingTip}>
        <ActivityIndicator /><Text style={styles.tipText}>正在加载中。。</Text>
      </View>
    }
    if (loadMoreShowError && loadMoreError) {
      return <View style={styles.loadingTip}>
        <Text>加载失败。。{loadMoreError}</Text>
      </View>
    }

    if (this.hasMore() && loadMoreLoaded) {
      return <View style={styles.loadingTip}>
        <Text>下拉加载更多数据~</Text>
    </View>
    }

    if (!this.hasMore()) {
      return <View style={styles.loadingTip}>
        <Text>已无更多数据~</Text>
    </View>
    }

    return <View style={styles.loadingTip}>
      <Text>已无更多数据~</Text>
  </View>

  }

  _scrollToEnd = () => {
    console.warn('_scrollToEnd...')
  }

  render() {
    const { list, logined} = this.props
    if(!logined) {
      return(
        <NoLogin />
      )
    }
    console.warn('list....',list)
    const data = list.get('data')
    const loading = list.get('loading')
    const error = list.get('error')
    const contentIm = data && data.get('data')
    const content = contentIm && contentIm.toJS()
    console.warn('content---', content)
    if (error) {
      return (
        <View>
          <Text>error...{error}</Text>
        </View>
      )
    }
    if (loading) {
      return (
        <View>
          <Text>loading...</Text>
        </View>
      )
    }
    if(content && content.length === 0 ) return <NoData />
    return (
      <View style={styles.wrap}>
        {content && content.length > 0 &&
          <FlatList
            data={content}
            style={styles.list}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            onEndReached={this._endReach}
            onEndReachedThreshold={0.1}
            scrollToEnd={this._scrollToEnd}
            bounces={false}
            // ListHeaderComponent={this._renderHeader}
            ListFooterComponent={this._renderFooter}
            showsVerticalScrollIndicator={false}
          />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loadingTip: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  warp: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
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
