import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Home from './home';
import Maps from './mapview';
import Test from './hometest';
import Entypo from 'react-native-vector-icons/Entypo';
import { COLORS, icons, images, SIZES} from '../constants';
import { useRouter, Stack } from "expo-router";

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Stacks = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        // tabBarActiveTintColor: Colors.red,
        // tabBarInactiveTintColor: Colors.gray,
        // tabBarShowLabel: false,
      }}
      >
      <Tab.Screen
        name="List"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="home" size={32} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Maps"
        component={Maps}
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="heart" size={32} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="New"
        component={Test}
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="star" size={32} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};




const App = () => {
    const router = useRouter();
    return (
      <NavigationContainer independent={true}>
        <TabNavigator/>
        {/* <Stacks.Navigator screenOptions = {{headerShown: false}}>
          
          <Stacks.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{headerShown: false}}
          />

        </Stacks.Navigator> */}
      </NavigationContainer>
    );
  };
  
  const styles = StyleSheet.create({
    tabBar: {
      paddingTop: 5,
      backgroundColor: Colors.white,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
    },
  });
  
  export default App;