import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

export const Map = () => {
    return (
        <View style={styles.container}>
            <MapView style={styles.map} />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    height: 300, // adjust the height according to your needs
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

