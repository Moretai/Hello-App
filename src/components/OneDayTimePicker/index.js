import React from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native'
import { Picker, List } from 'antd-mobile'

const data = [
  {
    value: 'a',
    label: '上午',
    children: [
      {
        value: '01',
        label: '7.00 - 7.30',
      },
      {
        value: '02',
        label: '7.30 - 8.00',
      },
      {
        value: '03',
        label: '8.00 - 8.30',
      },
      {
        value: '04',
        label: '9.00 - 9.30',
      },
      {
        value: '05',
        label: '10.00 - 10.30',
      },
      {
        value: '06',
        label: '11.00 - 11.30',
      },
      {
        value: '07',
        label: '11.30 - 12.00',
      },
    ]
  },
  {
    value: 'b',
    label: '下午',
    children: [
      {
        value: '08',
        label: '12.00 - 12.30',
      },
      {
        value: '09',
        label: '12.30 - 13.00',
      },
      {
        value: '10',
        label: '13.00 - 13.30',
      },
      {
        value: '11',
        label: '13.30 - 14.00',
      },
      {
        value: '12',
        label: '14.00 - 14.30',
      },
      {
        value: '13',
        label: '14.30 - 15.00',
      },
      {
        value: '14',
        label: '15.00 - 15.30',
      },
      {
        value: '15',
        label: '15.30 - 16.00',
      },
      {
        value: '16',
        label: '16.00 - 16.30',
      },
      {
        value: '17',
        label: '16.30 - 17.00',
      },
      {
        value: '18',
        label: '17.00 - 17.30',
      },
      {
        value: '19',
        label: '17.30 - 18.00',
      },
    ]
  },
  {
    value: 'c',
    label: '下午',
    children: [
      {
        value: '20',
        label: '18.00 - 18.30',
      },
      {
        value: '21',
        label: '18.30 - 19.00',
      },
      {
        value: '22',
        label: '19.00 - 19.30',
      },
      {
        value: '23',
        label: '19.30 - 20.00',
      },
      {
        value: '24',
        label: '20.00 - 20.30',
      },
      {
        value: '25',
        label: '20.30 - 21.00',
      },
    ]
  },
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
              <List.Item arrow="horizontal">
                <Text style={{fontSize: 13}}>选择详细时间</Text>
              </List.Item>
          </Picker>
        </List>
      </View>
    )
  }
}

const styles = StyleSheet.create({
})
