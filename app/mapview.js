import React from 'react';
import { useState } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES} from '../constants';
import { NearbyDeals, ScreenHeaderBtn, Welcome } from '../components';
import { Map } from '../location/Map';

const Maps = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
      {/* <Stack.Screen
          options={{
              headerStyle: { backgroundColor: COLORS.lightWhite },
              headerShadowVisible: false,
              headerLeft: () => (
                  <ScreenHeaderBtn iconUrl={icons.menu} dimensions="60%" />
              ),
              headerRight: () => (
                  <ScreenHeaderBtn iconUrl={images.profile} dimensions="100%" />
              ),
              headerTitle: ""
          }}
      /> */}

      <ScrollView showsHorizontalScrollIndicator={false}>
          <View
              style={{
                  flex: 1,
                  padding: SIZES.medium
              }}
          >
              {/* <Welcome/> */}

              {/* <NearbyDeals/> */}

              <Map/>

          </View>

      </ScrollView>
    
</SafeAreaView>
  );
};

export default Maps;