import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions } from 'react-native';
import Constants from 'expo-constants';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import Geocoder from 'react-native-geocoding';




import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


export default function mapScreen({navigation}) {

  const [textInput, onChangeText] = useState('세부주소를 입력해주세요');
  const [location, setLocation] = useState();  
  const [formattedAddress, setFormattedAddress] = useState();
  const [detailLocation, setDetailLocation] = useState("");
  const [locationIsSet, setLocationIsSet] = useState(false);
  const [mapRegion, setMapRegion] = useState();
  const [errorMsg, setErrorMsg] = useState();

  Geocoder.init("AIzaSyCGjXuFaep9n4er1lfv3LPJ0RZkkHjxahA",{language: "korean"})

  useEffect(() => {
    (async () => {
    

      if(locationIsSet===false){
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
    }


    })();
  });

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
    <View style={styles.container}>
        <Text>latitude : {lat}</Text>
        <Text>longitude : {long}</Text>
        <Text>주소 : {address}</Text>
        <Text>세부 주소</Text>
        <TextInput style={styles.textInputBox} onChangeText={text => onChangeText(text)}
      value={textInput}/>
        <Button title="세부주소 설정" onPress={() => setDetailLocation(textInput)}/>
      <MapView style={styles.mapStyle} region={mapRegion}>
        <Marker coordinate={coord}/>
      </MapView> 
      <Button title="위치 재설정" onPress={() => setLocationIsSet(false)}/>
    </View>
      
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  textInputBox:{
    width : 300,
    borderColor: 'gray',
    borderWidth : 1,
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
});
