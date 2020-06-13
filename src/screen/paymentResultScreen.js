import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function paymentResultScreen({route ,navigation  }) {

    console.log(route.params)

    return (
    <View style={styles.container}>
      <Text>결제완료</Text>
    </View>  
    );
}
const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      alignItems : "center",
      justifyContent : "center",
    },
  });

export default paymentResultScreen;