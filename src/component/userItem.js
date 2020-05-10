import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'

export default function userItem(props) {

  const userID = props.data.userID
  const nickname =props.data.nickname
  const isMaster =props.data.isMaster 
  const isReady = props.data.isReady 


  useEffect(()=>{
   
  })

  return (

          <View style={styles.listBox}>
            <Text style={styles.foodNameText}>{nickname}</Text>
          </View>        
      
  );
}


const styles = StyleSheet.create({

  listBox: {
    width: 335,
    height: 39,
    backgroundColor: "#FFF5F5",
    borderRadius: 10,
    marginBottom : 12, 
    justifyContent: 'center', 
    alignItems: 'center' ,
    alignSelf: 'center',

},
foodNameText:{

  fontStyle: 'normal',
  fontSize: 14,
  textAlign: "center",

},

});
