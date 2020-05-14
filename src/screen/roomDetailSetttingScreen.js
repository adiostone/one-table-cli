import React, { useEffect, useState, useContext,useRef ,} from 'react'
import { StyleSheet, Text,SafeAreaView , TouchableOpacity,View,Button, Image,TextInput,Dimensions } from 'react-native';
import LogoButton from "../component/logoButton"
import { AppContext } from '../context/AppContext'


export default function roomDetailSettingScreen({route, navigation}) {

  const appContext = useContext(AppContext)

  const ws = useRef(null);

  const [restaurantID, setRestaurantID] = useState(route.params.restaurantID);
  const [restaurantName, setRestaurantName] = useState(route.params.restaurantName);

  const [roomName, setRoomName] = useState("같이 먹어요");
  const [capacity, setCapacity] = useState(3);

  const [formattedAddress, setFormattedAddress] = useState(appContext.formattedAddress);
  const [detailAddress, setDetailAddress] = useState(appContext.detailAddress);

  useEffect(() => {

    const wsURL = `wss://dev.api.onetable.xyz/v1/table/party?access=${appContext.accessToken}`
    ws.current = new WebSocket(wsURL)

    ws.current.onopen = () => {
    };
    
});

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = e => {
        const message = JSON.parse(e.data);
        console.log(message);
        // if(message.operation==="ping"){
        //   const sendMessage = { operation: 'pong'}
        //   ws.current.send(JSON.stringify(sendMessage))
        // }
    };
  });

  function createParty(){
    if (!ws.current) return;

    const message = { operation: 'createParty', body: {restaurantID: restaurantID ,title : roomName , capacity : capacity , address : formattedAddress+" "+detailAddress } }
    ws.current.send(JSON.stringify(message))
    message.body["restaurantName"] = restaurantName
    message.body["members"] = [appContext.nickname]
    console.log(message.body)
    navigation.navigate("room",message.body)
  }

    return (
      <SafeAreaView style={styles.container}>
          <LogoButton/>
          <View style={styles.roomDetailContainer}>
              <View style={styles.restaurantNameBox}>
              <Text style={styles.restaurantNameText}>{restaurantName}</Text>
              </View>
              <View style={styles.detailSettingBox}>
                <Text style={styles.detailSettingText}>방제목</Text>                  
              </View>
              <TextInput style={styles.detailSettingInputBox} onChangeText={(text) => setRoomName(text)}>{roomName}</TextInput>
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
  