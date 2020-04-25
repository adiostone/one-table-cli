// In App.js in a new project
import * as React from 'react';
import { View, Text } from 'react-native';
import { AppProvider } from './src/context/AppContext'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import loginScreen from './src/screen/loginScreen'
import mainScreen from './src/screen/mainScreen'
import mapScreen from './src/screen/mapScreen'

import * as SecureStore from 'expo-secure-store';


const Stack = createStackNavigator();

export default function App(){
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
              headerShown: false,
            }}>
          <Stack.Screen name="map" component={mapScreen} />
          <Stack.Screen name="login" component={loginScreen} />
          <Stack.Screen name="main" component={mainScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

