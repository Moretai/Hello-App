import React from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Button,
  SegmentedControlIOS,
} from 'react-native'
import { withNavigation, NavigationActions } from 'react-navigation'
import codePush from 'react-native-code-push'

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

  // 检测热更新
  // onButtonPress() {
  //       codePush.sync({
  //           updateDialog: true,
  //           installMode: codePush.InstallMode.IMMEDIATE
  //       });
  //   }

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
          <Text style={styles.text}>&nbsp;&nbsp;&nbsp;&nbsp;欢迎您与食客皆宜APP商城经营者（详见定义条款）共同签署本《平台服务协议》（下称“本协议”）并使用平台服务!</Text>
          <Text style={styles.text}>&nbsp;&nbsp;&nbsp;&nbsp;您在申请注册流程时应当认真阅读本协议。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款。</Text>
          <Text style={styles.text}>&nbsp;&nbsp;&nbsp;&nbsp;当您按照注册页面提示填写信息、阅读本协议且完成全部注册程序后，即表示您已充分阅读、理解并接受本协议的全部内容，并与达成一致，成为平台“用户”。阅读本协议的过程中，如果您不同意本协议或其中任何条款约定，您应立即停止注册程序。</Text>
          <Text style={styles.title}>一、定义</Text>
          <Text style={styles.text}>1.1 食客皆宜：包括 www.shikejieyi.com 的网站以及食客皆宜APP商城安卓客户端、iOS客户端。</Text>
          <Text style={styles.text}>1.2 食客皆宜：无锡施特捷宜电子商务有限公司。</Text>
          <Text style={styles.text}>1.3 平台服务：基于互联网，以包含平台网站、客户端等在内的各种形态（包括未来技术发展出现的新的服务形态）向您提供的各项服务。</Text>
          <Text style={styles.text}>1.4 平台规则：包括在所有平台规则频道内已经发布及后续发布的全部规则、实施细则、产品说明、公告等。</Text>
          <Text style={styles.title}>二、 协议范围</Text>
          <Text style={styles.text}>2.1 签约主体</Text>
          <Text style={styles.text}>&nbsp;&nbsp;&nbsp;&nbsp;本协议由您与食客皆宜APP商城经营者共同缔结，本协议对您与食客皆宜经营者均具有合同效力。</Text>
          <Text style={styles.text}>2.2 补充协议</Text>
          <Text style={styles.text}>&nbsp;&nbsp;&nbsp;&nbsp;  由于互联网高速发展，您与签署的本协议列明的条款并不能完整罗列并覆盖您所有权利与义务，现有的约定也不能保证完全符合未来发展的需求。因此，平台退换货规则等均为本协议的补充协议，与本协议不可分割且具有同等法律效力。如您使用食客皆宜APP商城服务，视为您同意上述补充协议。</Text>
          <Text style={styles.title}>三、 账户注册与使用</Text>
          <Text style={styles.text}>3.1 用户资格</Text>
          <Text style={styles.text}>&nbsp;&nbsp;&nbsp;&nbsp;您确认，在您开始注册程序使用食客皆宜APP商城服务前，您应当具备中华人民共和国法律规定的与您行为相适应的民事行为能力。</Text>
          <Text style={styles.text}>3.2 账户说明</Text>
          <Text style={styles.text}>&nbsp;&nbsp;&nbsp;&nbsp;当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，您可获得食客皆宜APP商城账户并成为食客皆宜APP商城用户。您有权使用您设置或确认的食客皆宜APP商城会员名、邮箱、手机号码（以下简称“账户名称”）及您设置的密码（账户名称及密码合称“账户”）登录食客皆宜APP商城。 </Text>
          <Text style={styles.text}>3.3 注册信息管理</Text>
          <Text style={styles.text}>3.3.1 真实合法</Text>
          <Text style={styles.text}>&nbsp;&nbsp;&nbsp;&nbsp;在使用食客皆宜APP商城服务时，您应当按食客皆宜APP商城页面的提示准确完整地提供您的信息（包括您的姓名及电子邮件地址、联系电话、联系地址等），以便与您联系。您了解并同意，您有义务保持您提供信息的真实性及有效性。</Text>
          <Text style={styles.text}>3.3.2 账户安全规范</Text>
          <Text style={styles.text}>&nbsp;&nbsp;&nbsp;&nbsp;您的账户为您自行设置并由您保管，账户因您主动泄露或遭受他人攻击、诈骗等行为导致的损失及后果，均由您自行承担。除存在过错外，您应对您账户项下的所有行为结果（包括但不限于在线签署各类协议、发布信息、购买商品及服务、披露信息等）负责。</Text>
          <Text style={styles.title}>四、商品的购买</Text>
          <Text style={styles.text}>4.1 当您在食客皆宜APP商城购买商品时，请您务必仔细确认所购商品的品名、价格、数量、型号、规格、尺寸或服务的时间、内容、限制性要求等重要事项，并在下单时核实您的联系地址、电话、收货人等信息。如您填写的收货人非您本人，则该收货人的行为和意思表示产生的法律后果均由您承担。</Text>
          <Text style={styles.text}>4.2 您的购买行为应当基于真实的消费需求，不得存在对商品实施恶意购买、恶意维权等扰乱食客皆宜APP商城正常交易秩序的行为。基于维护食客皆宜APP商城交易秩序及交易安全的需要，发现上述情形时可主动执行关闭相关交易订单等操作。</Text>
          <Text style={styles.title}>五、订单的取消</Text>
          <Text style={styles.text}>5.1 您有权在下列情况下，取消订单： 下单当日23:00前拨打客服电话取消订单。</Text>
          <Text style={styles.text}>5.2 在下列情况下，可以与用户协商取消订单：</Text>
          <Text style={styles.text}>&nbsp;&nbsp;① 网站上显示的商品信息错误或缺货的；</Text>
          <Text style={styles.text}>&nbsp;&nbsp;②用户订单信息明显错误。</Text>
          <Text style={styles.title}>六、 商品信息</Text>
          <Text style={styles.text}>6.1 食客皆宜APP商城上的商品信息随时有可能发生变动，将尽所有合理必要的努力，使食客皆宜APP商城内展示的商品参数、说明、价格、库存等商品信息尽可能真实准确、全面详细。但受互联网技术发展水平等客观因素的限制，网页显示的信息可能会有一定的滞后性或差错，对此情形您充分理解并予以谅解。如您发现商品信息错误或有疑问的，请在第一时间告知，并终止提交该订单。</Text>
          <Text style={styles.text}>6.2 将尽最大努力确保用户所购商品价格与食客皆宜APP商城公布的价格一致，尽管如此，由于价格设置、文字描述、配图等错误及不可预见的系统故障等情形，可能出现价格误差，从而导致订单因重大误解或显失公平而无法履行的情况。若出现上述情形，建议您直接联系协商解决。</Text>
          <Text style={styles.text}>6.3 网站上显示的每一款商品的价格都包含法律规定的税金，配送费用将根据网站上公布的配送政策执行。</Text>
          <Text style={styles.title}>七、 配送规则</Text>
          <Text style={styles.text}>7.1 负责将订购商品在用户规定配送时间内配送到用户指定的收货地址。因不可抗力因素配送时间将有客户规定时间后的30分钟延迟时间，客户在规定时间时因合理填写到货时间。</Text>
          <Text style={styles.text}>7.2 因如下情况造成订单延迟或无法配送、交货等，不承担延迟配送、交货的责任：</Text>
          <Text style={styles.text}>① 您提供的信息错误、地址不详细等原因导致的；</Text>
          <Text style={styles.text}>② 货物送达后无人签收，导致无法配送或延迟配送的；</Text>
          <Text style={styles.text}>③ 约定特殊时间段内送货的；</Text>
          <Text style={styles.text}>④ 不可抗力因素导致的，例如：自然灾害、交通拥堵、突发战争等；</Text>
          <Text style={styles.text}>⑤在规定配送时间延迟30分钟内。</Text>
          <Text style={styles.text}>7.3 食客皆宜APP商城配送司机不提供无电梯建筑的送货上楼服务，请您自行安排货物搬运上楼事宜。</Text>
          <Text style={styles.text}>7.4 订单确认后，因用户原因订单地址错误临时修改收货地址的，司机不提供改址配送服务，需联系客服重新下单修改正确收货地址。</Text>
          <Text style={styles.title}>八、用户信息的保护</Text>
          <Text style={styles.text}>8.1 您在网站进行注册、浏览、下单购物、参加活动等行为时，涉及您的真实姓名/名称、通信地址、联系电话、电子邮箱、订单详情等信息的，有权从完成交易、提供配送、售后及客户服务、开展活动、完成良好的用户体验等多种角度予以收集，并将对其中涉及个人隐私信息予以严格保密。</Text>
          <Text style={styles.text}>8.2 保证不对外公开或向任何第三方提供您的个人信息，但是存在下列情形之一的除外：</Text>
          <Text style={styles.text}>① 事先获得您的明确授权；</Text>
          <Text style={styles.text}>② 系为履行您的订单或保护您的合法权利所必须；</Text>
          <Text style={styles.text}>③ 系为履行法律义务；</Text>
          <Text style={styles.text}>④ 本注册协议或其他条款另有约定。</Text>
          <Text style={styles.title}>九、 用户的违约</Text>
          <Text style={styles.text}>1 违约认定</Text>
          <Text style={styles.text}>① 用食客皆宜APP商城服务时违反有关法律法规规定的；</Text>
          <Text style={styles.text}>② 违反本协议或本协议补充协议约定的。为适应电子商务发展和满足海量用户对高效优质服务的需求，您理解并同意，施特捷宜电子商务有限公司可在食客皆宜APP商城规则中约定违约认定的程序和标准。如：可依据您的用户数据与海量用户数据的关系来认定您是否构成违约；您有义务对您的数据异常现象进行充分举证和合理解释，否则将被认定为违约。</Text>
          <Text style={styles.title}>十、争议解决</Text>
          <Text style={styles.text}>本协议的订立、执行和解释及争议的解决均应适用中华人民共和国的法律。如就本协议内容或其执行发生任何争议，则双方应首协商解决；协商不成的，任何一方均应向无锡梁溪区人民法院提起诉讼。</Text>
          <Text style={styles.title}>十一、其他 </Text>
          <Text style={styles.text}>11.1 本协议构成双方对本协议之约定事项及其他有关事宜的完整协议，除本协议规定的之外，未赋予本协议各方其他权利。</Text>
          <Text style={styles.text}>11.2 本协议中的任何条款无论因何种原因被视为完全或部分无效或不具有执行力，该条应视为可分的，不影响本协议的任何其余条款的有效性、约束力及可执行性。</Text>
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
    // backgroundColor: 'red'
    backgroundColor: '#fff',
    // backgroundColor: 'pink',
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
