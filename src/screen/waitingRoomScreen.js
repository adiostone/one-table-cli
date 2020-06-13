import React, { useEffect, useState, useContext , useRef } from 'react'
import { StyleSheet, Text, View,Button,Alert, Image,TextInput,TouchableOpacity,Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { AppContext } from '../context/AppContext'
import { SocketContext } from '../context/SocketContext'
import LogoButton from "../component/logoButton"
import BaseTab from "../component/baseTab"
import ChatList from "../component/chatList"
import axios from 'axios'


export default function chatScreen({navigation}) {

  const appContext = useContext(AppContext)

  const socketContext = useContext(SocketContext)


  const [restaurantName, setRestaurantName] = useState() 
  const [address, setAddress] = useState() 
  const [capacity, setCapacity] = useState();
  const [size, setSize] = useState();
  const [title, setTitle] = useState() 
  const [image, setImage] = useState()

  const [chatList, setChatList] = useState([]) 

  const [textInput, setTextInput] = useState("");

  const ws = useRef(socketContext.ws)

  useEffect(() => {
    if (!ws.current) return;

    console.log("getMyPartyMetadata")
    const message1 = { operation: 'getMyPartyMetadata', body: {} }
    ws.current.send(JSON.stringify(message1))

    console.log("getMyPartyChats")
    const message2 = { operation: 'getMyPartyChats', body: {} }
    ws.current.send(JSON.stringify(message2))

},[]);


useEffect(() => {
  if (!ws.current || ws.current.readyState === WebSocket.CLOSED) return;


  ws.current.onopen = e => {

    console.log("getMyPartyMetadata")
    const message1 = { operation: 'getMyPartyMetadata', body: {} }
    ws.current.send(JSON.stringify(message1))

    console.log("getMyPartyChats")
    const message2 = { operation: 'getMyPartyChats', body: {} }
    ws.current.send(JSON.stringify(message2))
  }

  ws.current.onmessage = e => {

      const message = JSON.parse(e.data);
      console.log("waitingRoom listen");
      console.log(message);
      if(message.operation==="replyGetMyPartyMetadata"){
        setAddress(message.body.address)
        setCapacity(message.body.capacity)
        setRestaurantName(message.body.restaurant.name)
        setSize(message.body.size)
        setTitle(message.body.title)
        setImage(message.body.restaurant.icon)
      }
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
          <View style={styles.logo}>
            <LogoButton/>
          </View>
          <View style={styles.listBox}>
              <View style={styles.leftBox}>
                <Image source={{uri:image}} style={styles.imageStyle}/>
              </View>
              <View style={styles.rightBox}>
                <Text style={styles.restaurantNameText}> {restaurantName}</Text>
                <Text style={styles.addressText}>{address}</Text>
                <View style={styles.rightBottomBox}>
                  <Text style={styles.partyNameText}>{title}</Text>
                  <Text style={styles.peopleNumberText}> {size}/{capacity}</Text>
                </View>
              </View>
          </View>    
          <TouchableOpacity style={styles.cartBox} onPress={() => navigation.navigate('afterPaymentCart')}>
            <Text style={styles.cartText}>장바구니 확인</Text>
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
    listBox:{
      height: 100,
      width: 340,
      backgroundColor: "#CB661D",
      borderRadius: 10,
      marginBottom : 12, 
      display : "flex",
      flexDirection : "row",
      shadowColor : '#4d4d4d',
      shadowOffset: { width: 8, height: 8, },
      shadowOpacity: 0.3, 
      shadowRadius: 4,
      alignSelf : "center"

    },
    leftBox:{ 
      flex : 1,
      backgroundColor: '#fff',
      alignContent : "center",
      alignItems : 'center',

    },
    imageStyle:{

      width: 100,
      height :100,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,

      alignSelf : "center"

    },
    rightBox:{
      flex : 2,
      padding : 8,
    },


    rightBottomBox:{
      display : "flex", 
      flexDirection : "row"
    },
    restaurantNameText:{
      fontStyle: 'normal',
      fontSize: 18,
      fontWeight : "bold",
      color: "#FFFFFF",
      marginBottom: 5,
    },
    addressText:{
      fontStyle: 'normal',
      fontSize: 12,
      color: "#FFFFFF",
      marginBottom: 3,
    },
    partyNameText:{
      fontStyle: 'normal',
      fontSize: 18,
      color: "#FFFFFF",
      marginRight : 10,
    },
    peopleNumberText:{
      fontStyle: 'normal',
      fontSize: 18,
      color: "#FFFFFF",
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
  