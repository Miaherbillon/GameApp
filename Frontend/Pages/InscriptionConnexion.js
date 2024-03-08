import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import Inscription from "../components/Inscription"
import Connexion from "../components/Connexion"

export default function Register({ setUserId, setLoading }) {

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <View style={styles.button}>
                <Inscription setUserId={setUserId} setLoading={setLoading} />
            </View>
            <View style={styles.button}>
                <Connexion setUserId={setUserId} setLoading={setLoading} />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(98, 183, 200)',
    },
    button: {
        width: 300,
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 20,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    }
});
