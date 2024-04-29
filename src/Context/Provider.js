import React, { createContext, useEffect, useReducer, useState } from "react";
import reducer from "./Reducer";
import {
  FETCH_USERS,
  FETCH_USERS_LOADING,
  SIGN_IN_BEGGING,
  SIGN_IN_END,
} from "./Actions";

import { ToastAndroid } from "react-native";
import axios from "axios"; // Correct import statement
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigationState } from "@react-navigation/native";
export const AppContext = createContext();

const initialState = {
  isLoading: false,
  User: {},
  UsersData: [],
};

const AppProvider = ({ children }) => {
  // const navigation = useNavigationState();
  useEffect(() => {
    const getUserToken = async () => {
      try {
        res = await AsyncStorage.getItem("userToken");

        // dispatch({ type: SIGN_IN_END, payload: { res } });
        return res;
      } catch (error) {
        console.error("Error retrieving userToken from AsyncStorage:", error);
        return null;
      }
    };
    getUserToken();
  }, []);
  const [state, dispatch] = useReducer(reducer, initialState);

  const SignInUsers = async (response) => {
    try {
      const res = await axios.post(
        "http://10.111.10.15:1000/api/v1/users/login",
        response
      );

      if (res.data.status === "success") {
        // Assuming the token is returned in res.data.token
        await AsyncStorage.setItem("userToken", JSON.stringify(res?.data)); // Storing the token

        ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
        dispatch({ type: SIGN_IN_END, payload: { res: res.data } });
        // setTimeout(() => {
        //   navigation.navigate("Welcome");
        // }, 3000);
      } else if (res.data.status === "failed") {
        return ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      // Check if error response is available and status is 401
      if (error.response && error.response.status === 401) {
        // You can also check error.response.data.message if API provides specific messages
        return ToastAndroid.show(
          error.response.data.message || "Authentication failed",
          ToastAndroid.SHORT
        );
      }
    }
  };
  const FetchUsers = async () => {
    dispatch({ type: FETCH_USERS_LOADING });
    try {
      const data = await axios.get("http://10.111.10.15:1000/api/v1/users"); // Store the response in a variable
      dispatch({ type: FETCH_USERS, payload: { data } });
      //   console.log("--data--", data);
    } catch (error) {
      console.error(error); // Log any errors that occur
      throw error; // Rethrow the error to handle it in the calling code
    }
  };
  const logout = async () => {
    await AsyncStorage.removeItem("userToken");
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        SignInUsers,
        FetchUsers,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;
