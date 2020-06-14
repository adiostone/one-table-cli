import React, { useEffect, useState, useContext , useRef } from 'react'
import { StyleSheet, Text, View,Button,Alert, Image,TextInput,TouchableOpacity,Dimensions, ScrollView, SafeAreaView } from 'react-native';
import ViewCartList from "../component/viewCartList"
import LogoButton from "../component/logoButton"
import BaseTab from "../component/baseTab"
import { AppContext } from '../context/AppContext'
import { SocketContext } from '../context/SocketContext'

export default function afterPaymentCartScreen({navigation}) {

  const appContext = useContext(AppContext)

  const socketContext = useContext(SocketContext)

  const [restaurantName, setRestaurantName] = useState() 
  const [address, setAddress] = useState() 
  const [title, setTitle] = useState() 
  const [image, setImage] = useState()

  const ws = useRef(socketContext.ws)

  const finalCart = appContext.finalCart


  useEffect(() => {
    if (!ws.current) return;

    console.log("getMyPartyMetadata")
    const message1 = { operation: 'getMyPartyMetadata', body: {} }
    ws.current.send(JSON.stringify(message1))


},[]);

  useEffect(() => {
    if (!ws.current || ws.current.readyState === WebSocket.CLOSED) return;


    ws.current.onopen = e => {

      console.log("getMyPartyMetadata")
      const message1 = { operation: 'getMyPartyMetadata', body: {} }
      ws.current.send(JSON.stringify(message1))
  
    }

    ws.current.onmessage = e => {
        const message = JSON.parse(e.data);
        console.log("afterPaymentCart listen")
        console.log(message);
        if(message.operation==="replyGetMyPartyMetadata"){
          setAddress(message.body.address)
          setRestaurantName(message.body.restaurant.name)
          setTitle(message.body.title)
          setImage(message.body.restaurant.icon)
        }
        if(message.operation==="notifyCompletePayment"){
          for(let i=0 ; i<appContext.userList.length ; i++ ){
              if(message.body.id===appContext.userList[i].id){
                  appContext.userList[i].isPaid=true
                  appContext.setUserList([...appContext.userList])
              }
          }
        }
        if(message.operation==="notifyOrderIsAccepted"){
          Alert.alert(`주문이 접수되었습니다 예상 소요시간은 ${message.body.estimatedTime}분 입니다`)
        }
        if(message.operation==="notifyOrderIsRefused"){
          Alert.alert("주문이 거절되었습니다")
          navigation.replace('main')
        }
        if(message.operation==="notifyStartDelivery"){
          appContext.setIsDelivered(true)
          Alert.alert("주문이 배달 시작하였습니다")
        }
        if(message.operation==="notifyMemberReceiveDelivery"){
          for (let i=0 ; i <userList.length; i++){
            if(appContext.userList[i].id===message.body.id){
              appContext.userList.splice(i,1)
              appContext.setUserList([...appContext.userList])
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
          <BaseTab data={"waitingRoom"}/>
          <View style={styles.listBox}>
              <View style={styles.leftBox}>
                <Image source={{uri:image}} style={styles.imageStyle}/>
              </View>
              <View style={styles.rightBox}>
                <Text style={styles.restaurantNameText}> {restaurantName}</Text>
                <Text style={styles.addressText}>{address}</Text>
                <View style={styles.rightBottomBox}>
                  <Text style={styles.partyNameText}>{title}</Text>
                </View>
              </View>
          </View>    
          <ScrollView style={styles.scrollBox}>
            <View style={styles.cartBox}>
                <Text style={styles.cartText}>최종 주문 내역</Text>
            </View>
            <ViewCartList data={finalCart}/>
          </ScrollView>
        </SafeAreaView>

    );
  }

  const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex :1 ,

      },
      listBox:{
        height:100,
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
        alignSelf : "center"
  
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
  