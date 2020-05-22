import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, Image,View,Button,TextInput,TouchableOpacity,Dimensions, ScrollView, SafeAreaView } from 'react-native';

import { useNavigation } from '@react-navigation/native';


export default function logoButton() {

    const navigation = useNavigation();

    return (
          <TouchableOpacity>
              <Image source={require('../assets/OnetableLogo.png')} style={styles.logoStyle} />
          </TouchableOpacity>            
    );
  }
  const styles = StyleSheet.create({

  logoStyle: {
    width: 47,
    height: 37.7,
    marginTop:20,
    marginBottom:13,

  },
  });
  