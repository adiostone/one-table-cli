import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'

import { useNavigation } from '@react-navigation/native';


export default function bagFoodItem(itemData) {

    const [foodName, setFoodName] = useState(itemData.data.name) 
    const [price, setPrice] = useState(itemData.data.price) 
    const [quantity, setQuantity] = useState(itemData.data.quantity) 
    const [isPublicMenu, setIsPublicMenu] = useState(itemData.data.isPublicMenu) 

    const navigation = useNavigation();


  useEffect(()=>{
   
  })

  return (

      <View style={styles.listBox}>
        <Text style={styles.foodNameText}> {foodName}</Text>
        <Text style={styles.quantityText}>{quantity}</Text>
        <Text style={styles.priceText}>{price}</Text>
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
priceText:{
  fontSize : 20,
  fontWeight : "bold",
},



});
