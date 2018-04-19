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
import NetError from '../../components/NetError'
import { withNavigation, NavigationActions } from 'react-navigation'
import { Carousel } from 'antd-mobile'

const { height, width } = Dimensions.get('window')

@withNavigation
@connect(
  state => ({
    carousel: state.get('carousel'),
    net: state.get('net'),
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
  }
}

componentDidMount() {
  this.props.actions.carouselRequested()
}

  goBannerDetail(id) {
    if(!id) return
    const { navigation } = this.props
    navigation.navigate('Detail', { id, title: '' })
  }

  render () {
    const { to, navigation, carousel, net } = this.props
    if (!net.get('ok')) {
      return <NetError />
    }
    const carouselImgs = carousel.get('data') && carousel.get('data').toJS()
      return (
        <View
          style={styles.wrap}>
          <View style={styles.carousel}>
          {carouselImgs &&
          <Carousel
            autoplay={true}
            infinite={true}
            autoplayInterval={2000}
            >
          { carouselImgs.map(item => (
            <TouchableOpacity
              flag={item.id}
              onPress={this.goBannerDetail.bind(this, item.activityid)}
              key={Math.random()}
              >
              <View key={Math.random()}>
              <Image
                source={{ uri: item.imgpath }}
                style={{width: width, height: 150}}
                resizeMode='cover'
               />
              </View>
            </TouchableOpacity>))}
        </Carousel>}
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
    backgroundColor: 'transparent',
    // height: 300,
  },
  carousel: {
    height: 150,
    backgroundColor: '#fff',
  },
  list: {
    flex: 1,
  }
})
