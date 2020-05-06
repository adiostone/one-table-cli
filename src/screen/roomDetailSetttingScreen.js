import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text,SafeAreaView , TouchableOpacity,View,Button, Image,TextInput,Dimensions } from 'react-native';

export default function roomDetailSettingScreen({navigation}) {

    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity  onPress={() => navigation.navigate('main')}>
            <Image source={require('../assets/OnetableLogo.png')} style={styles.logoStyle} />
        </TouchableOpacity>    
            <View style={styles.roomDetailContainer}>
                <View style={styles.restaurantNameBox}>
                  <Text style={styles.restaurantNameText}>네네치킨 중앙대점</Text>
                </View>
                <View style={styles.detailSettingBox}>
                  <Text style={styles.detailSettingText}>방제목</Text>                  
                </View>
                <View style={styles.detailSettingInputBox}>
                    <TextInput style={styles.detailSettingInputText}></TextInput>
                </View>
                <View style={styles.detailSettingBox}>
                  <Text style={styles.detailSettingText}>최대인원</Text>                  
                </View>
                <View style={styles.detailSettingInputBox}>
                    <TextInput style={styles.detailSettingInputText}></TextInput>
                </View>
                <View style={styles.detailSettingBox}>
                  <Text style={styles.detailSettingText}>만나는 위치</Text>                  
                </View>
                <View style={styles.detailSettingInputBox}>
                    <TextInput style={styles.detailSettingInputText}></TextInput>
                </View>
                <TouchableOpacity style={styles.buttonBox} onPress={() => navigation.navigate('room')}>
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

    },
    detailSettingInputText:{
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

    logoStyle: {
      width: 47,
      height: 37.7,
      marginLeft:20,
      marginTop:20,
      marginBottom:5,

    },
  });
  