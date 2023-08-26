import { 
  View, Text, TouchableOpacity, FlatList, ActivityIndicator 
} from 'react-native'
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Slider from "@react-native-community/slider";

import styles from './nearbydeals.style'
import { COLORS, SIZES } from '../../../constants'
import NearbyDealCard from '../../common/cards/nearby/NearbyDealCard'
import useFetch from '../../../hook/useFetch'

const NearbyDeals = () => {  
  const navigation = useNavigation();
  const {data, isLoading, error } = useFetch();
  const [radius, setRadius] = useState(500); // default to 500 meters
  //console.log(data)
  //console.log(error)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby deals</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
        <Slider
          style={{width: 200, height: 40}}
          minimumValue={100}
          maximumValue={2000}
          step={100}
          value={radius}
          onSlidingComplete={(value) => setRadius(value)}
          minimumTrackTintColor={COLORS.primary}
          maximumTrackTintColor="#000000"
        />
        <Text>Radius: {radius} meters</Text>
      </View>
      
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colours={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((deal) => (
            <NearbyDealCard
              item={deal}
              key={deal?.title} //TODO: update this
              handleCardPress={() => navigation.navigate('DealDetails', {deal})}
            />
          ))
        )}
      </View>
    </View>
  )
}

export default NearbyDeals