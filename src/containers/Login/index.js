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
 import {
   Toast
 } from 'antd-mobile'
 import { Field, reduxForm, formValueSelector } from 'redux-form/es/immutable'
 import { withNavigation, NavigationActions } from 'react-navigation'
 import { normalizeVcode } from '../../utils/normalize'
 import * as vcodeActions from '../../actions/vcode'
 import * as loginActions from '../../actions/login'
 // import BTCIcon from '../../resources/icons/btc'

 const { height, width } = Dimensions.get('window')

 const checkValidePhoneReceiver = receiver => /^1[3|4|5|7|8][0-9]\d{8}$/.test(receiver)

 const validate = (values, props) => {
   const errors = {}
   if (!values.get('phone')) {
     errors.phone = '请输入手机号码'
   } else if (!checkValidePhoneReceiver(values.get('phone'))) {
     errors.phone = '手机格式错误'
   }

   if (!values.get('vcode')) {
     errors.vcode = '请输入验证码'
   } else if (values.get('vcode').length !== 6) {
      errors.vcode = '验证码位数错误'
   }
   return errors
 }

 const renderInput = ({ input: { onChange, ...restInput }, name, label, placeholder, meta: { touched, error}}) => {
   console.log('name....', name)
   return (
     <View style={styles.cell}>
       <Text style={styles.label}>{label}</Text>
       <TextInput style={styles.input} onChangeText={onChange} {...restInput} placeholder={placeholder} />
       {(touched && error) &&
         <Text style={[styles.errorMsg, placeholder === '请输入验证码' && styles.specialErrorMsg]}>{error}</Text>}
     </View>
   )
 }
@connect(
  state => ({
    vcode: state.get('vcode'),
    phoneNum:formValueSelector('loginForm')(state, 'phone')
  }),
  dispatch => ({
    actions: bindActionCreators({
      ...vcodeActions,
      ...loginActions
    }, dispatch)
  })
)
@reduxForm({
 form: 'loginForm',
 validate
})
export default class Login extends React.PureComponent {
  static navigationOptions = ({navigation}) => ({
      title: '收货地址',
      headerLeft: (
      <Button
        title="返回"
        onPress={() => navigation.dispatch(NavigationActions.back())}
        />
      ),
    })

  submit = values => {
    const sendDate = values.set('code', values.get('vcode')).delete('vcode')
    console.log('submitting loginform', sendDate.toJS())
    this.props.actions.loginRequested(sendDate.toJS())
  }

  sendSms = () => {
    Toast.info('短信发送中,客官稍等~', 1)
    const { phoneNum } = this.props
    this.props.actions.sendMsgRequested({phone: phoneNum})
  }

  componentDidMount() {
    // this.props.actions.validateTokenRequested()
  }

  render() {
    const { handleSubmit, submitting, pristine, vcode, invalid, phoneNum } = this.props
    const vcodeLoading = vcode.get('loading')
    const vcodeCountDownSeconds = vcode.get('countDownSeconds')
    const validPhone = checkValidePhoneReceiver(phoneNum)
    const vcodeDisabled = vcodeLoading || vcodeCountDownSeconds || !validPhone
    return (
      <View style={styles.wrap}>
        <Field name='phone' type="text" placeholder='请输入手机号码' component={renderInput} />
        <Field name='vcode' type="text" placeholder='请输入验证码' component={renderInput} normalize={normalizeVcode}/>
        <TouchableOpacity
          onPress={this.sendSms}
          style={[styles.getSms, vcodeDisabled && styles.getSmsDisable]}
          disabled={!!vcodeDisabled}
          >
          <Text style={[styles.getSmsText, vcodeDisabled && styles.getSmsTextDisable]}>{vcodeCountDownSeconds ? `(${vcodeCountDownSeconds}) s` : '获取验证码'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSubmit(this.submit)}
          style={[styles.login, !invalid && styles.canLoginWrap]}
          disabled={invalid}
          >
          <Text style={styles.loginText}>登录</Text>
        </TouchableOpacity>
        <Text style={styles.loginTip}>未注册过的用户将直接为您创建账户</Text>
        <View style={styles.otherLoginWrap}>
          <View style={styles.line} />
          <Text style={styles.otherLoginText}>第三方登录</Text>
          <View style={styles.imgsWrap}>
            <Text>微信</Text>
            <Text>QQ</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: '#fff',
    position: 'relative'
  },

  cell: {
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingBottom: 10,
    position: 'relative'
  },

  errorMsg: {
    position: 'absolute',
    right: 30,
    top: 15,
    color: '#DD4A68'
  },

  specialErrorMsg: {
    right: 140,
  },

  getSms: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#5dbb80',
    borderRadius: 4,
    paddingLeft: 10,
    paddingRight: 10,
    width: 120,
    position: 'absolute',
    right: 30,
    top: 68,
    zIndex: 100
  },

  getSmsDisable: {
    borderColor: '#c6c6c6',
  },

  getSmsText: {
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
  },

  getSmsTextDisable: {
    color: '#c6c6c6'
  },

  login: {
    borderRadius: 2,
    backgroundColor: '#c6c6c6',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 50
  },

  canLoginWrap: {
    backgroundColor: '#5dbb80',
  },

  loginText: {
    textAlign: 'center',
    color: '#fff'
  },
  //
  // canLogin: {
  //   color: '#5dbb80'
  // },

  loginTip: {
    color: '#333',
    fontSize: 12,
    marginTop: 10
  },

  otherLoginWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    // backgroundColor: 'pink'
  },

  line: {
    // position: 'absolute',
    backgroundColor: '#ececec',
    height: 1,
    zIndex: 100

  },

  otherLoginText: {
    backgroundColor: '#fff',
    textAlign: 'center',
    marginLeft: (width - 100)/2,
    width: 100,
    height: 20,
    marginTop: -8,
    zIndex: 200
  }
})
