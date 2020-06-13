import React, { useEffect, useState, useContext,useRef } from 'react'
import { StyleSheet, Text, Alert,View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';

import { AppContext } from '../context/AppContext'
import { SocketContext } from '../context/SocketContext'

import LogoButton from "../component/logoButton"

export function paymentResultScreen({navigation}) {

    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.logo}>
          <LogoButton/>
        </View>
        <View style={styles.topBox}>
            <Text style={styles.topMainText}>결제 완료!</Text>
            <Text style={styles.topDetailText}>모든 파티원들이 결제를 완료할시</Text>
            <Text style={styles.topDetailText}>주문 접수 됩니다</Text>
        </View>
        <TouchableOpacity style={styles.middleBox} onPress={() => navigation.navigate('afterPaymentCart')}>
        <Text style={styles.middleText}>결제 내역 보기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBox} onPress={() => navigation.navigate('waitingRoom')}>
        <Text style={styles.bottomText}>대기방 입장</Text>
        </TouchableOpacity>        
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
        alignItems: 'center' 

      },
      pinContainer: {
        alignSelf: 'center',
    
      },
      logo:{
        alignItems: "center",
      },
      topBox:{
        height: 200,
        width: 340,
        marginBottom : 12, 
        justifyContent: 'center', 
        alignItems: 'center' 
      },
      topMainText:{
        fontStyle: 'normal',
        fontSize: 40,
        fontWeight : "bold",
        textAlign: "center",
      },
      topDetailText:{
        fontStyle: 'normal',
        fontSize: 20,
        textAlign: "center",
        color: "gray",
      },
      bottomBox:{
        height: 39,
        width: 340,
        backgroundColor: "#FFBF75",
        borderRadius: 10,
        marginBottom : 12, 
        justifyContent: 'center', 
        alignItems: 'center' 
      },
      bottomText:{
        fontStyle: 'normal',
        fontSize: 20,
        textAlign: "center",
        color: "#FFFFFF",
      },
      middleBox:{
        height: 39,
        width: 340,
        backgroundColor: "#FF8181",
        borderRadius: 10,
        marginBottom : 12, 
        justifyContent: 'center', 
        alignItems: 'center' 
    
      },
      middleText:{
        fontStyle: 'normal',
        fontSize: 20,
        textAlign: "center",
        color: "#FFFFFF",
    
      },
    
  });

export default paymentResultScreen;