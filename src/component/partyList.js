import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
import PartyItem from './partyItem';


export default function restaurantList() {

    const [partyList, setPartyList] = useState({
        data: [

            {name: "네네 치킨 중앙대점",address: "중앙대 309관" ,roomName: "치즈 스노윙먹어요"},
            {name: "엽기 떡볶이 중앙대점",address: "중앙대 308관" ,roomName: "엽떡반띵하실분"},
            {name: "교촌 치킨 중앙대점",address: "중앙대 309관" ,roomName: "교촌 ㄲㄲ"},

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
