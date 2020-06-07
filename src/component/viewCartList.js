import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
import ViewCartItem from './viewCartItem';


export default function viewCartList(props) {

    const cartList = props.data

    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {

      let totalPrice = 0 
      cartList.forEach((item)=>{
        totalPrice = totalPrice + item.pricePerCapita
      }) 
      setTotalPrice(totalPrice)
    },[cartList])

  return (
    <ScrollView style={styles.cartContainer}>
      {
        cartList.map((data,i) => {
        return (<ViewCartItem key={i} data={data}/>);
      })}
      <View style={styles.totalPriceBox}>
        <View style={styles.leftBox}>
          <Text style={styles.totalPriceText}>총 주문금액</Text>
        </View>
        <View style={styles.rightBox}>
          <Text style={styles.totalPriceText}>{totalPrice}원</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({


  cartContainer: {
    display : "flex",
    flexDirection: "column",
    alignContent : "stretch",
  },
    totalPriceBox: {

      display : "flex",
      flexDirection : "row",
      height : 60 ,
      alignItems : "center"
  },
  leftBox: {
    flex : 5,
    marginLeft :30,
},
rightBox: {
  flex : 2,
},
totalPriceText: {

  fontStyle: 'normal',
  fontSize: 18,
  color: "red",
},


});
