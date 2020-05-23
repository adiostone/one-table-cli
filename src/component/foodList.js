import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
import FoodItem from './foodItem';


export default function foodList(props) {

    const foodList=props.data

    useEffect(() => {
        // addDummyItem()
    },[])

  return (
    <View style={styles.foodContainer}>
        {foodList.map((data,i) => {
        return (<FoodItem key={i} data={data}/>);
        })}
    </View>
  );
}

const styles = StyleSheet.create({

  foodContainer: {
    display : "flex",
    flexDirection: "column",
    alignContent : "stretch",
  },

});
