import React from 'react'
import {
  View,
  Text,
} from 'react-native'
import { Picker, List, WhiteSpace } from 'antd-mobile';
import { district, provinceLite } from 'antd-mobile-demo-data';
console.warn('district===>', district);

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
// GMT is not currently observed in the UK. So use UTC now.
const utcNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));


const data = [
  // {
  //   value: '2018',
  //   label: '2018',
  //   children: [
      {
        value: '01',
        label: '01',
        children: [
          {
          value: '01',
          label: '01',
          children: [
            {
              value: '9-10',
              label: '9:30~10:30',
              // children: [
              //   {
              //     value: '01',
              //     label: '01',
              //   }
              // ]
            }
          ]},
          {
          value: '02',
          label: '02',
          children: [
            {
              value: '9-10',
              label: '9-10'
            }
          ]}
        ]
      }
  //   ]
  // }
]

class SwipeActionExample extends React.PureComponent {
  state = {
    date: now,
    time: now,
    utcDate: utcNow,
    dpValue: null,
    customChildValue: null,
    visible: false,
  }

  onChange = (v) => {
    console.warn('onChange value ===>', v);
  }

  onOk = (v) => {
    console.warn('onOk value ====>', v);
  }

  onPickerChange = (v) => {
    console.warn('onPickerChange value ====>', v);
  }

  render() {
    return(
      <List style={{ backgroundColor: 'white' }}>
        <Picker
          title="选择地区"
          extra="请选择(可选)"
          data={data}
          cols={2}
          value={this.state.pickerValue}
          onChange={this.onChange}
          onPickerChange={this.onPickerChange}
          onOk={this.onOk}
          itemStyle={{width:100}}
        >
          <List.Item arrow="horizontal">Multiple</List.Item>
        </Picker>
    </List>
    )
  }
}

export default SwipeActionExample
