import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AppContext } from "../Context/Provider";
import { ToastAndroid } from "react-native";

function SignIn() {
  const { SignInUsers, FetchUsers, UsersData, isLoading, User } =
    useContext(AppContext);

  const [UserInputs, setUserInputs] = useState({ email: "", password: "" });
  const handlePress = (name) => (enterValue) => {
    setUserInputs({ ...UserInputs, [name]: enterValue });
  };

  const handleSignIn = async () => {
    await SignInUsers(UserInputs);
  };
  useEffect(() => {
    FetchUsers();
  }, []);

  useEffect(() => {}, [UsersData]); // Execute the effect whenever UsersData changes
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.image}
          resizeMode="contain" // Adjust the image resizing mode as needed
        />
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.login}>Login</Text>
        <Text style={styles.welcome}>welcome Back</Text>
      </View>
      <View style={styles.loginContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          value={UserInputs.email}
          keyboardType="email-address"
          onChangeText={handlePress("email")}
        />
        <TextInput
          style={styles.inputText}
          placeholder="******"
          value={UserInputs.password}
          secureTextEntry={true}
          onChangeText={handlePress("password")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignIn}>
          <Text style={styles.button}> Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e5f6",
    ...StyleSheet.absoluteFillObject,
    // alignItems: "center",
    // justifyContent: "center",
  },
  image: {
    width: "30%", // Adjust the width as needed
    aspectRatio: 1,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  loginContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  welcome: {
    // fontFamily: "Helvetica",
    fontWeight: "normal",
    marginVertical: 15,
  },
  login: {
    // fontFamily: "Helvetica",
    fontWeight: "900",
    fontSize: 30,
  },
  inputText: {
    width: "90%",
    height: 45,
    // borderColor: "gray",
    // borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
    color: "#000",
  },
  buttonContainer: {
    width: "97%",
    borderRadius: 6,
    padding: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#EA64D9",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    color: "#ffffff",
    fontSize: 20,
    textAlign: "center",
    marginHorizontal: 6,
  },
});
export default SignIn;
