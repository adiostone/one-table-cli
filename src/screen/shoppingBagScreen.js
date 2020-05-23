import React, { useEffect, useState, useContext , useRef } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,TouchableOpacity,Dimensions, ScrollView, SafeAreaView } from 'react-native';
import BagFoodList from "../component/bagFoodList"
import BaseTab from "../component/baseTab"
import { AppContext } from '../context/AppContext'
import { SocketContext } from '../context/SocketContext'

export default function shoppingBagScreen({navigation}) {

  const appContext = useContext(AppContext)

  const socketContext = useContext(SocketContext)

  const ws = useRef(socketContext.ws)

  const [bagFoodList , setBagFoodList] = useState(appContext.bagFoodList)

  useEffect(() => {
    if (!ws.current || ws.current.readyState === WebSocket.CLOSED) return;

    ws.current.onmessage = e => {
        const message = JSON.parse(e.data);
        console.log("shopping bag listen")
        console.log(message);
        if(message.operation==="replyUpdateShoppingBag"){
          for (let i=0 ; i <bagFoodList.length; i++){
            if(bagFoodList[i].id===message.body.id){
              bagFoodList[i] = message.body
              SetBagFoodList([...bagFoodList])
            } 
          } 
          for (let i=0 ; i <appContext.bagFoodList.length; i++){
            if(appContext.bagFoodList[i].id===message.body.id){
              appContext.bagFoodList[i] = message.body
              SetBagFoodList([...appContext.bagFoodList])
            } 
          } 
        }
        if(message.operation==="replyDeleteShoppingBag"){
          for (let i=0 ; i <bagFoodList.length; i++){
            if(bagFoodList[i].id===message.body.id){
              bagFoodList.splice(i,1)
              SetBagFoodList([...bagFoodList])
            } 
          } 
          for (let i=0 ; i <appContext.bagFoodList.length; i++){
            if(appContext.bagFoodList[i].id===message.body.id){
              appContext.bagFoodList.splice(i,1)
              SetBagFoodList([...appContext.bagFoodList])
            } 
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
          <BaseTab data={"room"}/>
          <ScrollView style={styles.scrollBox}>
            <View style={styles.shoppingBagBox}>
                <Text style={styles.shoppingBagText}>장바구니</Text>
            </View>
            <BagFoodList data={bagFoodList}/>
            <TouchableOpacity style={styles.shoppingBagBox}>
                <Text style={styles.shoppingBagText}>주문하기</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>

    );
  }

  const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
      },
      shoppingBagBox:{
        width: 335,
        height: 39,
        backgroundColor: "#FF8181",
        borderRadius: 10,
        marginBottom : 12, 
        justifyContent: 'center', 
        alignItems: 'center', 
        alignSelf:"center"
    
      },
      shoppingBagText:{
        fontStyle: 'normal',
        fontSize: 20,
        textAlign: "center",
        color: "#FFFFFF",
    
      },
  

  });
  