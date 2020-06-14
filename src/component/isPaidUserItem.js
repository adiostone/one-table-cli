import React, { useEffect, useState, useContext ,useRef } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import { SocketContext } from '../context/SocketContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'

export default function isPaidUserItem(props) {

  const id = props.data.id
  const nickname =props.data.nickname
  const image =props.data.image
  const isHost =props.data.isHost 
  const isPaid = props.data.isPaid 

  const appContext = useContext(AppContext)

  const socketContext = useContext(SocketContext)

  const ws = useRef(socketContext.ws)


  return (

          <View style={styles.listBox}>
              {/* {(isHost === true) ?
              <View style={styles.hostBox}>
                 <Text style={styles.hostText}>방장</Text> 
              </View> :
              <View style={styles.notHostBox}>
                <Text style={styles.notHostText}></Text> 
              </View> 
              } */}
              <Image source={{uri:image}} style={styles.profileImageStyle}/>
              {(appContext.nickname === nickname) ?
              <Text style={styles.meText}>{nickname}</Text> : <Text style={styles.otherText}>{nickname}</Text> 
              }
              {(isPaid === true) ?
              <View style={styles.paidBox}>
                <Text style={styles.paidText}>결제 완료</Text> 
              </View>: 
              <View style={styles.notPaidBox}>
                <Text style={styles.notpaidText}></Text> 
              </View>
              }
          </View>        
  );
}


const styles = StyleSheet.create({

  listBox: {
    width : 80,
    // backgroundColor: "#FFF5F5",
    borderRadius: 10,
    alignSelf : "center",
    flexDirection : "column",
    alignItems : "center",
},
meText:{

  fontStyle: 'normal',
  fontSize: 10,
  fontWeight : "bold",
  textAlign: "center",

},


otherText:{

  fontStyle: 'normal',
  fontSize: 10,
  textAlign: "center",

},


profileImageStyle:{
  width: 40,
  height :40,
  borderRadius : 50,
  marginBottom : 10,
  marginTop : 10,
},

hostBox:{
  width: 40,
  paddingTop : 2,
  paddingBottom : 2,
  marginBottom : 5,
  borderRadius : 5,
  backgroundColor: "#FF473A",
},

hostText:{

  fontStyle: 'normal',
  fontSize: 14,
  textAlign: "center",
  fontWeight : "bold",
  color: "#FFFFFF",

},

notHostBox:{
  width: 40,
  paddingTop : 2,
  paddingBottom : 2,
  marginBottom : 5,
},
notHostText:{

  fontStyle: 'normal',
  fontSize: 14,
  fontWeight : "bold",
  textAlign: "center",

},

paidBox:{
  width: 50,
  paddingTop : 5,
  paddingBottom : 5,
  marginBottom : 10,
  marginTop : 10,
  borderRadius : 5,
  backgroundColor: "#95FF93",
},

paidText:{

  fontStyle: 'normal',
  fontSize: 10,
  textAlign: "center",
  fontWeight : "bold",
  color: "#FFFFFF",

},

notPaidBox:{
  width: 50,
  paddingTop : 5,
  paddingBottom : 5,
  marginBottom : 10,
  marginTop : 10,
  borderRadius : 5,
},

notPaidText:{

  fontStyle: 'normal',
  fontSize: 14,
  textAlign: "center",
  fontWeight : "bold",
  color: "#FFFFFF",

},




});
