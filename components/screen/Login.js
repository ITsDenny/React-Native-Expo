import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import Toast from "react-native-simple-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const LoginForm = ({ navigation }) => {
  const [username, setUsername] = useState("biji");
  const [password, setPassword] = useState("123");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        Toast.show("The field cannot be empty!");
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

      if (response.data.role === 'student') {
        if (response.data.id) {
          const loginData = JSON.stringify(response.data);
          await AsyncStorage.setItem('loginData', loginData);
          navigation.navigate("StudentHome",
            {
              username: response.data.username,
              id: response.data.id
            }
          );
        } else {
          console.error("API Response is missing id property:", response.data);
        }
      } else if (response.data.role === 'librarian') {
        navigation.navigate("LibrarianHome", { username: response.data.username });
      } else {
        console.log("Invalid role:", response.data.role);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const navigateRegister = async () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <FontAwesome5 name="user" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome5 name="lock" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={navigateRegister}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "100%",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  loginButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginRight: 10,
  },
  registerButton: {
    backgroundColor: "#1976D2",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginForm;
