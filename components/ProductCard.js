import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { CartContext } from "../CartContext";

const screenWidth = Dimensions.get("window").width;

// Static mapping of product image keys to require() statements
const imageMap = {
  sneakers: require("../assets/sneakers.jpg"),
  backpack: require("../assets/backpack.jpeg"),
  jacket: require("../assets/Jacket.jpg"),
  Tshirt: require("../assets/Tshirt.jpg"),
};

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  // Get image from map based on product.image or fallback
  const imageSource =
    product.image?.startsWith("http") || product.image?.startsWith("https")
      ? { uri: product.image }
      : imageMap[product.image] || imageMap["sneakers"];

  return (
    <View style={styles.card}>
      <Image source={imageSource} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>Rs {product.price.toFixed(2)}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => addToCart(product)}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>🛒 Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
    marginHorizontal: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    width: screenWidth - 24,
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  info: {
    padding: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#0d6efd",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0d6efd",
    shadowOpacity: 0.4,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
