import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { accelerometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screeens/home';
import { Chest } from './src/screeens/chest';
import { ArmsScreen } from './src/screeens/ArmsScreen';
import { BackScreen } from './src/screeens/BackScreen';
import { TricepScreen } from './src/screeens/TricepScreen';
import { ShoulderScreen } from './src/screeens/ShoulderScreen';
import { LegsScreen } from './src/screeens/LegsScreen';
import  Cloriecaculator  from './src/screeens/Cloriecaculator';
import SplashScreen from './src/screeens/getstarted';
import { Provider } from 'react-redux';
import store from './src/store/store';
import LoginScreen from './src/screeens/LoginScreen';
import SignupScreen from './src/screeens/SignupScreen';
import SettingsScreen from './src/screeens/SettingsScreen';
import CalorieDiaryScreen from './src/screeens/CalorieDiaryScreen';
import WorkoutsScreen from './src/screeens/WorkoutsScreen';
import AICoachScreen from './src/screeens/AICoachScreen';


import { useDispatch, useSelector } from 'react-redux';
const Stack = createNativeStackNavigator();

function RootStack() {

  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  console.log(user,"user",token);
  
  return (
    <Stack.Navigator   screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="splash" component={SplashScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="chest" component={Chest} />
      <Stack.Screen name="ArmsScreen" component={ArmsScreen} />
      <Stack.Screen name="BackScreen" component={BackScreen} />
      <Stack.Screen name="TricepScreen" component={TricepScreen} />
      <Stack.Screen name="ShoulderScreen" component={ShoulderScreen} />
      <Stack.Screen name="LegsScreen" component={LegsScreen} />
      <Stack.Screen name="calories" component={Cloriecaculator} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="CalorieDiary" component={CalorieDiaryScreen} />
      <Stack.Screen name="WorkoutsScreen" component={WorkoutsScreen} />
      <Stack.Screen name="AICoach" component={AICoachScreen} options={{ title: 'FitBot - AI Coach' }} />



    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>

    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
    </Provider>
  );
}

 
