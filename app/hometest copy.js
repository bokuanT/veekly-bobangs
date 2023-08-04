import { useState } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES} from '../constants';
import {
    Nearbyjobs, ScreenHeaderBtn, Welcome
} from '../components';
import { Map } from '../location/Map';

const Home = () => {
    const router = useRouter();
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
                <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        // tabBarActiveTintColor: Colors.red,
        // tabBarInactiveTintColor: Colors.gray,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Test}
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="home" size={32} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="heart" size={32} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
            
        </SafeAreaView>
    )
}
export default Home;
