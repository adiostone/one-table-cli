import React, { useEffect, useState, useContext , useRef } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,TouchableOpacity,Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { AppContext } from '../context/AppContext'
import { SocketContext } from '../context/SocketContext'

import BaseTab from "../component/baseTab"
import UserList from "../component/userList"
import axios from 'axios'


export default function roomScreen({route, navigation}) {

  const appContext = useContext(AppContext)

  const socketContext = useContext(SocketContext)


  // const [partyID, setPartyID] = useState(route.params.partyID) 
  const [restaurantID, setRestaurantID] = useState() 
  const [restaurantName, setRestaurantName] = useState() 
  const [address, setAddress] = useState() 
  const [capacity, setCapacity] = useState();
  const [size, setSize] = useState();
  const [title, setTitle] = useState() 

  const [userList, setUserList] = useState([]) 

  const ws = useRef(socketContext.ws)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
  
      if (ws.current && ws.current.readyState === WebSocket.OPEN){
        console.log("getMyPartyMetadata")
        const message1 = { operation: 'getMyPartyMetadata', body: {} }
        ws.current.send(JSON.stringify(message1))
        console.log("getMyPartyMemberList")
        const message2 = { operation: 'getMyPartyMemberList', body: {} }
        ws.current.send(JSON.stringify(message2))
      }
  
    });
  
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    
      if (!ws.current || ws.current.readyState === WebSocket.CLOSED) {
        console.log("reconnect websocket")
        console.log(appContext.accessToken)
        const wsURL = `wss://dev.api.onetable.xyz/v1/table/party?access=${appContext.accessToken}`
        try {
          const newws = new WebSocket(wsURL)
          socketContext.setws(newws)
          ws.current = newws
        }
        catch(err){
          if (err && err.response) {
            console.log(err)
            const status = err.response.status
            if (status === 404) {
              // Valid
              console.log('valid tokens')
            }
            else{
              console.log('invalid tokens -> refreshing tokens')
              axios({
                url: 'https://dev.api.onetable.xyz/v1/table/auth/refresh',
                method: 'get',
                headers: {
                  Authorization: `Bearer ${appContext.refreshToken}`,
                },
              })
              .then(res => {
                console.log('tokens have been refreshed')
                // Refresh the tokens and store to the machine again
                const { access } = res.data
                console.log(access)
                const accessToken= access    
                SecureStore.setItemAsync('accessToken', accessToken)
                appContext.setAccessToken(accessToken)
                const wsURL = `wss://dev.api.onetable.xyz/v1/table/party?access=${accessToken}`
                const newws = new WebSocket(wsURL)
                socketContext.setws(newws)
                ws.current = newws
              })
              .catch(err =>{
                console.log("could't refresh token")
              })
            }
          }
        }
      }
    
      
  });


useEffect(() => {
  if (!ws.current || ws.current.readyState === WebSocket.CLOSED) return;


  ws.current.onopen = e => {
    console.log("getMyPartyMetadata")
    const message1 = { operation: 'getMyPartyMetadata', body: {} }
    ws.current.send(JSON.stringify(message1))
    console.log("getMyPartyMemberList")
    const message2 = { operation: 'getMyPartyMemberList', body: {} }
    ws.current.send(JSON.stringify(message2))
  }


  ws.current.onmessage = e => {
      const message = JSON.parse(e.data);
      console.log("roomListen");
      console.log(message);
      if(message.operation==="replyGetMyPartyMetadata"){
        setAddress(message.body.address)
        setCapacity(message.body.capacity)
        setRestaurantName(message.body.restaurant.name)
        setSize(message.body.size)
        setTitle(message.body.title)

      }
      if(message.operation==="replyGetMyPartyMemberList"){
        setUserList(message.body)
      }
      if(message.operation==="notifyNewMember"){
        setUserList([message.body.user].concat(userList))
        setSize(message.body.size)
      }
      if(message.operation==="notifyMemberOut"){

      }
      if(message.operation==="notifyUpdateMemberStatus"){

      }
      if(message.operation==="notifyAddPublicMenu"){

      }
      if(message.operation==="notifyChangePublicMenu"){

      }
      if(message.operation==="notifyDeletePublicMenu"){

      }
      if(message.operation==="notifyWholeMemberPrice"){

      }
      if(message.operation==="ping"){
        const sendMessage = { operation: 'pong'}
        ws.current.send(JSON.stringify(sendMessage))
      }

  };
  });


    return (
        <SafeAreaView style={styles.container}>
          <BaseTab/>
          <ScrollView style={styles.pinContainer}>
            <View style={styles.listBox}>
              <Text style={styles.restaurantNameText}> {restaurantName}</Text>
              <Text style={styles.addressText}>{address}</Text>
              <Text style={styles.partyNameText}>{title}</Text>
              <Text style={styles.peopleNumberText}> {size}/{capacity}</Text>
            </View>        
            <TouchableOpacity style={styles.shoppingBagBox} onPress={() => navigation.navigate('shoppingBag')}>
              <Text style={styles.shoppingBagText}>장바구니</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addMenuBox} onPress={() => navigation.navigate('foodList')}>
              <Text style={styles.addMenuText}>메뉴 추가</Text>
            </TouchableOpacity>   
            <TouchableOpacity style={styles.chatBox} onPress={() => navigation.navigate('chat')}>
              <Text style={styles.chatText}>채팅방</Text>
            </TouchableOpacity>   
            <UserList data={userList}/>     
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
      alignSelf: 'center',
  
    },
    listBox:{
      width: 335,
      height: 80,
  
      backgroundColor: "#CB661D",
      borderRadius: 10,
      marginBottom : 12, 
      justifyContent: 'center', 
      alignItems: 'center' 
  
    },
    restaurantNameText:{
      fontStyle: 'normal',
      fontSize: 18,
      fontWeight : "bold",
      color: "#FFFFFF",
    },
    addressText:{
      fontStyle: 'normal',
      fontSize: 15,
      color: "#FFFFFF",
    },
    partyNameText:{
      fontStyle: 'normal',
      fontSize: 12,
      color: "#FFFFFF",
    },
    peopleNumberText:{
      fontStyle: 'normal',
      fontSize: 12,
      color: "#FFFFFF",
    },
    addMenuBox:{
      width: 335,
      height: 39,
      backgroundColor: "#FFBF75",
      borderRadius: 10,
      marginBottom : 12, 
      justifyContent: 'center', 
      alignItems: 'center' 
    },
    addMenuText:{
      fontStyle: 'normal',
      fontSize: 20,
      textAlign: "center",
      color: "#FFFFFF",
    },
    chatBox:{
      width: 335,
      height: 39,
      backgroundColor: "#FFC530",
      borderRadius: 10,
      marginBottom : 12, 
      justifyContent: 'center', 
      alignItems: 'center' 
    },
    chatText:{
      fontStyle: 'normal',
      fontSize: 20,
      textAlign: "center",
      color: "#FFFFFF",
    },
    shoppingBagBox:{
      width: 335,
      height: 39,
      backgroundColor: "#FF8181",
      borderRadius: 10,
      marginBottom : 12, 
      justifyContent: 'center', 
      alignItems: 'center' 
  
    },
    shoppingBagText:{
      fontStyle: 'normal',
      fontSize: 20,
      textAlign: "center",
      color: "#FFFFFF",
  
    },


  });
  