import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
import FoodList from './foodList';


export default function menuList(props) {

    const menuList=props.data

    useEffect(() => {
    },[])

  return (
    <ScrollView style={styles.foodContainer}>
        {
        menuList.map((data,i) => {
        return (
        <View>
          <View style={styles.menuTab}>
            <Text style={styles.menuText}>{data.name}</Text>
          </View>
          <FoodList key={i} data={data.menus}/>
        </View>
        );
        })
        }
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  foodContainer: {
    display : "flex",
    flexDirection: "column",
    alignContent : "stretch",
  },

  menuTab: {
    backgroundColor : "#F3F1F1",
    padding : 12,
    borderBottomWidth: 1,
    borderColor: '#DFDFDF',

  },

  menuText: {

    fontSize : 20,
    fontWeight : "bold",

  },

});
