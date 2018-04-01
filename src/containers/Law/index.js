import React from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  Button,
  SegmentedControlIOS,
} from 'react-native'
import { withNavigation, NavigationActions } from 'react-navigation'

export default class Law extends React.PureComponent {
  static navigationOptions = ({navigation}) => ({
      title: '服务条款',
      headerLeft: (
      <Button
        title="返回"
color="#61b981"
        onPress={() => navigation.dispatch(NavigationActions.back())}
        />
      ),
    })
  state = {
    selectedIndex: 0
  }

  render() {
    const { selectedIndex } = this.state
    return (
      <ScrollView
        style={styles.wrap}
        >
        <SegmentedControlIOS
          values={['服务协议', '法律声明', '隐私条款']}
          selectedIndex={this.state.selectedIndex}
          tintColor='#5dbb80'
          onChange={(event) => {
            this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
          }}
        />
      <View style={styles.innerWrap}>
      { selectedIndex === 0 &&
        <View>
          <Text style={styles.text}>&nbsp;&nbsp;&nbsp;&nbsp;本服务协议适用于应用无锡施特捷宜电子商务有限公司的 食客皆宜应用，请仔细阅读下述服务条款。通过点击“注册”按钮或通过访问或使用本应用服务，视为您同意遵守本服务协议所有条款约束。如果您不同意，请勿使用本应用。</Text>
          <Text style={styles.text}>&nbsp;&nbsp;&nbsp;&nbsp;无锡施特捷宜电子商务有限公司保留自行决定在任何时候变更、修改、增加或删除本服务协议部分内容的权利。您有责任定期查看本服务协议的变更。您在变更信息发布之后继续使用本应用，即表示您同意且接受该等变更。</Text>
          <Text style={styles.title}>1. 服务内容</Text>
          <Text style={styles.text}>  1.1 食客皆宜为生鲜配送应用（以下简称“食客”）的所有者及经营者，完全按照其发布的服务条款和操作规则提供基于互联网以及移动互联网的相关服务（以下简称“网络服务”）。食客皆宜网络服务的具体内容由食客皆宜根据实际情况提供，包括但不限于生鲜配送等。</Text>
          <Text style={styles.text}>  1.2 您一旦用手机注册成功成为用户，将得到一个账号和密码，您需要对自己在账户中的所有活动和事件负全责。如果由于您的过错导致您的账号和密码脱离您的控制，则由此导致的针对您、食客皆宜或任何第三方造成的损害，您将承担全部责任。</Text>
          <Text style={styles.text}>  1.3 用户应输入手机号码和密码登录食客皆宜账户。</Text>

          <Text style={styles.title}>2. 用户使用规则</Text>
          <Text style={styles.text}>  2.1 用户在申请使用食客皆宜服务时，必须向食客皆宜提供真实、准确、完整有效的个人资料，如个人资料提供不准确、不真实、不合法、不详尽或有任何变动的，必须及时更新或修改。因用户提供个人资料不准确、不真实、不合法、不详尽而引发的一切后果由用户承担，并且食客皆宜保留停止用户使用食客皆宜服务的权利。</Text>
          <Text style={styles.text}>  2.2 用户不应将其账号、密码转让、出借或以任何脱离用户控制的形式交由他人使用。如用户发现其账号遭他人非法使用，应立即通知食客皆宜。因黑客行为或用户的保管疏忽导致账号、密码遭他人非法使用，食客皆宜不承担任何责任。</Text>
          <Text style={styles.text}>  2.3 用户应当为自身注册账户下的一切行为负责，因用户行为而导致的用户自身或其他任何第三方的任何损失或损害，食客皆宜不承担责任。</Text>
          <Text style={styles.text}>  2.4 用户在使用食客皆宜网络服务过程中，必须遵循以下原则：</Text>
          <Text style={styles.text}>  2.4.1 遵守中国有关的法律和法规；</Text>
          <Text style={styles.text}>  2.4.2 遵守所有与网络服务有关的网络协议、规定和程序；</Text>
          <Text style={styles.text}>  2.4.3 不得为任何非法目的而使用食客皆宜网络服务系统；</Text>
          <Text style={styles.text}>  2.4.4 不得利用食客皆宜网络服务系统进行任何可能对互联网或移动网正常运转造成不利影响的行为；</Text>
          <Text style={styles.text}>  2.4.5 不得利用食客皆宜提供的网络服务上传、展示或传播任何虚假的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、庸俗淫秽的或其他任何非法的信息资料；</Text>
          <Text style={styles.text}>  2.4.6 不得侵犯食客皆宜和其他任何第三方的专利权、著作权、商标权、名誉权或其他任何合法权益；</Text>
          <Text style={styles.text}>  2.4.7 不得利用食客皆宜网络服务系统进行任何不利于食客皆宜的行为；</Text>
          <Text style={styles.text}>  2.4.8 不得传输或发表：煽动抗拒、破坏宪法和法律、行政法规实施的言论，煽动颠覆国家政权，推翻社会主义制度的言论，煽动分裂国家、破坏国家统一的言论，煽动民族仇恨、民族歧视、破坏民族团结的言论；</Text>
          <Text style={styles.text}>  2.4.9 如发现任何非法使用用户账号或账号出现安全漏洞的情况，应立即通告食客皆宜。</Text>
          <Text style={styles.text}>  2.5 如用户在使用网络服务时违反任何上述规定，食客皆宜或其授权的人员有权要求用户改正或直接采取一切必要的措施（包括但不限于更改或删除用户收藏的内容等、暂停或终止用户使用网络服务的权利）以减轻用户不当行为造成的影响。如果用户使用网络服务违反了任何上述规定，导致任何第三方遭受损害的，您应当独立承担责任，食客皆宜因此遭受损失的，您也应当一并赔偿。</Text>
          <Text style={styles.title}>3. 服务变更、中断或终止</Text>
          <Text style={styles.text}>  3.1 鉴于网络服务的特殊性，用户同意食客皆宜有权根据业务发展情况随时变更、中断或终止部分或全部的网络服务而无需通知用户，也无需对任何用户或任何第三方承担任何责任；</Text>
          <Text style={styles.text}>  3.2 用户理解，食客皆宜需要定期或不定期地对提供网络服务的平台（如互联网应用、移动网络等）或相关的设备进行检修或者维护，如因此类情况而造成网络服务在合理时间内的中断，食客皆宜无需为此承担任何责任，但食客皆宜应尽可能事先进行通告。</Text>
          <Text style={styles.text}>  3.3 如发生下列任何一种情形，食客皆宜有权随时中断或终止向用户提供本协议项下的网络服务（包括收费网络服务）而无需对用户或任何第三方承担任何责任：</Text>
          <Text style={styles.text}>  3.3.1 用户提供的个人资料不真实； </Text>
          <Text style={styles.text}>  3.3.2 用户违反相关法律法规或本协议中规定的使用规则；</Text>
          <Text style={styles.text}>  3.3.3 按照法律规定或主管部门的要求；</Text>
          <Text style={styles.text}>  3.3.4 出于安全的原因或其他必要的情形。</Text>
          <Text style={styles.title}>  4. 隐私保护</Text>
          <Text style={styles.text}>4.1 我们会尽最大努力保护您的隐私，包括但不限于手机号码，收货地址等</Text>
          <Text style={styles.title}>5. 免责声明</Text>
          <Text style={styles.text}>5.1 食客皆宜不担保网络服务一定能满足用户的要求，也不担保网络服务不会中断，对网络服务的及时性、安全性、准确性也都不作担保。</Text>
          <Text style={styles.text}>5.2 对于因电信系统或互联网网络故障、计算机故障或病毒、信息损坏或丢失、计算机系统问题或其它任何不可抗力原因而产生损失，食客皆宜不承担任何责任，但将尽力减少因此而给用户造成的损失和影响。</Text>
          <Text style={styles.title}>6. 法律适用及争议解决 </Text>
          <Text style={styles.text}>6.1 本协议的成立、生效、履行、解释及纠纷解决，适用中华人民共和国法律（不包括冲突法）。</Text>
          <Text style={styles.text}>6.2 因本协议引起的或与本协议有关的任何争议，各方应友好协商解决；协商不成的，任何一方均可将有关纠纷或争议提交至北京仲裁委员会并按照其届时有效的仲裁规则仲裁；仲裁裁决是终局的，对各方均有约束力。</Text>
        </View> }
      { selectedIndex === 1 &&
        <View>
          <Text style={styles.title}>
            第一条
          </Text>
          <Text style={styles.text}>
            凡以任何方式登录本应用或直接、间接使用本应用服务者，视为自愿接受本应用所发布的内容、协议、声明、规则的约束。
          </Text>
          <Text style={styles.title}>
            第二条
          </Text>
          <Text style={styles.text}>
            本应用所载商标、字号和服务标志及其他任何数据的所有版权、专利权、知识产权及其它产权均属无锡施特捷宜电子商务有限公司所有。本应用所载资料受版权保护。未经本应用事前书面同意，不可将此等材料的任何部分修改、翻版、储存于检索系统、传送、复制、分发或以任何其它方式作商业或公共用途。
          </Text>
          <Text style={styles.title}>
            第三条
          </Text>
          <Text style={styles.text}>
            本应用对于所发布的内容、协议、声明、规则等所有内容享有最终解释权。本应用所发布的内容、协议、声明、规则，均适用中华人民共和国法律。
          </Text>
        </View> }
      { selectedIndex === 2 &&
        <View>
          <Text style={styles.title}>
            隐私保护
          </Text>
          <Text style={styles.text}>
            我们会尽最大努力保护您的隐私，包括但不限于手机号码，收货地址等。
          </Text>
          <Text style={styles.title}>
            条款修订
          </Text>
          <Text style={styles.text}>
            食客皆宜保留随时修改本隐私条款的权利。请您定期查看隐私条款并关注其修订情况，如果您不同意修订的内容，请您立即停止访问本应用。当隐私条款的更新版本发布于本应用，您持续访问本应用即表明您同意遵守该隐私条款更新的内容。
          </Text>
          <Text style={styles.title}>
            沟通
          </Text>
          <Text style={styles.text}>
            如果您有任何要求和意见，请您通过本应用公示的联系方式与食客皆宜联系，这是属于您与食客沟通的唯一有效的联系方式。
          </Text>
        </View> }
      </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff'
  },
  innerWrap: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    paddingBottom: 10,
    paddingTop: 10
  },
  text: {
    fontSize: 12,
    lineHeight: 18,
  }
})
