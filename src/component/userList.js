import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, FlatList, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
import UserItem from './userItem';


export default function userList(props) {

    const userList = props.data

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
    <View style={styles.userContainer}>
      <FlatList data={userList} renderItem={({item}) => {
        console.log(item)
          return (<View style={{flexDirection: 'row', margin: 5 }}>
            <UserItem data={item}/>
          </View>)
        }}
          //Setting the number of column
          numColumns={2}
          keyExtractor={item => item.id}
        />
    </View>
  );
}

const styles = StyleSheet.create({

  userContainer: {
    justifyContent: 'center',
  },

});
