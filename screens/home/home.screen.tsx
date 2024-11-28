import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { auth } from '@/firebaseConfig'; // Import Firebase authentication module
import { router } from 'expo-router';
import { User } from 'firebase/auth'; // Import User type from Firebase

export default function HomeScreen() {
  const [user, setUser] = useState<User | null>(null); // State to store user information, now with type User | null
  const [loading, setLoading] = useState(true); // To show loading indicator while fetching user data

  // Fetch user data when the component mounts
  useEffect(() => {
    const currentUser = auth.currentUser; // Get current logged-in user
    if (currentUser) {
      setUser(currentUser); // Set user state with current user data
      setLoading(false); // Set loading to false after user data is loaded
    } else {
      router.push("../login"); // Redirect to login if no user is logged in
    }
  }, []);

  // If data is still loading, show a loading spinner
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2467EC" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Display user information if available */}
      {user ? (
        <>
          {/* Update greeting with registered display name or default to 'User' */}
          <Text style={styles.greeting}>Hello, {user.displayName || 'User'}!</Text>
          <Text style={styles.info}>Email: {user.email}</Text>
          <Text style={styles.status}>Status: Registered</Text>
        </>
      ) : (
        <Text style={styles.error}>No user found. Please log in.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f6f7f9',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    marginBottom: 5,
  },
  status: {
    fontSize: 18,
    color: '#4CAF50', // Green color for registered status
  },
  error: {
    fontSize: 18,
    color: 'red',
  },
});
