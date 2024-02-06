import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Modal, Pressable, Button } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SelectList } from 'react-native-dropdown-select-list'

const LoanRequest = () => {
    const [loanRequests, setLoanRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const statuses = [
        { key: '1', value: 'Pilih status pinjaman', disabled: true },
        { key: '2', value: 'request' },
        { key: '3', value: 'accept' },
        { key: '4', value: 'reject' },
        { key: '5', value: 'finish' },
    ];

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
        if (userData?.id && selectedStatus) {
            fetchLoanRequests();
        }

        console.log(userData?.id);
    }, [userData?.id, selectedStatus]);

    const fetchLoanRequests = async () => {
        if (selectedStatus !== null) {
            try {
                setLoading(true);
                const response = await fetch(`https://incredible-victorious-kingfisher.glitch.me/library/books/${userData.id}/request/${selectedStatus}`);
                const data = await response.json();
                setLoanRequests(data);
            } catch (error) {
                console.error("Error fetching loan requests:", error);
            } finally {
                setLoading(false);
            }
        }
        else
            setLoanRequests([])

    };



    const renderLoanRequestCard = (request) => {
        let cardStyle = {};
        let iconName = "";


        switch (request.status_loan) {
            case "request":
                cardStyle = styles.requestCard;
                iconName = "spinner";
                break;
            case "accept":
                cardStyle = styles.acceptedCard;
                iconName = "check-circle";
                break;
            case "reject":
                cardStyle = styles.rejectedCard;
                iconName = "times-circle";
                break;
            case "finish":
                cardStyle = styles.finishCard;
                iconName = "check-circle";
                break;
            default:
                cardStyle = {};
                iconName = "";
                break;
        }

        return (
            <TouchableOpacity key={request.id} style={[styles.card, cardStyle]}>
                <View style={styles.cardContent}>
                    <Text style={styles.title}>Title: {request.title}</Text>
                    <Text>Author: {request.author}</Text>
                    <Text>Category: {request.category}</Text>
                    <Text>Status: {request.status_loan}</Text>
                </View>
                <View style={styles.iconContainer}>
                    <FontAwesome5 name={iconName} size={24} color="#000" />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>


            <Text style={styles.title}>Daftar Pinjaman Buku</Text>

            <View style={{ padding: 10, flexDirection: "row", gap: 10, marginBottom: 10 }}>
                <SelectList
                    setSelected={(val) => setSelectedStatus(val)}
                    data={statuses}
                    save="value"
                    boxStyles={{ minWidth: "95%" }}
                    placeholder="Pilih status pinjaman"
                />

            </View>

            {
                loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    loanRequests.map((request) => renderLoanRequestCard(request))
                )
            }
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        paddingTop: 20,
    },
    card: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardContent: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 20,
        marginBottom: 20,
    },
    requestCard: {
        backgroundColor: '#FFA447',
    },
    rejectedCard: {
        backgroundColor: "#F28585",
    },
    acceptedCard: {
        backgroundColor: '#C8E6C9',
    },
    finishCard: {
        backgroundColor: '#C8E6C9',
    },
    iconContainer: {
        marginLeft: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default LoanRequest;
