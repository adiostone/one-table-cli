import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,TouchableOpacity,Dimensions, ScrollView, SafeAreaView } from 'react-native';
import LogoButton from "../component/logoButton"
import { AppContext } from '../context/AppContext'

export default function foodDetailScreen({route, navigation}) {

  const appContext = useContext(AppContext)

  const [foodID, setFoodID] = useState(route.params.foodID) 
  const [foodName, setFoodName] = useState(route.params.foodName) 
  const [foodPrice, setFoodPrice] = useState(route.params.foodPrice) 
  const [totalPrice, setTotalPrice] = useState(route.params.foodPrice) 
  const [quantity, setQuantity] = useState(1) 
  const [isPublicMenu, setIsPublicMenu] = useState(false) 

    return (
        <SafeAreaView style={styles.container}>
          <LogoButton/>
          <View style={styles.listBox}>
            <Text style={styles.foodNameText}> {foodName}</Text>
            <Text style={styles.foodPriceText}>음식 가격 : {foodPrice}</Text>
            <Text style={styles.quantityText}>수량 : {quantity}</Text>
            <Text style={styles.totalPriceText}>총 가격 : {totalPrice}</Text>
          </View>  
        </SafeAreaView>
  

    );
  }

  const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
      },
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
  