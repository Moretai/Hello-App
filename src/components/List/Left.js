import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  View,
  Text,
  StyleSheet,
  Button,
  // TouchableHighlight,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl
} from 'react-native'
import * as listActions from '../../actions/list'

@connect(
  state => ({
    category: state.get('list').get('category')
  }),
  dispatch => ({
    actions: bindActionCreators({
      ...listActions
    }, dispatch)
  })
)
export default class Left extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      index: 0
    }
  }

  _keyExtractor = (item, index) => index

  _onPressItem(item, index) {
    this.setState({
      index
    })
    this.props.actions.fetchListRequested({ typeId: item.id, page: 1, limit:10 })
  }

  _renderItem = ({ item, index }) => {
    const activeIndex = this.state.index
    // console.warn('item====>', item);
    return(
    <TouchableOpacity
      onPress={this._onPressItem.bind(this, item, index)}
      style={[
        styles.wrap,
        activeIndex === index && styles.activeWrap
      ]}
    >
      <Text style={[
        styles.text,
        activeIndex === index && styles.Activetext,
      ]}>{item.classificationname}</Text>
    </TouchableOpacity>
  )}

  _endReach = () => {
    console.log('LEFT AT BOTTOM >>>')
  }

  render() {
    const { category } = this.props
    const data = category.get('data')
    const loading = category.get('loading')
    const error = category.get('error')
    const realData = data && data.toJS()
    console.log('left......')
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
    return (
      <FlatList
        data={realData}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        onEndReached={this._endReach}
        showsVerticalScrollIndicator={false}
        horizontal={false}
      />
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#f7f7f7',
    // borderRightWidth: 2,
    borderBottomWidth: 1,
    borderRightColor: '#f9f9f9',
    borderBottomColor: '#f9f9f9',
    borderStyle: 'solid',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
  },

  activeWrap: {
    borderLeftColor: '#5dbb80',
    borderStyle: 'solid',
    borderLeftWidth: 3,
    backgroundColor: '#fff'
  },

  text: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    color: '#333',
    paddingLeft: 10,
    // borderLeftColor: '#5dbb80',
  },

  Activetext: {
    color: '#5dbb80'
  },

  rightItemWrap: {
    display:'flex',
    flexDirection: 'row',
    // height: 80,
    paddingTop: 5,
    paddingBottom: 5,
    borderTopWidth: 1,
    borderTopColor: '#000',
    borderStyle: 'solid',
  },
  rightItemLeft: {

  },
  rightItemRight: {
    paddingLeft: 10,
  },
  rightItemTitle: {
    fontSize: 18
  },
  addArea: {

  },
  flatWrap: {
    flex: 1,
    paddingBottom: 50
  }
})
