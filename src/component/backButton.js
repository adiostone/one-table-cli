import React, { useEffect, useState, useContext , useRef} from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import { useNavigation } from '@react-navigation/native';

export default function backButton() {

  const navigation = useNavigation();

  return (
        <TouchableOpacity  onPress={() => navigation.goBack()}>
                <Image source={require('../assets/backButton.png')} style={styles.backStyle} />
        </TouchableOpacity>            

  );
}

const styles = StyleSheet.create({

  backStyle: {
    width: 40,
    height: 30,
    marginLeft:20,
    marginTop:20,
    marginBottom:13,

  },



});
