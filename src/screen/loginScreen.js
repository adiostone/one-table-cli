import React, { useEffect, useState, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import * as WebBrowser from 'expo-web-browser'
import * as SecureStore from 'expo-secure-store';

import axios from 'axios'
import { Linking } from 'expo'
import { StyleSheet, Text, View, Image, Alert,TouchableOpacity,SafeAreaView} from 'react-native';

export default function loginScreen({navigation}) {

  const appContext = useContext(AppContext)

  Linking.addEventListener('url', async e => {
    console.log('redirected from Google OAuth')
    const url = e.url
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

      const locationIsSet = JSON.parse(await SecureStore.getItemAsync('locationIsSet'))    
      console.log("Do you have Location Information?")
      console.log(locationIsSet)
      if(locationIsSet===true){
        console.log("you have location information")
        appContext.setlocationIsSet(locationIsSet)
        appContext.setlocation(JSON.parse(await SecureStore.getItemAsync('location')))
        appContext.setMapRegion(JSON.parse(await SecureStore.getItemAsync('mapRegion')))
        appContext.setFormattedAddress(await SecureStore.getItemAsync('formattedAddress'))
        appContext.setDetailAddress(await SecureStore.getItemAsync('detailAddress'))
      }
      else{
        console.log("you don't have location information")
      }
      navigation.navigate('main')
    }
  })


  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/OnetableLogo.png')} style={styles.logoStyle} />
      <Text style={styles.textStyle}>1인 식탁</Text>
      <TouchableOpacity  onPress={async () => {
              const deepLink = Linking.makeUrl()
              console.log('deepLink: ' + deepLink)
              try {
                const result = await WebBrowser.openBrowserAsync(
                  'https://api.onetable.xyz/v1/table/auth/signin'
                )
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




