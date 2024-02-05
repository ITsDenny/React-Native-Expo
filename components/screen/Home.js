import React from "react";
import { View, Text, Button } from "react-native";

const Home = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Welcome to the home screen!</Text>
      <Button
        title="Logout"
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        }}
      ></Button>
    </View>
  );
};

export default Home;
