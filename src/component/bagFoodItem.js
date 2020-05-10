import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'

import { useNavigation } from '@react-navigation/native';


export default function bagFoodItem(itemData) {

    const [foodID, setFoodID] = useState(itemData.data.foodID) 
    const [foodName, setFoodName] = useState(itemData.data.name) 
    const [foodPrice, setFoodPrice] = useState(itemData.data.foodPrice) 
    const [totalPrice, setTotalPrice] = useState(itemData.data.totalPrice) 
    const [quantity, setQuantity] = useState(itemData.data.quantity) 
    const [isPublicMenu, setIsPublicMenu] = useState(itemData.data.isPublicMenu) 

    const navigation = useNavigation();

  useEffect(()=>{
   
  })

  return (

      <View style={styles.listBox}>
        <Text style={styles.foodNameText}> {foodName}</Text>
        <Text style={styles.foodPriceText}>음식 가격 :{foodPrice}</Text>
        <Text style={styles.quantityText}>수량 : {quantity}</Text>
        <Text style={styles.totalPriceText}>총 가격 : {totalPrice}</Text>
      </View>        
      
  );
}

const styles = StyleSheet.create({

  listBox: {
    padding : 12,
    borderBottomWidth: 1,
    borderColor: '#DFDFDF',
},
foodNameText:{
    fontSize : 20,
    fontWeight : "bold",
},
quantityText:{
  fontSize : 20,
  fontWeight : "bold",
},
foodPriceText:{
  fontSize : 20,
  fontWeight : "bold",
},
totalPriceText:{
  fontSize : 20,
  fontWeight : "bold",
},



});
