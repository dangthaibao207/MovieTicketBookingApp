import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "./Home"
import Ionic from 'react-native-vector-icons/Ionicons'
import Tickets from "./Tickets"
import axios from 'axios'
import { firebase } from '../firebase';
import User from "./User"

const BottomTabs = ({ route }) => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#171722',
          borderTopEndRadius: 10,
          borderTopStartRadius: 10,
          position: 'absolute',
          borderTopColor: 'transparent',
          elevation: 0,
          height: 54,
          overflow: 'hidden',
        },
        tabBarIcon: ({ focused, colour }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home-sharp' : 'home-outline';
            colour = focused && '#ffffff';
          } else if (route.name === 'Tickets') {
            iconName = focused ? 'film' : 'film-outline';
            colour = focused && '#ffffff';
          } else if (route.name === 'User') {
            iconName = focused ? 'person-sharp' : 'person-outline';
            colour = focused && '#ffffff';
          }
          return (
            <>
              <Ionic
                name={iconName}
                style={{ marginBottom: 4 }}
                size={22}
                color={colour ? colour : '#ffffff40'}
              />
              <Ionic
                name="ellipse"
                style={{ display: colour ? 'flex' : 'none' }}
                size={4}
                color={colour ? colour : 'transparent'}
              />
            </>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Home}></Tab.Screen>
      <Tab.Screen name="Tickets" component={Tickets}></Tab.Screen>
      <Tab.Screen name="User" component={User}></Tab.Screen>
    </Tab.Navigator>
  )
}

export default BottomTabs

const styles = StyleSheet.create({

})