import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'


export default function restaurantItem(itemData) {

    const [restaurantName, setRestaurantName] = useState(itemData.data.name) 
    const [deliveryFee, setDeliveryFee] = useState(itemData.data.deliveryFee) 
    const [atLeastMoney, setAtLeastMoney] = useState(itemData.data.atLeastMoney) 

  return (

        <TouchableOpacity style={styles.restaurantButton}>
        <Text style={styles.restaurantNameText}>{restaurantName}</Text>
        <Text style={styles.restaurantDetailText}>배달팁{deliveryFee} 최소주문금액 {atLeastMoney}원</Text>
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

  restaurantButton: {
    padding : 12,
    borderBottomWidth: 1,
    borderColor: '#DFDFDF',
},
restaurantNameText:{
    fontSize : 20,
    fontWeight : "bold",
},
restaurantDetailText:{
  fontSize : 14,
  color: "gray",
},



});
