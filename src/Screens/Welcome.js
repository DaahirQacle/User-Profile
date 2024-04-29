import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AppContext } from "../Context/Provider";

function Welcome() {
  const { logout } = useContext(AppContext);
  return (
    <View>
      <Text>Welcome to our app!</Text>

      <TouchableOpacity onPress={logout()}>
        <Text>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Welcome;
