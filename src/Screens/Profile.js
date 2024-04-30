import React from "react";
import { StyleSheet, Text, View } from "react-native";

function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Page</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    alignContent: "center",
    backgroundColor: "#64748b",
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
});
export default Profile;
