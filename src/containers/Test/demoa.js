import React from 'react'
import {
  View,
  Text,
} from 'react-native'
import { SwipeAction, List, DatePicker } from 'antd-mobile';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
// GMT is not currently observed in the UK. So use UTC now.
const utcNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
class SwipeActionExample extends React.PureComponent {
  state = {
    date: now,
    time: now,
    utcDate: utcNow,
    dpValue: null,
    customChildValue: null,
    visible: false,
  }

  render() {
    return(
      <List style={{ backgroundColor: 'white' }}>
      <DatePicker
          mode="time"
          use12Hours
          minuteStep={2}
          // format="HH:mm"
          title="Select Date"
          // extra="Optional"
          value={this.state.time}
          onChange={time => this.setState({ time })}
        >
        <List.Item arrow="horizontal">Time (am/pm)</List.Item>
    </DatePicker>
    </List>
    )
  }
}

export default SwipeActionExample
