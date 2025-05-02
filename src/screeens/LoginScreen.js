import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const storedUser = await AsyncStorage.getItem('user');
    if (!storedUser) {
      return Alert.alert('No user found');
    }

    const parsedUser = JSON.parse(storedUser);

    if (parsedUser.email === email && parsedUser.password === password) {
      const token = uuidv4();
      await AsyncStorage.setItem('token', token);
      dispatch({ type: 'SET_USER', payload: parsedUser });
      dispatch({ type: 'SET_TOKEN', payload: token });
      navigation.navigate('Home');
    } else {
      Alert.alert('Invalid credentials');
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
      <Text onPress={() => navigation.navigate('Signup')}>Don't have an account? Sign up</Text>
    </View>
  );
};

export default LoginScreen;
