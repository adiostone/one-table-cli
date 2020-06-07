import React, { useEffect, useState, useContext ,useRef } from 'react'
import { StyleSheet, Text, View,Button,Alert, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import { SocketContext } from '../context/SocketContext'

import * as SecureStore from 'expo-secure-store';
import axios from 'axios'

import { useNavigation } from '@react-navigation/native';


export default function viewCartItem(props) {


  const appContext = useContext(AppContext)

  const socketContext = useContext(SocketContext)

  const ws = useRef(socketContext.ws)

  const id = props.data.id 
  const name = props.data.name
  const packagingCost = props.data.packagingCost
  const isShared = props.data.isShared
  const quantity =props.data.quantity 
  const pricePerCapita=props.data.pricePerCapita
  const size = appContext.size

  const navigation = useNavigation();

  useEffect(()=>{
   
  })

  return (

      <View style={styles.listBox}>
        <View style={styles.foodNameBox}> 
          <Text style={styles.foodNameText}>{name}</Text>
        </View> 
        {(isShared===true) ?(
        <View style={styles.middleBox}> 
          <View style={styles.middleLeftBox}>
            <View style={styles.quantityBox}>
              <Text style={styles.quantityText}>{quantity}</Text>
            </View>
            <View style={styles.colorBox}>
              <Text style={styles.redText}>공유 1/{size}</Text>
            </View>
            </View>         
          <View style={styles.middleRightBox}> 
            <Text style={styles.redText}>{pricePerCapita}원</Text>
          </View> 
          
        </View>) : 
        (<View style={styles.middleBox}> 
          <View style={styles.middleLeftBox}>
            <View style={styles.quantityBox}>
              <Text style={styles.quantityText}>{quantity}</Text>
            </View>
            <View style={styles.colorBox}>
              <Text style={styles.blueText}>개인</Text>
            </View>
            </View>         
          <View style={styles.middleRightBox}> 
            <Text style={styles.blueText}>{pricePerCapita}원</Text>
          </View>
        </View>)
        } 
        {(packagingCost !==0) ?
        <View style={styles.bottomBox}> 
          <View style={styles.bottomLeftBox}>
            <Text style={styles.quantityText}>포장비</Text>
          </View>         
          <View style={styles.bottomRightBox}> 
            <Text style={styles.redText}>{appContext.packagingCost}원</Text>
          </View>
        </View> : <View/>
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
},

middleBox: {

  display : "flex",
  flexDirection : "row",
  height : 40 ,
  alignItems : "center"
},
middleLeftBox: {

marginLeft :20,
display : "flex",
flexDirection : "row",
alignSelf : "center",
alignItems : "center",
flex : 5,


},
middleRightBox: {
  flex : 2,
},
quantityBox:{
  width : 25,
  height : 25 ,
  alignItems: 'center' ,
},
quantityText:{
  fontSize : 20,
},

foodPriceText:{
  fontSize : 14
},
colorBox:{
  marginLeft : 15,
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

bottomBox: {

  display : "flex",
  flexDirection : "row",
  height : 40 ,
  alignItems : "center"
},
bottomLeftBox: {

marginLeft :20,
display : "flex",
flexDirection : "row",
alignSelf : "center",
alignItems : "center",
flex : 5,


},
bottomRightBox: {
  flex : 2,
},



});
