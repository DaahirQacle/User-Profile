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
function ResetPassword({ navigation }) {
  const { GetOPT, User } = useContext(AppContext);

  const [UserInputs, setUserInputs] = useState({
    email: "",
  });
  const handlePress = (name) => (enterValue) => {
    setUserInputs({ ...UserInputs, [name]: enterValue });
  };
  const handleSignIn = async () => {
    const result = await GetOPT(UserInputs);

    setTimeout(() => {
      if (result?.status === "success") {
        navigation.navigate("Forget", { state: { phone: result.phone } });
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
        <Text style={styles.login}>Email</Text>
        <Text style={styles.welcome}> Please Enter Valid Email</Text>
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
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignIn}>
          <Text style={styles.button}> Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default ResetPassword;
