import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button,ScrollView ,Image,TextInput,TouchableOpacity,Dimensions,SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import config from "../config/config"

export default function mapScreen({navigation}) {

  const [textInput, onChangeText] = useState('세부주소를 입력해주세요');
  const [location, setLocation] = useState();  
  const [formattedAddress, setFormattedAddress] = useState("");
  const [detailLocation, setDetailLocation] = useState("");
  const [locationIsSet, setLocationIsSet] = useState(false);
  const [mapRegion, setMapRegion] = useState();
  const [errorMsg, setErrorMsg] = useState();

  Geocoder.init(config.googleAPIKey,{language: "korean"})

  useEffect(() => {
      if(locationIsSet===false){
        getlocation();
    };
  });

  const getlocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setMapRegion({ 
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      Geocoder.from({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }).then(json => {
            setFormattedAddress(json.results[0].formatted_address);
        })
        .catch(error => console.warn(error));
      setLocationIsSet(true);
  };


  let lat ='Waiting..';
  let long = "waiting.."
  let coord = {coordinate:{latitude: 0 ,longitude: 0}}
  let address = "waiting.."
  if (errorMsg) {
    lat = errorMsg;
    long = errorMsg
  } else if (location) {
    lat = location.coords.latitude;
    long = location.coords.longitude;
    coord = location.coords
    address = formattedAddress 
   }

  return (
    <SafeAreaView style={styles.container}>
        <Image source={require('../assets/OnetableLogo.png')} style={styles.logoStyle} />
        <ScrollView style={styles.mapContainer}>
            <View style={styles.resetLocationBox}>
              <Text style={styles.resetLocationBoxText}>주소</Text>
            </View>        
            <View style={styles.locationBox}>
              <Text style={styles.locationBoxText}>{address}</Text>
            </View>     
            <View style={styles.locationBox}>
              <TextInput style={styles.locationBoxText} onPress={(text) => onChangeText(text)}>{textInput}</TextInput>
            </View>     
            <TouchableOpacity style={styles.resetLocationBox} onPress={() => setDetailLocation(textInput)}>
              <Text style={styles.resetLocationBoxText}>세부 주소 설정</Text>
            </TouchableOpacity>
            <MapView style={styles.mapStyle} region={mapRegion}>
              <Marker coordinate={coord}/>
            </MapView>
            <TouchableOpacity style={styles.resetLocationBox} onPress={() => setLocationIsSet(false)}>
            <Text style={styles.resetLocationBoxText}> 위치 재설정</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backBox} onPress={() => navigation.navigate('main')}>
              <Text style={styles.backBoxText}> 돌아가기</Text>
            </TouchableOpacity>
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

  },
  locationBoxText:{
    fontStyle: 'normal',
    fontSize: 12,
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
});
