import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,SafeAreaView} from 'react-native';
import Constants from 'expo-constants';
import restuarantFoodListScreen from './foodListScreen';

export default function mainScreen({navigation}) {


  return (
    <SafeAreaView style={styles.container}>
        <Button title="위치 설정" onPress={() => navigation.navigate('map')}/>
        <Button title="파티 만들기" onPress={() => navigation.navigate('restaurantList')}/>
    </SafeAreaView>
      
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
