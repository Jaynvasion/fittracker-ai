import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AICoachScreen = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: "Hey, I'm FitBot 👋 Ready to crush today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const replies = {
    greeting: [
      "Hi! How can I help you today?",
      "Hey legend, what’s on your mind?",
      "Hello champion! Need some guidance?",
    ],
    workout: [
      "Let’s hit a full-body circuit today. You got this 💪",
      "Time for some hypertrophy gains – 4 sets of pain 🔥",
      "Focus on form, not just reps. That’s how we grow.",
    ],
    tired: [
      "It’s okay to rest, but quitting isn't in your DNA.",
      "One workout away from feeling better. Just start.",
      "Recharge today, dominate tomorrow 🧠⚡",
    ],
    food: [
      "Fuel up with clean carbs and protein. You earned it.",
      "Stay lean, stay sharp. Chicken, rice, greens.",
      "Avoid sugar traps. Stay on your king diet 👑",
    ],
    fat: [
      "Fat is just stored energy. Let’s burn it smartly.",
      "You’re not fat, you’re under construction 🚧",
      "Track calories. Move daily. Believe relentlessly.",
    ],
    fallback: [
      "Keep grinding. I’m here with you every rep 🔥",
      "Discipline > motivation. Let’s go.",
      "Make today count. No excuses.",
    ]
  };

  const getFakeReply = (text) => {
    const lower = text.toLowerCase();

    if (/(hi|hello|hey)/.test(lower)) return random(replies.greeting);
    if (lower.includes('workout')) return random(replies.workout);
    if (lower.includes('tired')) return random(replies.tired);
    if (lower.includes('food') || lower.includes('eat')) return random(replies.food);
    if (lower.includes('fat') || lower.includes('weight')) return random(replies.fat);
    return random(replies.fallback);
  };

  const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: getFakeReply(input),
        sender: 'bot',
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.messageBubble, item.sender === 'user' ? styles.userBubble : styles.botBubble]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View style={styles.header}>
        <Ionicons name="chatbubble-ellipses-outline" size={22} color="#fff" />
        <Text style={styles.headerText}>FitBot</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.chat}
      />

      {isTyping && (
        <View style={[styles.messageBubble, styles.botBubble]}>
          <ActivityIndicator size="small" color="#333" />
          <Text style={{ marginLeft: 6 }}>FitBot is typing...</Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type something..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AICoachScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#111',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  chat: {
    padding: 20,
    paddingBottom: 60
  },
  messageBubble: {
    padding: 14,
    borderRadius: 15,
    marginBottom: 10,
    maxWidth: '80%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#ff5555',
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#e6e6e6',
  },
  messageText: {
    color: '#111',
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#111',
    borderRadius: 20,
    padding: 10,
  },
});
