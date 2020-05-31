import React, { useEffect, useState, useContext ,useRef } from 'react'
import { StyleSheet, Text, View,Button,Alert, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import { SocketContext } from '../context/SocketContext'

import * as SecureStore from 'expo-secure-store';
import axios from 'axios'

import { useNavigation } from '@react-navigation/native';


export default function bagFoodItem(props) {

  const appContext = useContext(AppContext)

  const socketContext = useContext(SocketContext)

  const ws = useRef(socketContext.ws)

  const isReady = appContext.isReady

  const id = props.data.id 
  const name = props.data.name
  const price = props.data.price
  const isPublicMenu = props.data.isPublicMenu
  const quantity =props.data.quantity 
  const totalPrice=props.data.totalPrice 
  const size = appContext.size

  const navigation = useNavigation();

  useEffect(()=>{
   
  })


  function clickPlus(){
    if(isReady===true){
      Alert.alert("준비중이므로 메뉴 수정이 불가능합니다")
    }
    else{

      if (!ws.current) return;

      const newQuantity = quantity + 1
      let newTotalPrice = 0
      if(isPublicMenu===true){
          newTotalPrice= newQuantity*price/size
      }
      else{
        newTotalPrice = newQuantity*price
      }
      const message = { operation: 'updateShoppingBag', body: {id: id ,quantity : newQuantity , price : price , totalPrice : newTotalPrice , isPublicMenu : isPublicMenu} }
      ws.current.send(JSON.stringify(message))  
    }
  } 

  function clickMinus(){
    if(isReady===true){
      Alert.alert("준비중이므로 메뉴 수정이 불가능합니다")
    }
    else{
      if (!ws.current) return;

      if(quantity>1){
        const newQuantity = quantity - 1
        let newTotalPrice = 0
        if(isPublicMenu===true){
            newTotalPrice= newQuantity*price/size
        }
        else{
          newTotalPrice = newQuantity*price
        }
        const message = { operation: 'updateShoppingBag', body: {id: id ,quantity : newQuantity , price : price , totalPrice : newTotalPrice , isPublicMenu : isPublicMenu} }
        ws.current.send(JSON.stringify(message))  
      }
      else{
        const message = { operation: 'deleteShoppingBag', body: {id: id ,quantity : newQuantity , price : price , totalPrice : newTotalPrice , isPublicMenu : isPublicMenu} }
        ws.current.send(JSON.stringify(message))   
      }
    }
  } 

  return (

      <View style={styles.listBox}>
        <View style={styles.foodNameBox}> 
          <Text style={styles.foodNameText}>{name}</Text>
        </View> 
        {(isPublicMenu===true) ?(
        <View style={styles.bottomBox}> 
          <View style={styles.bottomLeftBox}>
            <TouchableOpacity style={styles.plusMinusBox} onPress={clickMinus}>
                  <Text style={styles.plusMinusText}>-</Text>
            </TouchableOpacity>
            <View style={styles.quantityBox}>
              <Text style={styles.quantityText}>{quantity}</Text>
            </View>
            <TouchableOpacity style={styles.plusMinusBox} onPress={clickPlus}>
              <Text style={styles.plusMinusText}>+</Text>
            </TouchableOpacity>
            <View style={styles.colorBox}>
              <Text style={styles.redText}>{size}</Text>
            </View>
            </View>         
          <View style={styles.bottomRightBox}> 
            <Text style={styles.redText}>{totalPrice}</Text>
          </View> 
          
        </View>) : 
        (<View style={styles.bottomBox}> 
          <View style={styles.bottomLeftBox}>
            <TouchableOpacity style={styles.plusMinusBox} onPress={clickMinus}>
                  <Text style={styles.plusMinusText}>-</Text>
            </TouchableOpacity>
            <View style={styles.quantityBox}>
              <Text style={styles.quantityText}>{quantity}</Text>
            </View>
            <TouchableOpacity style={styles.plusMinusBox} onPress={clickPlus}>
              <Text style={styles.plusMinusText}>+</Text>
            </TouchableOpacity>
            <View style={styles.colorBox}>
              <Text style={styles.blueText}>{size}</Text>
            </View>
            </View>         
          <View style={styles.bottomRightBox}> 
            <Text style={styles.blueText}>{totalPrice}</Text>
          </View>
        </View>)
        } 
      </View>        
      
  );
}

const styles = StyleSheet.create({

  listBox: {
    padding : 12,
    borderBottomWidth: 1,
    borderColor: '#DFDFDF',
},
foodNameBox:{
  marginLeft : 20
},
foodNameText:{
    fontSize : 20,
    fontWeight : "bold",
},

bottomBox: {

  display : "flex",
  flexDirection : "row",
  height : 40 ,
  alignItems : "center"
},
bottomLeftBox: {

marginLeft :20,
marginRight :150,
display : "flex",
flexDirection : "row",
alignSelf : "center",
alignItems : "center",

},
bottomRightBox: {

},
quantityBox:{
  width : 25,
  height : 25 ,
  alignItems: 'center' ,
},
quantityText:{
  fontSize : 20,
  fontWeight : "bold",
},
plusMinusBox:{
  width : 20,
  height : 20 ,
  borderRadius : 5,
  borderWidth : 2,
  alignItems: 'center' ,
},
plusMinusText:{
  fontSize : 12,
  fontWeight : "bold",
  alignSelf: 'center' ,

},
foodPriceText:{
  fontSize : 14
},
colorBox:{
  marginLeft : 5,
  width : 25,
  height : 25 ,
  alignItems: 'center' ,
},
blueText:{
  fontSize : 19,
  color : "blue"
},
redText:{
  fontSize : 19,
  color : "red"

},



});
