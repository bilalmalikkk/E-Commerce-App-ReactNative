import React from "react";
import { View, Text, Button } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebaseConfig";

export default function ProfileScreen() {
  const auth = getAuth(app);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile Screen</Text>
      <Button title="Logout" onPress={() => signOut(auth)} />
    </View>
  );
}
