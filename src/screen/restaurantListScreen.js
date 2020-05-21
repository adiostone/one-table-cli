import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,TouchableOpacity,Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { AppContext } from '../context/AppContext'

import BaseTab from "../component/baseTab"

import * as SecureStore from 'expo-secure-store';
import axios from 'axios'

import RestuarantList from "../component/restaurantList"

export default function restuarantListScreen({navigation}) {

    const appContext = useContext(AppContext)

    const [restaurantList, setRestaurantList] = useState([]) 
    const [category, setCategory] = useState("치킨") 

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {

        axios({
          method: 'get',
          url: `https://api.onetable.xyz/v1/table/restaurants?category=${category}`,
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
          if (err && err.response) {
              console.log("failed load restaurant list")
              console.log(err)
              const status = err.response.status
              if (status === 404) {
                // Valid
                console.log('valid tokens')
              }
              else{
                console.log('invalid tokens -> refreshing tokens')
                axios({
                  url: 'https://api.onetable.xyz/v1/table/auth/refresh',
                  method: 'get',
                  headers: {
                    Authorization: `Bearer ${appContext.refreshToken}`,
                  },
                })
                .then(res => {
                  console.log('tokens have been refreshed')
                  // Refresh the tokens and store to the machine again
                  const { access } = res.data
                  console.log(access)
                  const accessToken= access    
                  SecureStore.setItemAsync('accessToken', accessToken)
                  appContext.setAccessToken(accessToken)
                  axios({
                      method: 'get',
                      url: `https://api.onetable.xyz/v1/table/restaurants?category=${category}`,
                      headers: {
                        Authorization: `Bearer ${accessToken}`,
                  }
                  })   
                  .then(res =>{
                      console.log("load restaurant list")
                      console.log(res.data)
                      //set restaurant list
                      setRestaurantList(res.data.restaurants)   
                  })
                })
                // .catch(err =>{
                //   console.log("could't refresh token")
                // })
              }
            }
      })


      });
    
      return unsubscribe;
    }, [navigation]);


    useEffect(() => {

        axios({
            method: 'get',
            url: `https://api.onetable.xyz/v1/table/restaurants?category=${category}`,
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
            if (err && err.response) {
                console.log("failed load restaurant list")
                console.log(err)
                const status = err.response.status
                if (status === 404) {
                  // Valid
                  console.log('valid tokens')
                }
                else{
                  console.log('invalid tokens -> refreshing tokens')
                  axios({
                    url: 'https://api.onetable.xyz/v1/table/auth/refresh',
                    method: 'get',
                    headers: {
                      Authorization: `Bearer ${appContext.refreshToken}`,
                    },
                  })
                  .then(res => {
                    console.log('tokens have been refreshed')
                    // Refresh the tokens and store to the machine again
                    const { access } = res.data
                    console.log(access)
                    const accessToken= access    
                    SecureStore.setItemAsync('accessToken', accessToken)
                    appContext.setAccessToken(accessToken)
                    axios({
                        method: 'get',
                        url: `https://api.onetable.xyz/v1/table/restaurants?category=${category}`,
                        headers: {
                          Authorization: `Bearer ${accessToken}`,
                    }
                    })   
                    .then(res =>{
                        console.log("load restaurant list")
                        console.log(res.data)
                        //set restaurant list
                        setRestaurantList(res.data.restaurants)   
                    })
                  })
                  // .catch(err =>{
                  //   console.log("could't refresh token")
                  // })
                }
              }
        })

    },[category]);

    return (
        <SafeAreaView style={styles.container}>
          <BaseTab/>
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
  