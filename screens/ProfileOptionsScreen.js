import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ProfileContext } from "../ProfileContext";
import { auth } from "../firebaseConfig";
import { updateEmail } from "firebase/auth";

export default function ProfileOptionsScreen() {
  const { userProfile, updateProfile, logout, validateProfile } =
    useContext(ProfileContext);

  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [address, setAddress] = useState(userProfile.address || "");
  const [photoURL, setPhotoURL] = useState(userProfile.photoURL || null);

  useEffect(() => {
    setName(userProfile.name);
    setEmail(userProfile.email);
    setAddress(userProfile.address || "");
    setPhotoURL(userProfile.photoURL || null);
  }, [userProfile]);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Denied",
        "We need permission to access your gallery."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      setPhotoURL(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    const updated = { ...userProfile, name, email, address, photoURL };

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
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={
            photoURL ? { uri: photoURL } : require("../assets/avatar.jpg")
          }
          style={styles.avatar}
        />
        <Text style={styles.editPicText}>📸 Tap to change photo</Text>
      </TouchableOpacity>

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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 10,
  },
  editPicText: {
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
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
