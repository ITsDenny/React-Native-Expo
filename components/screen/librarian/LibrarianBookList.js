import React, { useState, useEffect } from "react";
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from "react-native";
import Toast from "react-native-simple-toast";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LibrarianBookList = ({ navigation }) => {
    const [books, setBooks] = useState([]);

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        retrieveData();
    }, []);

    const retrieveData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('loginData');
            if (jsonValue != null) {
                const data = JSON.parse(jsonValue);
                setUserData(data);
            } else {
                console.log('No data found in AsyncStorage');
            }
        } catch (error) {
            console.error('Error retrieving data from AsyncStorage:', error);
        }
    };


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('https://incredible-victorious-kingfisher.glitch.me/library/books');
                console.log('API Response:', response.data);
                setBooks(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchBooks();
        const loadUserId = async () => {
            try {
                const storedId = await AsyncStorage.getItem("id");
                if (storedId !== null) {
                    setUserId(parseInt(storedId));
                }
            } catch (error) {
                console.error("Error loading user ID:", error);
            }
        };
        loadUserId();
    }, []);

    const handleLoan = async (bookId) => {
        try {
            if (!userData?.id) {
                console.error("User ID not found!");
                return;
            }
            const loanResponse = await axios.post('https://incredible-victorious-kingfisher.glitch.me/library/loan', {
                user_id: userData?.id,
                book_id: bookId,
            });
        } catch (error) {
            console.error("Error loaning book:", error);
        }
    };

    const renderBookItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.title}>Title : {item.title}</Text>
            <Text>Author : {item.author}</Text>
            <Text>Kategori : {item.category}</Text>
            <Text>Jumlah Buku : {item.qty}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={books}
                renderItem={renderBookItem}
                keyExtractor={item => item.id.toString()}
            />
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>Back to Librarian Home</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        elevation: 2,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    loanButton: {
        backgroundColor: '#27ae60',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    loanButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    backButton: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    backButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default LibrarianBookList;
