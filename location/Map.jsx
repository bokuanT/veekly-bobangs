import React, { useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import MapView, {Marker} from "react-native-maps";
import { useNavigation } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import LocationContext from './Locationcontext';

// import StarRating from '../components/StarRating';

import { useTheme } from '@react-navigation/native';
import DealsContext from '../deal_data_context/DealsContext';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 200;
const CARD_WIDTH = width * 0.8;
console.log("card width is " + CARD_WIDTH)
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const mapData = (originalData) => {
  return originalData.map((deal, index) => {
    let longitude, latitude;
    if (deal.longlat && Array.isArray(deal.longlat[0]) && deal.longlat[0].length == 2) {
      [longitude, latitude] = deal.longlat[0];
      return {
        coordinate: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        },
        title: deal.title,
        info: deal.info,
        image: deal.image,
        originalDealData: deal,
      };
    } else {
      console.log("Invalid longlat data for deal in Map:", deal);
      return null;
    }
  }).filter(Boolean);
};

export const Map = () => {
  // To navigate to individual deal page
  const navigation = useNavigation();

  // Context to obtain your current location
  const [location_cur, setLocation] = React.useState(null);
  const [errorMsg_cur, setErrorMsg] = React.useState(null);
  const [position_cur, setPosition] = React.useState({
    latitude: 41.38145, //defaults
    longitude: 2.17182,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  const { location, errorMsg, position } = useContext(LocationContext);
  useEffect(() => {
    setErrorMsg(errorMsg);
    setLocation(location);
    setPosition(position);
  }, [location, errorMsg, position]);

  // Context to obtain all the deals from backend
  // TODO: logic to show markers on map can be improved (use isLoading?)
  const [data_cur, setData] = React.useState(null);
  const [isLoading_cur, setIsLoading] = React.useState(null);
  const [dataErrorMsg, setDataErrorMsg] = React.useState(null);
  const { data, isLoading, error } = useContext(DealsContext);
  useEffect(() => {
    setDataErrorMsg(error);
    setData(data);
    setIsLoading(isLoading);
  }, [data, isLoading, error]);
  let dataConvertedForMarkers = [];
  if (error != null) {
    console.log("Error loading data in Map:", error)
  } else {
    dataConvertedForMarkers = mapData(data);
  }

  const initialMapState = {
    markers: dataConvertedForMarkers,
    categories: [
      { 
          name: 'All', 
          // icon: <MaterialCommunityIcons style={styles.chipsIcon} name="food-fork-drink" size={18} />,
      },
      { 
          name: 'Chope', 
          icon: <MaterialCommunityIcons style={styles.chipsIcon} name="food-fork-drink" size={18} />,
      },
      {
          name: 'Burpple',
          icon: <Ionicons name="ios-restaurant" style={styles.chipsIcon} size={18} />,
      },
      {
          name: 'Eatigo',
          icon: <Ionicons name="md-restaurant" style={styles.chipsIcon} size={18} />,
      },
    ],
  };

  const [state, setState] = React.useState(initialMapState);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / width); // animate 30% away from landing on the next item
      console.log("value " + value)
      console.log("index " + index)
      if (index >= state.markers.length) {
        index = state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);
      const ANIMATION_TO_GIVEN_COORD_TIME = 350;
      const DELAY_BEFORE_SHOWING_NEW_POSITION = 10;
      const regionTimeout = setTimeout(() => {
        if( mapIndex !== index ) {
          mapIndex = index;
          const { coordinate } = state.markers[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: position.latitudeDelta,
              longitudeDelta: position.longitudeDelta,
            },
            ANIMATION_TO_GIVEN_COORD_TIME
          );
        }
      }, DELAY_BEFORE_SHOWING_NEW_POSITION);
    });
  });


  const interpolations = state.markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp"
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = (markerID * CARD_WIDTH) + (markerID * 20); 
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
  }

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        region={position}
        style={styles.container}
        // customMapStyle={theme.dark ? mapDarkStyle : mapStandardStyle}
      >
        <Marker 
          style={styles.marker}
          coordinate={position}
          // image= {require('../assets/icons/map_marker.png')}
        />
        {state.markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <Marker 
            key={index} 
            coordinate={marker.coordinate} 
            onPress={(e)=>onMarkerPress(e)}
            title={marker.title}
            >
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require('../assets/icons/map_marker.png')}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </Marker>
          );
        })}
      </MapView>
      <View style={styles.searchBox}>
        <TextInput 
          placeholder="Search here"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{flex:1,padding:0}}
        />
        <Ionicons name="ios-search" size={20} />
      </View>
      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={styles.chipsScrollView}
        contentInset={{ // iOS only
          top:0,
          left:0,
          bottom:0,
          right:20
        }}
        contentContainerStyle={{
          paddingRight: Platform.OS === 'android' ? 20 : 0
        }}
      >
        {state.categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.chipsItem}>
            {category.icon}
            <Text>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET
        }}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                }
              },
            },
          ],
          {useNativeDriver: true}
        )}
      >
        {state.markers.map((marker, index) =>(
          <View style={styles.card} key={index}>
            <Image 
              source={{ uri: marker.image }}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
              {/* <StarRating ratings={marker.rating} reviews={marker.reviews} /> */}
              <Text numberOfLines={1} style={styles.cardDescription}>{marker.info}</Text>
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('DealDetails', {deal: marker.originalDealData})}
                  style={[styles.signIn, {
                    borderColor: '#FF6347',
                    borderWidth: 1
                  }]}
                >
                  <Text style={[styles.textSign, {
                    color: '#FF6347'
                  }]}>Order Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    position:'absolute', 
    marginTop: Platform.OS === 'ios' ? 20 : 20, 
    flexDirection:"row",
    backgroundColor: '#fff',
    width: '90%',
    alignSelf:'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position:'absolute', 
    top:Platform.OS === 'ios' ? 70 : 80, 
    paddingHorizontal:10
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection:"row",
    backgroundColor:'#fff', 
    borderRadius:20,
    padding:8,
    paddingHorizontal:20, 
    marginHorizontal:5,
    height:35,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 0,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 20,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 16,
    paddingBottom:2,
    marginTop: -2,
    fontWeight: "bold",
    fontFamily: "DMBold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
    fontFamily: "DMRegular",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width:50,
    height:50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 5
  },
  signIn: {
      width: '100%',
      padding:5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3
  },
  textSign: {
      fontSize: 14,
      fontWeight: 'bold'
  }
});
