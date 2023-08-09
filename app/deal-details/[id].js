import React from 'react'
import { View, Text } from 'react-native'
const DealDetails = ({route}) => {
    const { deal } = route.params;
    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{deal.title}</Text>
      <Text>{deal.info}</Text>
    </View>
  )
}

export default DealDetails