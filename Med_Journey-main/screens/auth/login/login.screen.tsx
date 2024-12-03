import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import {
  Entypo,
  FontAwesome,
  Fontisto,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  useFonts,
  Raleway_700Bold,
  Raleway_600SemiBold,
} from "@expo-google-fonts/raleway";
import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_700Bold,
  Nunito_600SemiBold,
} from "@expo-google-fonts/nunito";
import { useState } from "react";
import { router } from "expo-router";
import { auth, signInWithEmailAndPassword } from "@/firebaseConfig";
import { FirebaseError } from "firebase/app";
import { Alert } from "react-native";

export default function LoginScreen() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [required, setRequired] = useState(""); // General error for empty fields
  const [error, setError] = useState(""); // General login failure error

  let [fontsLoaded, fontError] = useFonts({
    Raleway_600SemiBold,
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_700Bold,
    Nunito_600SemiBold,
  });

  const handleSignIn = async () => {
    const { email, password } = userInfo;
  
    // Check if fields are empty
    if (!email || !password) {
      setRequired("Please fill in both fields");
      return;
    }
  
    setButtonSpinner(true);
    try {
      // Attempt to sign in with Firebase
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/(tabs)"); // Navigate to the home screen after successful login
    } catch (error: unknown) {
      setButtonSpinner(false);
  
      if (error instanceof FirebaseError) {
        // Show a popup alert for login failure
        Alert.alert("Login Failed", "Check your email or password.");
      } else {
        // Handle unexpected errors
        Alert.alert("Unexpected Error", "An error occurred. Please try again.");
      }
    }
  };

  return (
    <LinearGradient
      colors={["#E5ECF9", "#F6F7F9"]}
      style={{ flex: 1, paddingTop: 20 }}
    >
      <ScrollView>
        <Image
          style={styles.signInImage}
          source={require("@/assets/sign-in/sign_in.png")}
        />
        <Text style={[styles.welcomeText, { fontFamily: "Raleway_700Bold" }]}>
          Welcome Back!
        </Text>
        <Text style={styles.learningText}>
          Login to your existing account of Med Journey
        </Text>
        <View style={styles.inputContainer}>
          {/* Email Input */}
          <View>
            <TextInput
              style={[styles.input, { paddingLeft: 40 }]}
              keyboardType="email-address"
              value={userInfo.email}
              placeholder="support@medjourney.com"
              onChangeText={(value) => {
                setUserInfo({ ...userInfo, email: value });
                setRequired(""); // Clear empty field error
                setError(""); // Clear login failure error
              }}
            />
            <Fontisto
              style={{ position: "absolute", left: 26, top: 17.8 }}
              name="email"
              size={20}
              color={"#A1A1A1"}
            />
            {/* Show error if email field is empty */}
            {required && !userInfo.email && (
              <Text style={styles.errorText}>{required}</Text>
            )}
          </View>

          {/* Password Input */}
          <View style={{ marginTop: -15 }}>
            <TextInput
              style={[styles.input, { paddingLeft: 40 }]}
              keyboardType="default"
              secureTextEntry={!isPasswordVisible}
              value={userInfo.password}
              placeholder="********"
              onChangeText={(value) => {
                setUserInfo({ ...userInfo, password: value });
                setRequired(""); // Clear empty field error
                setError(""); // Clear login failure error
              }}
            />
            <TouchableOpacity
              style={styles.visibleIcon}
              onPress={() => setPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? (
                <Ionicons name="eye-off-outline" size={23} color={"#747474"} />
              ) : (
                <Ionicons name="eye-outline" size={23} color={"#747474"} />
              )}
            </TouchableOpacity>
            <SimpleLineIcons
              style={styles.icon2}
              name="lock"
              size={20}
              color={"#A1A1A1"}
            />
            {/* Show error if password field is empty */}
            {required && !userInfo.password && (
              <Text style={styles.errorText}>{required}</Text>
            )}
          </View>


          <TouchableOpacity onPress={() => router.push("../forgot-password")}>
            <Text
              style={[styles.forgotSection, { fontFamily: "Nunito_600SemiBold" }]}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              padding: 16,
              borderRadius: 8,
              marginHorizontal: 16,
              backgroundColor: "#2467EC",
              marginTop: 0,
            }}
            onPress={handleSignIn}
          >
            {buttonSpinner ? (
              <ActivityIndicator size="small" color={"white"} />
            ) : (
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 16,
                  fontFamily: "Raleway_700Bold",
                }}
              >
                Sign In
              </Text>
            )}
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 0,
              gap: 10,
            }}
          >

            <TouchableOpacity>
              <FontAwesome name="google" size={30} />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="apple" size={30} />
            </TouchableOpacity>
          </View>

          <View style={styles.signupRedirect}>
            <Text style={{ fontSize: 18, fontFamily: "Raleway_600SemiBold" }}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => router.push("../sign-up")}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Raleway_600SemiBold",
                  color: "#2467EC",
                  marginLeft: 5,
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  signInImage: {
    width: "60%",
    height: 250,
    alignSelf: "center",
    marginTop: 20,
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 24,
  },
  learningText: {
    textAlign: "center",
    color: "#575757",
    fontSize: 15,
    marginTop: 5,
  },
  inputContainer: {
    marginHorizontal: 16,
    marginTop: 30,
    rowGap: 30,
  },
  input: {
    height: 55,
    marginHorizontal: 16,
    borderRadius: 8,
    paddingLeft: 35,
    fontSize: 16,
    backgroundColor: "white",
    color: "#A1A1A1",
  },
  visibleIcon: {
    position: "absolute",
    right: 30,
    top: 15,
  },
  icon2: {
    position: "absolute",
    left: 23,
    top: 17.8,
    marginTop: -2,
  },
  forgotSection: {
    marginHorizontal: 16,
    textAlign: "right",
    fontSize: 16,
    marginTop: -20,
  },
  signupRedirect: {
    flexDirection: "row",
    marginHorizontal: 16,
    justifyContent: "center",
    marginBottom: 20,
    marginTop: -20,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginLeft: 16,
    marginTop: 4,
  },
});
