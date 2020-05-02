import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,TouchableOpacity,Dimensions, ScrollView, SafeAreaView } from 'react-native';

export default function restuarantListScreen({navigation}) {


    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../assets/OnetableLogo.png')} style={styles.logoStyle} />
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
            <ScrollView style={styles.restaurantContainer}>
                <TouchableOpacity
                style={styles.restaurantButton}
                    >
                <Text style={styles.restaurantNameText}>네네치킨 중앙대점</Text>
                <Text style={styles.restaurantDetailText}>배달팁 3000원 최소주문금액 12000원</Text>

                </TouchableOpacity>
                <TouchableOpacity
                style={styles.restaurantButton}
                    >
                <Text style={styles.restaurantNameText}>치킨마루 노량진점</Text>
                <Text style={styles.restaurantDetailText}>배달팁 0원 최소주문금액 13900원</Text>

                </TouchableOpacity>
                <TouchableOpacity
                style={styles.restaurantButton}
                    >
                <Text style={styles.restaurantNameText}>지코바 상도1호점</Text>
                <Text style={styles.restaurantDetailText}>배달팁 1500원 최소주문금액 16000원</Text>

                </TouchableOpacity>
                <TouchableOpacity
                style={styles.restaurantButton}
                    >
                <Text style={styles.restaurantNameText}>BHC 노량진점</Text>
                <Text style={styles.restaurantDetailText}>배달팁 3000원 최소주문금액 15000원</Text>

                </TouchableOpacity>
                <TouchableOpacity
                style={styles.restaurantButton}
                    >
                <Text style={styles.restaurantNameText}>후라이드 참 잘하는 집 상도점</Text>
                <Text style={styles.restaurantDetailText}>배달팁 1500원 최소주문금액 14000원</Text>

                </TouchableOpacity>
                <TouchableOpacity
                style={styles.restaurantButton}
                    >
                <Text style={styles.restaurantNameText}>미쳐버린파닭 숭실대점</Text>
                <Text style={styles.restaurantDetailText}>배달팁 1000원 최소주문금액 13000원</Text>

                </TouchableOpacity>
                <TouchableOpacity
                style={styles.restaurantButton}
                    >
                <Text style={styles.restaurantNameText}>리얼후라이 흑석본점</Text>
                <Text style={styles.restaurantDetailText}>배달팁 2000원 최소주문금액 15000원</Text>

                </TouchableOpacity>
                <TouchableOpacity
                style={styles.restaurantButton}
                    >
                <Text style={styles.restaurantNameText}>노랑통닭 중앙대점</Text>
                <Text style={styles.restaurantDetailText}>배달팁 1000원 최소주문금액 17000원</Text>

                </TouchableOpacity>
                <TouchableOpacity
                style={styles.restaurantButton}
                    >
                <Text style={styles.restaurantNameText}>또래오래 동작상도점</Text>
                <Text style={styles.restaurantDetailText}>배달팁 1000원 최소주문금액 17000원</Text>

                </TouchableOpacity>
            </ScrollView>
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
        padding : 12,
        borderBottomWidth: 1,
        borderColor: '#888888',

    },
    tabButtonText:{
        fontSize : 22,
        fontWeight : "bold",
    },
    restaurantContainer: {
        display : "flex",
        flexDirection: "column",
        alignContent : "stretch",
      },
    restaurantButton: {
          padding : 12,
          borderBottomWidth: 1,
          borderColor: '#DFDFDF',
      },
    restaurantNameText:{
          fontSize : 20,
          fontWeight : "bold",
    },
    restaurantDetailText:{
        fontSize : 14,
        color: "gray",
  },
  logoStyle: {
    width: 47,
    height: 37.7,
    marginLeft:20,
    marginTop:20,
    marginBottom:5,

  },
  });
  