import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import Constants from 'expo-constants';
import restuarantFoodListScreen from './foodListScreen';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'


export default function mainScreen({navigation}) {


  const appContext = useContext(AppContext)

  // Check if there exists an access token
  // If not, navigate to Google sign in screen
  useEffect(() => {
    SecureStore.getItemAsync('accessToken').then(accessToken => {
      if (!accessToken) {
        navigation.navigate('login')
      } else {
        // Access token exists
        // Check if the token valid
        // if not, refresh tokens
        axios({
          url: 'https://api.onetable.xyz/v1/table/test',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then(res => {
            console.log("check")
            console.log(res)
          })
          .catch(err => {
            if (err && err.response) {
              console.log(err)
              const status = err.response.status
              if (status === 404) {
                // Valid
                console.log('valid tokens')
              } else {
                console.log('invalid tokens -> refreshing tokens')
                SecureStore.getItemAsync('refreshToken').then(refreshToken => {
                  axios({
                    url: 'https://api.onetable.xyz/v1/table/auth/refresh',
                    method: 'get',
                    headers: {
                      Authorization: `Bearer ${refreshToken}`,
                    },
                  })
                    .then(res => {
                      console.log('tokens have been refreshed')
                      // Refresh the tokens and store to the machine again
                      const { accessToken, refreshToken } = res.data
                      SecureStore.setItemAsync('accessToken', accessToken)
                      SecureStore.setItemAsync('refreshToken', refreshToken)
                      appContext.setAccessToken(accessToken)
                      appContext.setRefreshToken(refreshToken)
                    })
                    .catch(err => {
                      console.log('should login again')
                      navigation.navigate('login')
                    })
                })
              }
            }
          })

        // TODO
        // Fetch file info from server
        // axios
        //   .get('https://clowd.xyz/v1/client/dir', {
        //     headers: {
        //       Authorization: `Bearer ${accessToken}`,
        //     },
        //   })
        //   .then(res => {
        //     const fileList = res.data
        //     // appContext.setFileInfo(sampleFileInfo)
        //     appContext.setFileInfo(
        //       fileList.map(file => {
        //         return {
        //           path: file.name,
        //           size: parseFloat((file.size / 1024 / 1024).toFixed(2)),
        //         }
        //       })
        //     )
        //   })

        appContext.setAccessToken(accessToken)

        SecureStore.getItemAsync('refreshToken').then(refreshToken => {
          console.log(refreshToken)
          appContext.setRefreshToken(refreshToken)
        })
      }
    })
  }, [])


  return (
    <SafeAreaView style={styles.container}>
        <Image source={require('../assets/OnetableLogo.png')} style={styles.logoStyle} />
        <View style={styles.pinContainer}>
          <TouchableOpacity style={styles.locationBox} onPress={() => navigation.navigate('map')}>
            <Text style={styles.locationText}>위치 설정</Text>
          </TouchableOpacity>        
          <TouchableOpacity style={styles.createBox} onPress={() => navigation.navigate('restaurantList')}>
            <Text style={styles.createText}> 파티 만들기</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.listContainer}>
          <TouchableOpacity style={styles.listBox}>
            <Text style={styles.listMainText}> 네네 치킨 중앙대점</Text>
            <Text style={styles.listLocationText}> 중앙대 309관 기숙사</Text>
            <Text style={styles.listRoomNameText}> 치즈 스노윙 치킨 순살 드실분!</Text>
          </TouchableOpacity>        
          <TouchableOpacity style={styles.listBox}>
            <Text style={styles.listMainText}> 미스터피자 중앙대점</Text>
            <Text style={styles.listLocationText}> 중앙대 308관 기숙사</Text>
            <Text style={styles.listRoomNameText}> 포테이토 피자 ㄱ?</Text>
          </TouchableOpacity>        
          <TouchableOpacity style={styles.listBox}>
            <Text style={styles.listMainText}> 엽기떡볶이 중앙대점</Text>
            <Text style={styles.listLocationText}> 중앙대 309관 기숙사</Text>
            <Text style={styles.listRoomNameText}> 엽떡먹어요</Text>
          </TouchableOpacity>   
          </ScrollView>
    </SafeAreaView>
      
  );
}


const styles = StyleSheet.create({
  container: {
    display:"flex",
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  pinContainer: {
    alignSelf: 'center',

  },
  locationBox:{
    width: 335,
    height: 39,
    backgroundColor: "#FFBF75",
    borderRadius: 10,
    marginBottom : 12, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  locationText:{
    fontStyle: 'normal',
    fontSize: 20,
    textAlign: "center",
    color: "#FFFFFF",
  },
  createBox:{
    width: 335,
    height: 39,
    backgroundColor: "#FF8181",
    borderRadius: 10,
    marginBottom : 12, 
    justifyContent: 'center', 
    alignItems: 'center' 

  },
  createText:{
    fontStyle: 'normal',
    fontSize: 20,
    textAlign: "center",
    color: "#FFFFFF",

  },
  listContainer:{
    alignSelf: 'center',


  },
  listBox:{
    width: 335,
    height: 80,

    backgroundColor: "#CB661D",
    borderRadius: 10,
    marginBottom : 12, 
    justifyContent: 'center', 
    alignItems: 'center' 

  },
  listMainText:{
    fontStyle: 'normal',
    fontSize: 18,
    fontWeight : "bold",
    textAlign: "center",
    color: "#FFFFFF",
  },
  listLocationText:{
    fontStyle: 'normal',
    fontSize: 15,
    textAlign: "center",
    color: "#FFFFFF",
  },
  listRoomNameText:{
    fontStyle: 'normal',
    fontSize: 12,
    textAlign: "center",
    color: "#FFFFFF",
  },
  textStyle: {
    marginLeft: 20,
    marginTop: 10,
    color: '#5B4141',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 60,
  },
  logoStyle: {
    width: 47,
    height: 37.7,
    marginLeft:20,
    marginTop:20,
    marginBottom:15,
  },
});
