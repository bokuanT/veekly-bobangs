import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './nearbydealcard.style'

const NearbyDealCard = ({item, selectedDeal, handleCardPress}) => {
  return (
    <TouchableOpacity
      //style={styles.container(selectedDeal, item)}
      onPress={() => handleCardPress(item)}
    >
      {/* <TouchableOpacity style={styles.logoContainer(selectedDeal, item)}>
        <Image 
          //source={{uri: item.image_link}}
          resizeMode='contain'
          style={styles.logImage}
        />
      </TouchableOpacity> */}
      <Text style={styles.dealName} numberOfLines={1}>{item.title}</Text>
    </TouchableOpacity>
  )
}

export default NearbyDealCard