import React, { useEffect, useState, useContext,useRef } from 'react'
import { StyleSheet, Text, Alert,View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import Constants from 'expo-constants';
import { AppContext } from '../context/AppContext'
import { SocketContext } from '../context/SocketContext'

import * as SecureStore from 'expo-secure-store';
import PartyList from "../component/partyList"
import axios from 'axios'
import LogoButton from "../component/logoButton"

export default function mainScreen({navigation}) {

  const appContext = useContext(AppContext)

  const socketContext = useContext(SocketContext)

  const [partyList, setPartyList]= useState([]) 

  const ws = useRef(socketContext.ws)

  useEffect(() => {
    
      if (!ws.current || ws.current.readyState === WebSocket.CLOSED) {
        console.log("reconnect websocket")
        console.log(appContext.accessToken)
        const wsURL = `wss://api.onetable.xyz/v1/table/party?access=${appContext.accessToken}`
        try {
          const newws = new WebSocket(wsURL)
          socketContext.setws(newws)
          ws.current = newws
          const message = {operation : "getParties" , body : null}    
          ws.current.send(JSON.stringify(message))
        }
        catch(err){
          if (err && err.response) {
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
                const wsURL = `wss://api.onetable.xyz/v1/table/party?access=${accessToken}`
                const newws = new WebSocket(wsURL)
                socketContext.setws(newws)
                ws.current = newws
                const message = {operation : "getParties" , body : null}    
                ws.current.send(JSON.stringify(message))
              })
              .catch(err =>{
                console.log("could't refresh token")
              })
            }
          }
        }

      }
  });

    useEffect(() => {
      if (!ws.current || ws.current.readyState === WebSocket.CLOSED) return;

      ws.current.onmessage = e => {
          const message = JSON.parse(e.data);
          console.log(message);
          if(message.operation==="loadParties"){
            setPartyList(message.body)
          }
          if(message.operation==="notifyNewParty"){
            // setPartyList(partyList.append(message.body))
            setPartyList([message.body].concat(partyList))
          }
          if(message.operation==="notifyChangedPartySize"){
            for (const value of partyList){
              if(value.id===message.body.id){
                value.size = message.body.size
              } 
            } 
          }
          if(message.operation==="updateParty"){
            
          }
          if(message.operation==="ping"){
            const sendMessage = { operation: 'pong'}
            ws.current.send(JSON.stringify(sendMessage))
          }

      };
  });


  // Check if there exists an access token
  // If not, navigate to Google sign in screen
  useEffect(() => {
    SecureStore.getItemAsync('accessToken').then(accessToken => {
      if (!accessToken) {
        navigation.navigate('login')
      } else {
        // Access token exists
        // Check if the token valid
        // if not, refresh tokens
        axios({
          url: 'https://api.onetable.xyz/v1/table/me/profile',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then(res => {
            console.log("load nickname")
            console.log(res.data.nickname)
            //set nickname
            const nickname =res.data.nickname      
            appContext.setNickname(nickname)   
            loadLocationData(); 
          })
          .catch(err => {
            if (err && err.response) {
              console.log(err)
              const status = err.response.status
              if (status === 404) {
                // Valid
                console.log('valid tokens')
              } else {
                console.log('invalid tokens -> refreshing tokens')
                SecureStore.getItemAsync('refreshToken').then(refreshToken => {
                  axios({
                    url: 'https://api.onetable.xyz/v1/table/auth/refresh',
                    method: 'get',
                    headers: {
                      Authorization: `Bearer ${refreshToken}`,
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
                        url: 'https://api.onetable.xyz/v1/table/me/profile',
                        headers: {
                          Authorization: `Bearer ${accessToken}`,
                        },
                      })
                        .then(res => {
                          console.log("load nickname")
                          console.log(res.data.nickname)
                          //set nickname
                          const nickname =res.data.nickname      
                          appContext.setNickname(nickname)   
                          loadLocationData(); 
                        })
                        .catch(err =>{
                          console.log(err)
                        })
                      
                    })
                    .catch(err => {
                      console.log('should login again')
                      navigation.navigate('login')
                    })
                })
              }
            }
          })

        //load user data from expo 

        appContext.setAccessToken(accessToken)
        SecureStore.getItemAsync('refreshToken').then(refreshToken => {
          // console.log(refreshToken)
          appContext.setRefreshToken(refreshToken)
        })
      }
    })
  }, [])

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
    <SafeAreaView style={styles.container}>
        <LogoButton/>
        <ScrollView style={styles.pinContainer}>
          <TouchableOpacity style={styles.locationBox} onPress={() => navigation.navigate('map')}>
            <Text style={styles.locationText}>위치 설정</Text>
          </TouchableOpacity>        
          <TouchableOpacity style={styles.createBox} onPress={() => navigation.navigate('restaurantList')}>
            <Text style={styles.createText}> 파티 만들기</Text>
          </TouchableOpacity>
          <PartyList data={partyList} ws={ws}/>
        </ScrollView>
    </SafeAreaView>
      
  );
}


const styles = StyleSheet.create({
  container: {
    display:"flex",
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  pinContainer: {
    alignSelf: 'center',

  },
  locationBox:{
    width: 335,
    height: 39,
    backgroundColor: "#FFBF75",
    borderRadius: 10,
    marginBottom : 12, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  locationText:{
    fontStyle: 'normal',
    fontSize: 20,
    textAlign: "center",
    color: "#FFFFFF",
  },
  createBox:{
    width: 335,
    height: 39,
    backgroundColor: "#FF8181",
    borderRadius: 10,
    marginBottom : 12, 
    justifyContent: 'center', 
    alignItems: 'center' 

  },
  createText:{
    fontStyle: 'normal',
    fontSize: 20,
    textAlign: "center",
    color: "#FFFFFF",

  },

});
