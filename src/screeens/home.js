// home.js — RECLAWIBRATE LUX EDITION UPGRADED

import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, Image, ScrollView, Alert, TouchableOpacity
} from 'react-native';
import { accelerometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import ReactNativeBiometrics from 'react-native-biometrics';

import e1 from "../utils/assets/e1.jpg";
import e2 from "../utils/assets/e2.jpg";
import e3 from "../utils/assets/e3.jpg";
import e4 from "../utils/assets/e4.jpg";
import back from "../utils/assets/back.jpg";
import arms from "../utils/assets/arms.jpg";
import legs from "../utils/assets/legs.jpg";
import shoulder from "../utils/assets/shoulder.jpg";
import chest from "../utils/assets/chest.jpg";
import tricept from "../utils/assets/tricept.jpg";

const HomeScreen = () => {
  const navigation = useNavigation();
  const lastMagnitude = useRef(0);
  const stepCooldown = useRef(false);
  const timerRef = useRef(null);

  const [steps, setSteps] = useState(0);
  const [heartRate, setHeartRate] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  const data = [
    { img: chest, title: 'Chest', screen: 'chest' },
    { img: back, title: 'Back', screen: 'BackScreen' },
    { img: shoulder, title: 'Shoulder', screen: 'ShoulderScreen' },
    { img: arms, title: 'Arms', screen: 'ArmsScreen' },
    { img: tricept, title: 'Tricep', screen: 'TricepScreen' },
    { img: legs, title: 'Legs', screen: 'LegsScreen' },
  ];

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSeconds(prev => {
          if (prev + 1 === 60) {
            setMinutes(min => {
              if (min + 1 === 60) {
                setHours(hour => hour + 1);
                return 0;
              }
              return min + 1;
            });
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  useEffect(() => {
    setUpdateIntervalForType(SensorTypes.accelerometer, 1000);
    const subscription = accelerometer.subscribe(({ x, y, z }) => {
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      const diff = Math.abs(magnitude - lastMagnitude.current);
      if (!stepCooldown.current && diff > 1.0) {
        setSteps(prev => prev + 1);
        stepCooldown.current = true;
        setTimeout(() => { stepCooldown.current = false }, 800);
      }
      lastMagnitude.current = magnitude;
    });
    return () => subscription.unsubscribe();
  }, []);

  const scanFingerprint = () => {
    const rnBiometrics = new ReactNativeBiometrics();
    setScanning(true);
    rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' })
      .then(({ success }) => {
        if (success) {
          const bpm = Math.floor(Math.random() * (120 - 60 + 1)) + 60;
          setHeartRate(bpm);
          Alert.alert('Fingerprint matched!', `❤️ Heart Rate: ${bpm} BPM`);
        } else {
          Alert.alert('Fingerprint not matched');
          setHeartRate(null);
        }
      })
      .catch(() => Alert.alert('Scan failed'))
      .finally(() => setScanning(false));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")}>
          <Ionicons name="settings-sharp" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.titleText}>FitTracker AI</Text>
        <TouchableOpacity onPress={() => setSteps(0)}>
          <MaterialCommunityIcons name="restart" size={28} color="#f55" />
        </TouchableOpacity>
      </View>

      {/* Banner */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bannerScroll}>
        {[e1, e2, e3, e4].map((img, i) => (
          <Image key={i} source={img} style={styles.bannerImage} />
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Health</Text>

      <View style={styles.healthBoxRow}>
        <View style={styles.healthBox}>
          <Ionicons name="footsteps-outline" size={45} />
          <Text style={styles.infoText}>{steps} Steps</Text>
        </View>
        <TouchableOpacity style={styles.healthBox} onPress={scanFingerprint}>
          {scanning ? <Text style={styles.infoText}>Scanning...</Text> : (
            <>
              <FontAwesome name="heartbeat" size={45} color="red" />
              <Text style={styles.infoText}>{heartRate ? `${heartRate} BPM` : 'Tap to Scan'}</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.caloriesBox}
        onPress={() => navigation.navigate("calories")}
      >
        <MaterialCommunityIcons name="fire" size={28} color="#fff" />
        <Text style={styles.btnText}>Track Calories</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Workouts</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.workoutScroll}>
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.workoutTile}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Image source={item.img} style={styles.workoutImage} />
            <Text style={styles.workoutText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Timer */}
      <View style={styles.timerBar}>
        <TouchableOpacity onPress={() => setIsRunning(!isRunning)} style={styles.redButton}>
          <Text style={styles.btnText}>{isRunning ? "Stop" : "Start"}</Text>
        </TouchableOpacity>
        <Text style={styles.timerText}>{hours} : {minutes} : {seconds}</Text>
        <TouchableOpacity onPress={() => {
          setIsRunning(false);
          setSeconds(0);
          setMinutes(0);
          setHours(0);
        }} style={styles.redButton}>
          <Text style={styles.btnText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 15 },
  topBar: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15
  },
  titleText: {
    fontSize: 24, fontWeight: "bold", color: "#111"
  },
  redButton: {
    backgroundColor: "#f55", borderRadius: 15, paddingVertical: 10, paddingHorizontal: 20
  },
  redButtonSmall: {
    backgroundColor: "#f55", borderRadius: 10, paddingVertical: 6, paddingHorizontal: 12
  },
  btnText: {
    color: "#fff", fontWeight: "bold", fontSize: 16
  },
  bannerScroll: {
    height: 200, marginBottom: 15
  },
  bannerImage: {
    width: 300, height: 190, borderRadius: 15, marginRight: 15
  },
  sectionTitle: {
    fontSize: 22, fontWeight: "bold", color: "#111", marginVertical: 10
  },
  healthBoxRow: {
    flexDirection: "row", justifyContent: "space-between", marginBottom: 15
  },
  healthBox: {
    backgroundColor: "#eee", borderRadius: 15, width: "48%", height: 120,
    justifyContent: "center", alignItems: "center"
  },
  infoText: {
    fontSize: 16, fontWeight: "600", marginTop: 8
  },
  caloriesBox: {
    backgroundColor: "#111", padding: 15, borderRadius: 15, flexDirection: "row",
    alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 15
  },
  workoutScroll: {
    height: 250, marginBottom: 20
  },
  workoutTile: {
    marginRight: 15, width: 160
  },
  workoutImage: {
    width: 160, height: 160, borderRadius: 15
  },
  workoutText: {
    textAlign: "center", marginTop: 8, fontWeight: "bold"
  },
  timerBar: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10
  },
  timerText: {
    fontSize: 22, fontWeight: "bold"
  }
});
