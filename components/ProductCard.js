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

const imageMap = {
  sneakers: require("../assets/sneakers.jpg"),
  backpack: require("../assets/backpack.jpeg"),
  jacket: require("../assets/Jacket.jpg"),
  Tshirt: require("../assets/Tshirt.jpg"),
};

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

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
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>🛒 Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 24,
    marginHorizontal: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    width: screenWidth - 24,
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: 210,
    resizeMode: "cover",
  },
  info: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
    lineHeight: 20,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#ff6f61",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0d6efd",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
