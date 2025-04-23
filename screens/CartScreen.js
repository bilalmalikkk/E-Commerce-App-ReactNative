import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import { CartContext } from "../CartContext";

export default function CartScreen() {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const totalPrice = cartItems
    .reduce((total, item) => total + item.price, 0)
    .toFixed(2);

  const handleCheckout = () => {
    Alert.alert("Success", "Checkout successful!");
    clearCart();
    // setCartItems([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Cart</Text>

      {cartItems.length === 0 ? (
        <Text>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.item}>
                <Text>
                  {item.name} - Rs {item.price.toFixed(2)}
                </Text>
                <TouchableOpacity onPress={() => removeFromCart(index)}>
                  <Text style={styles.remove}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <View style={styles.total}>
            <Text style={styles.totalText}>Total: Rs {totalPrice}</Text>
          </View>

          <Button title="Confirm Checkout" onPress={handleCheckout} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
    fontWeight: "bold",
  },
  item: {
    padding: 10,
    backgroundColor: "#eee",
    marginBottom: 8,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  remove: {
    color: "red",
    fontWeight: "bold",
  },
  total: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 6,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
