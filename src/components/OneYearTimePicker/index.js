import React from 'react'
import {
  View
} from 'react-native'
import { Picker, DatePicker, List } from 'antd-mobile'

const nowTimeStamp = Date.now()
const now = new Date(nowTimeStamp)

export default class OneYearTimePicker extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      date: now
    }
  }

  render() {
    return(
      <View>
        <DatePicker
          mode="date"
          title="选择日期"
          extra="Optional"
          value={this.state.date}
          onChange={date => this.setState({ date })}
        >
          <List.Item arrow="horizontal">收货日期</List.Item>
        </DatePicker>
      </View>
    )
  }
}
