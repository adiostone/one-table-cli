import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,TouchableOpacity,Dimensions, ScrollView, SafeAreaView } from 'react-native';
import FoodList from "../component/foodList"

import BaseTab from "../component/baseTab"


export default function foodListScreen({navigation}) {

    return (
        <SafeAreaView style={styles.container}>
          <BaseTab/>
          <FoodList/>
        </SafeAreaView>

    );
  }

  const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
      },

  });
  