import React, { useEffect, useState, useContext , useRef } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,TouchableOpacity,Dimensions, ScrollView, SafeAreaView } from 'react-native';
import CartList from "../component/viewCartList"
import LogoButton from "../component/logoButton"
import { AppContext } from '../context/AppContext'
import { SocketContext } from '../context/SocketContext'

export default function confirmOrderScreen({navigation}) {

  const appContext = useContext(AppContext)

  const socketContext = useContext(SocketContext)

  const ws = useRef(socketContext.ws)

  const [cartList , setCartList] = useState(appContext.cartList)

  useEffect(() => {
    if (!ws.current || ws.current.readyState === WebSocket.CLOSED) return;

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

    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.logo}>
            <LogoButton/>
          </View>
          <ScrollView style={styles.scrollBox}>
            <View style={styles.cartBox}>
                <Text style={styles.cartText}>최종 주문 내역</Text>
            </View>
            <ViewCartList data={cartList}/>
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
      cartBox:{
        width: 335,
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
  