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
import { styles } from "../Style/Sigin";
import Icon from "react-native-vector-icons/FontAwesome";
import EmailIcon from "react-native-vector-icons/MaterialCommunityIcons";
function SignIn({ navigation }) {
  const { SignInUsers } = useContext(AppContext);
  const [UserInputs, setUserInputs] = useState({ email: "", password: "" });
  const handlePress = (name) => (enterValue) => {
    setUserInputs({ ...UserInputs, [name]: enterValue });
  };

  const handleSignIn = async () => {
    await SignInUsers(UserInputs);
  };

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
        <View style={styles.ViewinputText}>
          <EmailIcon
            name="email-outline"
            size={15}
            color="#ccc"
            style={{ marginRight: 5, marginTop: 5 }}
          />
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            value={UserInputs.email}
            keyboardType="email-address"
            onChangeText={handlePress("email")}
          />
        </View>

        <View style={styles.ViewinputText}>
          <EmailIcon
            name="lock-outline"
            size={15}
            color="#ccc"
            style={{ marginRight: 5, marginTop: 5 }}
          />
          <TextInput
            style={styles.inputText}
            placeholder="password"
            value={UserInputs.password}
            secureTextEntry={true}
            onChangeText={handlePress("password")}
          />
        </View>
      </View>
      <View style={styles.forget}>
        <TouchableOpacity onPress={() => navigation.navigate("OTP")}>
          <Text style={{ color: "#991b1b", fontSize: 18 }}>
            Forget Password
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignIn}>
          <Text style={styles.button}> Sign in</Text>
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
        <Text style={{ color: "white", fontSize: 16 }}>
          If you dont have an account?{" "}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.SignUpbutton}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default SignIn;
