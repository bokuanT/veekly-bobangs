import { useState } from 'react'
import { 
  View, Text, TouchableOpacity, FlatList, ActivityIndicator 
} from 'react-native'
import { useRouter } from 'expo-router'

import styles from './nearbydeals.style'
import { COLORS, SIZES } from '../../../constants'
import NearbyDealCard from '../../common/cards/nearby/NearbyDealCard'
import useFetch from '../../../hook/useFetch'

const NearbyDeals = () => {
  const router = useRouter();
  
  const {data, isLoading, error } = useFetch();
  console.log(data)
  console.log(error)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby deals</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colours={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({item}) => (
              <NearbyDealCard
                item={item}
              />
            )}
            keyExtractor={item => item?.id}
            contentContainerStyle={{columnGap: SIZES.medium}}
            horizontal
          />
        )}
      </View>
    </View>
  )
}

export default NearbyDeals