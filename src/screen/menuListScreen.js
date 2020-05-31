import React, { useEffect, useState, useContext , useRef} from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Alert,TouchableOpacity,Dimensions, ScrollView, SafeAreaView } from 'react-native';
import MenuList from "../component/menuList"
import { AppContext } from '../context/AppContext'
import { SocketContext } from '../context/SocketContext'

import BaseTab from "../component/baseTab"
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';


export default function menuListScreen({navigation}) {

  const appContext = useContext(AppContext)

  const socketContext = useContext(SocketContext)

  const [menuList, setMenuList] = useState([]) 

  const ws = useRef(socketContext.ws)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

      axios({
        method: 'get',
        url: `https://api.onetable.xyz/v1/table/restaurants/${appContext.restaurantID}`,
        headers: {
          Authorization: `Bearer ${appContext.accessToken}`,
    }
    })   
    .then(res =>{
        console.log("load menu list")
        console.log(res.data)
        //set restaurant list
        setMenuList(res.data.menuCategories)   

    })
    .catch(err =>{
        if (err && err.response) {
            console.log("failed load menu list")
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
                  url: `https://api.onetable.xyz/v1/table/restaurants/${appContext.restaurantID}`,
                  headers: {
                    Authorization: `Bearer ${appContext.accessToken}`,
               }
                })   
                .then(res =>{
                    console.log("load menu list")
                    console.log(res.data)
                    //set restaurant list
                    setMenuList(res.data.menuCategories)  
                })
              })
            }
          }
    })


    });
  
    return unsubscribe;
  }, [navigation]);


  useEffect(() => {
    if (!ws.current || ws.current.readyState === WebSocket.CLOSED) return;

    ws.current.onmessage = e => {
        const message = JSON.parse(e.data);
        console.log("menu List listen")
        console.log(message);
        if(message.operation==="notifyNewMember"){
          Alert.alert(message.body.user.nickname+"가 파티에 참가하셨습니다.")
          appContext.setSize(message.body.size)
        }
        if(message.operation==="notifyOutMember"){
          Alert.alert("파티원 한명이 나갔습니다.")
          appContext.setSize(message.body.size)
        }
        if(message.operation==="ping"){
          const sendMessage = { operation: 'pong'}
          ws.current.send(JSON.stringify(sendMessage))
        }
    };
  });

    return (
        <SafeAreaView style={styles.container}>
          <BaseTab data={"room"}/>
          <MenuList data={menuList}/>
        </SafeAreaView>

    );
  }

  const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
      },

  });
  