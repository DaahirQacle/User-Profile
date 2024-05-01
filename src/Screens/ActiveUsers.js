import React, { useContext, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "../Style/users";
import { AppContext } from "../Context/Provider";
function ActiveUsers() {
  const { User, UsersData, FetchUsers } = useContext(AppContext);

  useEffect(() => {
    FetchUsers();
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {UsersData?.map((item) => (
        <View key={item._id} style={styles.gridItem}>
          <View style={styles.imageContainer}>
            {/* <Text style={{ fontSize: 50 }}>🤢</Text> */}
            <Image
              source={require("../../assets/mee.jpeg")}
              style={{ width: 50, height: 50 }} // Set width and height
              resizeMode="contain" // Adjust the image resizing mode as needed
            />
          </View>
          <View style={styles.textContainer}>
            <View style={styles.titlePriceContainer}>
              <Text style={styles.FullName}>{item.FullName}</Text>
              <Text style={styles.Address}>{item.Address}</Text>
            </View>
            <Text style={styles.Occupation}>{item.Occupation}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

export default ActiveUsers;
