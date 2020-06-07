import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,Button, Image,TextInput,Dimensions ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { AppContext } from '../context/AppContext'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
import ViewCartItem from './viewCartItem';


export default function viewCartList(props) {

  const appContext = useContext(AppContext)

  const finalCart= props.data
  const isNotMeet = appContext.isNotMeet

  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {

    let totalPrice = finalCart.totalPrice + finalCart.deliveryCostPerCapita
    if(isNotMeet ===true){
      totalPrice = totalPrice + appContext.nonF2FCost
    }
    setTotalPrice(totalPrice)
  })

  return (
    <ScrollView style={styles.cartContainer}>
      {
        finalCart.menus.map((data,i) => {
        return (<ViewCartItem key={i} data={data}/>);
      })}
      <View style={styles.topBox}>
        <View style={styles.topLeftBox}>
          <Text style={styles.topText}>배달비</Text>
        </View>
        <View style={styles.topRightBox}>
          <Text style={styles.topText}>{finalCart.deliveryCostPerCapita}원</Text>
        </View>
      </View>
      {(isNotMeet===true) ?
      <View style={styles.middleBox}>
        <View style={styles.middleLeftBox}>
          <Text style={styles.middleText}>비대면 배달비</Text>
        </View>
        <View style={styles.middleRightBox}>
          <Text style={styles.middleText}>{appContext.nonF2FCost}원</Text>
        </View>
      </View> : <View/>
      }
      <View style={styles.bottomBox}>
        <View style={styles.bottomLeftBox}>
          <Text style={styles.totalPriceText}>총 주문금액</Text>
        </View>
        <View style={styles.bottomRightBox}>
          <Text style={styles.totalPriceText}>{totalPrice}원</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({


  cartContainer: {
    display : "flex",
    flexDirection: "column",
    alignContent : "stretch",
  },
  topBox: {

    display : "flex",
    flexDirection : "row",
    height : 50 ,
    alignItems : "center"
},
topLeftBox: {
  flex : 5,
  marginLeft :30,
},
topRightBox: {
flex : 2,
},
topText: {

fontStyle: 'normal',
fontSize: 18,
},
  middleBox: {

    display : "flex",
    flexDirection : "row",
    height : 50 ,
    alignItems : "center"
},
middleLeftBox: {
  flex : 5,
  marginLeft :30,
},
middleRightBox: {
flex : 2,
},
middleText: {

fontStyle: 'normal',
fontSize: 18,
},
    bottomBox: {

      display : "flex",
      flexDirection : "row",
      height : 50 ,
      alignItems : "center"
  },
  bottomLeftBox: {
    flex : 5,
    marginLeft :30,
},
bottomRightBox: {
  flex : 2,
},
totalPriceText: {

  fontStyle: 'normal',
  fontSize: 18,
  color: "red",
},


});
