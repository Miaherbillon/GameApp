import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SwipeComponent from './swip';
import axios from 'axios';

const Questionnaire = ({ data }) => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [transformedQuestions, setTransformedQuestions] = useState([]);

    console.log('data', data)

    useEffect(() => {
        if (data && data.length > 0) {
            const transformedQuestions = data.map(question => question.text);
            setTransformedQuestions(transformedQuestions);
            setQuestionIndex(0);
            setLoading(false);
        }
    }, [data]);

    const handleAnswer = async (isLike, questionId) => {
        try {
            setLoading(true);
            const response = await axios.post('http://192.168.1.155:5001/repondre', {
                questionId: questionId,
                answer: isLike ? 'oui' : 'non',
            });
            console.log('reponse', response.data);
            setQuestionIndex(questionIndex + 1);
            setLoading(false);
        } catch (error) {
            console.error('Error:', error);
            setError('Une erreur est survenue lors de l\'enregistrement de la réponse');
            setLoading(false);
        }
    };

    const currentQuestion = transformedQuestions[questionIndex];

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    if (!currentQuestion) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Toutes les questions ont été répondues.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {!loading && (
                <>
                    <SwipeComponent
                        questionText={currentQuestion}
                        onYes={() => handleAnswer(true, data[questionIndex]._id)}
                        onNo={() => handleAnswer(false, data[questionIndex]._id)}
                    />
                    <Text style={styles.question}>{currentQuestion}</Text>
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


    },
    text: {
        fontSize: 18,
        marginBottom: 150,
    },
    question: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 50,
        padding: 10,
        borderColor: 'black',
        borderWidth: 2,
        backgroundColor: 'white'
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
});

export default Questionnaire;


