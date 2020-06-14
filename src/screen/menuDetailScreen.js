import React, { useEffect, useState, useContext ,useRef } from 'react'
import { StyleSheet, Text,CheckBox, View,Button, Alert,Image,TextInput,TouchableOpacity,Dimensions, ScrollView, SafeAreaView } from 'react-native';
import BaseTab from "../component/baseTab"
import { AppContext } from '../context/AppContext'
import { SocketContext } from '../context/SocketContext'


export default function menuDetailScreen({route, navigation}) {

  const appContext = useContext(AppContext)

  const socketContext = useContext(SocketContext)

  const ws = useRef(socketContext.ws)

  const [id, setid] = useState(route.params.id) 
  const [name, setName] = useState(route.params.name) 
  const [price, setPrice] = useState(route.params.price) 
  const [image, setImage] = useState(route.params.image) 
  const [isSharing, setIsSharing] = useState(route.params.isSharing) 
  const [quantity, setQuantity] = useState(1) 
  const [isShared, setIsShared] = useState(false) 
  const [size, setSize] = useState(appContext.size) 
  const [totalPrice, setTotalPrice] = useState(route.params.price * quantity) 

  useEffect(() => {
    if (!ws.current || ws.current.readyState === WebSocket.CLOSED) return;

    ws.current.onmessage = e => {
        const message = JSON.parse(e.data);
        console.log("menuDetail listen")
        console.log(message);
        if(message.operation==="replyAddToCart"){
          if(message.body.isSuccess===true){
            console.log("add success")
            appContext.setCartList([message.body.addedMenu].concat(appContext.cartList))
            navigation.replace('cart')
          }
          else{
            console.log("add failed")
          }
        }
        //apply all party member 
        if(message.operation==="notifyNewMember"){
          Alert.alert(message.body.user.nickname+"가 파티에 참가하셨습니다.")
          appContext.setUserList([message.body.user].concat(userList))
          appContext.setSize(message.body.size)
          setSize(message.body.size)
          if(isShared===true){
            setTotalPrice(quantity*price/message.body.size)
          }
          else{
            setTotalPrice(quantity*price)
          }
        }
        if(message.operation==="notifyOutMember"){
          Alert.alert("파티원 한명이 나갔습니다.")
          appContext.setSize(message.body.size)
          setSize(message.body.size)

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
            if(isShared===true){
              setTotalPrice(quantity*price/message.body.size)
            }
            else{
              setTotalPrice(quantity*price)
            }
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
        //apply all ws 
        if(message.operation==="ping"){
          const sendMessage = { operation: 'pong'}
          ws.current.send(JSON.stringify(sendMessage))
        }
    };
  });

  function addCart(){
    if (!ws.current) return;

    const message = { operation: 'addToCart', body: {id: id ,quantity : quantity , price : price , totalPrice : totalPrice  , isShared : isShared} }
    ws.current.send(JSON.stringify(message))
  }


  function clickCheckBox(){
    if(isShared===true){
      setIsShared(false)
      setTotalPrice(quantity*price)
    }
    else{
      setIsShared(true)
      setTotalPrice(quantity*price/size)
    }
  } 


  function clickPlus(){
    const newQuantity = quantity + 1
    setQuantity(newQuantity)
    if(isShared===true){
      setTotalPrice(newQuantity*price/size)
    }
    else{
      setTotalPrice(newQuantity*price)
    }
  } 

  function clickMinus(){
    if(quantity>1){
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      if(isShared===true){
        setTotalPrice(newQuantity*price/size)
      }
      else{
        setTotalPrice(newQuantity*price)
      }
    }
    
  } 

    return (
        <SafeAreaView style={styles.container}>
          <BaseTab data={"menuList"}/>
          {(image !==null) ? 
          (<Image source={{uri:image}} style={styles.imageStyle}/>) : (<View/>)
          }
          <View style={styles.topBox}>
            <Text style={styles.nameText}>{name}</Text>
          </View>
          <View style={styles.middleBox}>
            <View style={styles.middleLeftBox}>
              <Text style={styles.quantityText}>수량</Text>
            </View>
            <View style={styles.middleRightBox}>
              <TouchableOpacity style={styles.plusMinusBox} onPress={clickMinus}>
                <Text style={styles.plusMinusText}>-</Text>
              </TouchableOpacity>
              <View style={styles.quantityBox}>
                <Text style={styles.quantityText}>{quantity}</Text>
              </View>
              <TouchableOpacity style={styles.plusMinusBox} onPress={clickPlus}>
                <Text style={styles.plusMinusText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          {     
          (appContext.isHost ===true && isSharing ===true) ?        
          (<View style={styles.bottomBox}>
            <View style={styles.bottomLeftBox}>
              <Text style={styles.quantityText}>공유</Text>
            </View>
            <View style={styles.bottomRightBox}>
              <TouchableOpacity style={styles.checkBox} onPress={clickCheckBox}>
                {
                (isShared===true) ? (<Text style={styles.checkBoxText}>X</Text>) : (<Text style={styles.checkBoxText}></Text>)
                }
              </TouchableOpacity>
              <Text style={styles.quantityText}>{size}</Text>
            </View>
          </View>) : (<View/>)    
          } 
          <TouchableOpacity style={styles.cartBox} onPress={addCart}>
            <Text style={styles.cartText}>{totalPrice}원 담기</Text>
          </TouchableOpacity>

        </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex :1 ,

      },
      imageStyle:{
        width: 150,
        height :150,
        borderRadius : 10,
        marginBottom : 15,
        alignSelf :"center"
      },
      topBox: {
        height : 50 ,
    },
    nameText:{
        fontSize : 30,
        fontWeight : "bold",
        alignSelf: "center",
    },
    middleBox: {

        display : "flex",
        flexDirection : "row",
        height : 60 ,
        borderBottomWidth: 1,
        borderColor: '#DFDFDF',
        alignItems : "center"
    },
    middleLeftBox: {

      marginLeft :40,
      marginRight :160,
  },

    middleRightBox: {
        display : "flex",
        flexDirection : "row",

    },
    quantityBox:{
      width : 30,
      height : 30 ,
      fontSize : 20,
      fontWeight : "bold",
      alignItems: 'center' ,

    },
    quantityText:{
      fontSize : 22,
      fontWeight : "bold",
    },
    plusMinusBox:{
      width : 25,
      height : 25 ,
      borderRadius : 5,
      borderWidth : 2,
      alignItems: 'center' ,
    },
    plusMinusText:{
      fontSize : 15,
      fontWeight : "bold",
      alignSelf: 'center' ,

    },
    bottomBox: {
      display : "flex",
      flexDirection : "row",
      height: 60,
      alignItems : "center"

    },
    bottomLeftBox: {
      marginLeft :40,
      marginRight :160,
    },
    bottomRightBox: {
      display : "flex",
      flexDirection : "row",
      alignItems:"center",
    },
    checkBox :{
      width : 20 ,
      height : 20,
      alignItems: "center",
      marginRight : 15,
      borderWidth : 3,
      borderColor : "black"

    },
    checkBoxText :{

      fontSize : 16,
      fontWeight : "bold",

    },
    cartBox:{
      width: 340,
      height: 39,
      backgroundColor: "#FF8181",
      borderRadius: 10,
      marginTop : 12,
      marginBottom : 12,
      justifyContent: 'center', 
      alignSelf: 'center' 
    },
    cartText:{
      fontStyle: 'normal',
      fontSize: 20,
      textAlign: "center",
      color: "#FFFFFF",
  
    },

  });
  