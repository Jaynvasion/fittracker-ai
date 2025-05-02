import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { accelerometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
import ReactNativeBiometrics from 'react-native-biometrics';
import { useNavigation } from '@react-navigation/native';
function HomeScreen() {
  const [steps, setSteps] = useState(0);
  const [heartRate, setHeartRate] = useState(null);
  const [scanning, setScanning] = useState(false);
  const lastMagnitude = useRef(0);
  const stepCooldown = useRef(false);
  const navigation = useNavigation();
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);
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
        setSeconds(prevSeconds => {
          if (prevSeconds + 1 === 60) {
            setMinutes(prevMinutes => {
              if (prevMinutes + 1 === 60) {
                setHours(prevHours => prevHours + 1);
                return 0;
              }
              return prevMinutes + 1;
            });
            return 0;
          }
          return prevSeconds + 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(prev => !prev); // Toggle start/stop
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  useEffect(() => {
    setUpdateIntervalForType(SensorTypes.accelerometer, 1000); // 1 second

    const subscription = accelerometer.subscribe(({ x, y, z }) => {
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      const diff = Math.abs(magnitude - lastMagnitude.current);

      if (!stepCooldown.current && diff > 1.0) {
        setSteps(prev => prev + 1);
        stepCooldown.current = true;

        setTimeout(() => {
          stepCooldown.current = false;
        }, 800);
      }

      lastMagnitude.current = magnitude;
    });

    return () => subscription.unsubscribe();
  }, []);

  const scanFingerprint = () => {
    const rnBiometrics = new ReactNativeBiometrics();

    setScanning(true); // Start scanning

    rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' })
      .then((resultObject) => {
        const { success } = resultObject;

        if (success) {
          // Generate fake random heart rate between 60 and 120
          const randomHeartRate = Math.floor(Math.random() * (120 - 60 + 1)) + 60;
          setHeartRate(randomHeartRate);
          Alert.alert('Fingerprint matched!', `Heart Rate: ${randomHeartRate} BPM ❤️`);
        } else {
          Alert.alert('Fingerprint not matched');
          setHeartRate(null);
        }
      })
      .catch(() => {
        Alert.alert('Fingerprint scan failed');
        setHeartRate(null);
      })
      .finally(() => {
        setScanning(false); // End scanning
      });
  };
  const handleResetstep = () => {
    // setIsRunning(false);
    // setSeconds(0);
    // setMinutes(0);
    // setHours(0);
    setSteps(0); // Add this line to reset steps too
  };
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View style={styles.circle}></View>

        <Text onPress={()=>navigation.navigate("calories")} style={{ fontSize: 18, fontWeight: "bold" ,color:"#000"}}>Home
        </Text>

        <TouchableOpacity style={{borderRadius:15, backgroundColor: "red", width: 100,height:40, justifyContent: "center", alignItems: "center" }} onPress={handleResetstep}>
        <Text style={{fontSize: 18, fontWeight: "bold" ,color:"#000"}}>
        Step Reset
        </Text>
        </TouchableOpacity>
      


      </View>

      {/* Images ScrollView */}
      <View style={{ height: 220 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[e1, e2, e3, e4].map((img, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image style={[styles.image, { width: 310 }]} resizeMode="cover" source={img} />
            </View>
          ))}
        </ScrollView>
      </View>
      <Text style={styles.heading}>Health</Text>
      {/* Steps & Heart Rate */}
      <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 10 }}>
        {/* Steps Counter */}
        <View style={styles.box}>
          <Text style={styles.counter}>
            <Ionicons name="footsteps-outline" size={54} color="black" /> : {steps}
          </Text>
        </View>

        {/* Heart Rate Scanner */}
        <TouchableOpacity style={styles.box} onPress={scanFingerprint}>
          {scanning ? (
            <Text style={styles.scanningText}>Scanning...</Text>
          ) : (
            <>
              <FontAwesome name="heartbeat" size={54} color="red" />
              {heartRate !== null && <Text style={styles.heartRateText}>{heartRate} BPM</Text>}
              {heartRate === null && <Text style={styles.counter}>Tap to Scan</Text>}
            </>
          )}
        </TouchableOpacity>
      </View>
      <Text style={styles.heading}>Excersises  </Text>
      <View style={{ height: 250 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data.map((item, index) => (
            <TouchableOpacity onPress={() => navigation.navigate(item.screen)} key={index} style={styles.imageContainerex}>
              <Image style={styles.image} resizeMode="cover" source={item.img} />
              <View>

                <Text style={styles.title}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={{flexDirection:"row",justifyContent:"space-between",borderWidth:1,height:70,alignItems:"center",paddingHorizontal:10,backgroundColor:"#fff",borderRadius:15}}>
        <TouchableOpacity style={{borderRadius:15, backgroundColor: "red", width: 100,height:50, justifyContent: "center", alignItems: "center" }} onPress={handleStartStop}>
          <Text style={{fontSize: 18, fontWeight: "bold" ,color:"#000"}}>{isRunning ? "Stop" : "Start"}</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{hours} : {minutes} : {seconds}
        </Text>
        <TouchableOpacity style={{borderRadius:15, backgroundColor: "red", width: 100,height:50, justifyContent: "center", alignItems: "center" }} onPress={handleReset}>
        <Text style={{fontSize: 18, fontWeight: "bold" ,color:"#000"}}>
        Reset
        </Text>
          
          </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 10 },
  counter: { fontSize: 20, fontWeight: 'bold', color: '#333', textAlign: 'center' },
  circle: {
    width: 50,
    height: 50,
    backgroundColor: "red",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 25,
  },
  box: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "white"
  },
  imageContainer: {
    width: 320,
    height: 210,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 10
  },
  imageContainerex: {
    width: 210,
    height: 230,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "white",
    // marginRight: 10

  },
  image: {
    width: 200,
    height: 200
  },
  heartRateText: {
    fontSize: 24,
    color: 'red',
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center'
  },
  scanningText: {
    fontSize: 18,
    color: 'gray',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    // marginRight:70
    left: 10


  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 9,


  }, timerText: { fontSize: 48, fontWeight: 'bold', marginBottom: 30 },
});
