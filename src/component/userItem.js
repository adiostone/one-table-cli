import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'

export default function userItem(props) {

  const id = props.data.id
  const nickname =props.data.nickname
  // const isHost =props.data.isHost 
  // const isReady = props.data.isReady 

  const appContext = useContext(AppContext)

  useEffect(()=>{
   
  })

  return (

          <View style={styles.listBox}>
            {(appContext.nickname === nickname) ?
            <Text style={styles.meText}>{nickname}</Text> : <Text style={styles.foodNameText}>{nickname}</Text> 
            }
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
meText:{

  fontStyle: 'normal',
  fontSize: 14,
  fontWeight : "bold",
  textAlign: "center",

},
nicknameText:{

  fontStyle: 'normal',
  fontSize: 14,
  textAlign: "center",

},

});
