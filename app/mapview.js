import React from 'react';
import { useState } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES} from '../constants';
import { NearbyDeals, ScreenHeaderBtn, Welcome } from '../components';
import { Mapss } from '../location/Map';

const Maps = () => {
    return (
      <View
          style={{
              flex: 1,
              // padding: None
          }}
      >
  
          <Mapss/>
  
      </View>
  
      
  //    </SafeAreaView>
    );
  };

export default Maps;