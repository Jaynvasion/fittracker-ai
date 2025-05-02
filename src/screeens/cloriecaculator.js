import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Image } from 'react-native';
import banan from "../utils/assets/banan.jpeg"
import bluberies from "../utils/assets/bluberies.jpeg"
// import apple from "../utils/assets/apple.jpeg"
import date from "../utils/assets/date.jpg"
import apple from "../utils/assets/apple.jpeg"



export const cloriecaculator = () => {
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [calories, setCalories] = useState(null);
  const foodData = [
    { image: banan, name: "Banana", calories: 250 },
    { image: bluberies, name: "bluberies", calories: 95 },
    { image: date, name: "Date", calories: 206 },
    { image: apple, name: "apple", calories: 206 },
  ];
  const calculateCalories = () => {
    // Simple formula: (you can improve it later if needed)
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!gender || !weightNum || !heightNum) {
      alert('Please fill all fields correctly');
      return;
    }

    // Basal Metabolic Rate (BMR) formulas:
    let bmr = 0;
    if (gender === 'Male') {
      bmr = 66 + (13.7 * weightNum) + (5 * heightNum) - (6.8 * 25); // assuming age = 25
    } else {
      bmr = 655 + (9.6 * weightNum) + (1.8 * heightNum) - (4.7 * 25); // assuming age = 25
    }

    const morning = (bmr * 0.35).toFixed(0);
    const afternoon = (bmr * 0.35).toFixed(0);
    const night = (bmr * 0.30).toFixed(0);
    const total = (parseInt(morning) + parseInt(afternoon) + parseInt(night)).toFixed(0);

    setCalories({ morning, afternoon, night, total });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select Gender</Text>

      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[styles.genderButton, gender === 'Male' && styles.selected]}
          onPress={() => setGender('Male')}
        >
          <Text style={styles.genderText}>Male</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.genderButton, gender === 'Female' && styles.selected]}
          onPress={() => setGender('Female')}
        >
          <Text style={styles.genderText}>Female</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Enter Weight (kg)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 70"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />

      <Text style={styles.title}>Enter Height (cm)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 170"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />

      <TouchableOpacity style={styles.calculateButton} onPress={calculateCalories}>
        <Text style={styles.calculateText}>Calculate Calories</Text>
      </TouchableOpacity>

      {calories && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Morning: {calories.morning} Calories</Text>
          <Text style={styles.resultText}>Afternoon: {calories.afternoon} Calories</Text>
          <Text style={styles.resultText}>Night: {calories.night} Calories</Text>
          <Text style={styles.resultTextBig}>Total: {calories.total} Calories</Text>
        </View>
      )}

      {foodData.map((item, index) => (
        <View key={index} style={styles.foodItem}>
          <View style={styles.imageSection}>
            <Image source={item.image} style={styles.foodImage} />
            <Text style={styles.foodName}>{item.name}</Text>
          </View>
          <Text style={styles.foodCalories}>{item.calories} kcal</Text>
        </View>
      ))}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  genderButton: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    width: 120,
    alignItems: 'center',
  },
  selected: {
    backgroundColor: 'red',
  },
  genderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '80%',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    fontSize: 18,
  },
  calculateButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  calculateText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 20,
    marginVertical: 5,
  },
  resultTextBig: {
    fontSize: 24,
    marginVertical: 10,
    fontWeight: 'bold',
    color: 'red',
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    width: '90%',
  },
  imageSection: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  foodImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  foodName: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: '600',
  },
  foodCalories: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  }

});
