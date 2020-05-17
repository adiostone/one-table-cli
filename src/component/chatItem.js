import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'


export default function chatItem(props) {

    const appContext = useContext(AppContext)

    const chatID =props.data.chatID
    const userID =props.data.userID 
    const nickname =props.data.nickname 
    const chat =props.data.chat 
    const time = props.data.time

  useEffect(()=>{
   
  })

  return (
    (appContext.nickname !== nickname) ? 
          (<View style={styles.leftBox}>
                    <View style={styles.nicknameBox}>
                        <Text style={styles.nicknameText}>{nickname}</Text>
                    </View>
                    <View style={styles.chatBox}>
                    <Text style={styles.chatText}>{chat}</Text>
                    </View>
                    <Text style={styles.timeText}>{time}</Text>
                </View>) :
            (<View style={styles.rightBox}>
                <Text style={styles.timeText}>{time}</Text>
                <View style={styles.chatBox}>
                    <Text style={styles.chatText}>{chat}</Text>
                </View>
            </View>)      
  );
}
const styles = StyleSheet.create({

leftBox: {
    marginLeft : 5,
    display : "flex",
    flexDirection : "row",
},
rightBox: {
    marginRight : 5,
    display : "flex",
    flexDirection : "row",
    justifyContent : "flex-end",
},
nicknameBox:{
    padding : 6 ,
    borderRadius : 5,
    borderWidth: 1,
    borderColor: 'black',
    margin : 4,
},
nicknameText:{
    fontSize : 14,
    fontWeight : "bold",
},
chatBox:{
    padding : 6 ,
    borderRadius : 5,
    borderWidth: 1,
    borderColor: 'black',
    margin : 4,
},
chatText:{
  fontSize : 14,
},
timeText:{  
    fontSize : 10,
    color : "gray",
    position : "relative" ,
    bottom : -5,
},


});
