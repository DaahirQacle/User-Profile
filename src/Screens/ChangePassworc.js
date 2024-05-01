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
import { styles } from "../Style/changepass";
import Icon from "react-native-vector-icons/Octicons";
import EmailIcon from "react-native-vector-icons/MaterialCommunityIcons";

function ChangePassword({ navigation }) {
  const { ChangePassword, User } = useContext(AppContext);

  const [UserInputs, setUserInputs] = useState({
    confirmPassword: "",
    password: "",
    oldPassword: "",
  });
  const handlePress = (name) => (enterValue) => {
    setUserInputs({ ...UserInputs, [name]: enterValue });
  };

  const handleSignIn = async () => {
    const result = await ChangePassword(UserInputs);

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
          source={require("../../assets/mee.jpeg")}
          style={styles.image}
          resizeMode="contain" // Adjust the image resizing mode as needed
        />
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.login}>Change Password</Text>
        {/* <Text style={styles.welcome}>
          {" "}
          Please check your phone for the OTP code.
        </Text> */}
      </View>
      <View style={styles.loginContainer}>
        <View style={styles.ViewinputText}>
          <EmailIcon
            name="lock-outline"
            size={15}
            color="#ccc"
            style={{ marginRight: 5, marginTop: 5 }}
          />
          <TextInput
            style={styles.inputText}
            placeholder="Old Password"
            value={UserInputs.oldPassword}
            secureTextEntry={true}
            onChangeText={handlePress("oldPassword")}
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
          <Text style={styles.button}> Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default ChangePassword;
