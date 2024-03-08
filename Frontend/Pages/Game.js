// import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import Questionnaire from '../components/Question';

const Game = () => {
    const [data, setData] = useState([]);

    return (
        <View style={styles.container}>


            <Questionnaire data={data} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Game;
