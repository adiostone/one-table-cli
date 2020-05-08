import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,TouchableOpacity,Dimensions, ScrollView, SafeAreaView } from 'react-native';
import FoodList from "../component/foodList"


export default function foodListScreen({navigation}) {

    return (
        <SafeAreaView style={styles.container}>
          <TouchableOpacity  onPress={() => navigation.navigate('main')}>
                  <Image source={require('../assets/OnetableLogo.png')} style={styles.logoStyle} />
          </TouchableOpacity>            
          <FoodList/>
        </SafeAreaView>

    );
  }

  const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
      },

  logoStyle: {
    width: 47,
    height: 37.7,
    marginLeft:20,
    marginTop:20,
    marginBottom:5,

  },
  });
  