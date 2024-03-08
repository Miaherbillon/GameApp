import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ setUserId, setLoading }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading2, setLoading2] = useState(false);

    const strictEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const minPasswordLength = 6;

    const handleSubmitLogin = async () => {
        setErrorMessage('');
        if (!strictEmailRegex.test(email)) {
            setErrorMessage('Format d\'email invalide');
            return;
        }


        if (password.length < minPasswordLength) {
            setErrorMessage('Le mot de passe doit contenir au moins 6 caractères');
            return;
        }

        try {
            setLoading2(true);
            const response = await axios.post('http://192.168.1.155:5001/login', {
                email,
                password,
            });
            if (response.data.token) {
                await AsyncStorage.setItem('userId', response.data.token);
                setUserId(response.data.token);
                setLoading2(false);
                setLoading(true)
                alert('Connexion réussie !');

            } else {
                throw new Error(response.data.error || 'Identifiants incorrects');
            }
        } catch (error) {
            console.error(error.message);
            setErrorMessage(error.message);
            setLoading2(false);
        }
    };

    const handleToggleForm = () => {
        setLoading2(!loading2);
    };

    return (
        <View style={styles.container}>
            {errorMessage !== '' && <Text style={styles.error}>{errorMessage}</Text>}
            <TouchableOpacity onPress={handleToggleForm}>
                <Text style={styles.Co}>Connexion</Text>
            </TouchableOpacity>
            {loading2 && (
                <View>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        placeholder="Mot de passe"
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}
                        secureTextEntry
                        textContentType="password"
                    />
                    <TouchableOpacity onPress={handleSubmitLogin} style={styles.button}>
                        <Text style={styles.buttonText}>Connexion</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 20,
    },
    input: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    button: {
        backgroundColor: 'black',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    Co: {
        marginBottom: 20,
        fontSize: 20
    }
});
