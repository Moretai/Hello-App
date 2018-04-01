import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  View,
  Text,
  Dimensions,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
 } from 'react-native'
import * as actions from '../../actions/activity'
import * as shopCarActions from '../../actions/shopcar'
import * as searchListActions from '../../actions/searchlist'
import Icon from 'react-native-vector-icons/Ionicons'
import { withNavigation, NavigationActions } from 'react-navigation'

const { height, width } = Dimensions.get('window')

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
export default class Detail extends React.PureComponent {
  static navigationOptions = ({navigation}) => ({
      title:`${navigation.state.params.title}`,
      headerLeft: (
        <Button
          title="返回"
          color="#61b981"
          onPress={() => navigation.dispatch(NavigationActions.back())}
        />
    ),
  })

  constructor(props) {
    super(props)
    this.state = {
      // srcWdith: width,
      srcHeight: width,
      setHeight: false,
      setTitle: false,
    }
  }

  componentDidMount() {
    const { navigation } = this.props
    const id = navigation.state.params.id
    this.props.actions.activityRequested({ id })
    // this.ChangeThisTitle('sga bi wanyi')
  }

  _addGoods = (id) => {
    this.props.actions.searchAddGoodsToshopCarRequested({ goodsid: id, goodsnum: 1 })
  }

  imageFetchOk = (a) => {
    console.warn('a---->', a)
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

  ChangeThisTitle = (titleText) => {
    console.warn('ChangeThisTitle....');
   const { setParams } = this.props.navigation
    setParams({ title: titleText })
  }

  componentWillReceiveProps(nextProps) {
    const activity = nextProps.activity.get('data')

    if (!this.state.setHeight && activity && activity.get('content')) {
      Image.getSize(activity.get('content'), (w, h) => {
          this.setState({
            srcHeight: (width/w) * h,
            setHeight: true
          })
      })
    }

    if (!this.state.setTitle && activity && activity.get('title')) {
      this.ChangeThisTitle(activity.get('title'))
      this.setState({
        setTitle: true
      })
    }
  }

  render() {
    const { activity } = this.props
    const data = activity.get('data')
    const src = data && data.get('content')
    const goodslist = data && data.get('goodslist')
    const goods = goodslist && goodslist.toJS()
    const resizeMode = 'center'
    // { src &&
    // Image.getSize(src, (width, height) => {
    //     console.warn('width--->', width)
    //     console.warn('height--->', height)
    // })}

    return (
      <ScrollView>
        {data &&
        <View>
          <Image
            style={styles.cover}
            source={{uri: src}}
            resizeMode='cover'
            // getSize={(item)this.getSize.bind(this, item.imgpath, this.imageFetchOk)}
            style={{ width: width, height: this.state.srcHeight }}
            // resizeMode='cover'
            // resizeMethod="resize"
          />
      </View>}
         {/* {data && goods && goods.length && goods.map((item, index) => (
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
        {data && goods && goods.length &&
        <FlatList
          data={goods}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          onEndReachedThreshold={0.1}
          bounces={false}
          showsVerticalScrollIndicator={false}
        />}
      </ScrollView>
    )
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
