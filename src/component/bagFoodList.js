import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
import BagFoodItem from './bagFoodItem';


export default function bagFoodList(props) {

    const bagFoodList = [
            {name: "후라이드 치킨",foodPrice : 15000, quantity : 1 ,totalPrice: 5000,size : 3 ,isPublicMenu : true},
            {name: "감자튀김",foodPrice : 3000, quantity : 1 ,totalPrice: 3000, size : 1 ,isPublicMenu : false},

        ]

    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {

      let price = 0 
      bagFoodList.forEach((item)=>{
        price = price + item.totalPrice
      }) 
      setTotalPrice(price)
    },[])

  return (
    <ScrollView style={styles.bagFoodContainer}>
      {
        bagFoodList.map((data,i) => {
        return (<BagFoodItem key={i} data={data}/>);
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


  bagFoodContainer: {
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

    marginLeft :40,
    marginRight :130,
},
totalPriceText: {

  fontStyle: 'normal',
  fontSize: 18,
  color: "red",
},


});
