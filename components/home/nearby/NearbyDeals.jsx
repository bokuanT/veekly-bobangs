import { 
  View, Text, TouchableOpacity, FlatList, ActivityIndicator 
} from 'react-native'
import { useNavigation } from '@react-navigation/native';

import styles from './nearbydeals.style'
import { COLORS, SIZES } from '../../../constants'
import NearbyDealCard from '../../common/cards/nearby/NearbyDealCard'
import useFetch from '../../../hook/useFetch'

const NearbyDeals = () => {  
  const navigation = useNavigation();
  const {data, isLoading, error } = useFetch();
  console.log(data)
  //console.log(error)
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
          data?.map((deal) => (
            <NearbyDealCard
              item={deal}
              key={deal?.deal_id} //TODO: update this
              handleCardPress={() => navigation.navigate('DealDetails', {deal})}
            />
          ))
        )}
      </View>
    </View>
  )
}

export default NearbyDeals