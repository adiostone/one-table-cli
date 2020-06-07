import React, { useEffect, useState, useContext ,useRef } from 'react'
import { StyleSheet, Text,CheckBox, View,Button, Alert,Image,TextInput,TouchableOpacity,Dimensions, ScrollView, SafeAreaView } from 'react-native';
import BaseTab from "../component/baseTab"
import LogoButton from "../component/logoButton"

import { AppContext } from '../context/AppContext'
import { SocketContext } from '../context/SocketContext'


export default function decideNotMeetScreen({navigation}) {

  const appContext = useContext(AppContext)

  const socketContext = useContext(SocketContext)

  const ws = useRef(socketContext.ws)

  const [isNotMeet, setIsNotMeet] = useState(false)
  
  const [formattedAddress, setFormattedAddress] = useState(appContext.formattedAddress);
  const [detailAddress, setDetailAddress] = useState(appContext.detailAddress);

  useEffect(() => {
    if (!ws.current || ws.current.readyState === WebSocket.CLOSED) return;

    ws.current.onmessage = e => {
        const message = JSON.parse(e.data);
        console.log("decideNotMeetScreen listen")
        console.log(message); 
        //apply all ws 
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
    if(isShared===true){
      setIsShared(false)
    }
    else{
      setIsShared(true)
    }
  } 

    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.logo}>
            <LogoButton/>
          </View>
          <View style={styles.topBox}>
            <Text style={styles.topText}>비대면</Text>
          </View>
          <View style={styles.middleBox}>
            <View style={styles.middleLeftBox}>
              <Text style={styles.quantityText}>비대면 옵션</Text>
            </View>
            <View style={styles.middleRightBox}>
              <TouchableOpacity style={styles.checkBox} onPress={clickCheckBox}>
                {
                (isNotMeet===true) ? (<Text style={styles.checkBoxText}>X</Text>) : (<Text style={styles.checkBoxText}></Text>)
                }
              </TouchableOpacity>
            </View>
          </View>)
          {     
          (isNotMeet===true) ? 
          (<View>
            <View style={styles.detailSettingBox}>
              <Text style={styles.detailSettingText}>만나는 위치</Text>                  
            </View>
            <TextInput style={styles.detailSettingInputBox} onChangeText={(text) => setFormattedAddress(text)}>{formattedAddress}</TextInput>
            <TextInput style={styles.detailSettingInputBox} onChangeText={(text) => setDetailAddress(text)}>{detailAddress}</TextInput>
          </View>) : (<View/>)
          } 
          <TouchableOpacity style={styles.goOrderBox} onPress={goToConfirmOrder}>
            <Text style={styles.goOrderText}>주문 확정하러 가기</Text>
          </TouchableOpacity>
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
        height: 60,
        backgroundColor: "#FF8181",
        borderRadius: 10,
        marginBottom : 12, 
        // alignSelf: 'center',
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
      alignItems : "center"

    },
    middleLeftBox: {
      marginLeft :40,
      marginRight :160,
    },
    middleRightBox: {
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
    detailSettingBox: {

      width: 340,
      height: 39,
      backgroundColor: "#FFBF75",
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
    goOrderBox:{
      width: 340,
      height: 39,
      backgroundColor: "#FF8181",
      borderRadius: 10,
      marginTop : 12,
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

  });
  