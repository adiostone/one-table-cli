import React, { useEffect, useState, useContext , useRef } from 'react'
import { StyleSheet, Text, View,Button, Image,Alert,TextInput,TouchableOpacity,Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { AppContext } from '../context/AppContext'
import { SocketContext } from '../context/SocketContext'

import LogoButton from "../component/logoButton"
import UserList from "../component/userList"
import axios from 'axios'


export default function roomScreen({navigation}) {

  const appContext = useContext(AppContext)

  const socketContext = useContext(SocketContext)


  // const [partyID, setPartyID] = useState(route.params.partyID) 
  const [restaurantID, setRestaurantID] = useState() 
  const [restaurantName, setRestaurantName] = useState() 
  const [address, setAddress] = useState() 
  const [capacity, setCapacity] = useState();
  const [size, setSize] = useState();
  const [title, setTitle] = useState() 
  const [image, setImage] = useState()

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
    
      // if (!ws.current || ws.current.readyState === WebSocket.CLOSED) {
      //   console.log("reconnect websocket")
      //   console.log(appContext.accessToken)
      //   const wsURL = `wss://api.onetable.xyz/v1/table/party?access=${appContext.accessToken}`
      //   try {
      //     const newws = new WebSocket(wsURL)
      //     socketContext.setws(newws)
      //     ws.current = newws
      //   }
      //   catch(err){
      //     if (err && err.response) {
      //       console.log(err)
      //       const status = err.response.status
      //       if (status === 404) {
      //         // Valid
      //         console.log('valid tokens')
      //       }
      //       else{
      //         console.log('invalid tokens -> refreshing tokens')
      //         axios({
      //           url: 'https://api.onetable.xyz/v1/table/auth/refresh',
      //           method: 'get',
      //           headers: {
      //             Authorization: `Bearer ${appContext.refreshToken}`,
      //           },
      //         })
      //         .then(res => {
      //           console.log('tokens have been refreshed')
      //           // Refresh the tokens and store to the machine again
      //           const { access } = res.data
      //           console.log(access)
      //           const accessToken= access    
      //           SecureStore.setItemAsync('accessToken', accessToken)
      //           appContext.setAccessToken(accessToken)
      //           const wsURL = `wss://api.onetable.xyz/v1/table/party?access=${accessToken}`
      //           const newws = new WebSocket(wsURL)
      //           socketContext.setws(newws)
      //           ws.current = newws
      //         })
      //         .catch(err =>{
      //           console.log("could't refresh token")
      //         })
      //       }
      //     }
      //   }
      // }
    
      
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
      console.log("room listen");
      console.log(message);
      if(message.operation==="replyGetMyPartyMetadata"){
        setAddress(message.body.address)
        setCapacity(message.body.capacity)
        setRestaurantName(message.body.restaurant.name)
        setSize(message.body.size)
        setTitle(message.body.title)
        setImage(message.body.restaurant.icon)
      }
      if(message.operation==="replyGetMyPartyMemberList"){
        setUserList(message.body)
      }
      if(message.operation==="replyLeaveParty"){
        if(message.body.isSuccess===true){
          console.log("leave Success")
          navigation.navigate("main")
        }
        else{
          console.log("leave failed")
        }      
      }
      if(message.operation==="notifyNewMember"){
        setUserList([message.body.user].concat(userList))
        setSize(message.body.size)
      }
      if(message.operation==="notifyOutMember"){
        for (let i=0 ; i <userList.length; i++){
          if(userList[i].id===message.body.user.id){
            userList.splice(i,1)
            setUserList([...userList])
          } 
        } 
        setSize(message.body.size)
      }
      if(message.operation==="notifyKickedOutParty"){
        //party is exploded
        // Alert.alert("방장이 파티에 나가 파티가 없어졌습니다.")        
        navigation.navigate("main")
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

  function leaveParty(){
    if (!ws.current) return;

      const message = { operation: 'leaveParty', body: {}}
      ws.current.send(JSON.stringify(message))
      navigation.navigate("main",message.body)
  
  }


    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.logo}>
            <LogoButton/>
          </View>
          <ScrollView style={styles.pinContainer}>
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
            <View style={styles.menuTab}>
              <TouchableOpacity style={styles.shoppingBagBox} onPress={() => navigation.navigate('shoppingBag')}>
                <Text style={styles.shoppingBagText}>장바구니</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addMenuBox} onPress={() => navigation.navigate('foodList')}>
                <Text style={styles.addMenuText}>메뉴 추가</Text>
              </TouchableOpacity>   
              <TouchableOpacity style={styles.chatBox} onPress={() => navigation.navigate('chat')}>
                <Text style={styles.chatText}>채팅방</Text>
              </TouchableOpacity>   
              <TouchableOpacity style={styles.outBox} onPress={leaveParty}>
                <Text style={styles.outText}>파티 나가기</Text>
              </TouchableOpacity>   
            </View>
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
    logo:{
      alignItems: "center",
    },
    imageStyle:{

      width: 100,
      height :100,
      alignSelf : "center"

    },
    listBox:{
      width: 335,
      height: 100,
  
      backgroundColor: "#CB661D",
      borderRadius: 10,
      marginBottom : 12, 
      display : "flex",
      flexDirection : "row",
      shadowColor : '#4d4d4d',
      shadowOffset: { width: 8, height: 8, },
      shadowOpacity: 0.3, 
      shadowRadius: 4,
    },
    leftBox:{ 
      flex : 1,
      backgroundColor: '#fff',
      alignContent : "center",
      alignItems : 'center',
    },
    rightBox:{
      flex : 2,
      padding : 8,
    },

    menuTab:{

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
    outBox:{
      width: 335,
      height: 39,
      backgroundColor: "#FF473A",
      borderRadius: 10,
      marginBottom : 12, 
      justifyContent: 'center', 
      alignItems: 'center' 
    },
    outText:{
      fontStyle: 'normal',
      fontSize: 20,
      textAlign: "center",
      color: "#FFFFFF",
    },


  });
  