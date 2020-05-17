import React, { useEffect, useState, useContext , useRef} from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'

import * as SecureStore from 'expo-secure-store';
import axios from 'axios'

import { useNavigation } from '@react-navigation/native';


export default function partyItem(props) {

  const appContext = useContext(AppContext)

  const ws = props.ws;

  const partyID = props.data.id 
  const restaurant = props.data.restaurant 
  const address = props.data.address 
  const capacity = props.data.capacity
  const size = props.data.size
  const partyName =props.data.title

  const navigation = useNavigation();

  useEffect(() => {
    
  });

  function joinParty(){
    if (!ws.current) return;

    const message = { operation: 'joinParty', body: {id : partyID } }
    ws.current.send(JSON.stringify(message))
  }

  return (

          <TouchableOpacity style={styles.listBox} onPress={joinParty}>
            <Text style={styles.restaurantNameText}> {restaurant.name}</Text>
            <Text style={styles.addressText}>{address}</Text>
            <Text style={styles.partyNameText}>{partyName}</Text>
            <Text style={styles.peopleNumberText}>{capacity}</Text>
            <Text style={styles.peopleNumberText}> {size}/{capacity}</Text>
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
