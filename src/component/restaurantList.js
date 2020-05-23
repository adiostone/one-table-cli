import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
import RestaurantItem from './restaurantItem';


export default function restaurantList(props) {

    const restaurantList = props.data

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
