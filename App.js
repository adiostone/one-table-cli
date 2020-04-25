// In App.js in a new project
import * as React from 'react';
import { View, Text } from 'react-native';
import { AppProvider } from './src/context/AppContext'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import loginScreen from './src/screen/loginScreen'
import mainScreen from './src/screen/mainScreen'
import mapScreen from './src/screen/mapScreen'
import restaurantListScreen from './src/screen/restaurantListScreen'
import foodListScreen from './src/screen/foodListScreen'
import roomDetailSettingScreen from './src/screen/roomDetailSetttingScreen'
import shopplingBagScreen from './src/screen/shoppingBagScreen'

import * as SecureStore from 'expo-secure-store';
import shoppingBagScreen from './src/screen/shoppingBagScreen';


const Stack = createStackNavigator();

export default function App(){
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
              headerShown: false,
            }}>
          <Stack.Screen name="login" component={loginScreen} />
          <Stack.Screen name="main" component={mainScreen} />
          <Stack.Screen name="map" component={mapScreen} />
          <Stack.Screen name="restaurantList" component={restaurantListScreen} />
          <Stack.Screen name="roomDetailSetting" component={roomDetailSettingScreen} />
          <Stack.Screen name="foodList" component={foodListScreen} />
          <Stack.Screen name="shoppingBag" component={shoppingBagScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

