import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions } from 'react-native';

export default function shoppingBagScreen({navigation}) {


    return (
      <View style={styles.container}>
      </View>
        
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
  