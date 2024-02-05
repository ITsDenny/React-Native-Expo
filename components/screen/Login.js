import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-simple-toast";
import { Style } from "../Style";
import axios from "axios";

const LoginForm = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        Toast.show("The field cannot empty!");
        return;
      }

      setLoading(true);

      const response = await axios.post(
        "https://incredible-victorious-kingfisher.glitch.me/library/login",
        {
          username: username,
          password: password,
        }
      );

      navigation.navigate("Home");
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Eror fetch:", error);
    }
  };

  const navigateRegister = async () => {
    navigation.navigate("Register");
  };

  return (
    <View style={Style.container}>
      <Text style={Style.title}>Login</Text>
      <TextInput
        style={Style.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={Style.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />

      <View style={Style.buttonContainer}>
        <TouchableOpacity
          style={Style.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={Style.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={Style.registerButton}
          onPress={navigateRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={Style.buttonText}>Register</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginForm;
