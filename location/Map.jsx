import React, {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { Platform, Text, View, StyleSheet, TextInput } from 'react-native';
import { COLORS, icons, images, SIZES} from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import Geolocation from '@react-native-community/geolocation';
import * as Location from "expo-location";



export const Map = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [position, setPosition] = useState({
        latitude: 41.38145,
        longitude: 2.17182,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    const initialMapState = {
        markers,
        categories: [
          { 
            name: 'Fastfood Center', 
            icon: <MaterialCommunityIcons style={styles.chipsIcon} name="food-fork-drink" size={18} />,
          },
          {
            name: 'Restaurant',
            icon: <Ionicons name="ios-restaurant" style={styles.chipsIcon} size={18} />,
          },
          {
            name: 'Dineouts',
            icon: <Ionicons name="md-restaurant" style={styles.chipsIcon} size={18} />,
          },
          {
            name: 'Snacks Corner',
            icon: <MaterialCommunityIcons name="food" style={styles.chipsIcon} size={18} />,
          },
          {
            name: 'Hotel',
            icon: <Fontisto name="hotel" style={styles.chipsIcon} size={15} />,
          },
      ],
      };
    
    const [state, setState] = React.useState(initialMapState);

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





    // let lat = '';
    // let lon = '';
    // if (errorMsg) {
    //     text = errorMsg;
    // } else if (location) {
    //     JSON.stringify(location);
    //     lat = location.coords.latitude;
    //     lon = location.coords.longitude;
    //     console.log(lat)
    //     console.log(lon)
    // }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map} 
                // mapType=''
                region={position}>
                <Marker
                    coordinate={position}/>
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
        top:Platform.OS === 'ios' ? 90 : 80, 
        paddingHorizontal:10
      },

  });