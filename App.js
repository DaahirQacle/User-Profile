import { StatusBar } from "expo-status-bar";
import AppProvider from "./src/Context/Provider";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import AppNavigation from "./src/Navigation/AppNavigation";

export default function App() {
  return (
    <NavigationContainer>
      <AppProvider>
        <StatusBar style="light" />
        <AppNavigation />
      </AppProvider>

      <Toast />
    </NavigationContainer>
  );
}
