import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import Toast from "react-native-simple-toast";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const EmployeeLogin = ({ navigation }) => {
  const [email, setEmail] = useState("denny1@email.com");
  const [password, setPassword] = useState("123");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Toast.show("The field cannot be empty!");
        return;
      }
      setLoading(true);
      const response = await axios.post(
        "https://incredible-victorious-kingfisher.glitch.me/employee/login",
        {
          email: email,
          password: password,
        }
      );

      console.log("Response:", response.data);

      const { data } = response;
      const { role } = data;


      if (role === 'employee') {
        const { id, email } = data;
        if (id) {
          const loginData = JSON.stringify(data);
          await AsyncStorage.setItem('loginData', loginData);
          console.log("Login Data:", loginData);
          navigation.navigate("EmployeeHome", { email, id });
        } else {
          console.error("API Response is missing id property:", data);
        }
      } else if (role === 'librarian') {
        const { email } = data;
        navigation.navigate("LibrarianHome", { email });
      } else {
        console.log("Invalid role:", role);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      {/* <Image source={require('./assets/adptive_icon.png')} style={styles.logo} />  */}
      <Text style={styles.title}>Manage Employee</Text>
      <View style={styles.inputContainer}>
        <FontAwesome5 name="user" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
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
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
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

export default EmployeeLogin;
