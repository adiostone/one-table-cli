import React, { useEffect, useState, useContext ,useRef } from 'react'
import { StyleSheet, Text,CheckBox, View,Button, Alert,Image,TextInput,TouchableOpacity,Dimensions, ScrollView, SafeAreaView } from 'react-native';
import BaseTab from "../component/baseTab"
import LogoButton from "../component/logoButton"
import ViewCartList from "../component/viewCartList"
import { AppContext } from '../context/AppContext'
import { SocketContext } from '../context/SocketContext'


export default function decideNotMeetScreen({navigation}) {

  const appContext = useContext(AppContext)

  const socketContext = useContext(SocketContext)

  const ws = useRef(socketContext.ws)

  const finalCart = appContext.finalCart

  const [isNotMeet, setIsNotMeet] = useState(false)

  const [phoneNum, setPhoneNum] = useState()
  const [requestText, setRequestText] = useState()
  
  const [formattedAddress, setFormattedAddress] = useState(appContext.formattedAddress);
  const [detailAddress, setDetailAddress] = useState(appContext.detailAddress);

  const nonF2FCost = appContext.nonF2FCost

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = e => {
        const message = JSON.parse(e.data);
        console.log("confirmOrder listen")
        console.log(message);
        if(message.operation==="ping"){
          const sendMessage = { operation: 'pong'}
          ws.current.send(JSON.stringify(sendMessage))
        }
    };
  });

  function goToConfirmOrder(){
    if (!ws.current) return;

    const message = { operation: 'goToOrderConfirm', body: {isNotMeet: isNotMeet ,address1 : formattedAddress, address2 : detailAddress} }
    ws.current.send(JSON.stringify(message))
  }

  function clickCheckBox(){
    if(isNotMeet===true){
      setIsNotMeet(false)
    }
    else{
      setIsNotMeet(true)
    }
  } 

    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.logo}>
            <LogoButton/>
          </View>
          <ScrollView style={styles.scrollBox}>
            <View style={styles.detailSettingBox}>
                <Text style={styles.detailSettingText}>핸드폰 번호</Text>                  
            </View>
            <TextInput style={styles.detailSettingInputBox} onChangeText={(text) => setPhoneNum(text)}>{phoneNum}</TextInput>
            <View style={styles.detailSettingBox}>
                <Text style={styles.detailSettingText}>요청 사항</Text>                  
            </View>
            <TextInput style={styles.requestInputBox} onChangeText={(text) => setRequestText(text)}>{requestText}</TextInput>
            <View style={styles.topBox}>
              <Text style={styles.topText}>비대면</Text>
            </View>
            <View style={styles.middleBox}>
              <View style={styles.middleLeftBox}>
                <Text style={styles.middleLeftText}>비대면 옵션</Text>
              </View>
              <View style={styles.middleMiddleBox}>
                <Text style={styles.middleMiddleText}>+{nonF2FCost}</Text>
              </View>
              <View style={styles.middleRightBox}>
                <TouchableOpacity style={styles.checkBox} onPress={clickCheckBox}>
                {
                  (isNotMeet===true) ? 
                  (<Text style={styles.checkBoxText}>X</Text>):(<Text/>)
                }
                </TouchableOpacity>
              </View>
            </View>
            {     
            (isNotMeet===true) ? 
            (<View>
              <View style={styles.detailSettingBox}>
                <Text style={styles.detailSettingText}>수령 위치</Text>                  
              </View>
              <TextInput style={styles.detailSettingInputBox} onChangeText={(text) => setFormattedAddress(text)}>{formattedAddress}</TextInput>
              <TextInput style={styles.detailSettingInputBox} onChangeText={(text) => setDetailAddress(text)}>{detailAddress}</TextInput>
            </View>) : (<View/>)
            } 
            <View style={styles.cartBox}>
              <Text style={styles.cartText}>최종 주문 내역</Text>
            </View>
            <ViewCartList data={finalCart} isNotMeet={isNotMeet}/>
            <TouchableOpacity style={styles.cartBox}>
              <Text style={styles.cartText}>최종 결제 확정</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
      container: {
        backgroundColor: '#fff',
        flex :1 ,

      },
      logo:{
        alignItems: "center",
      },
      topBox: {
        marginTop: 10,
        width: 340,
        height: 39,
        backgroundColor: "#FF8181",
        borderRadius: 10,
        marginBottom : 8, 
        justifyContent: 'center', 
        alignItems: 'center' ,
        alignSelf: 'center',
  
        },
      topText:{
  
        fontStyle: 'normal',
        fontSize: 20,
        textAlign: "center",
        color: "#FFFFFF",
  
      },


    middleBox: {
      display : "flex",
      flexDirection : "row",
      height: 60,
      alignItems : "center",
      marginBottom : 8, 
    },
    middleLeftBox: {
      marginLeft : 30,
      flex :5,
    },
    middleLeftText: {
      fontSize : 20,
    },
    middleMiddleBox: {
      flex :2,

    },
    middleMiddleText: {
      fontSize : 20,
      fontWeight : "bold",
      color : "red"
    },
    middleRightBox: {
      flex :1,
      marginRight : 30,
      display : "flex",
      flexDirection : "row",
      alignItems:"center",
    },
    checkBox :{
      width : 20 ,
      height : 20,
      alignItems: "center",
      borderWidth : 3,
      borderColor : "black"

    },
    checkBoxText :{

      fontSize : 16,
      fontWeight : "bold",

    },
    detailSettingBox: {

      width: 340,
      height: 39,
      backgroundColor: "#FF8181",
      borderRadius: 10,
      marginBottom : 12, 
      justifyContent: 'center', 
      alignItems: 'center' ,
      alignSelf: 'center',


    },
    detailSettingText:{
      fontStyle: 'normal',
      fontSize: 20,
      textAlign: "center",
      color: "#FFFFFF",
    },
    detailSettingInputBox: {

      width: 340,
      height: 39,
      backgroundColor: "#FFF5F5",
      borderRadius: 10,
      marginBottom : 12, 
      justifyContent: 'center', 
      alignItems: 'center' ,
      alignSelf: 'center',
      fontStyle: 'normal',
      fontSize: 20,
      textAlign: "center",
    },
    requestInputBox: {

      width: 340,
      height: 80,
      backgroundColor: "#FFF5F5",
      borderRadius: 10,
      marginBottom : 12, 
      justifyContent: 'center', 
      alignItems: 'center' ,
      alignSelf: 'center',
      fontStyle: 'normal',
      fontSize: 16,
      textAlign: "center",
    },
    goOrderBox:{
      width: 340,
      height: 39,
      backgroundColor: "#FF8181",
      borderRadius: 10,
      marginBottom : 12,
      justifyContent: 'center', 
      alignSelf: 'center' 
    },
    goOrderText:{
      fontStyle: 'normal',
      fontSize: 20,
      textAlign: "center",
      color: "#FFFFFF",
  
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
  