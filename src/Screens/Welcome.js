import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AppContext } from "../Context/Provider";

function Welcome({ navigation }) {
  const { logout } = useContext(AppContext);
  const handleLogout = async () => {
    // await logout();
    navigation.navigate("SignIn");
  };
  return (
    <View>
      <View>
        <TouchableOpacity onPress={handleLogout}>
          <Text>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Welcome;
