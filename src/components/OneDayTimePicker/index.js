import React from 'react'
import {
  View,
} from 'react-native'
import { Picker, List } from 'antd-mobile'

const data = [
  {
    value: 'a',
    label: '上午',
    children: [
      {
        value: '01',
        label: '9.00 - 9.30',
      },
      {
        value: '02',
        label: '9.30 - 10.00',
      },
    ]
  },
  {
    value: 'b',
    label: '下午',
    children: [
      {
        value: '03',
        label: '13.00 - 13.30',
      },
      {
        value: '04',
        label: '13.30 - 14.00',
      },
    ]
  }
]

export default class OneDayTimePicker extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value:['a', '01']
    }
  }

  onOk = (v) => {
    console.warn('onOk value ====>', v);
    this.setState({
      value: v
    })
  }

  render() {
    return(
      <View>
        <List style={{ backgroundColor: 'white' }}>
          <Picker
            title="选择具体时间"
            data={data}
            value={['a', '04']}
            cols={2}
            value={this.state.value}
            onOk={this.onOk}
            itemStyle={{ width:200 }}
            >
              <List.Item arrow="horizontal">选择详细时间</List.Item>
          </Picker>
        </List>
      </View>
    )
  }
}
