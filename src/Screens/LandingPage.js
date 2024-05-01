import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native"; // Import React Native components from 'react-native'
import { AppContext } from "../Context/Provider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignIn from "./SignIn";
import Welcome from "./Welcome";

// Import SignIn and Welcome components if needed

function LandingPage() {
  const [holder, setHolder] = useState({});

  const getUserToken = async () => {
    try {
      const res = await AsyncStorage.getItem("userToken");
      const userToken = JSON.parse(res); // Parse the JSON string
      setHolder(userToken); // Assuming setHolder is a state setter function
      return userToken;
    } catch (error) {
      console.error("Error retrieving userToken from AsyncStorage:", error);
      return null;
    }
  };

  useEffect(() => {
    getUserToken();
  }, []);

  if (holder?.token) {
    return <Welcome />;
  }

  return <SignIn />;
}

export default LandingPage;
