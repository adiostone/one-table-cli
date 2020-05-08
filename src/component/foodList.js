import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
import FoodItem from './foodItem';


export default function foodList() {

    const [foodList, setFoodList] = useState({
        data: [
            {name: "후라이드 치킨",price : 15000},
            {name: "후라이드 치킨 순살",price : 18000},
            {name: "양념 치킨", price : 16000},
            {name: "양념 치킨 순살",price : 19000},
            {name: "스노윙 치킨", price : 16000},
            {name: "스노윙 치킨 순살",price : 19000},
            {name: "파닭", price : 16000},
            {name: "파닭 순살",price : 19000},
            {name: "후라이드 반 양념 반", price : 16000},
            {name: "후라이드 반 양념 반 순살",price : 19000},

        ]
    });

    useEffect(() => {
        // addDummyItem()
    },[])


    // function addDummyItem(){
    //     setRestaurantList({
    //         data: [
    //             {name: "네네 치킨",deliveryFee: 2000 ,atLeastMoney: 15000},
    //             {name: "비비큐", deliveryFee: 3000 ,atLeastMoney: 16000},
    //             {name: "굽네 치킨", deliveryFee: 2000 ,atLeastMoney: 15000},
    //             {name: "호식이 두마리", deliveryFee: 1000 ,atLeastMoney: 14000},
    //         ]
    //     });
    // }

  return (
    <ScrollView style={styles.foodContainer}>
        {foodList.data.map((data) => {
        return (<FoodItem data={data}/>);
        })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  foodContainer: {
    display : "flex",
    flexDirection: "column",
    alignContent : "stretch",
  },

});
