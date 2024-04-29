import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import SignIn from "./SignIn";
import SiginUp from "./SiginUp";
import Welcome from "./Welcome";

const Drawer = createDrawerNavigator(); // Capitalize the variable name

function Navigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="SignUp" component={SiginUp} />
        <Drawer.Screen name="Welcome" component={Welcome} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Navigation; // Correct the export name
