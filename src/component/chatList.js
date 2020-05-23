import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
import ChatItem from './chatItem';


export default function chatList(props) {

    const chatList=props.data

    useEffect(() => {
        // addDummyItem()
    },[])

  return (
    <ScrollView style={styles.chatContainer}>
        {chatList.slice(0).reverse().map((data,i) => {
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
