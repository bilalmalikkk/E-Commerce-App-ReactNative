import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ProfileContext } from "../ProfileContext";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const { userProfile, logout } = useContext(ProfileContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.infoBox}>
        <Image
          source={
            userProfile.photoURL
              ? { uri: userProfile.photoURL }
              : require("../assets/avatar.jpg") // fallback image
          }
          style={styles.avatar}
        />

        <Text style={styles.sectionTitle}>My Profile</Text>

        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{userProfile.name || "Not set"}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{userProfile.email || "Not set"}</Text>

        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>{userProfile.address || "Not set"}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ProfileOptions")}
      >
        <Text style={styles.buttonText}>✏️ Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>🚪 Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
  },
  infoBox: {
    backgroundColor: "#ffffff",
    width: "100%",
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    color: "#222",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    alignSelf: "flex-start",
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    color: "#222",
    alignSelf: "flex-start",
    marginTop: 2,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: "#ff6f61",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginTop: 16,
    width: "100%",
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
