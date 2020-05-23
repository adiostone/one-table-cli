import React, { useEffect, useState, useContext ,useRef } from 'react'
import { StyleSheet, Text,CheckBox, View,Button, Image,TextInput,TouchableOpacity,Dimensions, ScrollView, SafeAreaView } from 'react-native';
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
  const [quantity, setQuantity] = useState(1) 
  const [isPublicMenu, setIsPublicMenu] = useState(false) 
  const [size, setSize] = useState(appContext.size) 
  const [totalPrice, setTotalPrice] = useState(route.params.price * quantity) 

  useEffect(() => {
    if (!ws.current || ws.current.readyState === WebSocket.CLOSED) return;

    ws.current.onmessage = e => {
        const message = JSON.parse(e.data);
        console.log("menuDetail listen")
        console.log(message);
        if(message.operation==="replyAddShoppingBag"){
          appContext.setBagFoodList([message.body].concat(appContext.bagFoodList))
          navigation.navigate('shoppingBag')
        }
        if(message.operation==="ping"){
          const sendMessage = { operation: 'pong'}
          ws.current.send(JSON.stringify(sendMessage))
        }
    };
  });

  function addShoppingBag(){
    if (!ws.current) return;

    const message = { operation: 'addShoppingBag', body: {id: id ,quantity : quantity , price : price , totalPrice : totalPrice  , isPublicMenu : isPublicMenu} }
    ws.current.send(JSON.stringify(message))
  }


  function clickCheckBox(){
    if(isPublicMenu===true){
      setIsPublicMenu(false)
    }
    else{
      setIsPublicMenu(true)
    }
  } 


  function clickPlus(){
    const newQuantity = quantity + 1
    setQuantity(newQuantity)
    if(isPublicMenu===true){
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
      if(isPublicMenu===true){
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
          (appContext.isHost ===true) ?        
          (<View style={styles.bottomBox}>
            <View style={styles.bottomLeftBox}>
              <Text style={styles.quantityText}>공유</Text>
            </View>
            <View style={styles.bottomRightBox}>
              <TouchableOpacity style={styles.checkBox} onPress={clickCheckBox}>
                {
                (isPublicMenu===true) ? (<Text style={styles.checkBoxText}>X</Text>) : (<Text style={styles.checkBoxText}></Text>)
                }
              </TouchableOpacity>
              <Text style={styles.quantityText}>{size}</Text>
            </View>
          </View>) : (<View/>)    
          } 
          <TouchableOpacity style={styles.shoppingBagBox} onPress={addShoppingBag}>
            <Text style={styles.shoppingBagText}>{totalPrice}원 담기</Text>
          </TouchableOpacity>

        </SafeAreaView>
  

    );
  }

  const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
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
    shoppingBagBox:{
      width: 335,
      height: 39,
      backgroundColor: "#FF8181",
      borderRadius: 10,
      marginBottom : 12,
      justifyContent: 'center', 
      alignSelf: 'center' 
    },
    shoppingBagText:{
      fontStyle: 'normal',
      fontSize: 20,
      textAlign: "center",
      color: "#FFFFFF",
  
    },

  });
  