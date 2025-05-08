// VO2DatasetScreen.js

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import RNFS from 'react-native-fs';

const VO2DatasetScreen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const path = `${RNFS.DocumentDirectoryPath}/Mock_Participant_Dataset.csv`;

    RNFS.readFile(path, 'utf8')
      .then((contents) => {
        const lines = contents.trim().split('\n');
        const headers = lines[0].split(',');
        const entries = lines.slice(1).map(line => {
          const values = line.split(',');
          return headers.reduce((acc, key, idx) => {
            acc[key.trim()] = values[idx]?.trim();
            return acc;
          }, {});
        });
        setData(entries);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert('Could not load dataset', 'Make sure the file exists in internal storage.');
      });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.Name || 'Participant'}</Text>
      <Text style={styles.detail}>Age: {item.Age}</Text>
      <Text style={styles.detail}>Weight: {item.Weight} kg</Text>
      <Text style={styles.detail}>HR Max: {item.HRMax}</Text>
      <Text style={styles.detail}>VO₂ Max: {item.VO2Max}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📊 VO₂ Max Participant Data</Text>
      <FlatList
        data={data}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </ScrollView>
  );
};

export default VO2DatasetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: 18,
    borderRadius: 12,
    marginBottom: 16,
  },
  name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 6,
  },
  detail: {
    color: '#ccc',
    fontSize: 14,
    marginVertical: 2,
  },
});
