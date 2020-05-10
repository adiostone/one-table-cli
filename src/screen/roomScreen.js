import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,TouchableOpacity,Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { AppContext } from '../context/AppContext'
import LogoButton from "../component/logoButton"
import UserList from "../component/userList"


export default function roomScreen({navigation}) {

  const appContext = useContext(AppContext)

  const [partyID, setPartyID] = useState() 
  const [restaurantName, setRestaurantName] = useState() 
  const [address, setAddress] = useState() 
  const [capacity, setCapacity] = useState();
  const [curPeopleNum, setCurPeopleNum] = useState();
  const [partyName, setPartyName] = useState() 

  const [userList, setUserList] = useState() 


    return (
        <SafeAreaView style={styles.container}>
          <LogoButton/>
          <ScrollView style={styles.pinContainer}>
            <View style={styles.listBox} onPress={() => {navigation.navigate("room")}}>
              <Text style={styles.restaurantNameText}> {restaurantName}</Text>
              <Text style={styles.addressText}>{address}</Text>
              <Text style={styles.addressText}>{address}</Text>
              {/* <Text style={styles.peopleNumberText}> {curPeopleNum}/{capacity}</Text> */}
            </View>        
            <TouchableOpacity style={styles.shoppingBagBox} onPress={() => navigation.navigate('shoppingBag')}>
              <Text style={styles.shoppingBagText}>장바구니</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addMenuBox} onPress={() => navigation.navigate('foodList')}>
              <Text style={styles.addMenuText}>메뉴 추가</Text>
            </TouchableOpacity>   
            <UserList/>     
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
    listBox:{
      width: 335,
      height: 80,
  
      backgroundColor: "#CB661D",
      borderRadius: 10,
      marginBottom : 12, 
      justifyContent: 'center', 
      alignItems: 'center' 
  
    },
    restaurantNameText:{
      fontStyle: 'normal',
      fontSize: 18,
      fontWeight : "bold",
      color: "#FFFFFF",
    },
    addressText:{
      fontStyle: 'normal',
      fontSize: 15,
      color: "#FFFFFF",
    },
    partyNameText:{
      fontStyle: 'normal',
      fontSize: 12,
      color: "#FFFFFF",
    },
    peopleNumberText:{
      fontStyle: 'normal',
      fontSize: 12,
      color: "#FFFFFF",
    },
    addMenuBox:{
      width: 335,
      height: 39,
      backgroundColor: "#FFBF75",
      borderRadius: 10,
      marginBottom : 12, 
      justifyContent: 'center', 
      alignItems: 'center' 
    },
    addMenuText:{
      fontStyle: 'normal',
      fontSize: 20,
      textAlign: "center",
      color: "#FFFFFF",
    },
    shoppingBagBox:{
      width: 335,
      height: 39,
      backgroundColor: "#FF8181",
      borderRadius: 10,
      marginBottom : 12, 
      justifyContent: 'center', 
      alignItems: 'center' 
  
    },
    shoppingBagText:{
      fontStyle: 'normal',
      fontSize: 20,
      textAlign: "center",
      color: "#FFFFFF",
  
    },


  });
  