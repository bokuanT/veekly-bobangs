import { useState } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES} from '../constants';
import { NearbyDeals, ScreenHeaderBtn, Welcome } from '../components';
import { Map } from '../location/Map';

//tmp import for testing
import NearbyDealCard from '../components/common/cards/nearby/NearbyDealCard';

const Home = () => {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            
            {/* Header configuration */}
            {/* Note: This isn't the standard way to configure headers in React Navigation, but it's kept for consistency */}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: SIZES.medium,
                    backgroundColor: COLORS.lightWhite,
                }}
            >
                
            </View>
            
            <View style={{ flex: 1, paddingHorizontal: SIZES.medium }}>
                {/* Welcome Component */}
                <Welcome />

                {/* NearbyDeals Component */}
                <NearbyDeals />
            </View>

        </SafeAreaView>
    )
}
export default Home;
