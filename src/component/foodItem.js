import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'

import { useNavigation } from '@react-navigation/native';

export default function foodItem(itemData) {

    const [foodName, setFoodName] = useState(itemData.data.name) 
    const [price, setPrice] = useState(itemData.data.price) 

    const navigation = useNavigation();


  useEffect(()=>{
   
  })

  return (

          <TouchableOpacity style={styles.listBox} onPress={() => {navigation.navigate("foodDetail")}}>
            <Text style={styles.foodNameText}> {foodName}</Text>
            <Text style={styles.priceText}>-{price}</Text>
          </TouchableOpacity>        
      
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
priceText:{
  fontSize : 20,
  fontWeight : "bold",
},



});
