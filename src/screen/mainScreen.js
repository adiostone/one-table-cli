import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,TouchableOpacity,SafeAreaView} from 'react-native';
import Constants from 'expo-constants';
import restuarantFoodListScreen from './foodListScreen';

export default function mainScreen({navigation}) {


  return (
    <SafeAreaView style={styles.container}>
        <Image source={require('../assets/OnetableLogo.png')} style={styles.logoStyle} />
        <TouchableOpacity style={styles.locationBox} onPress={() => navigation.navigate('map')}>
          <Text style={styles.locationText}>위치 설정</Text>
        </TouchableOpacity>        
      <Button title="파티 만들기" onPress={() => navigation.navigate('restaurantList')}/>
    </SafeAreaView>
      
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  locationBox:{
    position: 'absolute',
    width: 335,
    height: 39,
    left: 20,
    top: 92,
    backgroundColor: "#FF8181",
    borderRadius: 10,
  },
  locationText:{
    position: 'absolute',
    width: 195.96,
    height: 24.63,
    left: 89.05,
    top: 99.18,
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
    color: "#FFFFFF"
  },
  textStyle: {
    marginLeft: 20,
    marginTop: 10,
    color: '#5B4141',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 60,
  },
  logoStyle: {
    position: 'absolute',
    width: 47,
    height: 37.7,
    left: 25,
    top: 27,
  },
});
