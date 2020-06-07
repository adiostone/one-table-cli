import React, { useEffect, useState, useContext , useRef } from 'react'
import { StyleSheet, Text, View,Button,Alert, Image,TextInput,TouchableOpacity,Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { AppContext } from '../context/AppContext'
import { SocketContext } from '../context/SocketContext'

import BaseTab from "../component/baseTab"
import ChatList from "../component/chatList"
import axios from 'axios'


export default function chatScreen( {navigation}) {

  const appContext = useContext(AppContext)

  const socketContext = useContext(SocketContext)


//   const [partyID, setPartyID] = useState(route.params.partyID) 
//   const [restaurantID, setRestaurantID] = useState(route.params.restaurantID) 
//   const [restaurantName, setRestaurantName] = useState(route.params.restaurantName) 
//   const [partyName, setPartyName] = useState(route.params.title) 

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
      if(message.operation==="replySendChat"){
        if(message.body.isSuccess===true){
          console.log("send chat Success")
          setTextInput("")
        }
      }
      if(message.operation==="notifyNewChat"){
        setChatList([message.body].concat(chatList))
      }
      //apply all party member 
      if(message.operation==="notifyNewMember"){
        Alert.alert(message.body.user.nickname+"가 파티에 참가하셨습니다.")
        appContext.setSize(message.body.size)
      }
      if(message.operation==="notifyOutMember"){
        Alert.alert("파티원 한명이 나갔습니다.")
        appContext.setSize(message.body.size)

        //user(is host) out so apply new host
        if(message.body.newHost!==undefined){
          Alert.alert("내가 방장이 되었습니다.")
          if(appContext.userID===message.body.newHost.id){
            console.log("I am new host")
            appContext.setIsHost(true)
            appContext.setIsReady(false)
          }
        }
      }
      if(message.operation==="notifyKickedOutMember"){
        if(appContext.userID === message.body.user.id){
          //you are kicked out
          console.log("you are kicked out")
          Alert.alert("강퇴 당하셨습니다")
          appContext.setPartyID()
          appContext.setRestaurantID()
          appContext.setRestaurantName()
          appContext.setIsHost(false)
          appContext.setIsReady(false)
          appContext.setCartList([])
          appContext.setSize()
          appContext.setIsEnter(false)
          navigation.replace("main")
        }
        else{
          Alert.alert("파티원 한명이 강퇴당했습니다.")
          appContext.setSize(message.body.size)
        }
      }
      if(message.operation==="notifyNewSharedMenu"){
        Alert.alert("공유메뉴 "+message.body.name+"가 "+message.body.quantity +"개 추가 되었습니다.")
        appContext.setCartList([message.body].concat(appContext.cartList))
      }
      if(message.operation==="notifyUpdateSharedMenu"){
        Alert.alert("공유메뉴 "+message.body.name+"가 "+message.body.quantity +"개로 변경 되었습니다.")
        for (let i=0 ; i <appContext.cartList.length; i++){
          if(appContext.cartList[i].id===message.body.id){
            appContext.cartList[i] = message.body
            appContext.setCartList([...appContext.cartList])
          } 
        }       
      }
      if(message.operation==="notifyRefreshSharedCart"){
        for (let i=0 ; i <appContext.cartList.length; i++){
          for(let j=0 ; j <message.body.length; j++){
            if(appContext.cartList[i].id===message.body[j].id){
              appContext.cartList[i] = message.body[j]
              appContext.setCartList([...appContext.cartList])
            } 
          }
        }       
      }
      if(message.operation==="notifyDeleteSharedMenu"){
        let deletedName = ""
        for (let i=0 ; i <appContext.cartList.length; i++){
          if(appContext.cartList[i].id===message.body.id){
            deletedName=appContext.cartList[i].name
            appContext.cartList.splice(i,1)
            appContext.setCartList([...appContext.cartList])
          } 
        } 
        Alert.alert("공유메뉴 "+deletedName+"가 삭제되었습니다")
      }
      if(message.operation==="notifyAllMemberNotReady"){
        appContext.setIsReady(false)
      }
      if(message.operation==="notifyGoToPayment"){
        appContext.setFinalCart(message.body)
        navigation.navigate("confirmOrder")
      }
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


    return (
        <SafeAreaView style={styles.container}>
          <BaseTab data={"room"}/>
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
  