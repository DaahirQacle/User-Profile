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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import EmailIcon from "react-native-vector-icons/MaterialCommunityIcons";
function Profile({ navigation }) {
  const { UpdateProfile, User } = useContext(AppContext);
  const [isLoggedIn, setIsLoggedIn] = useState({});
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dobLabel, setDobLabel] = useState("Date of Birth");
  const [UserInputs, setUserInputs] = useState({
    email: "",
    FullName: "",
    Occupation: "",
    phone: "",
    Address: "",
    DateOfBirth: "",
    id: "",
  });
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const user = JSON.parse(token);
      setIsLoggedIn(user);
      setUserInputs(user);

      const formattedDate = moment(user?.DateOfBirth).format("YYYY-MM-DD");
      setDobLabel(formattedDate);
    } catch (error) {}
  };

  useEffect(() => {
    getToken();
  }, [User]);

  const handlePress = (name) => (enterValue) => {
    setUserInputs({ ...UserInputs, [name]: enterValue });
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

  const handleSignIn = async () => {
    const data = {
      email: UserInputs.email,
      FullName: UserInputs.FullName,
      Address: UserInputs.Address,
      Occupation: UserInputs.Occupation,
      phone: UserInputs.phone,
      Address: UserInputs.Address,
      id: UserInputs.id,
      DateOfBirth: dobLabel,
    };
    const result = await UpdateProfile(data);

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
          <Text style={styles.button}> Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default Profile;
