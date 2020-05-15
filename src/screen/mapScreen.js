import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button,ScrollView ,Image,TextInput,TouchableOpacity,Dimensions,SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';

import axios from 'axios'
import LogoButton from "../component/logoButton"
import config from "../config/config"

export default function mapScreen({navigation}) {

  const appContext = useContext(AppContext)

  const [textInput, setTextInput] = useState(appContext.detailAddress);

  const [locationIsSet, setLocationIsSet] = useState(appContext.locationIsSet);
  const [location, setLocation] = useState(appContext.location);  
  const [formattedAddress, setFormattedAddress] = useState(appContext.formattedAddress);
  const [detailAddress, setDetailAddress] = useState(appContext.detailAddress);
  const [mapRegion, setMapRegion] = useState(appContext.mapRegion);

  Geocoder.init(config.googleAPIKey,{language: "korean"})


  useEffect(() => {
      if(locationIsSet==="false"){
        console.log("getLocation")
        getNewlocation();
    };
  },[locationIsSet]);

  function setDetailLocation(e) {
    setDetailAddress(textInput)
    appContext.setDetailAddress(textInput)
    SecureStore.setItemAsync('detailAddress',textInput)
    axios({
        method: 'patch',
        url: "https://api.onetable.xyz/v1/table/me/place",
        headers: {
          Authorization: `Bearer ${appContext.accessToken}`,
        },
        data : {
          "address2": textInput
        },
    })   
    .then(res =>{
        console.log("send detail Location info to server")
        console.log(res)

    })
    .catch(err =>{
        console.log("failed send detail Location info to server")
        console.log(err)
    })
  }

  const getNewlocation = async () => {

      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }

      let googleLocation = await Location.getCurrentPositionAsync({});
      let location = { 
        latitude: googleLocation.coords.latitude,
        longitude: googleLocation.coords.longitude,
      }
      let mapRegion = {
        latitude: googleLocation.coords.latitude,
        longitude: googleLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
      console.log(location)
      setLocation(location)
      appContext.setLocation(location);
      setMapRegion(mapRegion);
      appContext.setMapRegion(mapRegion);
      Geocoder.from({
        latitude: googleLocation.coords.latitude,
        longitude: googleLocation.coords.longitude
      }).then(json => {
            const modifiedString=json.results[0].formatted_address.replace("대한민국 ","")
            console.log(modifiedString)
            setFormattedAddress(modifiedString);
            appContext.setFormattedAddress(modifiedString);
            SecureStore.setItemAsync('formattedAddress',modifiedString)

            axios({
                method: 'patch',
                url: "https://api.onetable.xyz/v1/table/me/place",
                headers: {
                  Authorization: `Bearer ${appContext.accessToken}`,
                },
                data : {
                  "latitude": location.latitude,
                  "longitude": location.longitude,
                  "address1": modifiedString,
                },
            })   
            .then(res =>{
                console.log("send Location info to server")
                console.log(res)

            })
            .catch(err =>{
                console.log("send Location info to server")
                console.log(err)
            })
        })
        .catch(error => console.warn(error));


      appContext.setLocationIsSet("true");
      setLocationIsSet("true");
      appContext.setDetailAddress("세부정보를 입력해주세요");
      setDetailAddress("세부정보를 입력해주세요");
      setTextInput("세부정보를 입력하세요");
      SecureStore.setItemAsync('location', JSON.stringify(location))
      SecureStore.setItemAsync('mapRegion',JSON.stringify(mapRegion))
      SecureStore.setItemAsync('locationIsSet',"true")

  };

  return (
    <SafeAreaView style={styles.container}>
        <LogoButton/>
        <ScrollView style={styles.mapContainer}>
            {(locationIsSet==="true") ?
            //main page
            (<View>
            <View style={styles.resetLocationBox}>
              <Text style={styles.resetLocationBoxText}>주소</Text>
            </View>        
            <View style={styles.locationBox}>
              <Text style={styles.locationBoxText}>{formattedAddress}</Text>
            </View>     
            <TextInput style={styles.locationBox} onChangeText={(text) => setTextInput(text)}>{textInput}</TextInput>
            <TouchableOpacity style={styles.resetLocationBox} onPress={setDetailLocation}>
              <Text style={styles.resetLocationBoxText}>세부 주소 설정</Text>
            </TouchableOpacity>
            <MapView style={styles.mapStyle} region={mapRegion}>
              <Marker coordinate={location}/>
            </MapView>
            <TouchableOpacity style={styles.resetLocationBox} onPress={() => setLocationIsSet("false")}>
            <Text style={styles.resetLocationBoxText}> 위치 재설정</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backBox} onPress={() => navigation.navigate('main')}>
              <Text style={styles.backBoxText}> 돌아가기</Text>
            </TouchableOpacity>
            </View>) : 
            //loading page
            (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>로딩중</Text>
              </View>
            )
            }
      </ScrollView>
    </SafeAreaView>
      
  );
}

const styles = StyleSheet.create({
  container: {
    display : "flex",
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  mapContainer: {

  },
  locationBox: {
    width: 335,
    height: 39,
    backgroundColor: "#FFF5F5",
    borderRadius: 10,
    marginBottom : 12, 
    justifyContent: 'center', 
    alignItems: 'center' ,
    alignSelf: 'center',
    fontStyle: 'normal',
    fontSize: 14,
    textAlign: "center",

  },

  resetLocationBox:{
    width: 335,
    height: 39,
    backgroundColor: "#FFBF75",
    borderRadius: 10,
    marginBottom : 12, 
    justifyContent: 'center', 
    alignItems: 'center' ,
    alignSelf: 'center',

  },
  resetLocationBoxText:{
    fontStyle: 'normal',
    fontSize: 20,
    textAlign: "center",
    color: "#FFFFFF",
  },
  backBox:{
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
  backBoxText:{
    fontStyle: 'normal',
    fontSize: 20,
    textAlign: "center",
    color: "#FFFFFF",

  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    marginBottom : 12, 

  },
  logoStyle: {
    width: 47,
    height: 37.7,
    marginLeft:20,
    marginTop:20,
    marginBottom:15,
  },
  loadingContainer:{
    height :  650,
    justifyContent: 'center', 
    alignItems: 'center' ,
    alignSelf: 'center',

  },
  loadingText:{
    fontSize: 50,
    textAlign: "center",

  }
});
