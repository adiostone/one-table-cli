import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
import ChatItem from './chatItem';


export default function foodList(props) {

    const chatList=[
                    {nickname: "bose1021",chat: "ㅎㅇ" , time:"12:12"},
                    {nickname: "dntmdwls4398",chat: "ㅎㅇ" , time:"12:12"},
                    {nickname: "bose1021",chat: "뭐먹" , time:"12:13"},
                    {nickname: "dntmdwls4398",chat: "암거나" , time:"12:13"},
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
    <ScrollView style={styles.chatContainer}>
        {chatList.map((data,i) => {
        return (<ChatItem key={i} data={data}/>);
        })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  chatContainer: {
    display : "flex",
    flexDirection: "column",
    alignContent : "stretch",
  },

});
