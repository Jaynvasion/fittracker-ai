import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignup = async () => {
    setLoading(true);
    const user = { name, email, password };
    await AsyncStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: 'SET_USER', payload: user });

    const token = uuidv4();
    await AsyncStorage.setItem('token', token);
    dispatch({ type: 'SET_TOKEN', payload: token });

    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Home');
    }, 1500);
  };

  return (
    <View>
      <TextInput placeholder="Name" onChangeText={setName} />
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
      {loading ? <ActivityIndicator /> : <Button title="Sign Up" onPress={handleSignup} />}
      <Text onPress={() => navigation.navigate('Login')}>Already have an account? Login</Text>
    </View>
  );
};

export default SignupScreen;
