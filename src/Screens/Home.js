import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    alignContent: "center",
    backgroundColor: "#64748b",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 6,
    marginBottom: 30,
  },
  text: {
    paddingHorizontal: 20,
    lineHeight: 40, // Adjust line height as needed
    fontSize: 16, // Adjust font size as needed
    textAlign: "center", // Align text to justify
    fontWeight: "bold",
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    // fontStyle: "italic",
    fontFamily: "monospace",
  },
  imageContainer: {
    alignItems: "center", // Center the image horizontally
    marginVertical: 10,
  },
});
export default Home;
