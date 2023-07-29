import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './nearbydealcard.style'

const NearbyDealCard = ({item, selectedDeal, handleCardPress}) => {
  console.log(item.mensaje)
  return (
    <TouchableOpacity
      style={styles.container(selectedDeal, item)}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedDeal, item)}>
        <Image 
          source={{uri: item.linkImagen}}
          resizeMode='contain'
          style={styles.logImage}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default NearbyDealCard