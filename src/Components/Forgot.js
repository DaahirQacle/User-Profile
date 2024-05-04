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
import { styles } from "../Style/Forget";
import Icon from "react-native-vector-icons/Octicons";
import EmailIcon from "react-native-vector-icons/MaterialCommunityIcons";

function ForgotPassord({ navigation, route }) {
  const { ResetPassword, User } = useContext(AppContext);

  const [UserInputs, setUserInputs] = useState({
    confirmPassword: "",
    password: "",
    OTP: "",
  });
  const handlePress = (name) => (enterValue) => {
    setUserInputs({ ...UserInputs, [name]: enterValue });
  };

  const handleSignIn = async () => {
    const result = await ResetPassword(UserInputs);
    console.log(route.params?.phone);
    setTimeout(() => {
      if (result?.status === "success") {
        navigation.navigate("SignIn");
      }
    }, 2000);
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
        <Text style={styles.login}>Forget Password</Text>
        <Text style={[styles.welcome]}>
          Please check{" "}
          <Text style={{ color: "#fbbf24", fontSize: 18, fontStyle: "italic" }}>
            {route.params?.phone}
          </Text>{" "}
          for the OTP code.
        </Text>
      </View>
      <View style={styles.loginContainer}>
        <View style={styles.ViewinputText}>
          <Icon
            name="verified"
            size={15}
            color="#ccc"
            style={{ marginRight: 5, marginTop: 5 }}
          />
          <TextInput
            style={styles.inputText}
            placeholder="Verification code"
            value={UserInputs.OTP}
            keyboardType="number-pad"
            onChangeText={handlePress("OTP")}
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
            placeholder="new password"
            value={UserInputs.password}
            secureTextEntry={true}
            onChangeText={handlePress("password")}
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
            placeholder="Re - password"
            value={UserInputs.confirmPassword}
            secureTextEntry={true}
            onChangeText={handlePress("confirmPassword")}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignIn}>
          <Text style={styles.button}> Forget</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dontHaveAnAccount}>
        <Text style={{ color: "#fff", fontSize: 18, marginLeft: 10 }}>
          I remember my password
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.SignUpbutton}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default ForgotPassord;
