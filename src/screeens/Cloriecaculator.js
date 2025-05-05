import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Cloriecaculator = () => {
  const navigation = useNavigation();
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [bmi, setBmi] = useState(null);
  const [tdee, setTdee] = useState(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    const a = parseInt(age);

    if (!w || !h || !a) return;

    const calculatedBmi = (w / (h * h)).toFixed(1);
    setBmi(calculatedBmi);

    let bmr;
    if (gender === 'male') {
      bmr = 10 * w + 6.25 * parseFloat(height) - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * parseFloat(height) - 5 * a - 161;
    }

    setTdee((bmr * 1.55).toFixed(0)); // moderate activity
  };

  const accent = gender === 'male' ? '#3399ff' : '#ff69b4';
  const bg = gender === 'male' ? '#f0f8ff' : '#fff0f5';

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: bg }]} keyboardShouldPersistTaps="handled">
        <Text style={[styles.title, { color: accent }]}>Body Tracker</Text>

        <View style={styles.genderSwitch}>
          <TouchableOpacity
            onPress={() => setGender('male')}
            style={[styles.genderButton, gender === 'male' && { backgroundColor: accent }]}
          >
            <Text style={[styles.genderText, gender === 'male' && { color: '#fff' }]}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setGender('female')}
            style={[styles.genderButton, gender === 'female' && { backgroundColor: accent }]}
          >
            <Text style={[styles.genderText, gender === 'female' && { color: '#fff' }]}>Female</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="Weight (kg)"
          value={weight}
          onChangeText={setWeight}
          style={styles.input}
          keyboardType="numeric"
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Height (cm)"
          value={height}
          onChangeText={setHeight}
          style={styles.input}
          keyboardType="numeric"
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          style={styles.input}
          keyboardType="numeric"
          placeholderTextColor="#999"
        />

        <TouchableOpacity
          style={[styles.calculateButton, { backgroundColor: accent }]}
          onPress={calculate}
        >
          <Text style={styles.calculateText}>Calculate BMI & TDEE</Text>
        </TouchableOpacity>

        {bmi && (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>Your BMI: <Text style={{ color: accent }}>{bmi}</Text></Text>
            <Text style={styles.resultText}>Your TDEE: <Text style={{ color: accent }}>{tdee} cal/day</Text></Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.diaryButton}
          onPress={() => navigation.navigate('CalorieDiary')}
        >
          <Text style={styles.diaryButtonText}>Open Calorie Diary</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Cloriecaculator;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'System',
  },
  genderSwitch: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  genderButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#eee',
    borderRadius: 30,
    marginHorizontal: 8,
  },
  genderText: {
    fontWeight: '600',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    marginBottom: 12,
    borderRadius: 12,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  calculateButton: {
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  calculateText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultBox: {
    marginTop: 24,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: '500',
  },
  diaryButton: {
    marginTop: 30,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  diaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
