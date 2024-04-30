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
import { styles } from "../Style/SignUp";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
function SiginUp() {
  const navigation = useNavigation();
  const { SignUpUsers } = useContext(AppContext);
  const [UserInputs, setUserInputs] = useState({
    email: "",
    password: "",
    FullName: "",
    confirmPassword: "",
    Occupation: "",
    phone: "",
  });
  const handlePress = (name) => (enterValue) => {
    setUserInputs({ ...UserInputs, [name]: enterValue });
  };

  const handleSignIn = async () => {
    await SignUpUsers(UserInputs);

    // navigation.navigate("SignIn");
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainers}>
        <Text style={styles.login}>Sign up</Text>
        <Text style={styles.welcome}>welcome</Text>
      </View>
      <View style={styles.loginContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="Full Name"
          value={UserInputs.FullName}
          onChangeText={handlePress("FullName")}
        />
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          value={UserInputs.email}
          keyboardType="email-address"
          onChangeText={handlePress("email")}
        />
      </View>
      <View style={styles.loginContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="password"
          value={UserInputs.password}
          secureTextEntry={true}
          onChangeText={handlePress("password")}
        />
        <TextInput
          style={styles.inputText}
          placeholder="confirm password"
          value={UserInputs.confirmPassword}
          secureTextEntry={true}
          onChangeText={handlePress("confirmPassword")}
        />
      </View>
      <View style={styles.loginContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="Occupation"
          value={UserInputs.Occupation}
          onChangeText={handlePress("Occupation")}
        />
        <TextInput
          style={styles.inputText}
          placeholder="Number"
          value={UserInputs.phone}
          keyboardType="number-pad"
          onChangeText={handlePress("phone")}
        />
      </View>
      {/* <View style={styles.loginContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="Address"
          value={UserInputs.Address}
          onChangeText={handlePress("Address")}
        />
        <TextInput
          style={styles.inputText}
          placeholder="Number"
          value={UserInputs.phone}
          keyboardType="number-pad"
          onChangeText={handlePress("phone")}
        />
      </View> */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignIn}>
          <Text style={styles.button}> Sign up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.horizontalLineContainer}>
        <View style={styles.horizontalLine}></View>
        <Text style={styles.horizontalLineText}>OR</Text>
        <View style={styles.horizontalLine}></View>
      </View>
      <TouchableOpacity style={styles.accountContainer}>
        <Icon name="google" size={30} color="#fff" />
        <Text style={{ color: "white", fontSize: 18 }}>
          Continuous with Google
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.accountContainer}>
        <Icon name="apple" size={30} color="#fff" />
        <Text style={{ color: "white", fontSize: 18 }}>
          Continuous with Apple
        </Text>
      </TouchableOpacity>
      <View style={styles.dontHaveAnAccount}>
        <Text style={{ color: "white", fontSize: 16 }}>Have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.SignUpbutton}> Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default SiginUp;
