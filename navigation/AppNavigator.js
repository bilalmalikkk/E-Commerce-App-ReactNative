// AppNavigator.js
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import ProductsScreen from "../screens/ProductsScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { CartContext } from "../CartContext";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const { cartItems } = useContext(CartContext);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Products") iconName = "home-outline";
            else if (route.name === "Cart") iconName = "cart-outline";
            else if (route.name === "Profile") iconName = "person-outline";

            return (
              <View>
                <Ionicons name={iconName} size={size} color={color} />
                {route.name === "Cart" && cartItems.length > 0 && (
                  <View
                    style={{
                      position: "absolute",
                      top: -4,
                      right: -10,
                      backgroundColor: "red",
                      borderRadius: 10,
                      paddingHorizontal: 5,
                      paddingVertical: 2,
                      minWidth: 18,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      {cartItems.length}
                    </Text>
                  </View>
                )}
              </View>
            );
          },
        })}
      >
        <Tab.Screen name="Products" component={ProductsScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
