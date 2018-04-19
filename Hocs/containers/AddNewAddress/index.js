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
  Button,
  ScrollView
 } from 'react-native'
import Immutable from 'immutable'
import { withNavigation, NavigationActions } from 'react-navigation'
import { Field, reduxForm } from 'redux-form/immutable'
import Icon from 'react-native-vector-icons/Ionicons'
import * as addressActions from '../../actions/address'

const { height, width } = Dimensions.get('window')

// TODO 更新一个地址 需后端提供一个地址请求接口
// TODO 固定电话
// TODO 输入法能输入中文
// TODO 字符串截取
// TODO 选择默认区域过小
const checkValidePhoneReceiver = receiver => /^1[0-9]\d{9}$/.test(receiver)

const validate = (values, props) => {
  const errors = {}
  if (!values.get('telephone')) {
    errors.telephone = '请输入手机号码'
  } else if (!checkValidePhoneReceiver(values.get('telephone'))) {
    errors.telephone = '手机格式错误'
  }

  if (!values.get('consignee')) {
    errors.consignee = '请输入收货人姓名'
  }

  if (!values.get('city')) {
    errors.city = '请输入城市'
  }

  if (!values.get('urbanarea')) {
    errors.urbanarea = '请输入小区/餐厅名字'
  }

  if (!values.get('detailedaddress')) {
    errors.detailedaddress = '请输入详细地址'
  }

  return errors
}

const renderInput = ({ input: { onChange, onBlur, value,...restInput }, name, label, readOnly,placeholder, meta: { touched, error}}) => {
  return (
    <View style={styles.cell}>
      <Text style={styles.label}>{label}</Text>
    {/* <TextInput style={styles.input} onChangeText={onChange} onBlur={onBlur} {...restInput} placeholder={placeholder} editable={!readOnly}/> */}
    <TextInput style={styles.input} onChangeText={onChange} placeholder={placeholder} editable={!readOnly}/>
      {touched && error &&<Text style={styles.error}>{error}</Text>}
    </View>
  )
}
const data = Immutable.fromJS({
  city: '无锡市'
})

const dataB = Immutable.fromJS({
  city : "无锡市",
  name: "1212"
})
@connect(
  state => ({
    // initialValues: state.get('address').get('oneItem').toJS(),
    // initialValues: {
    //   city: '无锡市'
    // }
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
class AddNewAddress extends React.PureComponent {

  submit = values => {
    // const { initialValues } = this.props
    // const receiptinformationid = initialValues && initialValues.get('receiptinformationid')
    // const isdefault = initialValues && initialValues.get('isdefault')
    // console.warn('receiptinformationid--->', receiptinformationid);
    // if (receiptinformationid) {
    //   return this.props.actions.updateAddressRequested(values.set('receiptinformationid', receiptinformationid).set('isdefault', isdefault).toJS())
    // }
    // console.warn('value.toJS()',values.toJS())
    this.props.actions.addAddressRequested(values.toJS())
  }

  render() {
    const { handleSubmit, invalid,  } = this.props
    return (
      <View style={styles.wrap}>
        <Field name='consignee' type="text" label='收货人' placeholder='收货人姓名' component={renderInput} />
        <Field name='telephone' type="text" label='手机号码' placeholder='配送员联系你的电话' component={renderInput} />
        <Field name='city' type="text" label='所在城市' placeholder='填写您所在的城市' component={renderInput} />
        <Field name='urbanarea' type="text" label='收货地址' placeholder='小区/餐厅名字' component={renderInput} />
        <Field name='detailedaddress' type="text" label='楼号门牌' placeholder='楼号/单元/门牌号' component={renderInput} />
        <TouchableOpacity
          onPress={handleSubmit(this.submit)}
          >
          <Text style={[styles.button, invalid && styles.invalidSubmit]}>保存收货信息</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

@withNavigation
@connect(
  state => ({
    initialValues: state.get('address').get('oneItem')
  }),
  dispatch => ({
    actions: bindActionCreators({
      ...addressActions
    }, dispatch)
  })
)
export default class EditAddress extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  static navigationOptions = ({navigation}) => ({
      title: `收货地址`,
      headerLeft: (
      <Button
        title="取消"
        onPress={() => navigation.dispatch(NavigationActions.back())}
        />
      ),
    })
  componentWillMount() {
    const { navigation } = this.props
    const { params } = navigation.state
    const { item, name } = params
    if(item) {
      this.props.actions.setSelectedOneAddress(item)
    }
  }
  render() {
    const { navigation } = this.props
    const { params } = navigation.state
    const { name } = params
    return (
      <ScrollView style={styles.allWrap}>
        { ((name === '修改' && this.props.initialValues) || (name === '新增')) && <AddNewAddress />}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  allWrap: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
