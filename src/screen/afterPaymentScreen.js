import React, { useEffect, useState, useContext , useRef } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,TouchableOpacity,Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { AppContext } from '../context/AppContext'
import { SocketContext } from '../context/SocketContext'

import BaseTab from "../component/baseTab"
import ChatList from "../component/chatList"
import axios from 'axios'


export default function afterPaymentScreen({navigation}) {

  const appContext = useContext(AppContext)

  const socketContext = useContext(SocketContext)

  const [chatList, setChatList] = useState([]) 

  const [textInput, setTextInput] = useState("");

  const ws = useRef(socketContext.ws)

  useEffect(() => {
    if (!ws.current || ws.current.readyState === WebSocket.CLOSED) return;

    console.log("getMyPartyChats")
    const message = { operation: 'getMyPartyChats', body: {} }
    ws.current.send(JSON.stringify(message))

},[]);


useEffect(() => {
  if (!ws.current || ws.current.readyState === WebSocket.CLOSED) return;


  ws.current.onopen = e => {
    console.log("getMyPartyChats")
    const message = { operation: 'getMyPartyChats', body: {} }
    ws.current.send(JSON.stringify(message))
  }

  ws.current.onmessage = e => {

      const message = JSON.parse(e.data);
      console.log("chat listen");
      console.log(message);
      if(message.operation==="replyGetMyPartyChats"){
        setChatList(message.body)
      }
      if(message.operation==="notifyNewChat"){
        setChatList([message.body].concat(chatList))
      }
      if(message.operation==="ping"){
        const sendMessage = { operation: 'pong'}
        ws.current.send(JSON.stringify(sendMessage))
      }

  };



  });


  function sendChat(){
    if (!ws.current) return;

    const message = { operation: 'sendChat', body: {chat: textInput } }
    ws.current.send(JSON.stringify(message))
    setTextInput("")
  }


    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.logo}>
            <LogoButton/>
          </View>
          <ScrollView style={styles.pinContainer}>
            <ChatList data={chatList}/>     
            <View style={styles.submitBox}>
                <TextInput style={styles.textInputBox} onChangeText={(text) => setTextInput(text)}>{textInput}</TextInput>
                <TouchableOpacity style={styles.submitButton} onPress={sendChat}/>
            </View>
          </ScrollView>
        </SafeAreaView>

    );
  }

  const styles = StyleSheet.create({
    container: {
      display:"flex",
      flexDirection: 'column',
      alignItems: 'stretch',
      backgroundColor: '#fff',
    },
    pinContainer: {
  
    },

    logo:{
        alignItems: "center",
      },


    submitBox: {
        marginTop : 10,
        alignSelf: 'center',
        display : "flex",
        flexDirection: 'row',
      },
      textInputBox: {
        flex : 6,
        borderTopLeftRadius : 10,
        borderBottomLeftRadius : 10,
        fontStyle: 'normal',
        fontSize: 14,
        textAlign: "left",
        borderWidth : 1,
        marginLeft :10 ,
        padding : 6 ,
        marginRight : 5


      },
      submitButton: {
        flex : 1,
        borderTopRightRadius : 10,
        borderBottomRightRadius : 10,
        borderWidth : 1,    
        marginRight :10 ,
        padding : 6 ,

      },

  });
  