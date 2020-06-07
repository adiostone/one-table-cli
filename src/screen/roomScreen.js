import React, { useEffect, useState, useContext , useRef } from 'react'
import { StyleSheet, Text, View,Button, Image,Alert,TextInput,TouchableOpacity,Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { AppContext } from '../context/AppContext'
import { SocketContext } from '../context/SocketContext'

import LogoButton from "../component/logoButton"
import UserList from "../component/userList"
import axios from 'axios'


export default function roomScreen({navigation}) {

  const appContext = useContext(AppContext)

  const socketContext = useContext(SocketContext)

  // const [partyID, setPartyID] = useState(route.params.partyID) 
  const [restaurantID, setRestaurantID] = useState() 
  const [restaurantName, setRestaurantName] = useState() 
  const [address, setAddress] = useState() 
  const [capacity, setCapacity] = useState();
  const [size, setSize] = useState();
  const [title, setTitle] = useState() 
  const [image, setImage] = useState()
  const [minOrderPrice, setMinOrderPrice] = useState(0)

  const [isHost, setIsHost] = useState(appContext.isHost)
  const [isReady, setIsReady] = useState(appContext.isReady)
  const [isEnter, setIsEnter] = useState(appContext.isEnter)

  const [totalPrice, setTotalPrice] = useState(0)
  
  const [userList, setUserList] = useState([]) 

  const ws = useRef(socketContext.ws)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

      if (!ws.current) return;
      console.log("getMyPartyMetadata")
      const message1 = { operation: 'getMyPartyMetadata', body: {} }
      ws.current.send(JSON.stringify(message1))
      console.log("getMyPartyMemberList")
      const message2 = { operation: 'getMyPartyMemberList', body: {} }
      ws.current.send(JSON.stringify(message2))
      console.log(isEnter)
      if(isEnter===false){
        const message3 = { operation: 'getSharedCart', body: {} }
        ws.current.send(JSON.stringify(message3))
        setIsEnter(true)
        appContext.setIsEnter(true)
      }
    });
  
    return unsubscribe;
  }, [navigation]);



useEffect(() => {
  if (!ws.current) return;


  ws.current.onopen = e => {
    console.log("getMyPartyMetadata")
    const message1 = { operation: 'getMyPartyMetadata', body: {} }
    ws.current.send(JSON.stringify(message1))
    console.log("getMyPartyMemberList")
    const message2 = { operation: 'getMyPartyMemberList', body: {} }
    ws.current.send(JSON.stringify(message2))
    if(isEnter===false){
      console.log("getSharedCart")
      const message3 = { operation: 'getSharedCart', body: {} }
      ws.current.send(JSON.stringify(message3))
      setIsEnter(true)
      appContext.setIsEnter(true)
    }
  }


  ws.current.onmessage = e => {
      const message = JSON.parse(e.data);
      console.log("room listen");
      console.log(message);
      if(message.operation==="replyGetMyPartyMetadata"){
        setAddress(message.body.address)
        setCapacity(message.body.capacity)
        setRestaurantName(message.body.restaurant.name)
        setRestaurantID(message.body.restaurant.id)
        setMinOrderPrice(message.body.restaurant.minOrderPrice)
        appContext.setRestaurantID(message.body.restaurant.id)
        appContext.setRestaurantName(message.body.restaurant.name)
        appContext.setSize(message.body.size)
        appContext.setPackagingCost(message.body.restaurant.packagingCost)
        appContext.setNonF2FCost(message.body.restaurant.nonF2FCost)
        appContext.setDeliveryCost(message.body.restaurant.deliveryCost)
        setSize(message.body.size)
        setTitle(message.body.title)
        setImage(message.body.restaurant.icon)
        setTotalPrice(message.body.totalPrice)
      }
      if(message.operation==="replyGetMyPartyMemberList"){
        setUserList(message.body)
      }
      if(message.operation==="replyGetSharedCart"){
        appContext.setCartList(message.body)
      }
      if(message.operation==="replyLeaveParty"){
        if(message.body.isSuccess===true){
          console.log("leave Success")
          appContext.setPartyID()
          appContext.setRestaurantID()
          appContext.setRestaurantName()
          appContext.setIsHost(false)
          appContext.setIsReady(false)
          appContext.setIsEnter(false)
          appContext.setSize()
          appContext.setCartList([])
          navigation.replace("main")
        }
        else{
          console.log("leave failed")
        }      
      }
      
      if(message.operation==="replyKickedOutMember"){

      }
      if(message.operation==="notifyRefreshTotalPrice"){
        setTotalPrice(message.body.totalPrice)
      }
      //apply all party member 
      if(message.operation==="notifyNewMember"){
        setUserList([message.body.user].concat(userList))
        setSize(message.body.size)
        appContext.setSize(message.body.size)
      }
      if(message.operation==="notifyOutMember"){
        //user(is not host) out 
        for (let i=0 ; i <userList.length; i++){
          if(userList[i].id===message.body.user.id){
            userList.splice(i,1)
            setUserList([...userList])
          } 
        } 
        setSize(message.body.size)
        appContext.setSize(message.body.size)

        //user(is host) out so apply new host
        if(message.body.newHost!==undefined)
        {
          console.log("host is change")
          if(appContext.userID===message.body.newHost.id){
            Alert.alert("내가 방장이 되었습니다.")
            appContext.setIsHost(true)
            setIsHost(true)
            appContext.setIsReady(false)
            setIsReady(false)
          }
          for (let i=0 ; i <userList.length; i++){
            if(userList[i].id===message.body.newHost.id){
              userList[i].isHost = true
              setUserList([...userList])
            } 
          }
        }

      }
      if(message.operation==="notifyKickedOutMember"){
        if(appContext.userID === message.body.user.id){
          //you are kicked out
          console.log("you are kicked out")
          Alert.alert("강퇴 당하셨습니다")
          appContext.setPartyID()
          appContext.setRestaurantID()
          appContext.setRestaurantName()
          appContext.setIsHost(false)
          appContext.setIsReady(false)
          appContext.setIsEnter(false)
          appContext.setCartList([])
          appContext.setSize()
          navigation.replace("main")
        }
        else{
          //other user is kicked out
          for (let i=0 ; i <userList.length; i++){
            if(userList[i].id===message.body.user.id){
              userList.splice(i,1)
              setUserList([...userList])
            } 
          } 
          setSize(message.body.size)
        }
      }
      if(message.operation==="notifyNewSharedMenu"){
        Alert.alert("공유메뉴 "+message.body.name+"가 "+message.body.quantity +"개 추가 되었습니다.")
        appContext.setCartList([message.body].concat(appContext.cartList))
      }
      if(message.operation==="notifyUpdateSharedMenu"){
        Alert.alert("공유메뉴 "+message.body.name+"가 "+message.body.quantity +"개로 변경 되었습니다.")
        for (let i=0 ; i <appContext.cartList.length; i++){
          if(appContext.cartList[i].id===message.body.id){
            appContext.cartList[i] = message.body
            appContext.setCartList([...appContext.cartList])
          } 
        }       
      }
      if(message.operation==="notifyRefreshSharedCart"){
        for (let i=0 ; i <appContext.cartList.length; i++){
          for(let j=0 ; j <message.body.length; j++){
            if(appContext.cartList[i].id===message.body[j].id){
              appContext.cartList[i] = message.body[j]
              appContext.setCartList([...appContext.cartList])
            } 
          }
        }       
      }
      if(message.operation==="notifyDeleteSharedMenu"){
        let deletedName = ""
        for (let i=0 ; i <appContext.cartList.length; i++){
          if(appContext.cartList[i].id===message.body.id){
            deletedName=appContext.cartList[i].name
            appContext.cartList.splice(i,1)
            appContext.setCartList([...appContext.cartList])
          } 
        } 
        Alert.alert("공유메뉴 "+deletedName+"가 삭제되었습니다")
      }
      if(message.operation==="notifyMemberReady"){
        for (let i=0 ; i <userList.length; i++){
          if(userList[i].id===message.body.id){
            userList[i].isReady = message.body.isReady
            setUserList([...userList])
          } 
        }
      }
      if(message.operation==="notifyAllMemberNotReady"){
        for (let i=0 ; i <userList.length; i++){
          userList[i].isReady = false
          setUserList([...userList])
        }
        setIsReady(false)
        appContext.setIsReady(false)
      }
      if(message.operation==="notifyGoToPayment"){
        appContext.setFinalCart(message.body)
        navigation.navigate("confirmOrder")
      }
      if(message.operation==="ping"){
        const sendMessage = { operation: 'pong'}
        ws.current.send(JSON.stringify(sendMessage))
      }

  };
  });

  function leaveParty(){
    if (!ws.current) return;

      const message = { operation: 'leaveParty', body: {}}
      ws.current.send(JSON.stringify(message))  
  }

  function readyToNotReady(){
    if (!ws.current) return;

      const message = { operation: 'setReady', body: {isReady : false}}
      ws.current.send(JSON.stringify(message))
      setIsReady(false)
      appContext.setIsReady(false)

      for (let i=0 ; i <userList.length; i++){
        if(userList[i].id===appContext.userID){
          userList[i].isReady = false
          setUserList([...userList])
        } 
      }
  
  }

  function notReadyToReady(){
    if (!ws.current) return;

      const message = { operation: 'setReady', body: {isReady : true}}
      ws.current.send(JSON.stringify(message))
      setIsReady(true)
      appContext.setIsReady(true)

      for (let i=0 ; i <userList.length; i++){
        if(userList[i].id===appContext.userID){
          userList[i].isReady = true
          setUserList([...userList])
        } 
      }
  
  }

  function goToPayment(){
    if (!ws.current) return;
      if(totalPrice<minOrderPrice){
        Alert.alert("최소 주문 금액이 부족합니다.")
        return
      }

      let everybodyIsready = true
      for (let i=0 ; i <userList.length; i++){
        if(userList[i].isReady===false && userList[i].id!==appContext.userID){
          everybodyIsready =false
        } 
      }
      if(everybodyIsready===true){
        const message = { operation: 'goToPayment', body: {}}
        ws.current.send(JSON.stringify(message))
      }
      else{
        Alert.alert("모두 준비가 되지 않았습니다.")
      }
  }

  function goMenuList(){
    if(isReady===true){
      Alert.alert("준비중이므로 메뉴 추가가 불가능합니다")
    }
    else{
      navigation.replace('menuList')
    }
  }


    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.logo}>
            <LogoButton/>
          </View>
          <View style={styles.pinContainer}>
            <View style={styles.listBox}>
              <View style={styles.leftBox}>
                <Image source={{uri:image}} style={styles.imageStyle}/>
              </View>
              <View style={styles.rightBox}>
                <Text style={styles.restaurantNameText}> {restaurantName}</Text>
                <Text style={styles.addressText}>{address}</Text>
                <View style={styles.rightBottomBox}>
                  <Text style={styles.partyNameText}>{title}</Text>
                  <Text style={styles.peopleNumberText}> {size}/{capacity}</Text>
                </View>
              </View>
            </View>    
            <View style={styles.menuTab}>
              <TouchableOpacity style={styles.cartBox} onPress={() => navigation.replace('cart')}>
                <Text style={styles.cartText}>장바구니</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addMenuBox} onPress={goMenuList}>
                <Text style={styles.addMenuText}>메뉴 추가</Text>
              </TouchableOpacity>  
            </View>
            <View style={styles.menuTab}>
              <TouchableOpacity style={styles.chatBox} onPress={() => navigation.replace('chat')}>
                <Text style={styles.chatText}>채팅방</Text>
              </TouchableOpacity>   
              <TouchableOpacity style={styles.outBox} onPress={leaveParty}>
                <Text style={styles.outText}>파티 나가기</Text>
              </TouchableOpacity>   
            </View>
            <View style={styles.priceButton}>
              <Text style={styles.priceText}>총 금액 {totalPrice}원 / {minOrderPrice}원</Text>
            </View>
            {(isHost===true)?
            (<TouchableOpacity style={styles.orderButton} onPress={goToPayment}>
                <Text style={styles.orderText}>결제하기</Text>
              </TouchableOpacity> ) : 
              (isReady===false) ? 
              (<TouchableOpacity style={styles.notReadyButton} onPress={notReadyToReady}>
                <Text style={styles.notReadyText}>준비하기</Text>
              </TouchableOpacity>) :  
              (<TouchableOpacity style={styles.readyButton} onPress={readyToNotReady}>
                <Text style={styles.readyText}>준비중</Text>
              </TouchableOpacity>)
              }
            <UserList data={userList}/>     
          </View>
        </SafeAreaView>

    );
  }

  const styles = StyleSheet.create({
    container: {
      display:"flex",
      flexDirection: 'column',
      alignItems: 'stretch',
      backgroundColor: '#fff',
      flex :1 ,
    },
    pinContainer: {
      alignSelf: 'center',
  
    },
    logo:{
      alignItems: "center",
    },

    listBox:{
      height: 100,
      width: 340,
      backgroundColor: "#CB661D",
      borderRadius: 10,
      marginBottom : 12, 
      display : "flex",
      flexDirection : "row",
      shadowColor : '#4d4d4d',
      shadowOffset: { width: 8, height: 8, },
      shadowOpacity: 0.3, 
      shadowRadius: 4,
    },
    leftBox:{ 
      flex : 1,
      backgroundColor: '#fff',
      alignContent : "center",
      alignItems : 'center',
    },
    imageStyle:{

      width: 100,
      height :100,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,

      alignSelf : "center"

    },
    rightBox:{
      flex : 2,
      padding : 8,
    },


    rightBottomBox:{
      display : "flex", 
      flexDirection : "row"
    },
    restaurantNameText:{
      fontStyle: 'normal',
      fontSize: 18,
      fontWeight : "bold",
      color: "#FFFFFF",
      marginBottom: 5,
    },
    addressText:{
      fontStyle: 'normal',
      fontSize: 12,
      color: "#FFFFFF",
      marginBottom: 3,
    },
    partyNameText:{
      fontStyle: 'normal',
      fontSize: 18,
      color: "#FFFFFF",
      marginRight : 10,
    },
    peopleNumberText:{
      fontStyle: 'normal',
      fontSize: 18,
      color: "#FFFFFF",
    },

    menuTab:{
      width: 340,
      flexDirection : "row",

    },
    addMenuBox:{
      flex : 1 ,
      height : 60,
      backgroundColor: "#FFBF75",
      borderRadius: 10,
      marginLeft : 10,
      marginBottom : 10,       
      justifyContent: 'center', 
      alignItems: 'center' 
    },
    addMenuText:{
      fontStyle: 'normal',
      fontSize: 20,
      textAlign: "center",
      color: "#FFFFFF",
    },
    chatBox:{
      flex : 1 ,
      height : 60,
      backgroundColor: "#FFC530",
      borderRadius: 10,
      marginBottom : 10, 
      justifyContent: 'center', 
      alignItems: 'center' 
    },
    chatText:{
      fontStyle: 'normal',
      fontSize: 20,
      textAlign: "center",
      color: "#FFFFFF",
    },
    cartBox:{
      flex : 1 ,
      height : 60,

      backgroundColor: "#FF8181",
      borderRadius: 10,
      marginBottom : 10, 
      justifyContent: 'center', 
      alignItems: 'center' 
  
    },
    cartText:{
      fontStyle: 'normal',
      fontSize: 20,
      textAlign: "center",
      color: "#FFFFFF",
  
    },
    outBox:{
      flex : 1 ,
      height : 60,
      backgroundColor: "#FF473A",
      borderRadius: 10,
      marginBottom : 10, 
      marginLeft : 10,
      justifyContent: 'center', 
      alignItems: 'center' 
    },
    
    outText:{
      fontStyle: 'normal',
      fontSize: 20,
      textAlign: "center",
      color: "#FFFFFF",
    },

    orderButton:{
      height: 39,
      width: 340,
      backgroundColor: "#FF8181",
      borderRadius: 10,
      marginBottom : 10, 
      justifyContent: 'center', 
      alignItems: 'center' 
  
    },
    orderText:{
      fontStyle: 'normal',
      fontSize: 20,
      textAlign: "center",
      color: "#FFFFFF",
  
    },
    priceButton:{
      height: 39,
      width: 340,
      backgroundColor: "#CB661D",
      borderRadius: 10,
      marginBottom : 10, 
      justifyContent: 'center', 
      alignItems: 'center' 
  
    },
    priceText:{
      fontStyle: 'normal',
      fontSize: 20,
      textAlign: "center",
      color: "#FFFFFF",
  
    },

    notReadyButton:{
      height: 39,
      width: 340,
      backgroundColor: "#FF8181",
      borderRadius: 10,
      marginBottom : 10, 
      justifyContent: 'center', 
      alignItems: 'center' 
  
    },
    notReadyText:{
      fontStyle: 'normal',
      fontSize: 20,
      textAlign: "center",
      color: "#FFFFFF",
  
    },

    readyButton:{
      height: 39,
      width: 340,
      backgroundColor: "#FFBF75",
      borderRadius: 10,
      marginBottom : 10, 
      justifyContent: 'center', 
      alignItems: 'center' 
  
    },
    readyText:{
      fontStyle: 'normal',
      fontSize: 20,
      textAlign: "center",
      color: "#FFFFFF",
  
    },


  });
  