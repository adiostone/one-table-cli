import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
import UserItem from './userItem';


export default function userList(props) {

    const userList =[
            {nickname: "bose1021"},
            {nickname: "dntmdmwl24024"},
        ]

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
        {userList.map((data,i) => {
        return (<UserItem key={i} data={data}/>);
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