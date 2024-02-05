import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-simple-toast";
import { Style } from "../Style";
import axios from "axios";

const Register = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      if (!username || !password || !email) {
        Toast.show("The field cannot empty!");
        return;
      }

      setLoading(true);
      const response = await axios.post(
        "https://incredible-victorious-kingfisher.glitch.me/library/register",
        {
          username: username,
          password: password,
          email: email,
        }
      );
      Toast.show("Registration successful!");
      navigation.navigate("Login");
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Eror fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  const navigateLogin = async () => {
    navigation.navigate("Login");
  };

  return (
    <View style={Style.container}>
      <Text style={Style.title}>Register</Text>
      <TextInput
        style={Style.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={Style.input}
        placeholder="Email"
        onChangeText={(text) => setPassword(text)}
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
          onPress={navigateLogin}
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
          onPress={handleRegister}
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

export default Register;
