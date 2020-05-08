import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,TouchableOpacity,Dimensions, ScrollView, SafeAreaView } from 'react-native';

import LogoButton from "../component/logoButton"

export default function roomScreen({navigation}) {

    return (
        <SafeAreaView style={styles.container}>
          <LogoButton/>
        </SafeAreaView>

    );
  }

  const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
      },


  });
  