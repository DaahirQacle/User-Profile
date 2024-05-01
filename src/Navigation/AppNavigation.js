import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignIn from "../Screens/SignIn";
import SiginUp from "../Screens/SiginUp";
import Logout from "../Screens/Logout";
import Home from "../Screens/Home";
import Profile from "../Screens/Profile";
import ChangePassword from "../Screens/ChangePassworc";
import ActiveUsers from "../Screens/ActiveUsers";
import { AppContext } from "../Context/Provider";
import ForgotPassord from "../Components/Forgot";
import ResetPassword from "../Components/ResetPassword";

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
      <Stack.Screen
        name="Forget"
        component={ForgotPassord}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OTP"
        component={ResetPassword}
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
                source={require("../../assets/mee.jpeg")}
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
                {isLoggedIn?.Occupation}
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
        drawerLabelStyle: {
          color: "#fff",
          marginLeft: -20,
          fontWeight: "bold",
          fontSize: 15,
          // fontStyle: "italic",
          // fontFamily: "monospace",
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
            <Ionicons name="exit-outline" size={size} color={"#fff"} />
          ),

          drawerLabelStyle: {
            color: "#fff",
            marginLeft: -20,
            fontWeight: "bold",
            fontSize: 15,
            // fontStyle: "italic",
            // fontFamily: "monospace",
          },
        }}
      />
    </Drawer.Navigator>
  );
};

const AppNavigation = () => {
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
      {loading ? (
        <View
          style={{
            flex: 1,

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        content
      )}
    </>
  );
};

export default AppNavigation;
