import React, { useEffect, useState, useContext , useRef} from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'

import { useNavigation } from '@react-navigation/native';


export default function partyItem(props) {

  const appContext = useContext(AppContext)

  const ws = useRef(null);

  const partyID = props.data.id 
  const restaurantName = props.data.restaurantName 
  const address = props.data.address 
  const capacity = props.data.capacity
  const curPeopleNum = props.data.curPeopleNum
  const partyName =props.data.title

  const navigation = useNavigation();

  useEffect(() => {

    const wsURL = `wss://dev.api.onetable.xyz/v1/table/party?access=${appContext.accessToken}`
    ws.current = new WebSocket(wsURL)

    ws.current.onopen = () => {
    };
    
  });

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = e => {
        const message = JSON.parse(e.data);
        console.log(message);
        if(message.operation==="notifySuccessJoin"){
          appContext.setPartyID(partyID)
          appContext.setRestaurantID(message.body.restaurantID)
          appContext.setRestaurantName(restaurantName)
          message.body["partyID"] = partyID
          message.body["restaurantName"] = restaurantName
          console.log(message.body)
          navigation.navigate("room",message.body)
        }
    };
  });

  function joinParty(){
    if (!ws.current) return;

    const message = { operation: 'joinParty', body: {id : partyID } }
    ws.current.send(JSON.stringify(message))
  }

  return (

          <TouchableOpacity style={styles.listBox} onPress={joinParty}>
            <Text style={styles.restaurantNameText}> {restaurantName}</Text>
            <Text style={styles.addressText}>{address}</Text>
            <Text style={styles.partyNameText}>{partyName}</Text>
            <Text style={styles.peopleNumberText}>{capacity}</Text>
            {/* <Text style={styles.peopleNumberText}> {curPeopleNum}/{capacity}</Text> */}
          </TouchableOpacity>        
      
  );
}


const styles = StyleSheet.create({
  container: {
    display:"flex",
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },

  listContainer:{
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
  }


});
