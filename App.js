// In App.js in a new project
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import loginScreen from './src/screen/loginScreen'
import partyScreen from './src/screen/partyScreen'
import * as SecureStore from 'expo-secure-store';


const Stack = createStackNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
            headerShown: false,
          }}>
        <Stack.Screen name="start" component={loginScreen} />
        <Stack.Screen name="party" component={partyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

