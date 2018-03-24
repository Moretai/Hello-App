import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions/search'
import * as searchListActions from '../../actions/searchlist'
import * as shopCarActions from '../../actions/shopcar'
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native'
import { withNavigation, NavigationActions } from 'react-navigation'
import NoData from '../../components/NoData'
import Icon from 'react-native-vector-icons/Ionicons'
//TODO BUG 搜索加入购物车后 不能返回
@connect(
  state => ({
    search: state.get('search')
  }),
  dispatch => ({
    actions: bindActionCreators({
      ...actions,
      ...shopCarActions,
      ...searchListActions
    }, dispatch)
  })
)
export default class SearchScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: `搜索${navigation.state.params.keywords}的结果`,
    headerLeft: (
    <Button
      title="返回"
      onPress={() => navigation.dispatch(NavigationActions.back())}
    />
  )
  })

  componentDidMount() {
    const keywords = this.props.navigation.state.params.keywords
    this.props.actions.searchRequested({ element: keywords })
    console.warn('SearchScreen--componentDidMount--->>>>>', keywords);
  }

  _renderItem = ({item}) => {
    // console.warn('_renderItem item is ===>', item);
    return(
    // <TouchableHighlight
    //   onPress={this._onPressItem.bind(this, item)}
    // >
    //   <Text style={styles.text}>{item.text}</Text>
    // </TouchableHighlight>
    <RightItem item={item} />
  )}

  _addGoods = (id) => {
    this.props.actions.searchAddGoodsToshopCarRequested({ goodsid: id, goodsnum: 1 })
  }
  render() {
    const { params } = this.props.navigation.state
    const { search } = this.props
    const loading = search && search.get('loading')
    const loaded = search && search.get('loaded')
    const data = search && search.get('data')
    const dataJs = data && data.toJS()
    console.warn('dataJs----->', dataJs);
    return (
      <ScrollView>
        {dataJs && dataJs.length === 0 && <NoData />}
        {/* {dataJs && dataJs.length > 0 && dataJs.map((item, index) => (
          <View style={styles.rightItemWrap} key={item.id}>
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
              <Icon onPress={this._addGoods.bind(this, item.id)} name="ios-cart-outline" size={22} color="#4F8EF7" />
            </View>
          </View>
        ))} */}
        {dataJs && dataJs.length > 0 &&
          <FlatList
            data={dataJs}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            onEndReachedThreshold={0.1}
            bounces={false}
            showsVerticalScrollIndicator={false}
          />}
      </ScrollView>
    );
  }
}

@connect(
  state => ({
    activity: state.get('activity')
  }),
  dispatch => ({
    actions: bindActionCreators({
          ...actions,
          ...shopCarActions,
          ...searchListActions
        }, dispatch)
  })
)
class RightItem extends React.PureComponent {

  _addGoods = () => {
    const { item } = this.props
    this.props.actions.searchAddGoodsToshopCarRequested({ goodsid: item.id, goodsnum: 1 })
  }

  _navToDetail = () => {
    return
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
              style={{ width: 70, height: 70 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.rightItemRight}>
          <TouchableOpacity onPress={this._navToDetail}>
            <Text style={styles.rightItemTitle}>{item.goodsname}</Text>
            <Text style={styles.rightItemDesc}>{item.introduce}</Text>
            <Text style={styles.rightItemDesc}>库存: {item.stock || '充足'}</Text>
          </TouchableOpacity>
          {
            item.favorableprice ?
            <View style={styles.hasTwoPrice}>
              <Text style={styles.rightItemPrice}>
                <Text style={styles.currency}>¥</Text>
                <Text style={styles.number}>{item.favorableprice}</Text>
                <Text style={styles.currency}>{`/${item.company}`}</Text>
              </Text>
              <Text style={[styles.rightItemPrice, styles.priceDelete]}>
                <Text style={styles.currency}>¥</Text>
                <Text style={[styles.number, styles.priceDeleteSmall]}>{item.unitprice}</Text>
                <Text style={styles.currency}>{`/${item.company}`}</Text>
              </Text>
            </View>
            :
            <View style={styles.hasTwoPrice}>
              <Text style={[styles.rightItemPrice]}>
                <Text style={styles.currency}>¥</Text>
                <Text style={[styles.number]}>{item.unitprice}</Text>
                <Text style={styles.currency}>{`/${item.company}`}</Text>
              </Text>
            </View>
          }

        </View>
        <TouchableOpacity
          onPress={this._addGoods}
          style={styles.operatorArea}
          >
          <View>
            <Icon name="ios-cart-outline" size={30} color="#5dbb80" />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
    paddingLeft: 20
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
    paddingLeft: 20
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
  },

  hasTwoPrice: {
    display: 'flex',
    flexDirection: 'row'
  },

  priceDelete: {
    color: '#9a9a9a',
    paddingTop: 3,
    paddingBottom: 10,
    paddingLeft: 14,
    textDecorationLine: 'line-through',
  },

  number: {
    fontSize: 16,
    marginLeft: 100,
  },

  priceDeleteSmall: {
    fontSize: 12,
    paddingTop: 10,
    paddingBottom: 10
  },
})
