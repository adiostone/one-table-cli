import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'

export default function userItem(itemData) {

  const [userID, setUserID] = useState(itemData.data.userID) 
  const [nickname, setNickname] = useState(itemData.data.nickname) 
  const [isMaster, setIsMaster] = useState(itemData.data.isMaster) 
  const [isReady, setIsReady] = useState(itemData.data.isReady) 


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
