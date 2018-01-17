import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableHighlight,
  FlatList,
  Image,
  RefreshControl,
  Dimensions
} from 'react-native'
import { withNavigation } from 'react-navigation'
import Left from './Left'
import Right from './Right'
import * as listActions from '../../actions/list'
import * as shopCarActions from '../../actions/shopcar'
import { mergeArray } from '../../utils/tools'

const { height, width } = Dimensions.get('window')

@connect(
  state => ({
    category: state.get('list').get('category')
  }),
  dispatch => ({
    actions: bindActionCreators({
      ...listActions,
      ...shopCarActions
    }, dispatch)
  })
)
export default class List extends React.PureComponent {
  componentDidMount() {
    this.props.actions.fetchCategoryRequested();
    // this.props.actions.shopCarRequested()
  }
  render() {
    return (
      <View style={styles.wrap}>
        <View style={styles.left}>
          <Left />
        </View>
        <View style={styles.right}>
          <Right />
        </View>
      </View>
    )
  }
}

// export default connect()

const styles = StyleSheet.create({
  wrap: {
    // display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },

  left: {
    width: 90,
    height: height - 200,
    // height: 200,
    paddingBottom: 70,
    backgroundColor: '#fff'
  },

  right: {
    paddingLeft: 8,
    flex: 1,
    height: height - 200,
    backgroundColor: '#fff',
    paddingBottom: 70
  }
})
