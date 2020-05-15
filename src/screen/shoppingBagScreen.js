import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,TouchableOpacity,Dimensions, ScrollView, SafeAreaView } from 'react-native';
import BagFoodList from "../component/bagFoodList"
import LogoButton from "../component/logoButton"
import { AppContext } from '../context/AppContext'


export default function shoppingBagScreen({route,navigation}) {

  const appContext = useContext(AppContext)

  const [bagFoodList , setBagFoodList] = useState()

    return (
        <SafeAreaView style={styles.container}>
          <LogoButton/>
          <ScrollView style={styles.scrollBox}>
            <View style={styles.shoppingBagBox}>
                <Text style={styles.shoppingBagText}>장바구니</Text>
            </View>
            <BagFoodList data={bagFoodList}/>
            <TouchableOpacity style={styles.shoppingBagBox}>
                <Text style={styles.shoppingBagText}>주문하기</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>

    );
  }

  const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
      },
      shoppingBagBox:{
        width: 335,
        height: 39,
        backgroundColor: "#FF8181",
        borderRadius: 10,
        marginBottom : 12, 
        justifyContent: 'center', 
        alignItems: 'center', 
        alignSelf:"center"
    
      },
      shoppingBagText:{
        fontStyle: 'normal',
        fontSize: 20,
        textAlign: "center",
        color: "#FFFFFF",
    
      },
  

  });
  