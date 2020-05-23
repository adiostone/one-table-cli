import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'

import { useNavigation } from '@react-navigation/native';

export default function foodItem(props) {

    const id =props.data.id
    const name =props.data.name 
    const prices =props.data.prices 

    const navigation = useNavigation();

  useEffect(()=>{
   
  })

  return (

          <TouchableOpacity style={styles.listBox} onPress={() => {navigation.navigate("menuDetail",{
            id: id,
            name: name,
            price: prices[0].price,
          })}}>
            <Text style={styles.foodNameText}>{name}</Text>
            <Text style={styles.priceText}>{prices[0].price}원</Text>
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
  fontSize : 18,
},



});
