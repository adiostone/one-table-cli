import React from 'react';
import { View, Text, StyleSheet ,SafeAreaView } from 'react-native';

export function loading() {
  const { container } = styles;
  return (
    <View style={container}>
        <Text>잠시만 기다려주세요...</Text>
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

export default loading;