import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'

export default function userItem(props) {

  const id = props.data.id
  const nickname =props.data.nickname
  const image =props.data.image
  const isHost =props.data.isHost 
  const isReady = props.data.isReady 

  const appContext = useContext(AppContext)

  useEffect(()=>{
   
  })

  return (

          <View style={styles.listBox}>
              {(isHost === true) ?
              <View style={styles.hostBox}>
                 <Text style={styles.hostText}>방장</Text> 
              </View> :
              <View style={styles.notHostBox}>
                <Text style={styles.notHostText}></Text> 
              </View>
              }
              <Image source={{uri:image}} style={styles.profileImageStyle}/>
              {(appContext.nickname === nickname) ?
              <Text style={styles.meText}>{nickname}</Text> : <Text style={styles.otherText}>{nickname}</Text> 
              }
              {(isReady === true && isHost !==true) ?
              <View style={styles.readyBox}>
                <Text style={styles.readyText}>Ready</Text> 
              </View>: 
              <View style={styles.notReadyBox}>
                <Text style={styles.notReadyText}></Text> 
              </View>
              }
          </View>        
  );
}


const styles = StyleSheet.create({

  listBox: {
    width : 160,
    backgroundColor: "#FFF5F5",
    borderRadius: 10,
    alignSelf : "center",
    flexDirection : "column",
    alignItems : "center",
},
meText:{

  fontStyle: 'normal',
  fontSize: 14,
  fontWeight : "bold",
  textAlign: "center",

},


otherText:{

  fontStyle: 'normal',
  fontSize: 14,
  textAlign: "center",

},


profileImageStyle:{
  width: 50,
  height :50,
  borderRadius : 50,
  marginBottom : 10,
},

hostBox:{
  width: 60,
  paddingTop : 5,
  paddingBottom : 5,
  marginBottom : 10,
  marginTop : 10,
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
  width: 60,
  paddingTop : 5,
  paddingBottom : 5,
  marginBottom : 10,
  marginTop : 10,
},
notHostText:{

  fontStyle: 'normal',
  fontSize: 14,
  fontWeight : "bold",
  textAlign: "center",

},

readyBox:{
  width: 90,
  paddingTop : 5,
  paddingBottom : 5,
  marginBottom : 10,
  marginTop : 10,
  borderRadius : 5,
  backgroundColor: "#FFBF75",
},

readyText:{

  fontStyle: 'normal',
  fontSize: 14,
  textAlign: "center",
  fontWeight : "bold",
  color: "#FFFFFF",

},

notReadyBox:{
  width: 90,
  paddingTop : 5,
  paddingBottom : 5,
  marginBottom : 10,
  marginTop : 10,
  borderRadius : 5,
},

notReadyText:{

  fontStyle: 'normal',
  fontSize: 14,
  textAlign: "center",
  fontWeight : "bold",
  color: "#FFFFFF",

},




});
