import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
import PartyItem from './partyItem';


export default function partyList(props) {

    const partyList = props.data

    useEffect(() => {
        // addDummyItem()
    },[])

  return (
    <ScrollView style={styles.listContainer}>
    {partyList.map((data, i) => {
        return (<PartyItem key={i} data={data}/>);
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
