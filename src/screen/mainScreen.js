import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import Constants from 'expo-constants';
import restuarantFoodListScreen from './foodListScreen';

export default function mainScreen({navigation}) {


 

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