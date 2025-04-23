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
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Cart</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.item}>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>
                    Rs {item.price.toFixed(2)}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => removeFromCart(index)}>
                  <Text style={styles.remove}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <View style={styles.total}>
            <Text style={styles.totalText}>Total: Rs {totalPrice}</Text>
          </View>

          <Button
            title="Confirm Checkout"
            onPress={handleCheckout}
            color="#ff6f61"
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f4f9",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
    color: "#888",
  },
  item: {
    padding: 12,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemDetails: {
    flexDirection: "column",
  },
  itemName: {
    fontSize: 18,
    color: "#333",
  },
  itemPrice: {
    fontSize: 16,
    color: "#555",
  },
  remove: {
    color: "#ff6f61",
    fontWeight: "bold",
    fontSize: 16,
  },
  total: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});
