import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,TouchableOpacity,Dimensions, ScrollView, SafeAreaView } from 'react-native';
import RestuarantList from "../component/restaurantList"
import LogoButton from "../component/logoButton"


export default function restuarantListScreen({navigation}) {


    return (
        <SafeAreaView style={styles.container}>
            <LogoButton/>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.tabButton}
                >
                    <Text style={styles.tabButtonText}>한식</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.tabButton}
                >
                    <Text style={styles.tabButtonText}>분식</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.tabButton}
                >
                    <Text style={styles.tabButtonText}>치킨</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.tabButton}
                >
                    <Text style={styles.tabButtonText}>피자</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.tabButton}
                >
                    <Text style={styles.tabButtonText}>중식</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.tabButton}
                >
                    <Text style={styles.tabButtonText}>야식</Text>
                </TouchableOpacity>
            </View>
            <RestuarantList/>
        </SafeAreaView>

        
    );
  }
  
  
  const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
      },
    buttonContainer: {
      display : "flex",
      flexDirection: "row",
      alignContent : "stretch",
    },
    tabButton: {
        paddingLeft : 12,
        paddingRight : 12,
        paddingBottom : 10,
        borderBottomWidth: 1,
        borderColor: '#888888',

    },
    tabButtonText:{
        fontSize : 22,
        fontWeight : "bold",
    },
  });
  