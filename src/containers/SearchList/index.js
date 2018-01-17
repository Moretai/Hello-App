import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions/search'
import * as shopCarActions from '../../actions/shopcar'
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native'
import { withNavigation, NavigationActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
//TODO BUG 搜索加入购物车后 不能返回
@connect(
  state => ({
    search: state.get('search')
  }),
  dispatch => ({
    actions: bindActionCreators({
      ...actions,
      ...shopCarActions
    }, dispatch)
  })
)
export default class SearchScreen extends React.Component {
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

  _addGoods = (id) => {
    this.props.actions.addGoodsToshopCarRequested({ goodsid: id, goodsnum: 1 })
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
        {dataJs && dataJs.map((item, index) => (
          <View style={styles.rightItemWrap} key={`${item.id}-{index}`}>
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
        ))}
      </ScrollView>
    );
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
  }
})
