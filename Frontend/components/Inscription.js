import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

export default function Register({ setUserId }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [userIdFromStorage, setUserIdFromStorage] = useState();

    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('userId');
                setUserIdFromStorage(storedUserId);
            } catch (error) {
                console.error('Error fetching stored user ID:', error);
            }
        };

        fetchUserId();
    }, []);



    const handleToggleForm = () => {
        setLoading(!loading)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!EMAIL_REGEX.test(email)) {
            setErrorMessage('Adresse email invalide.');
            return;
        }

        if (password.length < MIN_PASSWORD_LENGTH) {
            setErrorMessage('Le mot de passe doit contenir au moins 6 caractères.');
            return;
        }

        try {
            const response = await axios.post('http://192.168.1.155:5001/register', {
                email,
                password,
            });

            if (response.data) {
                const user = response.data.userId;
                await AsyncStorage.setItem('userId', user);
                setUserId(user);
                alert('Inscription réussie !');
                navigation.navigate('Home');
            } else {
                alert('Une erreur est survenue.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setErrorMessage(error.message || 'Une erreur est survenue.');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleToggleForm}>
                <Text style={styles.Co}>Inscrition</Text>
            </TouchableOpacity>

            {loading && (
                <View>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        style={styles.input}
                        onChangeText={setEmail}
                        textContentType="emailAddress"
                    />
                    <TextInput
                        placeholder="Mot de passe"
                        value={password}
                        style={styles.input}
                        onChangeText={setPassword}
                        secureTextEntry
                        textContentType="password"
                    />
                    <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                        <Text style={styles.buttonText}>Inscriton</Text>
                    </TouchableOpacity>
                </View>
            )}

            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
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