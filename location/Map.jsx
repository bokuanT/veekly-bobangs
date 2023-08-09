import React, {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { COLORS, icons, images, SIZES} from '../constants';

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
  });