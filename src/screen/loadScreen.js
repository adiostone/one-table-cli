import React, { useEffect, useState, useContext,useRef } from 'react'
import { StyleSheet,Vibration, Text, Alert,View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import Constants from 'expo-constants';
import { AppContext } from '../context/AppContext'
import { SocketContext } from '../context/SocketContext'

import LogoButton from "../component/logoButton"

import * as SecureStore from 'expo-secure-store';
import axios from 'axios'


import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export default function loadScreen({navigation}) {


  const [expoPushToken,setExpoPushToken] = useState()
  const [notification,setNotification] = useState()

  useEffect(() => {
    registerForPushNotificationsAsync();
  },[]);

  useEffect(() => {
    Notifications.addListener(handleNotification);
  });

   function handleNotification(notification){
    if(notification.data.operation==="acceptOrder"){

    }
    if(notification.data.operation==="refuseOrder"){
      navigation.replace("main")
    }
    if(notification.data.operation==="startDelivery"){
      appContext.setIsDelivered(true)      
    }
    if(notification.data.operation==="createParty"){
      
    }

  };

  async function registerForPushNotificationsAsync(){
    // if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      console.log("existingStatus")
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
        console.log("finalStatus")
      }
      if (finalStatus !== 'granted') {
        // alert('Failed to get push token for push notification!');
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      console.log(token)
      setExpoPushToken(token);
      appContext.setExpoPushToken(token)
    // } else {
    //   alert('Must use physical device for Push Notifications');
    // }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };


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
      SetError(true)
      navigation.navigate('login')
    } 
    else {

        try {
            const res =await axios({
                url: 'https://api.onetable.xyz/v1/table/me/profile',
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }) 
              appContext.setAccessToken(accessToken)
              console.log(res.data)
              console.log("load nickname and id")
              //set nickname and id
              const nickname =res.data.nickname      
              const id =res.data.id     
              const pushToken =res.data.pushToken    
              const isHungry =res.data.isHungry  

              appContext.setIsHungry(isHungry)    
              appContext.setNickname(nickname)   
              appContext.setUserID(id)   

              if(pushToken===null){
                console.log("you need to update pushToken")
                const resultData1 =  await axios({
                  method: 'patch',
                  url: 'https://api.onetable.xyz/v1/table/me/profile',
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                  data :  {
                    "pushToken" : appContext.expoPushToken
                  }

              })
            }

              await loadLocationData(); 
              console.log("connect Websocket")
              console.log(accessToken)
              const wsURL = `wss://api.onetable.xyz/v1/table/party?access=${accessToken}`
              const newws = new WebSocket(wsURL)
              await socketContext.setws(newws)

              const refresh = await SecureStore.getItemAsync('refreshToken')
              appContext.setRefreshToken(refresh)              
              SetEveryThingIsGood(true)
            
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
                            url: 'https://api.onetable.xyz/v1/table/auth/refresh',
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
                            url: 'https://api.onetable.xyz/v1/table/me/profile',
                            headers: {
                              Authorization: `Bearer ${accessToken}`,
                            },
                          })
                          console.log(resultData.data)
                          console.log("load nickname and id")
                          //set nickname and id
                          const nickname =resultData.data.nickname    
                          const id =resultData.data.id  
                          const pushToken =resultData.data.pushToken    
                          const isHungry =resultData.data.isHungry 
                          
                          if(pushToken===null){
                            console.log("you need to update pushToken")
                            const resultData1 =  await axios({
                              method: 'patch',
                              url: 'https://api.onetable.xyz/v1/table/me/profile',
                              headers: {
                                Authorization: `Bearer ${accessToken}`,
                              },
                              data :  {
                                "pushToken" : appContext.expoPushToken
                              }

                            })

                          }
    
                          appContext.setNickname(nickname)   
                          appContext.setUserID(id)   
                          appContext.setIsHungry(isHungry)    
                          await loadLocationData(); 

                          appContext.setRefreshToken(refreshToken)
                          console.log("connect Websocket")
                          console.log(accessToken)
                          const wsURL = `wss://api.onetable.xyz/v1/table/party?access=${accessToken}`
                          const newws = new WebSocket(wsURL)
                          await socketContext.setws(newws)
                          SetEveryThingIsGood(true)
                        
                    } 
                    catch (error) {                        
  
                        console.log('should login again')
                        SetError(true)
                        navigation.navigate('login')
                        
                    }
                }
              }
            
        }

  }
  
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
