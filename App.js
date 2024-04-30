import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import AppProvider, { AppContext } from "./src/Context/Provider";
import SignIn from "./src/Screens/SignIn";
import Navigationss from "./src/Screens/Nagivation";
import SiginUp from "./src/Screens/SiginUp";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import ChangePassword from "./src/Screens/ChangePassworc";
import Profile from "./src/Screens/Profile";
import Home from "./src/Screens/Home";
import Welcome from "./src/Screens/Welcome";
import Logout from "./src/Screens/Logout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ActiveUsers from "./src/Screens/ActiveUsers";
import { ActivityIndicator } from "react-native";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const AuthScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SiginUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Logout"
        component={Logout}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const ProtectedScreens = () => {
  const { User } = useContext(AppContext);
  const [isLoggedIn, setIsLoggedIn] = useState({});

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const user = JSON.parse(token);
      setIsLoggedIn(user);
    } catch (error) {}
  };

  useEffect(() => {
    getToken();
  }, [User]);
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <SafeAreaView>
            <View
              style={{
                height: 200,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: "#f4f4f4",
                borderBottomWidth: 1,
                top: 30,
                marginBottom: 40,
              }}
            >
              <Image
                source={require("./assets/mee.jpeg")}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 65,
                }}
              />
              <Text
                style={{
                  fontSize: 22,
                  marginVertical: 6,
                  fontWeight: "bold",
                  color: "#111",
                }}
              >
                {isLoggedIn?.name}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#111",
                }}
              >
                Software Developer
              </Text>
            </View>
            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      }}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#c6cbef",
          width: 250,
        },
        headerStyle: { backgroundColor: "#c6cbef" },
        drawerItemStyle: {
          marginVertical: 15,
          // backgroundColor: "lightblue",
          borderRadius: 10,
          paddingHorizontal: 5,
          // borderWidth: 1,
          // borderColor: "gray",
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="home" size={30} color="#fff" />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="user-circle-o" size={30} color="#fff" />
          ),
        }}
      />
      <Drawer.Screen
        name="Change Password"
        component={ChangePassword}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="lock" size={30} color="#fff" />
          ),
        }}
      />
      <Drawer.Screen
        name="Active Users"
        component={ActiveUsers}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="users" size={30} color="#fff" />
          ),
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="exit-outline" size={size} color={"red"} />
          ),
          drawerLabelStyle: { color: "red" },
        }}
      />
    </Drawer.Navigator>
  );
};

const Navigation = () => {
  const { SignIn, User, Logout } = useContext(AppContext);
  const [isLoggedIn, setIsLoggedIn] = useState({});
  const [loading, setloading] = useState(false);

  const getToken = async () => {
    try {
      setloading(true);
      const token = await AsyncStorage.getItem("userToken");
      const user = JSON.parse(token);
      setIsLoggedIn(user);
      setloading(false);
    } catch (error) {
      console.error("Error getting user token:", error);
    }
  };

  useEffect(() => {
    getToken();
  }, [User]);

  let content = <AuthScreens />;

  if (isLoggedIn?.status || isLoggedIn?.token) {
    content = <ProtectedScreens />;
  }

  return (
    <>
      {loading ? <ActivityIndicator size="large" color="#0000ff" /> : content}
    </>
  );
};
export default function App() {
  return (
    <NavigationContainer>
      <AppProvider>
        {/* <View style={styles.container}> */}
        <StatusBar style="light" />
        <Navigation />
        {/* </View> */}
      </AppProvider>
      {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
      <Toast />
    </NavigationContainer>
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
