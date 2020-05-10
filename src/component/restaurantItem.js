import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'

import { useNavigation } from '@react-navigation/native';



export default function restaurantItem(itemData) {

    const [restaurantID, setRestaurantID] = useState(itemData.data.ID) 
    const [restaurantGenre, setRestaurantGenre] = useState(itemData.data.genre) 
    const [restaurantName, setRestaurantName] = useState(itemData.data.name) 
    const [deliveryFee, setDeliveryFee] = useState(itemData.data.deliveryFee) 
    const [atLeastMoney, setAtLeastMoney] = useState(itemData.data.atLeastMoney) 

    const navigation = useNavigation();


  return (

        <TouchableOpacity style={styles.restaurantButton}  onPress={() => {navigation.navigate("roomDetailSetting",{
          restaurantID: restaurantID,
          restaurantName: restaurantName,
        })}}>
        <Text style={styles.restaurantNameText}>{restaurantName}</Text>
        {/* <Text style={styles.restaurantDetailText}>배달팁{deliveryFee} 최소주문금액 {atLeastMoney}원</Text> */}
        </TouchableOpacity>
      
  );
}


const styles = StyleSheet.create({

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
