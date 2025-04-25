import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebaseConfig";
import { useGoogleAuth } from "../utils/googleAuth";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { request, signInWithGoogle } = useGoogleAuth();

  const getPasswordStrength = (pass) => {
    if (pass.length < 6) return "Weak";
    if (/[A-Z]/.test(pass) && /\d/.test(pass) && pass.length >= 8)
      return "Strong";
    return "Medium";
  };

  const handleLogin = async () => {
    const auth = getAuth(app);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      Alert.alert("Login failed", error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userCred = await signInWithGoogle();
      console.log("Google user:", userCred.user);
    } catch (error) {
      Alert.alert("Google Sign-In failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={styles.passwordInput}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      {/* Optional: Password Strength Indicator */}
      {/* {password.length > 0 && (
        <Text style={styles.strength}>
          Strength: {getPasswordStrength(password)}
        </Text>
      )} */}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.googleButton}
        disabled={!request}
        onPress={handleGoogleLogin}
      >
        <Image
          source={require("../assets/google-logo.png")}
          style={styles.googleLogo}
        />
        <Text style={styles.googleText}>Continue with Google</Text>
      </TouchableOpacity>

      <Text
        style={styles.switchText}
        onPress={() => navigation.navigate("Signup")}
      >
        Don't have an account? <Text style={styles.link}>Sign up</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  strength: {
    marginBottom: 10,
    fontSize: 14,
    color: "#333",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    marginTop: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  googleButton: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderColor: "#ccc",
    borderWidth: 1,
    paddingVertical: 12,
    marginTop: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  switchText: {
    textAlign: "center",
    marginTop: 20,
  },
  link: {
    color: "#007AFF",
    fontWeight: "bold",
  },
});
