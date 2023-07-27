import React from 'react';
import MapView from 'react-native-maps';
import { View, Text } from 'react-native';

import styles from './map.style'

export const Map = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Map</Text>
            </View>
            <MapView style={styles.map} />
        </View>
    );
}
