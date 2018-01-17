import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
  AlertIOS,
  AsyncStorage
} from 'react-native'
import { withNavigation } from 'react-navigation'
import Immutable from 'immutable'
import Icon from 'react-native-vector-icons/Ionicons'
import * as listActions from '../../actions/list'
import * as shopCarActions from '../../actions/shopcar'
import { mergeArray } from '../../utils/tools'

const mockData = Immutable.fromJS([
  {
    "id":"8",
    "goodsname":"苹果",
    "introduce":"1",
    "unitprice":"1",
    "favorableprice":"",
    "company":"元/斤",
    "imgpath":"http://oniwvmkkh.bkt.clouddn.com/吉祥语.png",
    "stock":"1"
  },
  {
    "id":"9",
    "goodsname":"苹果",
    "introduce":"1",
    "unitprice":"1",
    "favorableprice":"",
    "company":"元/斤",
    "imgpath":"http://oniwvmkkh.bkt.clouddn.com/吉祥语.png",
    "stock":"1"
  }
])

const mockDataA = [
  {
    "id":"8",
    "goodsname":"苹果",
    "introduce":"1",
    "unitprice":"1",
    "favorableprice":"",
    "company":"元/斤",
    "imgpath":"http://oniwvmkkh.bkt.clouddn.com/吉祥语.png",
    "stock":"1"
  },
  {
    "id":"9",
    "goodsname":"苹果",
    "introduce":"1",
    "unitprice":"1",
    "favorableprice":"",
    "company":"元/斤",
    "imgpath":"http://oniwvmkkh.bkt.clouddn.com/吉祥语.png",
    "stock":"1"
  }
]
// WARNING:flatList 不支持Iummutable js
@connect(
  undefined,
  dispatch => ({
    actions: bindActionCreators({
      ...shopCarActions
    }, dispatch)
  })
)
@withNavigation
class RightItem extends React.Component {

  _addGoods = () => {
    const { item } = this.props
    this.props.actions.addGoodsToshopCarRequested({ goodsid: item.id, goodsnum: 1 })
  }

  // _minusGoods = () => {
  //   AlertIOS.alert('minus ok')
  // }

  async componentDidMount() {
    // await AsyncStorage.setItem('token', '10086')
    // const result = await AsyncStorage.getItem('token')
    // AlertIOS.alert(JSON.stringify(result))
  }

  _navToDetail = () => {
    const { navigation } = this.props
    navigation.navigate('Chat', { user: 'LIST ONE'})
  }
  render() {
    const { navigation, item } = this.props
    return (
      <View style={styles.rightItemWrap}>
        {/* <Text>{JSON.stringify(AsyncStorage.getItem('token'))}</Text> */}
        <View style={styles.rightItemLeft}>
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
            <Text style={styles.currency}>{`/${item.company}`}</Text>
          </Text>
        </View>
        <View style={styles.operatorArea}>
          {/* <Icon onPress={this._minusGoods} name="ios-remove-circle-outline" size={22} color="#4F8EF7" /> */}
          {/* <Text style={styles.addNumber}>0</Text> */}
          <Icon onPress={this._addGoods} name="ios-cart-outline" size={22} color="#4F8EF7" />
        </View>
      </View>
    )
  }
}

@connect(
  state => ({
    list: state.get('list').get('list'),
    // shopcarList: state.get('shopcar')
  }),
  dispatch => ({
    actions: bindActionCreators({
      ...listActions
    }, dispatch)
  })
)
export default class Right extends React.PureComponent {

  _keyExtractor = (item, index) => index

  _onPressItem(item) {
    console.log({ typeId: item.id })
    // this.props.fetchListRequested({ typeId: item.id })
  }

  _renderItem = ({item}) => {
    console.warn('_renderItem item is ===>', item);
    return(
    // <TouchableHighlight
    //   onPress={this._onPressItem.bind(this, item)}
    // >
    //   <Text style={styles.text}>{item.text}</Text>
    // </TouchableHighlight>
    <RightItem item={item} />
  )}

  // hasMore = () => {
  //   const { list, shopcarList } = this.props
  //   const total = list.get('data').get('count')
  //   const data = list.get('data').get('data')
  //   const length = data && data.size
  //   // console.warn('length', length)
  //   // console.warn('total', total)
  //   return length < Number(total)
  // }

  // _endReach = ({ distanceFromEnd }) => {
  //   if( distanceFromEnd > 50 || distanceFromEnd < 0) {
  //     return
  //   }
  //   const { list, shopcarList } = this.props
  //   const page = list.get('data') && list.get('data').get('page')
  //   const typeId = '111'
  //   const loadMoreLoading = list.get('loadMoreloading')
  //
  //   if (loadMoreLoading || !this.hasMore()) {
  //     return
  //   }
  //
  //   this.props.actions.loadMoreListRequested({ typeId: '111' })
  // }
  //
  // _scrollToEnd = () => {
  //   console.log('RIGHT _scrollToEnd >>>')
  // }
  //
  // _renderHeader = () => (
  //   <View>
  //     <Text style={styles.mainTitle}>新鲜果蔬</Text>
  //   </View>
  // )

  _renderFooter = () => {
    const { list } = this.props
    const loadMoreLoading = list.get('loadMoreloading')
    const loadMoreError = list.get('loadMoreError')
    const loadMoreShowError = list.get('loadMoreShowError')

    if (loadMoreLoading) {
      return <View>
        <Text>正在加载中。。</Text>
      </View>
    }
    if (loadMoreShowError && loadMoreError) {
      <View>
        <Text>加载失败。。{loadMoreError}</Text>
      </View>
    }
    return <View>
      <Text>没有更多了</Text>
    </View>
  }

  _renderPlaceholder = () => (
    <View style={styles.loading}>
      <Text>loading placeholder..</Text>
    </View>
  )
  render() {
    const { list } = this.props
    const data = list.get('data')
    const loading = list.get('loading')
    const error = list.get('error')
    const contentIm = data && data.get('data')
    const content = contentIm && contentIm.toJS()
    // const page = list.get('data').get('page')
    // console.log('page...', page)
    // const shopcarListData = shopcarList && shopcarList.get('data')
    // const shopcarLoading = shopcarList && shopcarList.get('loading')
    // const shopcarError = shopcarList && shopcarList.get('error')
    // const shopcarData = shopcarListData && shopcarListData.get('lists')
    // const shopcarDataJS =  shopcarData && shopcarData.toJS()
    // const DataJS =  data && data.get('data') && data.get('data').toJS()
    // const mergerData = DataJS && mergeArray(DataJS, shopcarDataJS)
    // console.log('mergerData..', mergerData)
    // if (error || shopcarError) {
    if (error) {
      return (
        <View>
          <Text>error...{error}</Text>
        </View>
      )
    }
    // if (loading || shopcarLoading) {
    if (loading) {
      return (
        <View>
          <Text>loading...</Text>
        </View>
      )
    }
    return (
      <View style={styles.flatWrap}>
        <FlatList
          // data={mergerData && mergerData}
          // data={data.get('data')}
          // data={mockData}
          data={content}
          // extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          // onEndReached={this._endReach}
          // onEndReachedThreshold={0.1}
          onMomentumScrollBegin={()=>{
              // AlertIOS.alert('onMomentumScrollStart...@@@@@')
          }}
          onMomentumScrollEnd={()=>{
              // AlertIOS.alert('onMomentumScrollEnd!!!@@@@@')
          }}
          // onRefresh={this._onRefresh}
          // onEndReachedThreshold={0.1}
          // refreshing={false}
          scrollToEnd={this._scrollToEnd}
          bounces={false}
          // ListHeaderComponent={this._renderHeader}
          // ListFooterComponent={this._renderFooter}
          showsVerticalScrollIndicator={false}
          // ListEmptyComponent={this._renderPlaceholder}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainTitle: {
    paddingTop: 10,
    paddingBottom: 7,
    color: '#5f5f5f',
    fontWeight: '800'
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
  },
  rightItemLeft: {

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

  flatWrap: {
    flex: 1,
    // paddingBottom: 50,
    // minHeight: 200
  },

  loading: {
    flex: 1,
    backgroundColor: 'red',
    minHeight: 600
  }
})
