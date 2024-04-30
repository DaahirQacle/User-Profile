import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import SignIn from "./SignIn";
import SiginUp from "./SiginUp";
import Welcome from "./Welcome";

const Stack = createNativeStackNavigator();

function Navigationss() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignUp"
          component={SiginUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigationss; // Correct the export name
