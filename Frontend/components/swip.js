import React, { useState } from 'react';
import { View, Text, StyleSheet, PanResponder } from 'react-native';

const SwipeComponent = ({ onYes, onNo }) => {
    const [swipeDirection, setSwipeDirection] = useState(null);

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
            const { dx } = gestureState;
            if (dx > 0) {
                setSwipeDirection('right');
            } else {
                setSwipeDirection('left');
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
                {swipeDirection === 'right' ? 'Oui' : swipeDirection === 'left' ? 'Non' : 'Swipe pour choisir ' + '\n' + 'Oui / Non'}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        textAlign:'center',
        lineHeight:60,
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default SwipeComponent;
