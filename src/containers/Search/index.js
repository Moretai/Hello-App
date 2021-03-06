import React from 'react'
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  AlertIOS,
  AsyncStorage
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withNavigation, NavigationActions } from 'react-navigation'
import * as actions from '../../actions/search'
import Icon from 'react-native-vector-icons/Ionicons'

@connect(
  state => ({
    hotSearch: state.get('search').get('hotSearch')
  }),
  dispatch => ({
    actions: bindActionCreators({
      ...actions
    }, dispatch)
  })
)
@withNavigation
export default class Search extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  componentDidMount() {
    this.props.actions.getHotsearchRequested()
    // var data = await AsyncStorage.getItem('history')
    // data = JSON.parse(data)
    // console.warn('data 333333', data);
    // if (data.length) {
    //   this.setState({
    //     history: data
    //   })
    // }
  }

  _textChange = (text) => {
    this.setState({
      text
    })
  }

  _saveHistory = () => {

  }

  _fetchQuery = async() => {
    const { navigation } = this.props
    const { text } = this.state
    if(text === '') return
    navigation.dispatch(NavigationActions.navigate({
      routeName: 'SearchList',
      params: {keywords: this.state.text}
    }))
    // var data = await AsyncStorage.getItem('history')
    // data = JSON.parse(data)
    // console.warn('data 11111--->', data);
    // if (data == null) data = []
    // data = data.filter(x => x !== '').concat(this.state.text)
    // console.warn('data 22222--->', data);
    // if(data.length) {
    //   await AsyncStorage.setItem('history', JSON.stringify(data))
    // }
  }

  // _deleteHistory = async() => {
  //   await AsyncStorage.setItem('history', '')
  //   this.setState({
  //     history: []
  //   })
  // }

  _search = (text) => {
    const { navigation } = this.props
    navigation.dispatch(NavigationActions.navigate({
      routeName: 'SearchList',
      params: {keywords: text}
    }))
  }
  render() {
    const { hotSearch } = this.props
    const data = hotSearch.get('data')
    return (
      <View style={styles.wrap}>
        <View style={styles.searchWrap}>
          <TextInput
            style={styles.textInput}
            onChangeText={this._textChange}
            value={this.state.text}
            placeholder='输入您想查找的菜品。。。'
            underlineColorAndroid="transparent"
            clearButtonMode='while-editing'
            returnKeyType='search'
            onSubmitEditing={this._fetchQuery}
          />
        <Icon style={styles.icon} name="ios-search" size={22} color="#959595" />
        </View>
        {/* <View>
          <View style={styles.title}>
            <Text style={styles.mainTitle}>历史搜索</Text>
          <Icon onPress={this._deleteHistory} name="ios-trash-outline" size={22} color="#929292" />
          </View>
          <View style={styles.listWrap}>
            {!!history && !!history.length && history.reverse().map((item, index) => (
              <TouchableOpacity
                onPress={this._search.bind(this, item)}
                style={styles.cellWrap}
                key={index}
                >
                <Text style={styles.cell}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View> */}
        <View>
          <View style={styles.title}>
            <Text style={styles.mainTitle}>热门搜索</Text>
          </View>
          <View style={styles.listWrap}>
            {data && data.toJS().map((item, index) => (
              <TouchableOpacity
                onPress={this._search.bind(this, item.searchname)}
                style={styles.cellWrap}
                key={index}
                >
                <Text style={styles.cell}>{item.searchname}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff'
  },

  searchWrap: {
    position: 'relative',
  },

  textInput: {
    backgroundColor: '#f5f5f5',
    height: 40,
    paddingLeft: 26,
  },

  icon: {
    position: 'absolute',
    left: 6,
    backgroundColor: 'transparent',
    top: 9
  },

  title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 10
  },

  mainTitle: {
    color: '#393939',
    fontSize: 16
  },

  listWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  cellWrap: {
    marginRight: 20,
    marginBottom: 20,
  },

  cell: {
    // display: 'none',
    backgroundColor: '#f5f5f5',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16,
    // minWidth: 50,
    paddingRight: 16,
    color: '#585858',
    borderRadius: 3,
  }
})
