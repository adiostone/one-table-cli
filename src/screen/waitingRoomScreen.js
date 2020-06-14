import React, { useEffect, useState, useContext , useRef } from 'react'
import { StyleSheet, Text, View,Button,Alert, Image,TextInput,TouchableOpacity,Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { AppContext } from '../context/AppContext'
import { SocketContext } from '../context/SocketContext'
import LogoButton from "../component/logoButton"
import BaseTab from "../component/baseTab"
import ChatList from "../component/chatList"
import axios from 'axios'

import IsPaidUserList from "../component/isPaidUserList"

export default function waitingRoomScreen({navigation}) {

  const appContext = useContext(AppContext)

  const socketContext = useContext(SocketContext)

  const [chatList, setChatList] = useState([]) 

  const [textInput, setTextInput] = useState("");

  const ws = useRef(socketContext.ws)

  const [userList, setUserList] = useState(appContext.userList);

  const [isDelivered, setIsDelivered] = useState(appContext.isDelivered)  

  useEffect(() => {
    if (!ws.current) return;

    console.log("getMyPartyChats")
    const message2 = { operation: 'getMyPartyChats', body: {} }
    ws.current.send(JSON.stringify(message2))

},[]);


useEffect(() => {
  if (!ws.current || ws.current.readyState === WebSocket.CLOSED) return;


  ws.current.onopen = e => {

    console.log("getMyPartyChats")
    const message2 = { operation: 'getMyPartyChats', body: {} }
    ws.current.send(JSON.stringify(message2))
  }

  ws.current.onmessage = e => {

      const message = JSON.parse(e.data);
      console.log("waitingRoom listen");
      console.log(message);
      if(message.operation==="replyGetMyPartyChats"){
        setChatList(message.body)
      }
      if(message.operation==="replySendChat"){
        if(message.body.isSuccess===true){
          console.log("send chat Success")
          setTextInput("")
        }
      }
      if(message.operation==="replyReceiveDelivery"){
        if(message.body.isSuccess===true){
          console.log("exit success")
          navigation.replace('main')
        }
        console.log("exit failed")
      }
      if(message.operation==="notifyNewChat"){
        setChatList([message.body].concat(chatList))
      }
      //
      if(message.operation==="notifyCompletePayment"){
        for(let i=0 ; i<appContext.userList.length ; i++ ){
            if(message.body.id===appContext.userList[i].id){
                appContext.userList[i].isPaid=true
                appContext.setUserList([...appContext.userList])
                setUserList([...appContext.userList])
            }
        }
      }
      if(message.operation==="notifyOrderIsAccepted"){
        Alert.alert(`주문이 접수되었습니다 예상 소요시간은 ${message.body.estimatedTime}분 입니다`)
      }
      if(message.operation==="notifyOrderIsRefused"){
        Alert.alert("주문이 거절되었습니다")
      }
      if(message.operation==="notifyStartDelivery"){
        Alert.alert("주문이 배달 시작하였습니다")
      }
      if(message.operation==="notifyMemberReceiveDelivery"){
        for (let i=0 ; i <userList.length; i++){
          if(userList[i].id===message.body.id){
            userList.splice(i,1)
            setUserList([...userList])
            appContext.setUserList([...userList])
          } 
        } 
      }
      //apply all party member 


      //apply all ws
      if(message.operation==="ping"){
        const sendMessage = { operation: 'pong'}
        ws.current.send(JSON.stringify(sendMessage))
      }

  };



  });


  function sendChat(){
    if (!ws.current) return;

    if(textInput!==""){
      const message = { operation: 'sendChat', body: {chat: textInput } }
      ws.current.send(JSON.stringify(message))
    }
  }

  function receiveDelivery(){
    if (!ws.current) return;

    const message = { operation: 'receiveDelivery', body: {} }
    ws.current.send(JSON.stringify(message))
  }


    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.logo}>
            <LogoButton/>
          </View>
          <IsPaidUserList data={userList}/>     
          <TouchableOpacity style={styles.cartBox} onPress={() => navigation.navigate('afterPaymentCart')}>
            <Text style={styles.cartText}>결제 내역 확인</Text>
          </TouchableOpacity>
          <ScrollView style={styles.pinContainer}>
            <ChatList data={chatList}/>     
          </ScrollView>
          <View style={styles.submitBox}>
                <TextInput style={styles.textInputBox} onChangeText={(text) => setTextInput(text)}>{textInput}</TextInput>
                <TouchableOpacity style={styles.submitButton} onPress={sendChat}/>
          </View>
        </SafeAreaView>

    );
  }

  const styles = StyleSheet.create({
    container: {
      display:"flex",
      flex : 1,
      flexDirection: 'column',
      alignItems: 'stretch',
      backgroundColor: '#fff',
    },
    pinContainer: {
  
    },
    logo:{
      alignItems: "center",
    },


    cartBox:{
      height: 39,
      width: 340,
      backgroundColor: "#FF8181",
      borderRadius: 10,
      marginBottom : 12, 
      justifyContent: 'center', 
      alignItems: 'center', 
      alignSelf : "center"
  
    },
    cartText:{
      fontStyle: 'normal',
      fontSize: 20,
      textAlign: "center",
      color: "#FFFFFF",
  
    },

    submitBox: {
        justifyContent: 'flex-end',
        marginTop : 10,
        alignSelf: 'center',
        display : "flex",
        flexDirection: 'row',
        marginLeft :15 ,
        marginRight :15 ,

      },
      textInputBox: {
        flex : 6,
        borderTopLeftRadius : 10,
        borderBottomLeftRadius : 10,
        fontStyle: 'normal',
        fontSize: 14,
        textAlign: "left",
        borderWidth : 1,
        padding : 6 ,
        marginRight : 5


      },
      submitButton: {
        flex : 1,
        borderTopRightRadius : 10,
        borderBottomRightRadius : 10,
        borderWidth : 1,    
        padding : 6 ,

      },

  });
  