import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
import RestaurantItem from './restaurantItem';


export default function restaurantList(props) {

    const restaurantList = props.data

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
    <ScrollView style={styles.restaurantContainer}>
      {
        restaurantList.map((data,i) => {
        return (<RestaurantItem key={i} data={data}/>);
        })
      }
    </ScrollView>
  );
}


const styles = StyleSheet.create({

  restaurantContainer: {
    display : "flex",
    flexDirection: "column",
    alignContent : "stretch",
  },

});
