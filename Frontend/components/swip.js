import React, { useState } from 'react';
import { View, Text, StyleSheet, PanResponder } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';


const SwipeComponent = ({ questionText, onYes, onNo }) => {
    const [swipeDirection, setSwipeDirection] = useState(null);

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
            const { dx } = gestureState;
            if (dx > 0) {
                setSwipeDirection('left');
            } else {
                setSwipeDirection('right');
            }
        },
        onPanResponderRelease: (_, gestureState) => {
            const { dx } = gestureState;
            if (dx > 50) {
                onYes();
            } else if (dx < -50) {
                onNo();
            }
            setSwipeDirection(null);
        },
    });

    return (
        <View {...panResponder.panHandlers} style={styles.container}>
            <Text style={styles.text}>
                {swipeDirection === 'right' ? 'Oui' : swipeDirection === 'left' ? 'Non' : 'Oui            Non'}
            </Text>
            <MaterialIcons name="swipe" size={80} color="brgb(98, 183, 200)" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        padding: 40,


    },
    text: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 80

    },
});

export default SwipeComponent;
