import React, { createContext, useEffect, useReducer, useState } from "react";
import reducer from "./Reducer";
import {
  FETCH_USERS,
  FETCH_USERS_LOADING,
  SIGN_IN_BEGGING,
  SIGN_IN_END,
} from "./Actions";
import Toast from "react-native-toast-message";
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

        // Toast.show({
        //   type: "success",
        //   text1: "Success",
        //   text2: res.data.message,
        // });

        dispatch({ type: SIGN_IN_END, payload: { res: res.data } });
        // setTimeout(() => {
        //   navigation.navigate("Welcome");
        // }, 3000);
        return res.data;
      } else if (res.data.status === "failed") {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: res.data.message,
        });
        return res.data;
      }
    } catch (error) {
      // Check if error response is available and status is 401
      if ((error.response && error.response.status === 401) || 400 || 429) {
        // You can also check error.response.data.message if API provides specific messages
        Toast.show({
          type: "error",
          text1: "Error",
          text2:
            error.response.data.message ||
            "Too many login attempts. Please try again after 30 seconds.",
        });
      }
    }
  };
  // const SignInUsers = async (response) => {
  //   try {
  //     const res = await axios.post(
  //       "http://10.111.10.15:1000/api/v1/users/login",
  //       response
  //     );

  //     if (res.data.status === "success") {
  //       // Assuming the token is returned in res.data.token
  //       await AsyncStorage.setItem("userToken", JSON.stringify(res?.data)); // Storing the token

  //       ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
  //       dispatch({ type: SIGN_IN_END, payload: { res: res.data } });
  //       // setTimeout(() => {
  //       //   navigation.navigate("Welcome");
  //       // }, 3000);
  //       return res.data;
  //     } else if (res.data.status === "failed") {
  //       return ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
  //     }
  //   } catch (error) {
  //     // Check if error response is available and status is 401
  //     if ((error.response && error.response.status === 401) || 400 || 429) {
  //       // You can also check error.response.data.message if API provides specific messages
  //       return ToastAndroid.show(
  //         error.response.data.message ||
  //           "Too many login attempts. Please try again after 30 seconds.",
  //         ToastAndroid.SHORT
  //       );
  //     }
  //   }
  // };
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

  const SignUpUsers = async (response) => {
    try {
      const res = await axios.post(
        "http://10.111.10.15:1000/api/v1/users/signup",
        response
      );

      if (res.data.status === "success") {
        return Toast.show({
          type: "success",
          text1: "Success",
          text2: res.data.message,
        });
      } else if (res.data.status === "failed") {
        return Toast.show({
          type: "error",
          text1: "Error",
          text2: res.data.message,
        });
      }
    } catch (error) {
      // Check if error response is available and status is 401
      if ((error.response && error.response.status === 401) || 400) {
        // You can also check error.response.data.message if API provides specific messages

        return Toast.show({
          type: "error",
          text1: "Error",
          text2: error.response.data.message || "Something went wrong",
        });
      }
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.clear();
      await AsyncStorage.removeItem("userToken");

      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.log("Error clearing data from AsyncStorage:", error);
    }
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        SignInUsers,
        FetchUsers,
        logout,
        SignUpUsers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;
