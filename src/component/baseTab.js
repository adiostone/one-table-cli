import React, { useEffect, useState, useContext , useRef} from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import { useNavigation } from '@react-navigation/native';
import LogoButton from "./logoButton"
import BackButton from "./backButton"

export default function baseTab() {

  return (
    <View style={styles.baseList}>
        <View style={styles.left}>
          <BackButton/>
        </View>
        <View style={styles.center}>
          <LogoButton/>
        </View>
    </View>        

  );
}
const styles = StyleSheet.create({

  baseList: {


  },
  left : {
    position : "absolute"
  

  },

  center :{

    alignSelf : "center" ,

  }

});

