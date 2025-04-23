import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { ProfileContext } from "../ProfileContext";
import { auth } from "../firebaseConfig";
import { updateEmail } from "firebase/auth";

export default function ProfileOptionsScreen() {
  const { userProfile, updateProfile, clearProfile, logout, validateProfile } =
    useContext(ProfileContext);

  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [address, setAddress] = useState(userProfile.address || "");

  useEffect(() => {
    setName(userProfile.name);
    setEmail(userProfile.email);
    setAddress(userProfile.address || "");
  }, [userProfile]);

  const handleSave = async () => {
    const updated = { ...userProfile, name, email, address };

    if (validateProfile(updated)) {
      try {
        if (auth.currentUser && email !== userProfile.email) {
          await updateEmail(auth.currentUser, email);
        }
        updateProfile(updated);
        Alert.alert("Profile updated!");
      } catch (error) {
        console.error("Error updating profile:", error);
        Alert.alert("Update failed", error.message);
      }
    }
  };

  const handleLogout = () => {
    logout();
    Alert.alert("Logged out.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Edit Profile</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
      />
      <Button title="Save Changes" onPress={handleSave} />
      <View style={{ marginTop: 10 }}>
        <Button title="Logout" onPress={handleLogout} color="gray" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 8,
    marginBottom: 12,
  },
});
