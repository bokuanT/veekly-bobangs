import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const DealDetails = ({ route }) => {
    const { deal } = route.params;

    return (
        <View style={styles.container}>
            <Image source={{ uri: deal.image }} style={styles.image} />
            <Text style={styles.title}>{deal.title}</Text>
            <Text style={styles.info}>{deal.info}</Text>
            <Text style={styles.address}>{deal.address}</Text>
            <Text style={styles.hours}>{deal.opening_hours}</Text>

            <FlatList
                data={deal.vouchers}
                renderItem={({ item }) => (
                    <View style={styles.voucherContainer}>
                        <Text>{item.date}</Text>
                        <Text>{item.time}</Text>
                        <Text>Discounted: {item.price_discounted}</Text>
                        <Text>Original: {item.price_original}</Text>
                        <Text>Savings: {item.product_savings}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />

            <View style={styles.tagsContainer}>
                {deal.tags.map((tag, index) => (
                    <Text key={index} style={styles.tag}>{tag}</Text>
                ))}
            </View>

            <TouchableOpacity onPress={() => { Linking.openURL(deal.link); }}>
              <Text style={styles.link}>Visit Offer</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f4f4f4'
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    info: {
        fontSize: 14,
        marginBottom: 5
    },
    address: {
        fontSize: 12,
        color: 'gray',
        marginBottom: 5
    },
    hours: {
        fontSize: 12,
        color: 'gray',
        marginBottom: 10
    },
    voucherContainer: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10
    },
    tag: {
        backgroundColor: 'purple',
        color: 'white',
        borderRadius: 5,
        padding: 5,
        margin: 2
    },
    link: {
        color: 'blue',
        textAlign: 'center',
        marginBottom: 10
    }
});

export default DealDetails;
