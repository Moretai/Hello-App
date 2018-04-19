
import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  ScrollView
} from 'react-native'
import { withNavigation, NavigationActions } from 'react-navigation'

const { height, width } = Dimensions.get('window')

@connect(
  state => ({
    net: state.get('net'),
  })
)
@withNavigation
export default class NetHelper extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return ({
    headerLeft: (
      <Button
        title="返回"
        color="#61b981"
        onPress={() => navigation.dispatch(NavigationActions.back())}
      />
    ),
  })
}

componentWillReceiveProps(nextProps) {
  const { net } = nextProps
  console.warn('net......', net);
  if (net.get('ok')) {
    const { navigation } = this.props
    navigation.dispatch(NavigationActions.navigate({ routeName: 'Tabs' }))
  }
}

  render() {

    return(
      <ScrollView
        style={styles.wrap}
        >
        <View>
          <View style={styles.titleWrap}>
            <Text style={styles.title}>1.  检查网络权限是否打开</Text>

            <Text style={styles.content}>iOS10系统，需要开启APP使用网络的权限。</Text>
            <Text style={styles.content}>如果你第一次打开食客皆宜APP弹出下面对话框,请点击<Text style={styles.permit}>"允许"</Text></Text>
            <Image
              style={styles.img}
              source={require('../../resources/images/net.png')}
              />
            <Text style={[styles.content, styles.paragraph]}>如果你未遇到上述对话框，或已经选择了不允许。</Text>
            <Text style={[styles.content, styles.paragraph]}>解决方法: 打开【设置】-【蜂窝移动网络】-【使用无线局域网与蜂窝移动的应用】，找到【食客皆宜】，勾选【无线局域网与蜂窝移动数据】即可。</Text>
            <Text style={[styles.content, styles.paragraph]}>如果在【使用无线局域网与蜂窝网移动的应用】中，未找到【食客皆宜】，请重启手机，打开食客皆宜APP后，再进入【设置】中尝试。</Text>
            <Text style={styles.content}>如果你的手机不是中国版，则：打开【设置】-【蜂窝移动网络】，找到【食客皆宜】，启用开关即可。</Text>
          </View>
          <View style={styles.titleWrap}>
            <Text style={styles.title}>2.检查本地网络状况</Text>
            <Text style={styles.content}>请查看你本地的无线网络或手机信号情况，信号差的时候也无法正常获取数据</Text>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#fff',
  },
  icon: {
    marginBottom: 10,
  },
  titleWrap: {
    // paddingHorizontal: 10,
  },
  title: {
    fontSize: 13,
    color: '#373737',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  content: {
    fontSize: 12,
    color: '#848484',
    paddingHorizontal: 20,
    // paddingVertical: 1,
    lineHeight: 16,
  },
  img: {
    width: 0.5 * width,
    height: 0.26217 * width,
    marginLeft: 20,
    paddingVertical:10,
    marginVertical:10,
  },
  paragraph: {
    marginBottom: 10,
  }
})
