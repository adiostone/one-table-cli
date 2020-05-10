import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'

import { useNavigation } from '@react-navigation/native';


export default function partyItem(props) {

    const partyID = props.data.id 

    const restaurantName = props.data.name 
    const address = props.data.address 
    const capacity = props.data.capacity
    const curPeopleNum = props.data.curPeopleNum
    const partyName =props.data.partyName 

    const navigation = useNavigation();

  useEffect(()=>{
   

  })

  return (

          <TouchableOpacity style={styles.listBox} onPress={() => {navigation.navigate("room")}}>
            <Text style={styles.restaurantNameText}> {restaurantName}</Text>
            <Text style={styles.addressText}>{address}</Text>
            <Text style={styles.partyNameText}>{partyName}</Text>
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
