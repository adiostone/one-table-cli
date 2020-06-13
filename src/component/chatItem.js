import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'


export default function chatItem(props) {

    const appContext = useContext(AppContext)

    const id =props.data.chatID
    const userID =props.data.userID 
    const nickname =props.data.nickname 
    const chat =props.data.chat 
    const [image,setImage] = useState(null)
    // const time = props.data.time

    const userList =appContext.userList 

  useEffect(()=>{
    for (let i=0 ; i <userList.length; i++){
        if(userList[i].nickname===nickname){
          setImage(userList[i].image)
        } 
      }
   
  })

  return (
    (appContext.nickname !== nickname) ? 
          (image===null) ? (<View style={styles.leftRightBox}>
                    <View style={styles.nicknameBox}>
                        <Text style={styles.nicknameText}>{nickname}</Text>
                    </View>
                    <View style={styles.chatBox}>
                        <Text style={styles.chatText}>{chat}</Text>
                    </View>
                </View>) : (
                <View style={styles.leftBox}>
                    <View style={styles.leftLeftBox}>
                        <Image source={{uri:image}} style={styles.profileImageStyle}/>
                    </View>
                    <View style={styles.leftRightBox}>
                        <View style={styles.nicknameBox}>
                            <Text style={styles.nicknameText}>{nickname}</Text>
                        </View>
                        <View style={styles.chatBox}>
                        <Text style={styles.chatText}>{chat}</Text>
                        </View>
                    </View>
                </View>

                )
            :(<View style={styles.rightBox}>
                <View style={styles.chatBox}>
                    <Text style={styles.chatText}>{chat}</Text>
                </View>
            </View>)      
  );
}
const styles = StyleSheet.create({

    leftBox: {
        marginLeft : 10,
        display : "flex",
        flexDirection : "row",
    },
    leftLeftBox: {
        justifyContent : "center",
    },
    profileImageStyle:{
        width: 40,
        height :40,
        borderRadius : 50,
    },
    leftRightBox: {
        marginLeft : 10,
        display : "flex",
        flexDirection : "column",
    },
    rightBox: {
        marginRight : 10,
        display : "flex",
        flexDirection : "row",
        justifyContent : "flex-end",
    },
    nicknameBox:{
        margin : 4,
    },
    nicknameText:{
        fontSize : 12,
        fontWeight : "bold",
    },
    chatBox:{
        padding : 6 ,
        borderRadius : 5,
        borderWidth: 1,
        borderColor: 'black',
        margin : 4,
    },
    chatText:{
    fontSize : 12,
    },
    timeText:{  
        fontSize : 10,
        color : "gray",
        position : "relative" ,
        bottom : -5,
    },


});
