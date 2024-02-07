import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-simple-toast";

const UpdateLoanStatus = () => {
    const [loanList, setLoanList] = useState([]);

    useEffect(() => {
        getAllLoan();
    }, []);

    const getAllLoan = async () => {
        try {
            const response = await fetch('https://incredible-victorious-kingfisher.glitch.me/library/loan');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setLoanList(data);
            await storeLoanData(data);
        } catch (error) {
            console.error("Error fetching loans:", error);
        }
    };

    const storeLoanData = async (data) => {
        try {
            await AsyncStorage.setItem('loanData', JSON.stringify(data));
        } catch (error) {
            console.error("Error storing loan data:", error);
        }
    };

    const handleAccept = async (loanId, loan) => {
        try {
            const response = await fetch(`https://incredible-victorious-kingfisher.glitch.me/library/user/${loan.user_id}/books/${loan.book_id}/request/accept/${loanId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ loan_status: 'accept' }), // Assuming the API expects the loan status in the request body
            });
            Toast.show('Pinjaman di accept!')

            if (!response.ok) {
                throw new Error('Failed to accept loan');
            }

            const loanData = await AsyncStorage.getItem('loanData');
            if (loanData) {
                const parsedData = JSON.parse(loanData);
                const updatedLoanList = parsedData.map((loanItem) => {
                    if (loanItem.loan_id === loanId) {
                        return { ...loanItem, loan_status: 'accept' };
                    }
                    return loanItem;
                });
                setLoanList(updatedLoanList);

                const filteredLoanList = updatedLoanList.filter(loanItem => loanItem.loan_status === 'request');
                setLoanList(filteredLoanList);
            }
        } catch (error) {
            console.error("Error updating loan status:", error);
        }
    };

    const handleReject = async (loanId, loan) => {
        try {
            const response = await fetch(`https://incredible-victorious-kingfisher.glitch.me/library/user/${loan.user_id}/books/${loan.book_id}/request/reject/${loanId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ loan_status: 'reject' }),
            });
            Toast.show('Pinjaman di reject!')

            if (!response.ok) {
                throw new Error('Failed to reject loan');
            }

            const loanData = await AsyncStorage.getItem('loanData');
            if (loanData) {
                const parsedData = JSON.parse(loanData);
                const updatedLoanList = parsedData.map((loanItem) => {
                    if (loanItem.loan_id === loanId) {
                        return { ...loanItem, loan_status: 'reject' };
                    }
                    return loanItem;
                });
                setLoanList(updatedLoanList);

                const filteredLoanList = updatedLoanList.filter(loanItem => loanItem.loan_status === 'request');
                setLoanList(filteredLoanList);
            }
        } catch (error) {
            console.error("Error updating loan status:", error);
        }
    };


    const renderLoanCard = (loan, loan_id) => {
        return (
            <View key={loan_id} style={styles.card}>
                <View style={styles.cardContent}>
                    <Text style={styles.title}>Title: {loan.book_title}</Text>
                    <Text>User: {loan.user_name}</Text>
                    <Text>Status : {loan.loan_status}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    {loan.loan_status === 'request' && (
                        <>
                            <TouchableOpacity onPress={() => handleAccept(loan.loan_id, loan)} style={[styles.button, { backgroundColor: 'green' }]}>
                                <FontAwesome5 name="check" size={20} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleReject(loan.loan_id, loan)} style={[styles.button, { backgroundColor: 'red' }]}>
                                <FontAwesome5 name="trash" size={20} color="white" />
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>

        );
    };
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Daftar request pinjaman</Text>
            {loanList.map((loan) => renderLoanCard(loan))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    card: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 12,
        padding: 18,
        gap: 100,
        margin: 5,
        backgroundColor: '#FFA447',
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
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#000',
        padding: 8,
        margin: 7,
        borderRadius: 10
    },
    buttonText: {
        fontWeight: 'bold',
    },
});

export default UpdateLoanStatus;
