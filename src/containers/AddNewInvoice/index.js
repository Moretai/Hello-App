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
import { Picker, List } from 'antd-mobile'
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable'
import Icon from 'react-native-vector-icons/Ionicons'
import * as InvoiceActions from '../../actions/invoice'

const selector = formValueSelector('addInvoice')

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

  if (!values.get('detailedInvoice')) {
    errors.detailedInvoice = '请输入详细地址'
  }

  return errors
}

const data = [
  {
    value: 'a',
    label: '普通发票',
  },
  {
    value: 'b',
    label: '专用发票',
  },
]

const renderPicker = ({ input: { onChange, onBlur, value,...restInput }, name, label, readOnly,placeholder, meta: { touched, error}}) => {
  return (
    <View>
      <List style={{ backgroundColor: 'white' }}>
        <Picker
          title="选择发票类型"
          data={data}
          cols={1}
          value={value}
          // onOk={(v) => this.props.onOk(v)}
          onChange={(val) => onChange(val)}
          // itemStyle={{ width:200 }}
          >
            <List.Item arrow="horizontal">
              <Text style={{fontSize: 14}}>选择发票类型</Text>
            </List.Item>
        </Picker>
      </List>
    </View>
  )
}

const renderInput = ({ input: { onChange, onBlur, value,...restInput }, name, label, has, readOnly,placeholder, meta: { touched, error}}) => {
  return (
    <View style={styles.cell}>
      <Text style={styles.label}>{has && <Text style={styles.star}>*</Text>}{label}</Text>
      {/* <TextInput style={styles.input} onChangeText={onChange} onBlur={onBlur} {...restInput} placeholder={placeholder} editable={!readOnly}/> */}
      <TextInput style={styles.input} onChangeText={onChange} placeholder={placeholder} editable={!readOnly}/>
      {touched && error &&<Text style={styles.error}>{error}</Text>}
    </View>
  )
}
@connect(
  state => ({
    invoiceType: selector(state, 'type'),
    // initialValues: {
    //   city: '无锡市'
    // }
    // initialValues: state.get('Invoice')
  }),
  dispatch => ({
    actions: bindActionCreators({
      ...InvoiceActions
    }, dispatch)
  })
)
@reduxForm({
  form: 'addInvoice',
  validate
})
class AddNewInvoice extends React.PureComponent {

  submit = values => {
    // const { initialValues } = this.props
    // const receiptinformationid = initialValues && initialValues.get('receiptinformationid')
    // const isdefault = initialValues && initialValues.get('isdefault')
    // console.warn('receiptinformationid--->', receiptinformationid);
    // if (receiptinformationid) {
    //   return this.props.actions.updateInvoiceRequested(values.set('receiptinformationid', receiptinformationid).set('isdefault', isdefault).toJS())
    // }
    // console.warn('value.toJS()',values.toJS())
    this.props.actions.addInvoiceRequested(values.toJS())
  }

  render() {
    const { handleSubmit, invalid, invoiceType } = this.props
    console.warn('invoiceType...', invoiceType)
    const mustHas = invoiceType && invoiceType.includes('b')
    return (
      <View style={styles.wrap}>
        <Field name='type' type="text" label='收货人' placeholder='收货人姓名' component={renderPicker} has/>
        <Field name='registerName' type="text" label='发票抬头' placeholder='请输入营业执照注册名称' component={renderInput}  has/>
        <Field name='taxPayerId' type="text" label='纳税人识别号' placeholder='请输入纳税人识别号' component={renderInput} has/>
        <Field name='registerAddress' type="text" label='注册地址' placeholder='请输入注册地址' component={renderInput} has={mustHas}/>
        <Field name='registerPhone' type="text" label='注册电话' placeholder='请输入注册电话' component={renderInput} has={mustHas}/>
        <Field name='bankName' type="text" label='开户银行' placeholder='请输入开户银行' component={renderInput} has={mustHas}/>
        <Field name='bankAccount' type="text" label='银行账号' placeholder='请输入银行账号' component={renderInput} has={mustHas}/>
        <TouchableOpacity
          onPress={handleSubmit(this.submit)}
          >
          <Text style={[styles.button, invalid && styles.invalidSubmit]}>保存发票信息</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

@withNavigation
@connect(
  state => ({
    initialValues: state.get('invoice').get('oneItem')
  }),
  dispatch => ({
    actions: bindActionCreators({
      ...InvoiceActions
    }, dispatch)
  })
)
export default class EditInvoice extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  static navigationOptions = ({navigation}) => ({
      title: `新增发票信息`,
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
      this.props.actions.setSelectedOneInvoice(item)
    }
  }
  render() {
    const { navigation } = this.props
    const { params } = navigation.state
    const { name } = params
    return (
      <ScrollView style={styles.allWrap}>
        { ((name === '修改' && this.props.initialValues) || (name === '新增')) && <AddNewInvoice />}
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
  star: {
    color: '#b33a3b',
  }
})
