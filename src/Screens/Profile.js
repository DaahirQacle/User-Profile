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
import { styles } from "../Style/Profilecss";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
function Profile({ navigation }) {
  const { UpdateProfile, User } = useContext(AppContext);
  const [isLoggedIn, setIsLoggedIn] = useState({});
  const [UserInputs, setUserInputs] = useState({
    email: "",
    password: "",
    FullName: "",
    confirmPassword: "",
    Occupation: "",
    phone: "",
    Address: "",
  });
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const user = JSON.parse(token);
      setIsLoggedIn(user);
      setUserInputs(user);
    } catch (error) {}
  };

  useEffect(() => {
    getToken();
  }, [User]);

  const handlePress = (name) => (enterValue) => {
    setUserInputs({ ...UserInputs, [name]: enterValue });
    // setUserInputs((prevState) => ({
    //   ...prevState,
    //   [name]: enterValue,
    // }));
  };

  const handleSignIn = async () => {
    const result = await UpdateProfile(UserInputs);

    setTimeout(() => {
      if (result?.status === "success") {
        navigation.navigate("Home");
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
      <View style={styles.loginContainer}></View>

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
      {/* <View style={styles.loginContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="password"
          value={ isLoggedIn?.email || UserInputs.password}
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
      </View> */}
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
          value={UserInputs.phone.toString()}
          keyboardType="number-pad"
          onChangeText={handlePress("phone")}
        />
      </View>
      <View style={styles.loginContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="Address"
          value={UserInputs.Address}
          onChangeText={handlePress("Address")}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignIn}>
          <Text style={styles.button}> Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default Profile;
