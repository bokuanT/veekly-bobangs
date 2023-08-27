import React from 'react';
import { View, Text, Image, ImageBackground, FlatList, StyleSheet, TouchableOpacity, Linking, Dimensions } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from 'react-native/Libraries/NewAppScreen';


const height = Dimensions.get('window').height;
const colors = {
    gray: '#D1D3D2',
    darkGray: '#676767',
    orange: '#F35D38',
    black: '#0C0D0E',
    white: '#FBFCFE',
  };

const DealDetails = ({ route, navigation }) => {
    const { deal } = route.params;
    

      
    return (
        <View style={styles.container}>
            <ImageBackground source={{uri: deal.image}} style={styles.backgroundImage} imageStyle={{opacity:0.4}}>
                <TouchableOpacity
                    style={styles.backIcon}
                    onPress={() => navigation.goBack()}>
                    <View style={styles.backWrapper}>
                        <Entypo name="chevron-left" size={32} color={colors.black} />
                        <Text style={styles.locationText}>back</Text>
                    </View>              
                </TouchableOpacity>
                <View style={styles.heartWrapper}>
                    <Entypo name="heart" size={24} color={colors.orange} />
                </View>
                <View style={styles.titlesWrapper}>
                <Text style={styles.itemTitle}>{deal.title}</Text>
                <View style={styles.locationWrapper}>
                    <Entypo name="location-pin" size={30} color={colors.white} />
                    <Text style={styles.locationText}>{deal.address}</Text>
                </View>
                </View>
            </ImageBackground>
            <View style={styles.descriptionWrapper}>
                <View style = {styles.descriptionContainer}>
                    <View style={styles.descriptionTextWrapper}>
                        <Text style={styles.descriptionTitle}>Description</Text>
                        <Text style={styles.descriptionText}>{deal.info}</Text>
                    </View>
                    <Image 
                        source={require('./chopeIcon.png')} 
                        style={styles.brandImage} />
                </View>
                <View style = {styles.voucherBox}>
                        <Text style={styles.voucherTitle}>Vouchers</Text>
                        <FlatList
                            data={deal.vouchers}
                            renderItem={({ item }) => (
                                <View style={styles.voucherContainer}>
                                    <View> 
                                        <Text style={{        
                                            fontFamily: 'DMRegular',
                                            fontSize: 16,
                                            color: colors.black,
                                            paddingBottom: 5}}>
                                            {item.date}, {item.time}</Text>
                                        {/* <Text
                                        style={{        
                                            fontFamily: 'DMRegular',
                                            fontSize: 16,
                                            color: colors.darkGray,}}>
                                            {item.time}</Text> */}
                                        <Text                                        style={{
                                            fontFamily: 'DMRegular',
                                            fontSize: 14,}}>
                                            Original: {item.price_original}</Text>
                                        <Text
                                        style={{
                                            fontFamily: 'DMBold',
                                            fontSize: 14,}}>
                                            Discounted: {item.price_discounted}</Text>
                                        
                                    </View>
                                    <View>
                                        <Text>Savings: {item.product_savings}</Text>
                                    </View>
                                    
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                </View>
                <TouchableOpacity 
                onPress={() => { Linking.openURL(deal.link); }}
                style={styles.buttonWrapper}>
                    <Text style={styles.link}>Visit Offer</Text>
                </TouchableOpacity> 
                
                

            </View>





            {/* <Image source={{ uri: deal.image }} style={styles.image} />
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
            </TouchableOpacity> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 10,
        backgroundColor: '#f4f4f4'
    },
    backgroundImage: {
        height: height * 0.3,
        justifyContent: 'space-between',
        // opacity:0.5,
      },
      descriptionWrapper: {
        flex: 1,
        backgroundColor: colors.white,
        marginTop: -20,
        borderRadius: 25,
      },
      backWrapper: {
        flexDirection: 'row',
        alignItems: 'left',
        alignItems: 'center',
        marginTop: 10,
      },
      backIcon: {
        // marginLeft: 20,
        // marginTop: 20,
      },
      titlesWrapper: {
        marginHorizontal: 20,
        marginBottom: 40,
      },
      itemTitle: {
        fontFamily: 'DMBold',
        fontSize: 35,
        color: Colors.black,
      },
      locationWrapper: {
        flexDirection: 'row',
        gap:10,
        alignItems: 'center',
        marginTop: 5,
        marginLeft: -6,
        marginRight: 30,
      },
      locationText: {
        fontFamily: 'DMMedium',
        fontSize: 16,
        color: colors.black,
      },
      heartWrapper: {
        position: 'absolute',
        right: 20,
        top: 10,
        width: 40,
        height: 40,
        backgroundColor: colors.white,
        borderRadius: 64,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      descriptionContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal:10,
        marginHorizontal:30,
        // paddingRight: 20,
        paddingTop: 25,
      },
      descriptionTextWrapper: {
        // marginTop: 25,
        marginRight: 70,
    
      },
      descriptionTitle: {
        fontFamily: 'DMMedium',
        fontSize: 24,
        color: colors.black,
      },
      descriptionText: {
        marginTop: 10,
        fontFamily: 'DMRegular',
        fontSize: 16,
        color: colors.darkGray,
        height: 85,
      },
      brandImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: 10,
        alignContent:'center'
      },
      infoWrapper: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 20,
        justifyContent: 'space-between',
      },
      buttonWrapper: {
        alignSelf:'center',
        width:200,
        height:50,
        marginHorizontal: 0,
        // marginTop: 40,
        backgroundColor: colors.gray,
        alignItems: 'center',
        paddingVertical: 5,
        borderRadius: 10,
        textAlignVertical: 'bottom'
      },
      buttonText: {
        fontFamily: 'Lato-Bold',
        fontSize: 18,
        color: colors.white,
        textAlign:'auto',
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
    voucherBox:{
        padding: 15,
        paddingBottom:5,
    },
    voucherTitle:{
        fontFamily: 'DMMedium',
        fontSize: 24,
        color: colors.black,
        paddingBottom:10,
        marginTop: -20,
        // marginBottom: 10,
    },

    voucherContainer: {
        backgroundColor: colors.white,
        marginHorizontal:40,
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between'

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
        marginBottom: 10,
        verticalAlign:'middle'
    }
});

export default DealDetails;
