import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import ProfileOptionsScreen from "../screens/ProfileOptionsScreen";

const Stack = createNativeStackNavigator();

export default function PStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
      <Stack.Screen
        name="ProfileOptions"
        component={ProfileOptionsScreen}
        options={{ title: "Edit Profile" }}
      />
    </Stack.Navigator>
  );
}
