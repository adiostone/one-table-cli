import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
import BagFoodItem from './bagFoodItem';


export default function bagFoodList() {

    const [bagFoodList, setBagFoodList] = useState({
        data: [
            {name: "후라이드 치킨",price : 5000, quantity : 1/3 , isPublicMenu : true},
            {name: "감자튀김",price : 3000, quantity : 1 , isPublicMenu : false},

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
    <ScrollView style={styles.bagFoodContainer}>
        {bagFoodList.data.map((data) => {
        return (<BagFoodItem data={data}/>);
        })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  bagFoodContainer: {
    display : "flex",
    flexDirection: "column",
    alignContent : "stretch",
  },

});
