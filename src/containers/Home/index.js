import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  View,
  Text,
  Dimensions,
  Image,
  Alert,
  TouchableHighlight,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import * as carouselActions from '../../actions/carousel'
import List from '../../components/List'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { withNavigation, NavigationActions } from 'react-navigation'

const { height, width } = Dimensions.get('window')

@withNavigation
@connect(
  state => ({
    carousel: state.get('carousel')
  }),
  dispatch => ({
    actions: bindActionCreators({
          ...carouselActions
        }, dispatch)
  })
)
export default class Home extends React.PureComponent {
  constructor(props) {
  super(props)
  this.state = {
    activeSlide: 0,
    viewport: {
        width: Dimensions.get('window').width,
        // height: Dimensions.get('window').height
    },
    entries: [
      {
        title: '111111111111111111111111111111',
        id: '001',
        src: 'http://img3.mukewang.com/szimg/59b8a486000107fb05400300.jpg',
        path: '/intro'
      },
      {
        title: '222222222222222222222222222222',
        id: '002',
        src: 'http://img2.mukewang.com/szimg/5909a1250001197e05400300.jpg',
        path: '/intro'
      },
      {
        title: '333333333333333333333333333333',
        id: '003',
        src: 'http://img3.mukewang.com/szimg/59eeb17200013f8605400300.jpg',
        path: '/intro'
      }
    ]
  }
}

componentDidMount() {
  this.props.actions.carouselRequested()
}

  goBannerDetail(id) {
    const { navigation } = this.props
    navigation.navigate('Detail', { id })
  }

  _renderItem ({item, index}) {
    return (
      //TODO 这个传query参数
      <TouchableOpacity
        flag={item.id}
        onPress={this.goBannerDetail.bind(this, item.id)}
        >
        <View key={index}>
        <Image
          source={require('../../resources/images/test.jpg')}
          style={{width: width, height: 150}}
          resizeMode='cover'
         />
        </View>
      </TouchableOpacity>
    )
  }

  get pagination () {
      const { entries, activeSlide } = this.state;
      return (
          <Pagination
            style={{height:10}}
            dotsLength={entries.length}
            activeDotIndex={activeSlide}
            containerStyle={{
              // backgroundColor: 'rgba(0, 0, 0, 0.75)',
              paddingTop: 0,
              paddingBottom: 0,
              // position: 'absolute',
              // top: -10,
              // marginTop: -20,
              zIndex: 10000
            }}
            // containerStyle={{ backgroundColor: 'transparent', height: 10}}
            dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                // marginHorizontal: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                padding: 0
            }}
            inactiveDotStyle={{
                // Define styles for inactive dots here
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
      )
  }

  render () {
    const { to, navigation } = this.props
      return (
        <View
          style={styles.wrap}>
          <View
            style={styles.carouselWrap}
            onLayout={() => {
              this.setState({
                viewport: {
                    width: Dimensions.get('window').width,
                    // height: Dimensions.get('window').height
                }
              })
            }}
            onPress={() => (console.log('pressed..in View..'))}
            >
            <Carousel
              autoplay={true}
              loop={true}
              ref={(c) => { this._carousel = c }}
              data={this.state.entries}
              renderItem={this._renderItem.bind(this)}
              // sliderWidth={sliderWidth}
              sliderWidth={this.state.viewport.width}
              itemWidth={this.state.viewport.width}
              onSnapToItem={(index) => this.setState({ activeSlide: index }) }
              style={{position: 'absolute', zIndex: 10}}
            />
            <View style={styles.pagination}>
              { this.pagination }
            </View>
          </View>
          <View style={styles.list}>
            <List />
          </View>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  wrap: {
    display: 'flex',
    flex:1,
    backgroundColor: 'pink',
    // height: 300,
  },
  carouselWrap: {
    height: 150,
  },
  pagination: {
    position: 'absolute',
    zIndex: 1000,
    bottom: 10,
    marginLeft: '50%',
    width: 100,
    transform: [{ translateX: -100 }]
  },
  list: {
    flex: 1,
    // position: 'absolute',
    // left: 0,
    // top: 100,
    // width: 200,
    // height: 200,
    backgroundColor: 'red'
  }
})
