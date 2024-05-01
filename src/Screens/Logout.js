import React, { useContext, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { AppContext } from "../Context/Provider";
import { View } from "react-native";

function Logout() {
  const { logout } = useContext(AppContext);

  useEffect(() => {
    const handleLogout = async () => {
      await logout();
    };

    handleLogout(); // Call handleLogout when component mounts
  }, []); // Empty dependency array to ensure it runs only once on mount

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loggin Out ...</Text>
    </View>
  ); // You can render any loading message here
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
export default Logout;
