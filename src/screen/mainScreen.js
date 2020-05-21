import React, { useEffect, useState, useContext,useRef } from 'react'
import { StyleSheet, Text, Alert,View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import Constants from 'expo-constants';
import { AppContext } from '../context/AppContext'
import { SocketContext } from '../context/SocketContext'

import LogoButton from "../component/logoButton"

import * as SecureStore from 'expo-secure-store';
import axios from 'axios'

import PartyList from "../component/partyList"

export default function mainScreen({navigation}) {

  const appContext = useContext(AppContext)

  const socketContext = useContext(SocketContext)

  const [partyList, setPartyList]= useState([]) 

  const ws = useRef(socketContext.ws)

  useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {

    if (ws.current && ws.current.readyState === WebSocket.OPEN){
      console.log("getPartyList")
      const message = { operation: 'getPartyList', body: {} }
      ws.current.send(JSON.stringify(message))
    }

  });

  return unsubscribe;
}, [navigation]);


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

      ws.current.onopen = e => {
        console.log("getPartyList")
        const message = { operation: 'getPartyList', body: {} }
        ws.current.send(JSON.stringify(message))
      }


      ws.current.onmessage = e => {
          const message = JSON.parse(e.data);
          console.log("main listen")
          console.log(message);
          if(message.operation==="replyGetPartyList"){
            setPartyList(message.body)
          }
          if(message.operation==="notifyNewParty"){
            setPartyList([message.body].concat(partyList))
          }
          if(message.operation==="notifyDeleteParty"){
            for (let i=0 ; i < partyList.length; i++){
              if(partyList[i].id===message.body.id){
                partyList.splice(i,1)
                setPartyList([...partyList])
              } 
            } 
          }
          if(message.operation==="notifyUpdateParty"){
            
          }
          if(message.operation==="notifyChangedPartySize"){
            for (let i=0 ; i < partyList.length; i++){
              if(partyList[i].id===message.body.id){
                partyList[i] = message.body.size
                setPartyList([...partyList])
              } 
            } 
          }
          if(message.operation==="replyJoinParty"){
            if(message.body.isSuccess===true){
              console.log("join Success")
              navigation.navigate("room")
            }
            else{
              console.log("join failed")
            }
          }
          if(message.operation==="ping"){
            const sendMessage = { operation: 'pong'}
            ws.current.send(JSON.stringify(sendMessage))
          }

      };
  });


  return (
    <SafeAreaView style={styles.container}>
        <LogoButton/>
        <ScrollView style={styles.pinContainer}>
          <TouchableOpacity style={styles.locationBox} onPress={() => navigation.navigate('map')}>
            <Text style={styles.locationText}>위치 설정</Text>
          </TouchableOpacity>        
          <TouchableOpacity style={styles.createBox} onPress={() => navigation.navigate('restaurantList')}>
            <Text style={styles.createText}>파티 만들기</Text>
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
