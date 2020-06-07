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
    const image =props.data.image 
    const isSharing =props.data.isSharing 

    const navigation = useNavigation();

  useEffect(()=>{
   
  })

  return (

          <TouchableOpacity style={styles.listBox} onPress={() => {navigation.navigate("menuDetail",{
            id: id,
            name: name,
            isSharing : isSharing,
            image: image,
            price: prices[0].price,
          })}}>
            <View style={styles.foodNameBox} >
              <Text style={styles.foodNameText}>{name}</Text>
              <View style={styles.sharingBox}>
              {isSharing ===true ?
              (<Text style={styles.sharingText}>공유가능</Text>) : (<Text style={styles.notSharingText}>공유불가능</Text>) 
              }
              </View>
            </View>
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
foodNameBox: {
  flexDirection :"row",
  marginBottom : 5,
},
foodNameText:{
    fontSize : 20,
    fontWeight : "bold",
},
sharingBox: {
  marginLeft : 5,
  padding : 2,
  borderRadius : 5,
  borderWidth: 1,
  borderColor: '#DFDFDF',
},
sharingText:{
  fontSize : 14,
  color : "blue",
},
notSharingText:{
  fontSize : 14,
  color : "red",
},
priceText:{
  fontSize : 18,
},



});
