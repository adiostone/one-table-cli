import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'

import { useNavigation } from '@react-navigation/native';


export default function bagFoodItem(props) {

    const foodID = props.data.foodID 
    const foodName = props.data.name
    const foodPrice = props.data.foodPrice
    const totalPrice = props.data.totalPrice 
    const quantity = props.data.quantity
    const isPublicMenu = props.data.isPublicMenu

    const navigation = useNavigation();

  useEffect(()=>{
   
  })

  return (

      <View style={styles.listBox}>
        <View> 
          <Text style={styles.foodNameText}>{foodName}</Text>
        </View>
        <Text style={styles.foodPriceText}>{foodPrice}원</Text>
        <Text style={styles.quantityText}>수량 : {quantity}</Text>
        {(isPublicMenu===true) ? 
        (<Text style={styles.blueText}>{totalPrice}원</Text>) :
        (<Text style={styles.redText}>{totalPrice}원</Text>)
        }
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
  fontSize : 14,
},
foodPriceText:{
  fontSize : 14
},
blueText:{
  fontSize : 14,
  color : "blue"
},
redText:{
  fontSize : 14,
  color : "red"

},



});
