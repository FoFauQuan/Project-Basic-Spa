import React from "react";
import { Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { useMyContextProvider } from "../src/index";

const Profile = () =>{
    const [controller, dispatch] = useMyContextProvider();
    const { userLogin } = controller;

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Profile Screen</Text>
            {userLogin !== null && (
                <>
                    <View style={styles.row}>
                        <Text style={styles.label}>Email: </Text>
                        <Text style={styles.value}>{userLogin.email}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Full Name: </Text>
                        <Text style={styles.value}>{userLogin.fullName}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Address: </Text>
                        <Text style={styles.value}>{userLogin.address}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Phone: </Text>
                        <Text style={styles.value}>{userLogin.phone}</Text>
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
    },
    headerText: {
        padding: 15,
        fontSize: 35,
        fontWeight: 'bold',

    },
    row: {
        flexDirection: 'row',
        padding: 10,
        justifyContent:'space-between',
        paddingHorizontal:20
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        flex:1
    },
    value: {
        fontSize: 20,
    },
});
export default Profile;
