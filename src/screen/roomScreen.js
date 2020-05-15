import React, { useEffect, useState, useContext , useRef } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,TouchableOpacity,Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { AppContext } from '../context/AppContext'
import { SocketContext } from '../context/SocketContext'

import LogoButton from "../component/logoButton"
import UserList from "../component/userList"
import axios from 'axios'


export default function roomScreen({route, navigation}) {

  const appContext = useContext(AppContext)

  const socketContext = useContext(SocketContext)


  // const [partyID, setPartyID] = useState(route.params.partyID) 
  const [restaurantID, setRestaurantID] = useState(route.params.restaurantID) 
  const [restaurantName, setRestaurantName] = useState(route.params.restaurantName) 
  const [address, setAddress] = useState(route.params.address) 
  const [capacity, setCapacity] = useState(route.params.capacity);
  const [curPeopleNum, setCurPeopleNum] = useState(route.params.members.length);
  const [partyName, setPartyName] = useState(route.params.title) 

  const [userList, setUserList] = useState(route.params.members) 

  const ws = useRef(socketContext.ws)

  useEffect(() => {
    
      if (!ws.current || ws.current.readyState === WebSocket.CLOSED) {
        console.log("reconnect websocket")
        console.log(appContext.accessToken)
        const wsURL = `wss://api.onetable.xyz/v1/table/party?access=${appContext.accessToken}`
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
                url: 'https://api.onetable.xyz/v1/table/auth/refresh',
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
                const wsURL = `wss://api.onetable.xyz/v1/table/party?access=${accessToken}`
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

  ws.current.onmessage = e => {
      const message = JSON.parse(e.data);
      console.log(message);
      if(message.operation==="notifyNewMember"){
        console.log(message.body)
        userList.push(message.body)
        setUserList(userList)
        // setCurPeopleNum(message.body.size)
      }
      if(message.operation==="ping"){
        const sendMessage = { operation: 'pong'}
        ws.current.send(JSON.stringify(sendMessage))
      }

  };
  });


    return (
        <SafeAreaView style={styles.container}>
          <LogoButton/>
          <ScrollView style={styles.pinContainer}>
            <View style={styles.listBox} onPress={() => {navigation.navigate("room")}}>
              <Text style={styles.restaurantNameText}> {restaurantName}</Text>
              <Text style={styles.addressText}>{address}</Text>
              <Text style={styles.partyNameText}>{partyName}</Text>
              {/* <Text style={styles.peopleNumberText}> {curPeopleNum}/{capacity}</Text> */}
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
  