import axios from 'axios';

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SwipeComponent from './swip';

const Questionnaire = () => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [data, setData] = useState();
    const [text, setText] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5001/");
                setData(response.data);
                console.log("p")
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchData();
    });





    const questions = [
        {
            question: 'Question 1:' + '\n' + 'Aimez-vous le chocolat ?'
        },
        { question: 'Question 2:' + '\n' + ' Avez-vous des animaux domestiques ?' },
        // Ajoutez d'autres questions ici
    ];

    const handleAnswer = (reponse) => {
        setAnswers([...answers, reponse]);
        setQuestionIndex(questionIndex + 1);
    };

    const currentQuestion = questions[questionIndex];

    if (!currentQuestion) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Toutes les questions ont été répondues.</Text>
                <Text style={styles.text}>Réponses enregistrées : {answers.join(', ')}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            <SwipeComponent
                onYes={() => handleAnswer(currentQuestion.reponse)}
                onNo={() => handleAnswer('non')}
            />
            <TouchableOpacity onPress={() => handleAnswer('non')}>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    questionText: {
        textAlign: 'center',
        fontSize: 24,
        lineHeight: 100,
        fontWeight: 'bold',
    },
    buttonText: {
        fontSize: 20,
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default Questionnaire;
