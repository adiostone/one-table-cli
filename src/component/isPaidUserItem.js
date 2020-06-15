import React, { useEffect, useState, useContext ,useRef } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import { SocketContext } from '../context/SocketContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'

export default function isPaidUserItem(props) {

  const id = props.data.id
  const nickname =props.data.nickname
  const image =props.data.image
  const isHost =props.data.isHost 
  const isPaid = props.data.isPaid 

  const appContext = useContext(AppContext)

  const socketContext = useContext(SocketContext)

  const ws = useRef(socketContext.ws)


  return (

          <View style={styles.listBox}>
              {(isPaid === true) ?
              <View style={styles.paidBox}>
                <Image source={{uri:image}} style={styles.profileImageStyle}/>
              </View> :
              <View style={styles.notPaidBox}>
                <Image source={{uri:image}} style={styles.profileImageStyle}/>
              </View> 
              } 
              {(appContext.nickname === nickname) ?
              <Text style={styles.meText}>{nickname}</Text> : <Text style={styles.otherText}>{nickname}</Text> 
              }

          </View>        
  );
}


const styles = StyleSheet.create({

  listBox: {
    width : 80,
    // backgroundColor: "#FFF5F5",
    borderRadius: 10,
    alignSelf : "center",
    flexDirection : "column",
    alignItems : "center",
    justifyContent : "center"
},






paidBox:{
  width: 50,
  height :50,
  borderRadius: 100/2,
  borderWidth : 4,
  borderColor : "#83FF81",
  alignItems : "center",
  justifyContent : "center",
  marginBottom : 5,
},

notPaidBox:{
  width: 50,
  height :50,
  borderRadius: 100/2,
  borderWidth : 4,
  borderColor : "#C3C3C3",
  alignItems : "center",
  justifyContent : "center",
  marginBottom : 5,

},


profileImageStyle:{
  width: 40,
  height :40,
  borderRadius : 50,
},


meText:{

  fontStyle: 'normal',
  fontSize: 10,
  fontWeight : "bold",
  textAlign: "center",
  marginBottom : 5,

},


otherText:{

  fontStyle: 'normal',
  fontSize: 10,
  textAlign: "center",
  marginBottom : 5,

},








});
