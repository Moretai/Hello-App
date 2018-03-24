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
import * as actions from '../../actions/order'
import { withNavigation, NavigationActions } from 'react-navigation'

const { height, width } = Dimensions.get('window')

@connect(
  state => ({
    address: state.get('address').get('getDefault'),
    shopcar: state.get('shopcar').get('data')
  }),
  dispatch => ({
    actions: bindActionCreators({
      ...actions,
    }, dispatch)
  })
)
export default class GoodsList extends React.PureComponent {
  static navigationOptions = ({navigation}) => ({
      title: '物品详情',
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
      show: true
    }
  }

  _toggleShow = () => {
    this.setState(preState => ({
      show: !preState.show
    }))
  }

  componentDidMount() {
    this.props.actions.getOneOrderRequested({ id: '24'})
  }

  render() {
    const { address, shopcar } = this.props
    const shopcarJs = shopcar && shopcar.toJS()
    const imgs = shopcarJs && shopcarJs.filter(x => x.checked === '1')
    // console.warn('imgs-->', imgs)
    // const sumTotal = imgs && imgs.reduce((sum, x) => {
    //   return sum += Number(x.goodsnum)
    // }, 0)

    return (
      <View style={styles.wrap}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          >
          { imgs &&
            imgs.map(item => (
              <View key={item} style={styles.cell}>
                <View style={styles.cellLeft}>
                  <Image
                    source={{ uri: item.imgpath }}
                    style={styles.img}
                  />
                <Text style={styles.cellTitle}>{item.goodsname}</Text>
                </View>
                <View style={styles.cellRight}>
                  <Text style={styles.price}>价格¥{item.unitprice}</Text>
                  <Text style={styles.number}>数量&nbsp;{item.goodsnum}</Text>
                </View>
              </View>
            ))
          }
        </ScrollView>
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

  address: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },

  rightLoca: {
    paddingLeft: 10
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
    paddingLeft: 16,
    paddingRight: 16,
  },

  cellLeft: {
    flexDirection: 'row',
  },

  img: {
    width: 60,
    height: 60
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
  }


})
