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
import DatePicker from "react-native-date-picker";
import EmailIcon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
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
    DateOfBirth: dobLabel,
  });
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dobLabel, setDobLabel] = useState("Date of Birth");

  const handlePress = (name) => (enterValue) => {
    setUserInputs({ ...UserInputs, [name]: enterValue });
  };
  const handleSignIn = async () => {
    const data = {
      email: UserInputs.email,
      password: UserInputs.password,
      FullName: UserInputs.FullName,
      confirmPassword: UserInputs.confirmPassword,
      Occupation: UserInputs.Occupation,
      phone: UserInputs.phone,
      DateOfBirth: dobLabel,
    };
    const result = await SignUpUsers(data);

    setTimeout(() => {
      if (result?.status === "success") {
        navigation.navigate("SignIn");
      }
    }, 2000);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const handleConfirm = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    setDobLabel(formattedDate);
    hideDatePicker();
  };
  useEffect(() => {
    // console.log("A dob Label has been picked: ", dobLabel);
  }, [dobLabel]);
  return (
    <View style={styles.container}>
      <View style={styles.loginContainers}>
        <Text style={styles.login}>Sign up</Text>
        <Text style={styles.welcome}>welcome</Text>
      </View>
      <View style={styles.loginContainer}>
        <View style={[styles.ViewinputText, styles.inputText]}>
          <Icon
            name="user-circle-o"
            size={15}
            color="#ccc"
            style={{ marginRight: 5, marginTop: 5 }}
          />
          <TextInput
            // style={styles.inputText}
            placeholder="Full Name"
            value={UserInputs.FullName}
            onChangeText={handlePress("FullName")}
          />
        </View>
      </View>
      <View style={styles.loginContainer}>
        <View style={[styles.ViewinputText, styles.inputText]}>
          <EmailIcon
            name="email-outline"
            size={15}
            color="#ccc"
            style={{ marginRight: 5, marginTop: 5 }}
          />
          <TextInput
            // style={styles.inputText}
            placeholder="Email"
            value={UserInputs.email}
            keyboardType="email-address"
            onChangeText={handlePress("email")}
          />
        </View>
      </View>

      <View style={styles.loginContainer}>
        <View style={[styles.ViewinputText, styles.inputText]}>
          <EmailIcon
            name="lock-outline"
            size={15}
            color="#ccc"
            style={{ marginRight: 5, marginTop: 5 }}
          />
          <TextInput
            // style={styles.inputText}
            placeholder="password"
            value={UserInputs.password}
            secureTextEntry={true}
            onChangeText={handlePress("password")}
          />
        </View>
      </View>
      <View style={styles.loginContainer}>
        <View style={[styles.ViewinputText, styles.inputText]}>
          <EmailIcon
            name="lock-outline"
            size={15}
            color="#ccc"
            style={{ marginRight: 5, marginTop: 5 }}
          />
          <TextInput
            // style={styles.inputText}
            placeholder="confirm password"
            value={UserInputs.confirmPassword}
            secureTextEntry={true}
            onChangeText={handlePress("confirmPassword")}
          />
        </View>
      </View>
      <View style={styles.loginContainer}>
        <View style={[styles.ViewinputText, styles.inputText]}>
          <Icon
            name="certificate"
            size={15}
            color="#ccc"
            style={{ marginRight: 5, marginTop: 5 }}
          />
          <TextInput
            // style={styles.inputText}
            placeholder="Occupation"
            value={UserInputs.Occupation}
            onChangeText={handlePress("Occupation")}
          />
        </View>
      </View>

      <View style={styles.loginContainer}>
        <View style={[styles.ViewinputText, styles.inputText]}>
          <Icon
            name="phone-square"
            size={15}
            color="#ccc"
            style={{ marginRight: 5, marginTop: 5 }}
          />
          <TextInput
            // style={styles.inputText}
            placeholder="Number"
            value={UserInputs.phone}
            keyboardType="number-pad"
            onChangeText={handlePress("phone")}
          />
        </View>
      </View>
      <View style={styles.loginContainer}>
        <View style={[styles.ViewinputText, styles.inputText]}>
          <EmailIcon
            name="calendar-outline"
            size={15}
            color="#ccc"
            style={{ marginRight: 5, marginTop: 3 }}
          />
          <TouchableOpacity onPress={showDatePicker}>
            <Text> {dobLabel}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignIn}>
          <Text style={styles.button}> Sign up</Text>
        </TouchableOpacity>
      </View>

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
