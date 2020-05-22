import React, { useEffect, useState, useContext,useRef ,} from 'react'
import { StyleSheet, Text,SafeAreaView , TouchableOpacity,View,Button, Image,TextInput,Dimensions } from 'react-native';
import BaseTab from "../component/baseTab"
import { AppContext } from '../context/AppContext'
import { SocketContext } from '../context/SocketContext'


export default function roomDetailSettingScreen({route, navigation}) {

  const appContext = useContext(AppContext)

  const socketContext = useContext(SocketContext)

  const ws = useRef(socketContext.ws)

  const [id, setid] = useState(route.params.id);
  const [name, setName] = useState(route.params.name);

  const [title, setTitle] = useState("같이 먹어요");
  const [capacity, setCapacity] = useState(3);

  const [formattedAddress, setFormattedAddress] = useState(appContext.formattedAddress);
  const [detailAddress, setDetailAddress] = useState(appContext.detailAddress);

  // useEffect(() => {
    
  //     if (!ws.current || ws.current.readyState === WebSocket.CLOSED) {
  //       console.log("reconnect websocket")
  //       console.log(appContext.accessToken)
  //       const wsURL = `wss://api.onetable.xyz/v1/table/party?access=${appContext.accessToken}`
  //       try {
  //         const newws = new WebSocket(wsURL)
  //         socketContext.setws(newws)
  //         ws.current = newws
  //       }
  //       catch(err){
  //         if (err && err.response) {
  //           console.log(err)
  //           const status = err.response.status
  //           if (status === 404) {
  //             // Valid
  //             console.log('valid tokens')
  //           }
  //           else{
  //             console.log('invalid tokens -> refreshing tokens')
  //             axios({
  //               url: 'https://api.onetable.xyz/v1/table/auth/refresh',
  //               method: 'get',
  //               headers: {
  //                 Authorization: `Bearer ${appContext.refreshToken}`,
  //               },
  //             })
  //             .then(res => {
  //               console.log('tokens have been refreshed')
  //               // Refresh the tokens and store to the machine again
  //               const { access } = res.data
  //               console.log(access)
  //               const accessToken= access    
  //               SecureStore.setItemAsync('accessToken', accessToken)
  //               appContext.setAccessToken(accessToken)
  //               const wsURL = `wss://api.onetable.xyz/v1/table/party?access=${accessToken}`
  //               const newws = new WebSocket(wsURL)
  //               socketContext.setws(newws)
  //               ws.current = newws
  //             })
  //             .catch(err =>{
  //               console.log("could't refresh token")
  //             })
  //           }
  //         }
  //       }

  //     }
    
      
  // });

  useEffect(() => {
    if (!ws.current || ws.current.readyState === WebSocket.CLOSED) return;

    ws.current.onmessage = e => {
        const message = JSON.parse(e.data);
        console.log("RoomDetail listen")
        console.log(message);
        if(message.operation==="replyCreateParty"){
          console.log(message.body)
          if(message.body.isSuccess===true){
            console.log("create Success")
            navigation.navigate("room",message.body)
          }
          else{
            console.log("create failed")
          }
        }
        if(message.operation==="ping"){
          const sendMessage = { operation: 'pong'}
          ws.current.send(JSON.stringify(sendMessage))
        }
    };
  });

  function createParty(){
    if (!ws.current) return;

    const message = { operation: 'createParty', body: {restaurantID: id ,title : title , capacity : capacity , address : formattedAddress+" "+detailAddress } }
    ws.current.send(JSON.stringify(message))
  }

    return (
      <SafeAreaView style={styles.container}>
          <BaseTab/>
          <View style={styles.roomDetailContainer}>
              <View style={styles.restaurantNameBox}>
              <Text style={styles.restaurantNameText}>{name}</Text>
              </View>
              <View style={styles.detailSettingBox}>
                <Text style={styles.detailSettingText}>방제목</Text>                  
              </View>
              <TextInput style={styles.detailSettingInputBox} onChangeText={(text) => settitle(text)}>{title}</TextInput>
              <View style={styles.detailSettingBox}>
                <Text style={styles.detailSettingText}>최대인원</Text>                  
              </View>
              <TextInput style={styles.detailSettingInputBox} onChangeText={(text) => setCapacity(text)}>{capacity}</TextInput>
              <View style={styles.detailSettingBox}>
                <Text style={styles.detailSettingText}>만나는 위치</Text>                  
              </View>
              <TextInput style={styles.detailSettingInputBox} onChangeText={(text) => setFormattedAddress(text)}>{formattedAddress}</TextInput>
              <TextInput style={styles.detailSettingInputBox} onChangeText={(text) => setDetailAddress(text)}>{detailAddress}</TextInput>
              <TouchableOpacity style={styles.buttonBox} onPress={createParty}>
                <Text style={styles.buttonText}>파티 만들기</Text>
              </TouchableOpacity>
          </View>
        </SafeAreaView>
        
    );
  }
  
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
    },
    roomDetailContainer: {
      display : "flex",
      flexDirection: "column",
      alignContent : "stretch",
    },
    restaurantNameBox: {
      marginTop: 10,
      width: 335,
      height: 60,
      backgroundColor: "#FF8181",
      borderRadius: 10,
      marginBottom : 12, 
      // alignSelf: 'center',
      justifyContent: 'center', 
      alignItems: 'center' ,
      alignSelf: 'center',

      },
    restaurantNameText:{

      fontStyle: 'normal',
      fontSize: 20,
      textAlign: "center",
      color: "#FFFFFF",

    },
    detailSettingBox: {

      width: 335,
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

      width: 335,
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
    buttonBox:{
      width: 335,
      height: 39,
      backgroundColor: "#FF8181",
      borderRadius: 10,
      marginBottom : 12, 
      // alignSelf: 'center',
      justifyContent: 'center', 
      alignItems: 'center' ,
      alignSelf: 'center',
    },
    buttonText:{
      fontStyle: 'normal',
      fontSize: 20,
      textAlign: "center",
      color: "#FFFFFF",
  
    },
  });
  