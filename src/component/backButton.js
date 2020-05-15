import React, { useEffect, useState, useContext , useRef} from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'


import { useNavigation } from '@react-navigation/native';


export default function backButton(props) {

  const navigation = useNavigation();
  const information = props.information
  const backLocation = props.backLocation

  return (

    <TouchableOpacity style={styles.backBox} onPress={() => navigation.navigate(backLocation)}>
        <Text style={styles.backText}>{information}</Text>
    </TouchableOpacity>             
      
  );
}

const styles = StyleSheet.create({

    backBox:{
        width: 335,
        height: 39,
        backgroundColor: "#FF7E47",
        borderRadius: 10,
        marginBottom : 12, 
        justifyContent: 'center', 
        alignItems: 'center', 
        alignSelf : "center",
      },
      backText:{
        fontStyle: 'normal',
        fontSize: 20,
        textAlign: "center",
        color: "#FFFFFF",
      },

});
