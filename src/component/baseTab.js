import React, { useEffect, useState, useContext , useRef} from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import { useNavigation } from '@react-navigation/native';
import LogoButton from "./logoButton"
import BackButton from "./backButton"

export default function baseTab() {

  return (
    <View style={styles.baseList}>
        <LogoButton/>
        <BackButton/>
    </View>        

  );
}
const styles = StyleSheet.create({

  baseList: {
    display : "flex",
    flexDirection : "row",
    alignItems : "center"
  },

});

