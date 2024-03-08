import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import Questionnaire from '../components/Question';
import Img from '../img/4.jpg';

const Game = ({ setReload, reload }) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://192.168.1.155:5001/");
                setData(response.data);
            } catch (error) {
                console.log(error);
                setError('Une erreur s\'est produite lors de la récupération des questions.');
            }
        };
        fetchData();
    }, [reload]);

    const handleRefresh = () => {
        setReload(!reload);
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={Img} style={styles.image} />
            {error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : data.length > 0 ? (
                <View>
                    <Questionnaire data={data} />
                    <TouchableOpacity style={styles.button} onPress={handleRefresh}>
                        <Text style={styles.buttonText}>Actualiser</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <Text>Chargement des questions...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',

    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        borderRadius: 5,
        padding: 10,
        width: 400,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
});

export default Game;
