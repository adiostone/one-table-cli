import React from 'react';
import { StyleSheet, Text, View, Image ,TouchableOpacity} from 'react-native';

export default function loginScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/OnetableLogo.png')} style={styles.logoStyle} />
      <Text style={styles.textStyle}>1인 식탁</Text>
      <TouchableOpacity onPress={() => navigation.navigate('party')}>
        <Image source={require('../assets/GoogleLogin.png')} style={styles.googleLoginStyle}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    marginLeft: 20,
    marginTop: 10,
    color: '#5B4141',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 60,
  },
  logoStyle: {
    marginLeft: 20,
    height: 100,
    width: 125,
  },
  googleLoginStyle: {
    alignSelf : 'center', 
    marginTop: 13,
    width : 334,
  },
});