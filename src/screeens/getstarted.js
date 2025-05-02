import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from '../utils/assets/logoo.jpg'; // <-- Replace with your actual logo path

const SplashScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <Text style={styles.quote}>
        “Your body can stand almost anything. It’s your mind that you have to convince.”
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Signup')} // Replace with your first screen
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SplashScreen;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20
    },
    logo: {
      width: 280,
      height: 280,
      resizeMode: 'cover',
      marginBottom: 20,
    },
    quote: {
      fontSize: 26,
      fontStyle: 'italic',
      color: '#666',
      textAlign: 'center',
      marginVertical: 40,
    },
    button: {
      backgroundColor: 'red',
      paddingVertical: 15,
      paddingHorizontal: 40,
      borderRadius: 10,
      position: 'absolute',
      bottom: 40,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  