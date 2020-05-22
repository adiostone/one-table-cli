import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'

export default function userItem(props) {

  const id = props.data.id
  const nickname =props.data.nickname
  const image =props.data.image
  const isHost =props.data.isHost 
  const isReady = props.data.isReady 

  const appContext = useContext(AppContext)

  useEffect(()=>{
   
  })

  return (

          <View style={styles.listBox}>
            <View style={styles.leftBox}>
              <Image source={{uri:image}} style={styles.profileImageStyle}/>
              {(appContext.nickname === nickname) ?
              <Text style={styles.meText}>{nickname}</Text> : <Text style={styles.otherText}>{nickname}</Text> 
              }
            </View>
            <View style={styles.rightBox}>
              {(isHost === true) ?
              <Image source={require('../assets/hostLogo.png')} style={styles.hostImageStyle}/> :
              <View style={styles.hostImageStyle}/>
              }
              {(isReady === true && isHost !==true) ?
              <Text style={styles.readyText}>Ready</Text> : <Text style={styles.notReadyText}>Not Ready</Text> 
              }
            </View>
          </View>        
      
  );
}


const styles = StyleSheet.create({

  listBox: {
    width : 160,
    height : 100,
    backgroundColor: "#FFF5F5",
    borderRadius: 10,
    alignSelf : "center",
    flexDirection : "row"
},
leftBox: {
  flex : 1 ,
  alignSelf : "center",
  flexDirection : "column",
  alignItems : "center",

},
rightBox: {
  flex : 1,
  alignSelf : "center",
  flexDirection : "column",
  alignItems : "center",

},

meText:{

  fontStyle: 'normal',
  fontSize: 14,
  fontWeight : "bold",
  textAlign: "center",

},


otherText:{

  fontStyle: 'normal',
  fontSize: 14,
  textAlign: "center",

},


profileImageStyle:{
  width: 50,
  height :50,
  borderRadius : 50,
  marginBottom : 10,
},

hostImageStyle:{
  width: 30,
  height :30,
  marginBottom : 10,
},

readyText:{

  fontStyle: 'normal',
  fontSize: 14,
  textAlign: "center",

},
notReadyText:{

  fontStyle: 'normal',
  fontSize: 14,
  textAlign: "center",

},




});
