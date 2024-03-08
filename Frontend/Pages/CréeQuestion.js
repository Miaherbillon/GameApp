import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ImageBackground, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';

import Img from '../img/9.jpg';

const CréeQuestion = ({ setReload, reload }) => {
    const [question, setQuestion] = useState('');

    const handleSubmit = async () => {
        if (!question) {
            alert('Veuillez saisir une question.');
            return;
        }

        try {
            const response = await axios.post('http://192.168.1.155:5001/questions', {
                text: question
            });
            if (response.status === 201) {
                alert('Question soumise avec succès !');
                setQuestion('');
                setReload(!reload);
            } else {
                alert('Une erreur est survenue lors de la soumission de la question.');
                console.error('Error:', response.data);
            }
        } catch (error) {
            alert('Une erreur de réseau est survenue. Veuillez réessayer.');
            console.error('Error:', error);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <View style={styles.inner}>
                <ImageBackground source={Img} style={styles.image} />
                <Text style={styles.title}>Pose ta question</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Tape ta question ici..."
                    onChangeText={(text) => setQuestion(text)}
                    value={question}
                />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Soumettre</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        width: 300,
        backgroundColor: 'white',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#000',
        borderWidth: 2,
        borderColor: 'white',
        padding: 10,
        width: 300,
        alignItems: 'center',
        marginBottom: 10
    },
    buttonText: {
        color: '#fff',
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    title: {
        paddingBottom: '50%',
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default CréeQuestion;
