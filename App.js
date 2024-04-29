import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppProvider from "./src/Context/Provider";
import SignIn from "./src/Screens/SignIn";
import SiginUp from "./src/Screens/SiginUp";
import LandingPage from "./src/Screens/LandingPage";
import Nagivation from "./src/Screens/Nagivation";

export default function App() {
  useEffect(() => {
    // console.log("----", User);
  }, []);
  return (
    <AppProvider>
      {/* <View style={styles.container}> */}
      <StatusBar style="auto" />
      <SignIn />
      {/* </View> */}
    </AppProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
