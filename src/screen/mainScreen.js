import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import Constants from 'expo-constants';
import restuarantFoodListScreen from './foodListScreen';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import PartyList from "../component/partyList"
import axios from 'axios'
import LogoButton from "../component/logoButton"


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
            console.log(res.data)   
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
                      const { access, refresh } = res.data
                      console.log(access)
                      console.log(refresh)
                      const accessToken= access    
                      const refreshToken  = refresh
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

        //load user data from expo 
        loadLocationData();

        appContext.setAccessToken(accessToken)
        SecureStore.getItemAsync('refreshToken').then(refreshToken => {
          // console.log(refreshToken)
          appContext.setRefreshToken(refreshToken)
        })
      }
    })
  }, [])

  async function loadLocationData(){
    const locationIsSet = await SecureStore.getItemAsync('locationIsSet')
    console.log("load location data")
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


  return (
    <SafeAreaView style={styles.container}>
        <LogoButton/>
        <ScrollView style={styles.pinContainer}>
          <TouchableOpacity style={styles.locationBox} onPress={() => navigation.navigate('map')}>
            <Text style={styles.locationText}>위치 설정</Text>
          </TouchableOpacity>        
          <TouchableOpacity style={styles.createBox} onPress={() => navigation.navigate('restaurantList')}>
            <Text style={styles.createText}> 파티 만들기</Text>
          </TouchableOpacity>
          <PartyList/>
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

});
