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
  Button
 } from 'react-native'
import Immutable from 'immutable'
import { withNavigation, NavigationActions } from 'react-navigation'
import { Field, reduxForm } from 'redux-form/immutable'
import Icon from 'react-native-vector-icons/Ionicons'
import * as addressActions from '../../actions/address'

const { height, width } = Dimensions.get('window')

// TODO 更新一个地址 需后端提供一个地址请求接口
// TODO 固定电话
const checkValidePhoneReceiver = receiver => /^1[3|4|5|7|8][0-9]\d{8}$/.test(receiver)

const validate = (values, props) => {
  const errors = {}
  if (!values.get('phone')) {
    errors.phone = '请输入手机号码'
  } else if (!checkValidePhoneReceiver(values.get('phone'))) {
    errors.phone = '手机格式错误'
  }

  if (!values.get('name')) {
    errors.name = '请输入收货人姓名'
  }

  if (!values.get('city')) {
    errors.city = '请输入城市'
  }

  if (!values.get('address')) {
    errors.address = '请输入小区/餐厅名字'
  }

  if (!values.get('addressDetail')) {
    errors.addressDetail = '请输入详细地址'
  }

  return errors
}

const renderInput = ({ input: { onChange, ...restInput }, name, label, readOnly,placeholder, meta: { touched, error}}) => {
  return (
    <View style={styles.cell}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} onChangeText={onChange} {...restInput} placeholder={placeholder} editable={!readOnly}/>
      {touched && error &&<Text style={styles.error}>{error}</Text>}
    </View>
  )
}
const data = Immutable.fromJS({
  city: '无锡市'
})
@connect(
  state => ({
    initialValues: data
    // initialValues: state.get('address')
  }),
  dispatch => ({
    actions: bindActionCreators({
      ...addressActions
    }, dispatch)
  })
)
@reduxForm({
  form: 'addAddress',
  validate
})
export default class AddNewAddress extends React.Component {
  static navigationOptions = ({navigation}) => ({
      title: `收货地址`,
      headerLeft: (
      <Button
        title="Cancel"
        onPress={() => navigation.dispatch(NavigationActions.back())}
        />
      ),
    })

  submit = values => {
    const consignee = values.get('name')
    const telephone = values.get('phone')
    const urbanarea = values.get('address')
    const detailedaddress = values.get('addressDetail')
    const sendData = values.set('consignee', consignee)
    .set('telephone', telephone)
    // .set('city', city)
    .set('urbanarea', urbanarea)
    .set('detailedaddress', detailedaddress)
    .delete('name').delete('phone').delete('address').delete('address')
    // console.log('submitting form', sendData.toJS())
    this.props.actions.addAddressRequested(sendData.toJS())
  }

  render() {
    const { handleSubmit, invalid } = this.props
    return (
      <View style={styles.wrap}>
        <Field name='name' type="text" label='收货人' placeholder='收货人姓名' component={renderInput} />
        <Field name='phone' type="text" label='手机号码' placeholder='配送员联系你的电话' component={renderInput} />
        <Field name='city' type="text" label='所在城市' placeholder='填写您所在的城市' readOnly={true} component={renderInput} />
        <Field name='address' type="text" label='收货地址' placeholder='小区/餐厅名字' component={renderInput} />
        <Field name='addressDetail' type="text" label='楼号门牌' placeholder='楼号/单元/门牌号' component={renderInput} />
        <TouchableOpacity
          onPress={handleSubmit(this.submit)}
          >
          <Text style={[styles.button, invalid && styles.invalidSubmit]}>保存收货信息</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#fff',
    flex: 1
  },

  cell: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingTop: 10,
    // paddingBottom: 10,
    height: 50,
    // backgroundColor: 'red',
    borderStyle: 'solid',
    borderBottomColor: '#eaeaea',
    // borderBottomColor: 'red',
    borderBottomWidth: 1,
    position: 'relative'
  },

  error: {
    position: 'absolute',
    right: 5,
    top: 16,
    color: '#DD4A68'
  },

  label: {
    width: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },

  input: {
    // backgroundColor: 'yellow',
    display: 'flex',
    flex: 1
  },

  button: {
    width: width - 16,
    paddingBottom: 10,
    paddingTop: 10,
    color: '#fff',
    fontSize: 16,
    backgroundColor: '#5dbb80',
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 20,
    borderRadius: 4,
    overflow: 'hidden'
  },

  invalidSubmit: {
    backgroundColor: '#c6c6c6',
  },

  backBtn: {
    position: 'relative',
    marginRight: 100,
    backgroundColor: 'red'
  },
})
