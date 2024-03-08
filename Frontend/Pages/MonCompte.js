import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import Img from '../img/4.jpg';
import { AntDesign } from '@expo/vector-icons';


export default function Compte({ setUserId, setReload, reload }) {
    const [userData, setUserData] = useState(null);
    const [wait, setWait] = useState(false);
    const [question, setQuestion] = useState([]);
    const [actu, setActu] = useState(Boolean);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('userId');
                console.log('token', token);
                if (token) {
                    const response = await axios.get('http://192.168.1.155:5001/user', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    console.log(response.data);
                    setQuestion(response.data.questions);
                }
            } catch (error) {
                console.error('An error occurred while fetching question data:', error);
            }
        };

        const lectureQuestion = async () => {
            try {
                const token = await AsyncStorage.getItem('userId');
                console.log('token', token);

                if (token) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                    const response = await axios.get('http://192.168.1.155:5001/user', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    setUserData(response.data);
                    setWait(true);
                }
            } catch (error) {
                console.error('An error occurred while fetching question data:', error);
            }
        };

        fetchData();
        lectureQuestion();
    }, [actu]);

    const handleSubmit = async () => {
        try {
            await AsyncStorage.removeItem("userId");
            setUserId('');
            setReload(!reload);
            console.log("User ID successfully removed.");
        } catch (error) {
            console.error("An error occurred while removing user ID:", error);
        }
    };

    const handleDeleteQuestion = async (questionId, index) => {
        try {
            const token = await AsyncStorage.getItem('userId');
            if (token) {
                const response = await axios.delete(`http://192.168.1.155:5001/questions/${questionId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {

                    const updatedQuestions = [...question];
                    updatedQuestions.splice(index, 1);
                    setQuestion(updatedQuestions);
                    console.log('Question deleted successfully');
                    Actualisation();
                } else {
                    console.error('Failed to delete question:', response.data);
                }
            }
        } catch (error) {
            console.error('An error occurred while deleting question:', error);
        }
    };




    const Actualisation = () => {
        setQuestion([]);
        setActu(!actu);
    };

    return (
        wait && (
            <View style={styles.container}>
                <ImageBackground source={Img} style={styles.image} />

                {userData && userData.email && (
                    <View style={styles.boxTitre}>
                        <Text style={styles.titre}>Compte de </Text>
                        <Text style={styles.titre}>{userData.email}</Text>
                    </View>
                )}

                <ScrollView style={styles.scroll}>
                    <Text style={styles.title}>Liste des questions</Text>
                    {question && question.map((elem, index) => (
                        <View key={elem._id} style={styles.BoxQuestion}>
                            <Text style={styles.questions}>{elem.text}</Text>
                            <TouchableOpacity onPress={() => handleDeleteQuestion(elem._id, index)}>
                                <Text style={styles.deleteButtonText}><AntDesign name="delete" size={20} color="red" /></Text>
                            </TouchableOpacity>

                        </View>
                    ))}
                </ScrollView>
                <TouchableOpacity style={styles.button} onPress={Actualisation}>
                    <Text style={styles.buttonText}>Actualisation</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Déconnexion</Text>
                </TouchableOpacity>
            </View>
        )
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 30
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
        padding: 15

    },
    button: {
        marginTop: 20,
        backgroundColor: 'black',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        width: "80%"
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    BoxQuestion: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
        backgroundColor: 'white',
        width: '100%',
        alignItems: 'center',
    },
    scroll: {
        flex: 1,
        width: '80%',
    },

    titre: {
        width: '100%',
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    boxTitre: {
        borderWidth: 5,
        borderColor: 'white',
        width: '100%',
        padding: 10,
        backgroundColor: 'black',
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '120%',
        resizeMode: 'contain',
    },
    deleteButtonText: {
        display: 'flex',
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 5,

    },
    questions: {
        fontSize: 15,
        fontWeight: 'bold',
        width: '80%'
    }
});
