import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,TouchableOpacity,Dimensions, ScrollView, SafeAreaView } from 'react-native';

import LogoButton from "../component/logoButton"

export default function roomScreen({navigation}) {

    return (
        <SafeAreaView style={styles.container}>
          <LogoButton/>
          <ScrollView style={styles.pinContainer}>
            <TouchableOpacity style={styles.shoppingBagBox} onPress={() => navigation.navigate('shoppingBag')}>
              <Text style={styles.shoppingBagText}>장바구니</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addMenuBox} onPress={() => navigation.navigate('foodList')}>
              <Text style={styles.addMenuText}>메뉴 추가</Text>
            </TouchableOpacity>        
          </ScrollView>
        </SafeAreaView>

    );
  }

  const styles = StyleSheet.create({
    container: {
      display:"flex",
      flexDirection: 'column',
      alignItems: 'stretch',
      backgroundColor: '#fff',
    },
    pinContainer: {
      alignSelf: 'center',
  
    },
    addMenuBox:{
      width: 335,
      height: 39,
      backgroundColor: "#FFBF75",
      borderRadius: 10,
      marginBottom : 12, 
      justifyContent: 'center', 
      alignItems: 'center' 
    },
    addMenuText:{
      fontStyle: 'normal',
      fontSize: 20,
      textAlign: "center",
      color: "#FFFFFF",
    },
    shoppingBagBox:{
      width: 335,
      height: 39,
      backgroundColor: "#FF8181",
      borderRadius: 10,
      marginBottom : 12, 
      justifyContent: 'center', 
      alignItems: 'center' 
  
    },
    shoppingBagText:{
      fontStyle: 'normal',
      fontSize: 20,
      textAlign: "center",
      color: "#FFFFFF",
  
    },


  });
  