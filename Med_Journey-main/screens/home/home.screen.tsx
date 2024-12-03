import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { auth } from '@/firebaseConfig'; // Firebase authentication
import { router } from 'expo-router';
import { User } from 'firebase/auth'; // Firebase User type

export default function HomeScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<{ id: string; text: string; sender: string }[]>([]); // Chat messages
  const [input, setInput] = useState('');

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      setLoading(false);
    } else {
      router.push("../login");
    }
  }, []);

  const handleSend = () => {
    if (input.trim() === '') return; // Ignore empty messages
    setMessages([...messages, { id: Date.now().toString(), text: input, sender: 'user' }]); // Append user message
    setInput(''); // Clear input
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: Date.now().toString(), text: 'Thank you for your message!', sender: 'bot' },
      ]);
    }, 1000);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2467EC" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.greeting}>Hello, {user.displayName || 'User'}!</Text>
          <Text style={styles.info}>Email: {user.email}</Text>
          <Text style={styles.status}>Status: Registered</Text>
        </>
      ) : (
        <Text style={styles.error}>No user found. Please log in.</Text>
      )}

      {/* Chatbot Section */}
      <View style={styles.chatContainer}>
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageBubble,
                item.sender === 'user' ? styles.userMessage : styles.botMessage,
              ]}
            >
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f6f7f9',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  info: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center',
  },
  status: {
    fontSize: 18,
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 20,
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  chatContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: 10,
    marginTop: 20,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: '75%',
  },
  userMessage: {
    backgroundColor: '#2467EC',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#E0E0E0',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#2467EC',
    borderRadius: 25,
    padding: 15,
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
