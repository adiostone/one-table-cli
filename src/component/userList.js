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

    
  return (
    <View style={styles.userContainer}>
      <FlatList data={userList} renderItem={({item}) => {
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
