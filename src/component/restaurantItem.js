import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'

import { useNavigation } from '@react-navigation/native';



export default function restaurantItem(props) {

    const restaurantID =props.data.id 
    const category =props.data.category 
    const restaurantName = props.data.name 
    const deliveryFee =props.data.deliveryFee 
    const minOrderPrice =props.data.minOrderPrice 

    const navigation = useNavigation();

  return (

        <TouchableOpacity style={styles.restaurantButton}  onPress={() => {navigation.navigate("roomDetailSetting",{
          restaurantID: restaurantID,
          restaurantName: restaurantName,
        })}}>
        <Text style={styles.restaurantNameText}>{restaurantName}</Text>
        <Text style={styles.restaurantDetailText}>최소주문금액 {minOrderPrice}원</Text>
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
