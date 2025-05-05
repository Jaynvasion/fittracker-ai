// CalorieDiaryScreen.js

import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList, Alert,
  StyleSheet, KeyboardAvoidingView, Platform, Modal, SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const APP_ID = '316bb85c';
const APP_KEY = '08b251bc08883cb441e8614d21eb9274';
const today = new Date().toISOString().split('T')[0];

export default function CalorieDiaryScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [diary, setDiary] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [manualMode, setManualMode] = useState(false);
  const [amount, setAmount] = useState('');
  const [macros, setMacros] = useState({ name: '', amount: '', calories: '', protein: '', carbs: '', fat: '' });
  const [selectedFood, setSelectedFood] = useState(null);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('calorieDiary');
      if (saved) setDiary(JSON.parse(saved));
    })();
  }, []);

  const saveDiary = async (newDiary) => {
    setDiary(newDiary);
    await AsyncStorage.setItem('calorieDiary', JSON.stringify(newDiary));
  };

  const searchFood = async () => {
    if (!searchTerm.trim()) return;
    const res = await fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${searchTerm}`, {
      headers: {
        'x-app-id': APP_ID,
        'x-app-key': APP_KEY,
      },
    });
    const data = await res.json();
    setSearchResults(data.common || []);
  };

  const selectFood = (item) => {
    setSelectedFood(item);
    setAmount('');
    setManualMode(false);
    setModalVisible(true);
  };

  const confirmAdd = async () => {
    let calories, protein, fat, carbs;
    if (manualMode) {
      ({ calories, protein, fat, carbs } = macros);
    } else {
      const res = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
        method: 'POST',
        headers: {
          'x-app-id': APP_ID,
          'x-app-key': APP_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: `${amount} ${selectedFood?.food_name}` }),
      });
      const data = await res.json();
      const info = data.foods?.[0];
      calories = info?.nf_calories || 0;
      protein = info?.nf_protein || 0;
      fat = info?.nf_total_fat || 0;
      carbs = info?.nf_total_carbohydrate || 0;
    }

    const log = {
      name: manualMode ? `Manual: ${macros.name || 'Food'}` : selectedFood.food_name,
      amount: manualMode ? macros.amount || '1 serving' : amount,
      calories, protein, fat, carbs
    };

    const newDiary = { ...diary, [today]: [...(diary[today] || []), log] };
    await saveDiary(newDiary);
    setModalVisible(false);
    setSearchTerm('');
    setSearchResults([]);
  };

  const clearDiary = async () => {
    await saveDiary({ ...diary, [today]: [] });
  };

  const renderLogItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.foodTitle}>{item.name} ({item.amount})</Text>
      <Text style={styles.macros}>
        {item.calories} kcal | {item.protein}g P | {item.carbs}g C | {item.fat}g F
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Log Your Meals 🍽️</Text>

        <TextInput
          style={styles.input}
          placeholder="Search food (e.g. Chicken, Rice)"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity style={styles.btn} onPress={searchFood}>
          <Text style={styles.btnText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.manualBtn} onPress={() => {
          setManualMode(true);
          setModalVisible(true);
          setMacros({ name: '', amount: '', calories: '', protein: '', carbs: '', fat: '' });
        }}>
          <Text style={styles.manualText}>+ Add Manually</Text>
        </TouchableOpacity>

        <FlatList
          data={searchResults}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => selectFood(item)} style={styles.resultItem}>
              <Text style={styles.resultText}>{item.food_name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, i) => i.toString()}
          style={styles.resultList}
        />

        <Text style={styles.diaryTitle}>Today's Diary — {today}</Text>
        <FlatList
          data={diary[today] || []}
          renderItem={renderLogItem}
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={{ paddingBottom: 120 }}
        />

        <TouchableOpacity onPress={clearDiary} style={styles.clearBtn}>
          <Text style={styles.clearText}>Clear Diary</Text>
        </TouchableOpacity>

        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{manualMode ? 'Manual Entry' : 'Enter Amount'}</Text>
              {manualMode ? (
                <>
                  <TextInput placeholder="Food Name" style={styles.modalInput} onChangeText={t => setMacros({ ...macros, name: t })} />
                  <TextInput placeholder="Amount" style={styles.modalInput} onChangeText={t => setMacros({ ...macros, amount: t })} />
                  <TextInput placeholder="Calories" keyboardType="numeric" style={styles.modalInput} onChangeText={t => setMacros({ ...macros, calories: t })} />
                  <TextInput placeholder="Protein (g)" keyboardType="numeric" style={styles.modalInput} onChangeText={t => setMacros({ ...macros, protein: t })} />
                  <TextInput placeholder="Carbs (g)" keyboardType="numeric" style={styles.modalInput} onChangeText={t => setMacros({ ...macros, carbs: t })} />
                  <TextInput placeholder="Fats (g)" keyboardType="numeric" style={styles.modalInput} onChangeText={t => setMacros({ ...macros, fat: t })} />
                </>
              ) : (
                <TextInput placeholder="e.g. 100g, 2 slices..." value={amount} style={styles.modalInput} onChangeText={setAmount} />
              )}
              <TouchableOpacity style={styles.addBtn} onPress={confirmAdd}>
                <Text style={styles.addText}>Add to Diary</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{ color: 'red', marginTop: 10 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 15 },
  input: {
    backgroundColor: '#f2f2f2', borderRadius: 10, padding: 14, fontSize: 16, marginBottom: 10
  },
  btn: { backgroundColor: 'black', padding: 14, borderRadius: 10 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  manualBtn: { marginTop: 12, alignSelf: 'center' },
  manualText: { color: '#d11a2a', fontWeight: 'bold' },
  resultList: { maxHeight: 140, marginTop: 10, marginBottom: 20 },
  resultItem: { padding: 12, borderBottomColor: '#ccc', borderBottomWidth: 1 },
  resultText: { fontSize: 16 },
  diaryTitle: { fontSize: 20, fontWeight: '600', marginBottom: 12 },
  card: {
    backgroundColor: '#fafafa', borderRadius: 10, padding: 14, marginBottom: 10,
    borderColor: '#eee', borderWidth: 1
  },
  foodTitle: { fontSize: 16, fontWeight: 'bold' },
  macros: { fontSize: 14, color: '#444', marginTop: 5 },
  clearBtn: {
    position: 'absolute', bottom: 20, alignSelf: 'center', backgroundColor: '#d11a2a', padding: 14, borderRadius: 10
  },
  clearText: { color: '#fff', fontWeight: 'bold' },
  modalOverlay: {
    flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    backgroundColor: '#fff', margin: 24, borderRadius: 15, padding: 20, alignItems: 'center'
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  modalInput: {
    borderBottomWidth: 1, borderColor: '#ccc', padding: 10, fontSize: 16, width: '100%', marginBottom: 10
  },
  addBtn: {
    marginTop: 10, backgroundColor: 'black', padding: 14, borderRadius: 10, width: '100%'
  },
  addText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
});
