import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity, ScrollView } from "react-native";
import { RadioButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";

const EmployeeHome = ({ navigation }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [religion, setReligion] = useState("");
    const [gender, setGender] = useState("");
    const [placeOfBirth, setPlaceOfBirth] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [marriageStatus, setMarriageStatus] = useState("");
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleAddEmployee = async () => {
        try {
            const response = await axios.post(
                "https://incredible-victorious-kingfisher.glitch.me/employee/register",
                {
                    name,
                    address,
                    email,
                    phone,
                    religion,
                    gender,
                    place_of_birth: placeOfBirth,
                    date_of_birth: dateOfBirth,
                    marriage_status: marriageStatus === "married" ? "Y" : "N",
                }
            );
            console.log("Employee added:", response.data);
            toggleModal();
        } catch (error) {
            console.error("Error adding employee:", error);
        }
    };

    const logout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "EmployeeLogin" }],
        });
    }

    const getAllEmployee = async () => {
        try {
            const response = await axios.get("https://incredible-victorious-kingfisher.glitch.me/employee/all");
            setEmployees(response.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    useEffect(() => {
        getAllEmployee();
    }, []);



    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Welcome to the home screen!</Text>
            <TouchableOpacity style={styles.button} onPress={toggleModal}>
                <Ionicons name="person-add" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={getAllEmployee}>
                <Ionicons name="people" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.employeeList}>
                <Text style={styles.listHeader}>Employee List:</Text>
                {employees.map((employee, index) => (
                    <TouchableOpacity key={index} style={styles.card} onPress={() => setSelectedEmployee(employee)}>
                        <Text style={styles.cardText}>Name: {employee.name}</Text>
                        <Text style={styles.cardText}>Address: {employee.address}</Text>
                        <Text style={styles.cardText}>Email: {employee.email}</Text>
                        <Text style={styles.cardText}>Phone: {employee.phone}</Text>
                        <Text style={styles.cardText}>Religion: {employee.religion}</Text>
                        <Text style={styles.cardText}>Gender: {employee.gender}</Text>
                        <Text style={styles.cardText}>Place of Birth: {employee.place_of_birth}</Text>
                        <Text style={styles.cardText}>Date of Birth: {employee.date_of_birth}</Text>
                        <Text style={styles.cardText}>Marriage Status: {employee.marriage_status}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={toggleModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Employee Details</Text>
                        {selectedEmployee && (
                            <>
                                <Text style={styles.detailText}>Name: {selectedEmployee.name}</Text>
                                <Text style={styles.detailText}>Address: {selectedEmployee.address}</Text>
                                <Text style={styles.detailText}>Email: {selectedEmployee.email}</Text>
                                <Text style={styles.detailText}>Phone: {selectedEmployee.phone}</Text>
                                <Text style={styles.detailText}>Religion: {selectedEmployee.religion}</Text>
                                <Text style={styles.detailText}>Gender: {selectedEmployee.gender}</Text>
                                <Text style={styles.detailText}>Place of Birth: {selectedEmployee.place_of_birth}</Text>
                                <Text style={styles.detailText}>Date of Birth: {selectedEmployee.date_of_birth}</Text>
                                <Text style={styles.detailText}>Marriage Status: {selectedEmployee.marriage_status}</Text>
                            </>
                        )}
                        <Button title="Close" onPress={toggleModal} />
                    </View>
                </View>
            </Modal>
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={toggleModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add Employee</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Address"
                            value={address}
                            onChangeText={setAddress}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Phone"
                            value={phone}
                            onChangeText={setPhone}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Place of Birth"
                            value={placeOfBirth}
                            onChangeText={setPlaceOfBirth}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Date of Birth (YYYY-MM-DD)"
                            value={dateOfBirth}
                            onChangeText={setDateOfBirth}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Religion"
                            value={religion}
                            onChangeText={setReligion}
                        />
                        <View style={styles.radioContainer}>
                            <Text>Gender:</Text>
                            <RadioButton
                                value="male"
                                status={gender === 'male' ? 'checked' : 'unchecked'}
                                onPress={() => setGender('male')}
                            />
                            <Text>Male</Text>
                            <RadioButton
                                value="female"
                                status={gender === 'female' ? 'checked' : 'unchecked'}
                                onPress={() => setGender('female')}
                            />
                            <Text>Female</Text>
                        </View>
                        <View style={styles.checkboxContainer}>
                            <Text>Marital Status:</Text>
                            <RadioButton
                                value="married"
                                status={marriageStatus === true ? 'checked' : 'unchecked'}
                                onPress={() => setMarriageStatus(true)}
                            />
                            <Text>Married</Text>
                            <RadioButton
                                value="single"
                                status={marriageStatus === false ? 'checked' : 'unchecked'}
                                onPress={() => setMarriageStatus(false)}
                            />
                            <Text>Single</Text>
                        </View>
                        <TouchableOpacity style={styles.addButton} onPress={handleAddEmployee}>
                            <Ionicons name="add-circle" size={24} color="white" />
                            <Text style={styles.buttonText}>Add</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
                            <Ionicons name="close-circle" size={24} color="white" />
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Ionicons name="log-out" size={24} color="white" />
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 20,
        textAlign: "center",
    },
    button: {
        backgroundColor: "#007bff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 10,
        marginHorizontal: 20,
    },
    buttonText: {
        color: "white",
        marginLeft: 5,
    },
    employeeList: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    listHeader: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardText: {
        fontSize: 16,
        marginBottom: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "80%",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    detailText: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    addButton: {
        backgroundColor: "#28a745",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    cancelButton: {
        backgroundColor: "#dc3545",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    logoutButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#6c757d",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
});

export default EmployeeHome;
