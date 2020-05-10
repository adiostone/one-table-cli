import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,TouchableOpacity,Dimensions, ScrollView, SafeAreaView } from 'react-native';
import BagFoodList from "../component/bagFoodList"
import LogoButton from "../component/logoButton"
import { AppContext } from '../context/AppContext'


export default function shoppingBagScreen({route,navigation}) {

  const appContext = useContext(AppContext)

    return (
        <SafeAreaView style={styles.container}>
          <LogoButton/>
          <View style={styles.shoppingBagBox}>
              <Text style={styles.shoppingBagText}>장바구니</Text>
          </View>
          <BagFoodList/>
          <TouchableOpacity style={styles.shoppingBagBox}>
              <Text style={styles.shoppingBagText}>주문하기</Text>
          </TouchableOpacity>
        </SafeAreaView>

    );
  }

  const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
      },

  });
  