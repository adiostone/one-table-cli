import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
import PartyItem from './partyItem';


export default function restaurantList() {

    const [partyList, setPartyList] = useState({
        data: [
            {name: "네네 치킨",address: 2000 ,roomName: 15000},
            {name: "네네 치킨",address: 2000 ,roomName: 15000},
            {name: "네네 치킨",address: 2000 ,roomName: 15000},
            {name: "네네 치킨",address: 2000 ,roomName: 15000},
            {name: "네네 치킨",address: 2000 ,roomName: 15000},

        ]
    });

    useEffect(() => {
        // addDummyItem()
    },[])


    // function addDummyItem(){
    //     setRestaurantListData({
    //         data: [
    //             {name: "네네 치킨",deliveryFee: 2000 ,atLeastMoney: 15000},
    //             {name: "비비큐", deliveryFee: 3000 ,atLeastMoney: 16000},
    //             {name: "굽네 치킨", deliveryFee: 2000 ,atLeastMoney: 15000},
    //             {name: "호식이 두마리", deliveryFee: 1000 ,atLeastMoney: 14000},
    //         ]
    //     });
    // }

  return (
    <ScrollView style={styles.listContainer}>
    {partyList.data.map((data) => {
        return (<PartyItem data={data}/>);
        })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display:"flex",
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },

  listContainer:{
    alignSelf: 'center',
  },
});
