import React, { useEffect, useState, useContext , useRef} from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'

import * as SecureStore from 'expo-secure-store';
import axios from 'axios'

import { useNavigation } from '@react-navigation/native';


export default function partyItem(props) {

  const appContext = useContext(AppContext)

  const ws = props.ws;

  const id = props.data.id 
 
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

    const message = { operation: 'joinParty', body: {id : id } }
    ws.current.send(JSON.stringify(message))
  }

  return (
            <TouchableOpacity style={styles.listBox} onPress={joinParty}>
            <View style={styles.leftBox}>
              <Image source={{uri:(restaurant===undefined)? restaurant:restaurant.icon}} style={styles.imageStyle}/>
            </View>
            <View style={styles.rightBox}>
              <Text style={styles.restaurantNameText}> {(restaurant===undefined)? restaurant:restaurant.name}</Text>
              <Text style={styles.addressText}>{address}</Text>
              <View style={styles.rightBottomBox}>
                <Text style={styles.partyNameText}>{partyName}</Text>
                <Text style={styles.peopleNumberText}> {size}/{capacity}</Text>
              </View>
            </View>
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
  }


});
