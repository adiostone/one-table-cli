import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,TouchableOpacity,Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { AppContext } from '../context/AppContext'

import RestuarantList from "../component/restaurantList"
import LogoButton from "../component/logoButton"

import axios from 'axios'



export default function restuarantListScreen({navigation}) {

    const appContext = useContext(AppContext)

    const [restaurantList, setRestaurantList] = useState([]) 
    const [category, setCategory] = useState("치킨") 

    useEffect(() => {

        axios({
            method: 'get',
            url: `https://dev.api.onetable.xyz/v1/table/restaurants?category=${category}`,
            headers: {
              Authorization: `Bearer ${appContext.accessToken}`,
        }
        })   
        .then(res =>{
            console.log("load restaurant list")
            console.log(res.data)
            //set restaurant list
            setRestaurantList(res.data.restaurants)   

        })
        .catch(err =>{
            console.log("failed load restaurant list")
            console.log(err)
        })

    },[category]);

    return (
        <SafeAreaView style={styles.container}>
            <LogoButton/>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.tabButton} onPress={()=> setCategory("치킨")}>
                    <Text style={styles.tabButtonText}>치킨</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton} onPress={()=>  setCategory("분식")}>
                    <Text style={styles.tabButtonText}>분식</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton} onPress={()=>  setCategory("한식")}>
                    <Text style={styles.tabButtonText}>한식</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton} onPress={()=>  setCategory("피자")}>
                    <Text style={styles.tabButtonText}>피자</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton} onPress={()=>  setCategory("중식")}>
                    <Text style={styles.tabButtonText}>중식</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton} onPress={()=>  setCategory("야식")}>
                    <Text style={styles.tabButtonText}>야식</Text>
                </TouchableOpacity>
            </View>
            <RestuarantList data={restaurantList}/>
        </SafeAreaView>

        
    );
  }
  
  
  const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
      },
    buttonContainer: {
      display : "flex",
      flexDirection: "row",
      alignContent : "stretch",
    },
    tabButton: {
        paddingLeft : 12,
        paddingRight : 12,
        paddingBottom : 10,
        borderBottomWidth: 1,
        borderColor: '#888888',

    },
    tabButtonText:{
        fontSize : 22,
        fontWeight : "bold",
    },
  });
  