import React, { useEffect, useState, useContext , useRef } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,TouchableOpacity,Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { AppContext } from '../context/AppContext'
import LogoButton from "../component/logoButton"
import UserList from "../component/userList"
import axios from 'axios'


export default function roomScreen({route, navigation}) {

  const appContext = useContext(AppContext)

  // const [partyID, setPartyID] = useState(route.params.partyID) 
  const [restaurantID, setRestaurantID] = useState(route.params.restaurantID) 
  const [restaurantName, setRestaurantName] = useState(route.params.restaurantName) 
  const [address, setAddress] = useState(route.params.address) 
  const [capacity, setCapacity] = useState(route.params.capacity);
  const [curPeopleNum, setCurPeopleNum] = useState(route.params.members.length);
  const [partyName, setPartyName] = useState(route.params.title) 

  const [userList, setUserList] = useState(route.params.members) 

  const ws = useRef(null);


  useEffect(() => {

    const wsURL = `wss://dev.api.onetable.xyz/v1/table/party?access=${appContext.accessToken}`
    ws.current = new WebSocket(wsURL)

    ws.current.onopen = () => {
      // const message = { operation: 'getPartyList', body:{} }
      // ws.current.send(JSON.stringify(message))
    };
    
});


useEffect(() => {
  if (!ws.current) return;

  ws.current.onmessage = e => {
      const message = JSON.parse(e.data);
      console.log(message);
      // if(message.operation==="loadParties"){
      //   setPartyList(message.body)
      // }
      // if(message.operation==="notifyNewParty"){
      //   // setPartyList(partyList.append(message.body))
      //   setPartyList([message.body].concat(partyList))
      // }
      // if(message.operation==="deleteParty"){
        
      // }
      if(message.operation==="notifyNewMember"){
        console.log(message.body)
        userList.push(message.body)
        setUserList(userList)
        // setCurPeopleNum(message.body.size)
      }
      // if(message.operation==="ping"){
      //   const sendMessage = { operation: 'pong'}
      //   ws.current.send(JSON.stringify(sendMessage))
      // }

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
  