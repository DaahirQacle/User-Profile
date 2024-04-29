import React, { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { AppContext } from "../Context/Provider";

function SiginUp() {
  const { SignInUsers, FetchUsers, UsersData, isLoading, User } =
    useContext(AppContext);
  useEffect(() => {
    console.log("----", User);
  }, []);
  return (
    <View>
      <View>
        <Text>{User?.token}.</Text>
      </View>

      <View>
        <Text>{User.status}</Text>
        <Text>helllo</Text>
      </View>
    </View>
  );
}

export default SiginUp;
