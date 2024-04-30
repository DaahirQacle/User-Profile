import React, { useContext, useEffect } from "react";
import { Text } from "react-native";
import { AppContext } from "../Context/Provider";

function Logout() {
  const { logout } = useContext(AppContext);

  useEffect(() => {
    const handleLogout = async () => {
      await logout();
    };

    handleLogout(); // Call handleLogout when component mounts
  }, []); // Empty dependency array to ensure it runs only once on mount

  return <Text>Logging out...</Text>; // You can render any loading message here
}

export default Logout;
