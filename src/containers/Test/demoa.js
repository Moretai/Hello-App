import React from 'react'
import {
  View,
  Text,
} from 'react-native'
import { SwipeAction, List } from 'antd-mobile';

const SwipeActionExample = () => (
  <List>
    <SwipeAction
      style={{ backgroundColor: 'gray' }}
      autoClose
      right={[
        {
          text: 'Cancel',
          onPress: () => console.log('cancel'),
          style: { backgroundColor: '#ddd', color: 'white' },
        },
        {
          text: 'Delete',
          onPress: () => console.log('delete'),
          style: { backgroundColor: '#F4333C', color: 'white' },
        },
      ]}
      left={[
        {
          text: 'Reply',
          onPress: () => console.log('reply'),
          style: { backgroundColor: '#108ee9', color: 'white' },
        },
        {
          text: 'Cancel',
          onPress: () => console.log('cancel'),
          style: { backgroundColor: '#ddd', color: 'white' },
        },
      ]}
      onOpen={() => console.log('global open')}
      onClose={() => console.log('global close')}
    >
      <List.Item
        extra="More"
        arrow="horizontal"
        onClick={e => console.log(e)}
      >
        <Text>Have left and right buttons</Text>
      </List.Item>
    </SwipeAction>
  </List>
)

export default SwipeActionExample
