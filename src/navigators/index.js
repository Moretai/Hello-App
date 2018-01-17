import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View
} from 'react-native'
import { addNavigationHelpers, StackNavigator, TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Detail from '../containers/Detail'
import OrderDetail from '../containers/OrderDetail'
import Home from '../containers/Home'
import Search from '../containers/Search'
import ShoppingCar from '../containers/ShoppingCar'
import User from '../containers/User'
import Login from '../containers/Login'
import AddressList from '../containers/AddressList'
import AddNewAddress from '../containers/AddNewAddress'
import SearchList from '../containers/SearchList'
import OrderList from '../containers/OrderList'
import Test from '../containers/Test/demoa'

const headerConfig = {
  headerStyle: {
    height: 46,
    borderColor: '#ddd',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  headerTitleStyle: {
    textAlign: 'center',
    alignSelf: 'center',
    color: '#000',
  },
  gesturesEnabled: false,
}

const addRightToBalance = {
  headerRight: (<View />)
}

const OrderListStack = StackNavigator({
  OrderList: {
    screen: OrderList,
    // path: '/addaddress',
    navigationOptions: ({navigation}) => ({
      ...headerConfig,
      ...addRightToBalance
    })
  }
})

const SearchListStack = StackNavigator({
  SearchList: {
    screen: SearchList,
    path: '/addaddress',
    navigationOptions: ({navigation}) => ({
      title: `搜索${navigation.state.params.keywords}的结果`,
      ...headerConfig,
      ...addRightToBalance
    })
  }
})

const AddNewAddressStack = StackNavigator({
  AddNewAddress: {
    screen: AddNewAddress,
    path: '/addaddress',
    navigationOptions: {
      // title: '新增地址',
      ...headerConfig,
      ...addRightToBalance
    }
  }
})

const AddressListStack = StackNavigator({
  AddressList: {
    screen: AddressList,
    path: '/addaddress',
    navigationOptions: {
      title: '地址管理',
      ...headerConfig,
      ...addRightToBalance
    }
  }
})

const LoginStack = StackNavigator({
  Login: {
    screen: Login,
    path: '/',
    navigationOptions: {
      title: '登录',
      ...headerConfig
    }
  }
})

const UserStack = StackNavigator({
  User: {
    screen: User,
    path: '/',
    navigationOptions: {
      title: 'User',
      ...headerConfig
    }
  }
})

const ShoppingCarStack = StackNavigator({
  ShoppingCar: {
    screen: ShoppingCar,
    path: '/',
    navigationOptions: {
      title: 'ShoppingCar',
      ...headerConfig
    }
  }
})

const SearchStack = StackNavigator({
  Search: {
    screen: Search,
    path: '/',
    navigationOptions: {
      title: 'Search',
      ...headerConfig
    }
  }
})

const HomeStack = StackNavigator({
  Home: {
    screen: Home,
    path: '/',
    navigationOptions: {
      title: 'Home',
      ...headerConfig
    }
  }
})

const DetailStack = StackNavigator({
  Detail: {
    screen: Detail,
    path: '/',
    navigationOptions: {
      title: 'Detail',
      ...headerConfig,
      ...addRightToBalance
    }
  }
})

const OrderDetailStack = StackNavigator({
  OrderDetail: {
    screen: OrderDetail,
    path: '/',
    navigationOptions: {
      title: 'OrderDetail',
      ...headerConfig,
      ...addRightToBalance
    }
  }
})

const TestStack = StackNavigator({
  OrderDetail: {
    screen: Test,
    path: '/',
    navigationOptions: {
      title: 'Test',
      ...headerConfig,
      ...addRightToBalance
    }
  }
})

const Tabs = TabNavigator(
  {
    Home: {
      screen: HomeStack,
      path: '/home',
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor, focused }: { tintColor: string, focused: boolean }) => (
          <Ionicons
            name={focused ? 'ios-stats' : 'ios-stats-outline'}
            size={22}
            style={{ color: tintColor }}
          />
        )
      }
    },
    Search: {
      screen: SearchStack,
      path: '/Search',
      navigationOptions: {
        tabBarLabel: 'Search',
        tabBarIcon: ({ tintColor, focused }: { tintColor: string, focused: boolean }) => (
          <Ionicons
            name={focused ? 'ios-folder-open' : 'ios-folder-open-outline'}
            size={22}
            style={{ color: tintColor }}
          />
        )
      }
    },
    ShoppingCar: {
      screen: ShoppingCarStack,
      path: '/ShoppingCar',
      navigationOptions: {
        tabBarLabel: 'Shop',
        tabBarIcon: ({ tintColor, focused }: { tintColor: string, focused: boolean }) => (
          <Ionicons
            name={focused ? 'ios-settings' : 'ios-settings-outline'}
            size={22}
            style={{ color: tintColor }}
          />
        )
      }
    },
    User: {
      screen: UserStack,
      path: '/user',
      navigationOptions: {
        tabBarLabel: 'Shop',
        tabBarIcon: ({ tintColor, focused }: { tintColor: string, focused: boolean }) => (
          <Ionicons
            name={focused ? 'ios-settings' : 'ios-settings-outline'}
            size={22}
            style={{ color: tintColor }}
          />
        )
      }
    },
    Test: {
      screen: TestStack,
      path: '/test',
      navigationOptions: {
        tabBarLabel: 'Shop',
        tabBarIcon: ({ tintColor, focused }: { tintColor: string, focused: boolean }) => (
          <Ionicons
            name={focused ? 'ios-settings' : 'ios-settings-outline'}
            size={22}
            style={{ color: tintColor }}
          />
        )
      }
    }
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    initialRouteName: 'Search',
    tabBarOptions: {
      inactiveBackgroundColor: '#fff',
      activeBackgroundColor: '#fff',
      activeTintColor: '#3174f2',
      inactiveTintColor: '#9c9c9c',
      style: {
        backgroundColor: '#fff',
        height: 52,
        paddingBottom: 4,
        borderColor: 'red'
      },
      tabStyle: {
      },
      indicatorStyle: {
        backgroundColor: '#3174f2'
      },
      labelStyle: {
        fontSize: 10,
      },
      iconStyle: {
        paddingBottom: 0,
        marginBottom: -4
      },
      showIcon: true
    }
  }
)

export const Navigator = StackNavigator(
  {
    Tabs: { screen: Tabs },
    Detail: { screen: DetailStack },
    OrderDetail: { screen: OrderDetailStack },
    Login: { screen: LoginStack },
    AddressList: { screen: AddressListStack },
    AddNewAddress: { screen: AddNewAddressStack },
    SearchList: { screen: SearchListStack },
    OrderList: { screen: OrderListStack },
  },
  {
    headerMode: 'none',
    // mode: 'modal',
    initialRouteName: 'Tabs',
    cardStyle: {
      // height: 20
    },
    navigationOptions: {
      ...headerConfig
    }
  }
)



@connect(
  state => ({
    navigator: state.get('navigator')
  })
)

export default class AppWithNavigationState extends Component {
  render() {
    const { dispatch, navigator } = this.props

    return (
      <Navigator navigation={addNavigationHelpers({ dispatch, state: navigator })} />
    )
  }
}