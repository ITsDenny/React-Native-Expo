import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

const StudentHome = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [id, setId] = useState(null);

    useEffect(() => {
        const loadLoginData = async () => {
            try {
                const loginData = await AsyncStorage.getItem("loginData");
                if (loginData) {
                    const data = JSON.parse(loginData);
                    setUsername(data.username);
                    setId(data.id);
                }
            } catch (error) {
                console.error("Error loading login data:", error);
            }

        };
        loadLoginData();
    }, []);

    const navigateBookList = () => {
        navigation.navigate('BookList');
    }

    const navigateLoanRequest = () => {
        navigation.navigate('LoanRequest');
    }

    const logout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome, Student {username}!</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.card} onPress={navigateBookList}>
                    <FontAwesome5 name="book" size={50} color="#4CAF50" />
                    <Text style={styles.buttonText}>Daftar Buku</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={navigateLoanRequest}>
                    <FontAwesome5 name="hand-holding" size={50} color="#1976D2" />
                    <Text style={styles.buttonText}>Pinjaman Buku</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.card} onPress={navigateLoanRequest}>
                    <FontAwesome5 name="exchange-alt" size={50} color="#3C3633" />
                    <Text style={styles.buttonText}>Pengembalian</Text>
                </TouchableOpacity> */}

                <TouchableOpacity style={styles.card} onPress={logout}>
                    <FontAwesome5 name="sign-out-alt" size={50} color="#F44336" />
                    <Text style={styles.buttonText}>Logout</Text>
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
        backgroundColor: '#f0f0f0',
    },
    welcomeText: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 20,
    },
    buttonContainer: {
        width: "70%",
        gap: 25
    },
    card: {
        backgroundColor: '#FFF',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        fontSize: 18,
        marginTop: 10,
    },
});

export default StudentHome;
