import React, { useEffect, useState, useContext,useRef } from 'react'
import { StyleSheet, Text, Alert,View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import Constants from 'expo-constants';
import { AppContext } from '../context/AppContext'
import { SocketContext } from '../context/SocketContext'

import LogoButton from "../component/logoButton"

import * as SecureStore from 'expo-secure-store';
import axios from 'axios'


export default function loadScreen({navigation}) {

  const appContext = useContext(AppContext)

  const socketContext = useContext(SocketContext)

  const [everyThingIsGood, SetEveryThingIsGood] = useState(false)
  const [error, SetError] = useState(false)


  useEffect(()=>{

    if(everyThingIsGood ===true && error===false){
        navigation.navigate("main")
    }

  },[everyThingIsGood])

  useEffect(() => {
            
    loadAllData()

  },[]);
   

  async function loadAllData(){

    const accessToken = await SecureStore.getItemAsync('accessToken')
    if (!accessToken) {
        navigation.navigate('login')
    } 
    else {

        try {
            const res =await axios({
                url: 'https://dev.api.onetable.xyz/v1/table/me/profile',
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }) 
              appContext.setAccessToken(accessToken)
              console.log("load nickname")
              console.log(res.data.nickname)
              //set nickname
              const nickname =res.data.nickname      
              appContext.setNickname(nickname)   
              await loadLocationData(); 
            
        } 
        catch (err) {

            if (err && err.response) {
                console.log(err)
                const status = err.response.status
                if (status === 404) {
                  // Valid
                  console.log('valid tokens')
                } 
                else {
                    console.log('invalid tokens -> refreshing tokens')
                   const refreshToken = await SecureStore.getItemAsync('refreshToken')
                    try {

                        const result = await axios({
                            url: 'https://dev.api.onetable.xyz/v1/table/auth/refresh',
                            method: 'get',
                            headers: {
                              Authorization: `Bearer ${refreshToken}`,
                            },
                          })
                        console.log('tokens have been refreshed')
                        // Refresh the tokens and store to the machine again
                        const { access } = result.data
                        console.log(access)
                        const accessToken= access    
                        SecureStore.setItemAsync('accessToken', accessToken)
                        appContext.setAccessToken(accessToken)
                        const resultData =  await axios({
                            url: 'https://dev.api.onetable.xyz/v1/table/me/profile',
                            headers: {
                              Authorization: `Bearer ${accessToken}`,
                            },
                          })
                          console.log("load nickname")
                          console.log(resultData.data.nickname)
                          //set nickname
                          const nickname =resultData.data.nickname      
                          appContext.setNickname(nickname)   
                          await loadLocationData(); 
                        
                    } 
                    catch (error) {                        
  
                        console.log('should login again')
                        navigation.navigate('login')
                        
                    }
                }
              }
            
        }

  }
  const refresh = await SecureStore.getItemAsync('refreshToken')
  appContext.setRefreshToken(refresh)
  console.log("connect Websocket")
  console.log(accessToken)
  const wsURL = `wss://dev.api.onetable.xyz/v1/table/party?access=${accessToken}`
  const newws = new WebSocket(wsURL)
  await socketContext.setws(newws)
  SetEveryThingIsGood(true)
}

  async function loadLocationData(){
    const locationIsSet = await SecureStore.getItemAsync('locationIsSet')
    console.log("load location data")
    if(locationIsSet==="true"){
      console.log("you have location information")
      appContext.setLocationIsSet(locationIsSet)
      appContext.setLocation(JSON.parse(await SecureStore.getItemAsync('location')))
      appContext.setMapRegion(JSON.parse(await SecureStore.getItemAsync('mapRegion')))
      appContext.setFormattedAddress(await SecureStore.getItemAsync('formattedAddress'))
      appContext.setDetailAddress(await SecureStore.getItemAsync('detailAddress'))
    }
    else{
      console.log("you don't have location information")
    }
  }


  return (
    <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>로딩중</Text>
    </View>
      
  );
}


const styles = StyleSheet.create({
    loadingContainer:{
        height :  650,
        justifyContent: 'center', 
        alignItems: 'center' ,
        alignSelf: 'center',
    
    },
    loadingText:{
        fontSize: 50,
        textAlign: "center",
    
    },

});
