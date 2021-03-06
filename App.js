// In App.js in a new project
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native';
import { AppProvider } from './src/context/AppContext'
import { SocketProvider } from './src/context/SocketContext'


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import loginScreen from './src/screen/loginScreen'
import loadScreen from './src/screen/loadScreen'
import mainScreen from './src/screen/mainScreen'
import mapScreen from './src/screen/mapScreen'
import restaurantListScreen from './src/screen/restaurantListScreen'
import roomDetailSettingScreen from './src/screen/roomDetailSetttingScreen'
import roomScreen from './src/screen/roomScreen'
import menuListScreen from './src/screen/menuListScreen'
import menuDetailScreen from './src/screen/menuDetailScreen'
import cartScreen from './src/screen/cartScreen';
import chatScreen from './src/screen/chatScreen';
import confirmOrderScreen from './src/screen/confirmOrderScreen';
import paymentScreen from './src/screen/paymentScreen';
import paymentResultScreen from './src/screen/paymentResultScreen';
import paymentTestScreen from './src/screen/paymentTestScreen';
import waitingRoomScreen from './src/screen/waitingRoomScreen';
import afterPaymentCartScreen from './src/screen/afterPaymentCartScreen';

import * as Font from 'expo-font';

import * as SecureStore from 'expo-secure-store';

const Stack = createStackNavigator();

function clearTokens() {
  SecureStore.deleteItemAsync('accessToken')
  SecureStore.deleteItemAsync('refreshToken')
  SecureStore.deleteItemAsync('location')
  SecureStore.deleteItemAsync('mapRegion')
  SecureStore.deleteItemAsync('formattedAddress')
  SecureStore.deleteItemAsync('detailAddress')
  SecureStore.deleteItemAsync('locationIsSet')
}

export default function App(){

  // clearTokens()

  // Check the tokens and load sign in screen if it's not authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <AppProvider>
      <SocketProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
                safeAreaInsets: { top: 0, bottom: 0 },
                headerLeft: null,
                title: '',
                headerStyle: {
                  backgroundColor: '#fff',
                  shadowColor: 'transparent'
                },
              }} >
            <Stack.Screen name="load" component={loadScreen}/>
            <Stack.Screen name="main" component={mainScreen}/>
            <Stack.Screen name="login" component={loginScreen}/>
            <Stack.Screen name="map" component={mapScreen}/>
            <Stack.Screen name="restaurantList" component={restaurantListScreen}/>
            <Stack.Screen name="roomDetailSetting" component={roomDetailSettingScreen}/>
            <Stack.Screen name="room" component={roomScreen}/>
            <Stack.Screen name="menuList" component={menuListScreen}/>
            <Stack.Screen name="menuDetail" component={menuDetailScreen}/>
            <Stack.Screen name="cart" component={cartScreen}/>
            <Stack.Screen name="chat" component={chatScreen}/>
            <Stack.Screen name="confirmOrder" component={confirmOrderScreen}/>
            <Stack.Screen name="payment" component={paymentScreen}/>
            <Stack.Screen name="paymentResult" component={paymentResultScreen}/>
            <Stack.Screen name="waitingRoom" component={waitingRoomScreen}/>
            <Stack.Screen name="afterPaymentCart" component={afterPaymentCartScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      </SocketProvider>
    </AppProvider>
  );
}

