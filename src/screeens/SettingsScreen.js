import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, CommonActions } from '@react-navigation/native';

const SettingsScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>⚙️ Settings</Text>

      <View style={styles.settingCard}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch
          value={true}
          onValueChange={() => {}}
          thumbColor="#fff"
          trackColor={{ false: '#888', true: '#4CAF50' }}
        />
      </View>

      <View style={styles.settingCard}>
        <Text style={styles.label}>Enable Notifications</Text>
        <Switch
          value={false}
          onValueChange={() => {}}
          thumbColor="#fff"
          trackColor={{ false: '#888', true: '#4CAF50' }}
        />
      </View>

      <TouchableOpacity
        style={styles.optionBox}
        onPress={() => navigation.navigate("VO2Dataset")}
      >
        <Text style={styles.optionText}>📊 VO2 Max Dataset</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'splash' }],
            })
          );
        }}
      >
        <Icon name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  settingCard: {
    backgroundColor: '#1c1c1e',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    color: '#eee',
  },
  optionBox: {
    backgroundColor: '#1c1c1e',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 30,
  },
  optionText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#e50914',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
