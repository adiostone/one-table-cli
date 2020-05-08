import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,TouchableOpacity,Dimensions, ScrollView, SafeAreaView } from 'react-native';
import BagFoodList from "../component/bagFoodList"
import LogoButton from "../component/logoButton"


export default function shoppingBagScreen({navigation}) {

    return (
        <SafeAreaView style={styles.container}>
          <LogoButton/>
          <BagFoodList/>
        </SafeAreaView>

    );
  }

  const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
      },

  });
  