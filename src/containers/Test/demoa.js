import React from 'react'
import {
  View,
  Text,
} from 'react-native'
import { Picker, List, WhiteSpace, DatePicker } from 'antd-mobile';
import { district, provinceLite } from 'antd-mobile-demo-data';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
// GMT is not currently observed in the UK. So use UTC now.
const utcNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));


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

class SwipeActionExample extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      date: now,
      value:['a', '01']
    }
  }


  onChange = (v) => {
    console.warn('onChange value ===>', v);
  }

  onOk = (v) => {
    console.warn('onOk value ====>', v);
    this.setState({
      value: v
    })
  }

  onPickerChange = (v) => {
    console.warn('onPickerChange value ====>', v);
  }

  render() {
    return(
      <View>
        <DatePicker
          mode="date"
          title="Select Date"
          extra="Optional"
          value={this.state.date}
          onChange={date => this.setState({ date })}
        >
          <List.Item arrow="horizontal">Date</List.Item>
        </DatePicker>
        <List style={{ backgroundColor: 'white' }}>
          <Picker
            title="选择地区"
            // extra="请选择(可选)"
            data={data}
            value={['a', '04']}
            cols={2}
            // cascade={false}
            value={this.state.value}
            // onChange={this.onChange}
            // onPickerChange={this.onPickerChange}
            onOk={this.onOk}
            itemStyle={{width:200}}
            >
              <List.Item arrow="horizontal">Mu1111</List.Item>
          </Picker>
        </List>
      </View>
    )
  }
}

export default SwipeActionExample
