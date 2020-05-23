import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'

import { useNavigation } from '@react-navigation/native';



export default function restaurantItem(props) {

    const id =props.data.id 
    const icon =props.data.icon 
    const category =props.data.category 
    const name = props.data.name 
    const deliveryFee =props.data.deliveryFee 
    const minOrderPrice =props.data.minOrderPrice 

    const navigation = useNavigation();

  return (

        <TouchableOpacity style={styles.restaurantButton}  onPress={() => {navigation.navigate("roomDetailSetting",{
          id: id,
          name: name,
        })}}>
          <View style={styles.leftBox}>
            <Image source={{uri:icon}} style={styles.imageStyle}/>
          </View>
          <View style={styles.rightBox}>
            <Text style={styles.restaurantNameText}>{name}</Text>
            <Text style={styles.restaurantDetailText}>최소주문금액 {minOrderPrice}원</Text>
          </View>
        </TouchableOpacity>
      
  );
}


const styles = StyleSheet.create({

  restaurantButton: {
    paddingTop : 10,
    paddingBottom : 10,
    borderBottomWidth: 1,
    borderColor: '#DFDFDF',
    display : "flex",
    flexDirection : "row"
},
leftBox:{ 
  marginLeft : 10,
  flex : 1,
},
rightBox:{
  marginLeft : 10,
  flex : 4,
  justifyContent : "center"
},
imageStyle:{
  width: 60,
  height :60,
  borderRadius : 10,
  borderWidth : 1,
  borderColor : "#DFDFDF",
  alignSelf : "center"

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
