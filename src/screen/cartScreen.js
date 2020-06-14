import React, { useEffect, useState, useContext , useRef } from 'react'
import { StyleSheet, Text, View,Button,Alert, Image,TextInput,TouchableOpacity,Dimensions, ScrollView, SafeAreaView } from 'react-native';
import CartList from "../component/cartList"
import BaseTab from "../component/baseTab"
import { AppContext } from '../context/AppContext'
import { SocketContext } from '../context/SocketContext'

export default function cartScreen({navigation}) {

  const appContext = useContext(AppContext)

  const socketContext = useContext(SocketContext)

  const ws = useRef(socketContext.ws)

  const [cartList , setCartList] = useState(appContext.cartList)

  useEffect(() => {
    if (!ws.current || ws.current.readyState === WebSocket.CLOSED) return;

    ws.current.onmessage = e => {
        const message = JSON.parse(e.data);
        console.log("cart listen")
        console.log(message);
        if(message.operation==="replyUpdateMenuInCart"){
          for (let i=0 ; i <appContext.cartList.length; i++){
            if(appContext.cartList[i].id===message.body.updatedMenu.id && appContext.cartList[i].isShared===message.body.updatedMenu.isShared){
              appContext.cartList[i] = message.body.updatedMenu
              appContext.setCartList([...appContext.cartList])
              setCartList([...appContext.cartList])
            } 
          } 
        }
        if(message.operation==="replyDeleteMenuInCart"){
          for (let i=0 ; i <appContext.cartList.length; i++){
            if(appContext.cartList[i].id===message.body.deletedMenu.id && appContext.cartList[i].isShared===message.body.deletedMenu.isShared){
              appContext.cartList.splice(i,1)
              appContext.setCartList([...appContext.cartList])
              setCartList([...appContext.cartList])
            } 
          } 
        }
        //apply all party member 
        if(message.operation==="notifyNewMember"){
          Alert.alert(message.body.user.nickname+"가 파티에 참가하셨습니다.")
          appContext.setUserList([message.body.user].concat(userList))
          appContext.setSize(message.body.size)
        }
        if(message.operation==="notifyOutMember"){
          Alert.alert("파티원 한명이 나갔습니다.")
          appContext.setSize(message.body.size)

          for (let i=0 ; i <appContext.userList.length; i++){
            if(appContext.userList[i].id===message.body.user.id){
              appContext.userList.splice(i,1)
              appContext.setUserList([...appContext.userList])
            } 
          } 

          //user(is host) out so apply new host
          if(message.body.newHost!==undefined){
            console.log("host is change")
            if(appContext.userID===message.body.newHost.id){
              Alert.alert("내가 방장이 되었습니다.")
              appContext.setIsHost(true)
              appContext.setIsReady(false)
            }
          }
        }
        if(message.operation==="notifyKickedOutMember"){
          if(appContext.userID === message.body.user.id){
            //you are kicked out
            console.log("you are kicked out")
            Alert.alert("강퇴 당하셨습니다")
            navigation.replace("main")
          }
          else{
            Alert.alert("파티원 한명이 강퇴당했습니다.")
            appContext.setSize(message.body.size)
            setSize(message.body.size)
          }
        }
        if(message.operation==="notifyNewSharedMenu"){
          Alert.alert("공유메뉴 "+message.body.name+"가 "+message.body.quantity +"개 추가 되었습니다.")
          appContext.setCartList([message.body].concat(appContext.cartList))
          setCartList([message.body].concat(cartList))
        }
        if(message.operation==="notifyUpdateSharedMenu"){
          Alert.alert("공유메뉴 "+message.body.name+"가 "+message.body.quantity +"개로 변경 되었습니다.")
          for (let i=0 ; i <appContext.cartList.length; i++){
            if(appContext.cartList[i].id===message.body.id && appContext.cartList[i].isShared===message.body.isShared){
              appContext.cartList[i] = message.body
              appContext.setCartList([...appContext.cartList])
              setCartList([...appContext.cartList])
            } 
          }       
        }
        if(message.operation==="notifyRefreshSharedCart"){
          for (let i=0 ; i <appContext.cartList.length; i++){
            for(let j=0 ; j <message.body.length; j++){
              if(appContext.cartList[i].id===message.body[j].id && appContext.cartList[i].isShared===message.body[j].isShared){
                appContext.cartList[i] = message.body[j]
                appContext.setCartList([...appContext.cartList])
                setCartList([...appContext.cartList])
              } 
            }
          }       
        }
        if(message.operation==="notifyDeleteSharedMenu"){
          let deletedName = ""
          for (let i=0 ; i <appContext.cartList.length; i++){
            if(appContext.cartList[i].id===message.body.id && appContext.cartList[i].isShared===message.body.isShared){
              deletedName=appContext.cartList[i].name
              appContext.cartList.splice(i,1)
              appContext.setCartList([...appContext.cartList])
              setCartList([...appContext.cartList])
            } 
          } 
          Alert.alert("공유메뉴 "+deletedName+"가 삭제되었습니다")
        }
        if(message.operation==="notifyAllMemberNotReady"){
          appContext.setIsReady(false)
        }
        if(message.operation==="notifyGoToPayment"){
          appContext.setFinalCart(message.body)
          navigation.navigate("confirmOrder")
        }
        //apply all ws 
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
            <View style={styles.cartBox}>
                <Text style={styles.cartText}>장바구니</Text>
            </View>
            <CartList data={cartList}/>
          </ScrollView>
        </SafeAreaView>

    );
  }

  const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex :1 ,
      },
      cartBox:{
        width: 340,
        height: 39,
        backgroundColor: "#FF8181",
        borderRadius: 10,
        marginBottom : 12, 
        justifyContent: 'center', 
        alignItems: 'center', 
        alignSelf:"center"
    
      },
      cartText:{
        fontStyle: 'normal',
        fontSize: 20,
        textAlign: "center",
        color: "#FFFFFF",
    
      },
  

  });
  