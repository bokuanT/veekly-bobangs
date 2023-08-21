import React, {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { 
    Platform, 
    Text, 
    View, 
    StyleSheet, 
    TextInput, 
    ScrollView, 
    TouchableOpacity, 
    Dimensions, 
    FlatList,
    } from 'react-native';

import { COLORS, icons, images, SIZES} from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { Easing } from 'react-native-reanimated';
import * as Location from "expo-location";

// const { interpolate } = Animated;

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;



export const Map  = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [position, setPosition] = useState({
        latitude: 41.38145,
        longitude: 2.17182,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    
    const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(0);
    const scrollX = new Animated.Value(selectedMarkerIndex * CARD_WIDTH);

    const initialMapState = {
        markers,
        categories: [
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

    const markers = [
        {
          coordinate: {
            latitude: 1.304868,
            longitude: 103.833055,
          },
          title: "Amazing Food Place",
          id: 1,
        },
        {
          coordinate: {
            latitude: 1.305865,
            longitude: 103.831521,
          },
          title: "Second Amazing Food Place",
          id: 2,
        },
        {
          coordinate: {
            latitude: 1.302615,
            longitude: 103.831070,
          },
          title: "Third Amazing Food Place",
          id: 3,
        },
    ];



    const cardTranslateX = Animated.interpolateNode(scrollX, {
        inputRange: markers.map((_, index) => index * CARD_WIDTH),
        outputRange: markers.map((_, index) => index * CARD_WIDTH * -1),
        extrapolate: Animated.Extrapolate.CLAMP,
        easing: Easing.inOut(Easing.ease),
      });



    useEffect(() => {
        (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('not granted')
            setErrorMsg('Permission to access location was denied');
            return;
        } else {
            console.log('granted')
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setPosition({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        })
        console.log(location)
        })();
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map} 
                // mapType=''
                region={position}>

                <Marker 
                    style={styles.marker}
                    coordinate={position}
                //   image= {require('../assets/icons/map_marker.png')}
                />
                {markers.map((marker, index) => (
                    <Marker
                        key={marker.id}
                        coordinate={marker.coordinate}
                        title={marker.title}
                        onPress={() => {
                            setSelectedMarkerIndex(index);
                            scrollX.setValue(index * CARD_WIDTH);
                          }}
                    />
                    ))}
            </MapView>
            <FlatList
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cardContainer}
                data={markers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                <Animated.View
                    style={[
                    styles.card,
                    {
                        transform: [{ translateX: cardTranslateX }],
                        zIndex: selectedMarkerIndex === index ? 1 : 0,
                        elevation: selectedMarkerIndex === index ? 6 : 5,
                    },
                    ]}
                >
                    {/* Card content */}
                    <Text>{item.title}</Text>
                </Animated.View>
                )}
            />

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
                {initialMapState.categories.map((category, index) => (
                <TouchableOpacity key={index} style={styles.chipsItem}>
                    {category.icon}
                    <Text>{category.name}</Text>
                </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
    map: {
      width: '100%',
      height: '100%',
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
        marginHorizontal:10,
        height:35,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
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
    cardContainer: {
        padding: 16,
        flexDirection: 'row',
    },
    card: {
        width: CARD_WIDTH,
        marginRight: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },

  });