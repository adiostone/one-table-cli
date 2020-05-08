// In App.js in a new project
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native';
import { AppProvider } from './src/context/AppContext'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import loginScreen from './src/screen/loginScreen'
import mainScreen from './src/screen/mainScreen'
import mapScreen from './src/screen/mapScreen'
import restaurantListScreen from './src/screen/restaurantListScreen'
import roomDetailSettingScreen from './src/screen/roomDetailSetttingScreen'
import roomScreen from './src/screen/roomScreen'
import foodListScreen from './src/screen/foodListScreen'
import foodDetailScreen from './src/screen/foodDetailScreen'
import shoppingBagScreen from './src/screen/shoppingBagScreen';

import * as Font from 'expo-font';

import * as SecureStore from 'expo-secure-store';

const Stack = createStackNavigator();

function clearTokens() {
  SecureStore.deleteItemAsync('accessToken')
  SecureStore.deleteItemAsync('refreshToken')
}

export default function App(){

  // clearTokens()

  // Check the tokens and load sign in screen if it's not authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
              headerShown: false,
            }}>
          <Stack.Screen name="main" component={mainScreen} />
          <Stack.Screen name="login" component={loginScreen} />
          <Stack.Screen name="map" component={mapScreen} />
          <Stack.Screen name="restaurantList" component={restaurantListScreen} />
          <Stack.Screen name="roomDetailSetting" component={roomDetailSettingScreen} />
          <Stack.Screen name="room" component={roomScreen}/>
          <Stack.Screen name="foodList" component={foodListScreen} />
          <Stack.Screen name="foodDetail" component={foodDetailScreen} />
          <Stack.Screen name="shoppingBag" component={shoppingBagScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

