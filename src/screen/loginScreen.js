import React, { useEffect, useState, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import * as WebBrowser from 'expo-web-browser'
import * as SecureStore from 'expo-secure-store';

import axios from 'axios'
import { Linking } from 'expo'
import { StyleSheet, Text, View, Image, Alert,TouchableOpacity,SafeAreaView} from 'react-native';

export default function loginScreen({navigation}) {

  const appContext = useContext(AppContext)

  async function loadNickname(accessToken){
    console.log("load nickname")
    const res = await axios.get('https://dev.api.onetable.xyz/v1/table/me/profile',
        { headers: { Authorization: `Bearer ${accessToken}` }
    })

    console.log(res.data.nickname)
    const nickname =res.data.nickname

    //for welcome user
    Alert.alert(nickname + "님 환영합니다!")

    //set nickname
    appContext.setNickname(nickname)

  }

  async function loadLocationInfo(){

      //load location info
      const locationIsSet = await SecureStore.getItemAsync('locationIsSet')   
      console.log("Do you have Location Information?")
      console.log(locationIsSet)
      if(locationIsSet==="true"){
        console.log("you have location information")
        appContext.setLocationIsSet(locationIsSet)
        appContext.setLocation(JSON.parse(await SecureStore.getItemAsync('location')))
        appContext.setMapRegion(JSON.parse(await SecureStore.getItemAsync('mapRegion')))
        appContext.setFormattedAddress(await SecureStore.getItemAsync('formattedAddress'))
        appContext.setDetailAddress(await SecureStore.getItemAsync('detailAddress'))
      }
      else{
        console.log("you don't have location information")
      }

  }

  async function login(url){
    console.log('redirected from Google OAuth')
    console.log(url)
    let { path, queryParams } = Linking.parse(url)
    console.log(queryParams)
    const { access, refresh } = queryParams
    const accessToken= access    
    const refreshToken  = refresh
    console.log(`accessToken: ${accessToken}`)
    console.log(`refreshToken: ${refreshToken}`)
    WebBrowser.dismissBrowser()

    if (!accessToken || !refreshToken) {
      console.log('wrong tokens')
      Alert.alert('Sign Up Fails')
    } else {

      // set the tokens and store to the machine
      await SecureStore.setItemAsync('accessToken', accessToken)
      await SecureStore.setItemAsync('refreshToken', refreshToken)
      appContext.setAccessToken(accessToken)
      appContext.setRefreshToken(refreshToken)

      await loadNickname(accessToken)
      await loadLocationInfo()

      navigation.navigate('main')
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/OnetableLogo.png')} style={styles.logoStyle} />
      <Text style={styles.textStyle}>1인 식탁</Text>
      <TouchableOpacity  onPress={async () => {
              const deepLink = Linking.makeUrl()
              console.log('deepLink: ' + deepLink)
              try {
                const result = await WebBrowser.openAuthSessionAsync(                  
                  'https://dev.api.onetable.xyz/v1/table/auth/signin'
                , deepLink)
                if(result.type == "success"){
                  login(result.url)
                }
                else{
                  console.log("login Failed")
                }
              } catch (error) {
                console.error(error)
              }
            }}
            >
          <Image source={require('../assets/GoogleLogin.png')} style={styles.googleLoginStyle}/>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
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
    marginLeft: 20,
    height: 100,
    width: 125,
  },
  googleLoginStyle: {
    alignSelf : 'center', 
    marginTop: 13,
    width : 334,
  },
});




