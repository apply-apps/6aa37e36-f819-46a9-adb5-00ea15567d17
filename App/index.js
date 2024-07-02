// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ConfettiCannon from 'react-native-confetti-cannon';

const colors = [
    { id: '1', color: 'red' },
    { id: '2', color: 'blue' },
    { id: '3', color: 'green' },
];

const objects = [
    { id: '1', color: 'red' },
    { id: '2', color: 'blue' },
    { id: '3', color: 'green' },
    { id: '4', color: 'red' },
    { id: '5', color: 'blue' },
];

const ColorSortGame = ({ onComplete }) => {
    const [selectedColor, setSelectedColor] = useState(null);
    const [sortedObjects, setSortedObjects] = useState([]);

    const handleSelectColor = (color) => {
        setSelectedColor(color);
    };

    const handlePlaceObject = (object) => {
        if (selectedColor === object.color) {
            setSortedObjects([...sortedObjects, object]);
            if (sortedObjects.length + 1 === objects.length) {
                onComplete();
            }
        }
    };

    return (
        <View style={styles.gameContainer}>
            <Text style={styles.instruction}>Select the color: {selectedColor || 'None'}</Text>
            <View style={styles.colorButtons}>
                {colors.map((color) => (
                    <TouchableOpacity
                        key={color.id}
                        style={[styles.colorButton, { backgroundColor: color.color }]}
                        onPress={() => handleSelectColor(color.color)}
                    />
                ))}
            </View>
            <FlatList
                data={objects}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.object, { backgroundColor: item.color }]}
                        onPress={() => handlePlaceObject(item)}
                    />
                )}
                keyExtractor={(item) => item.id}
                numColumns={3}
                contentContainerStyle={styles.objectList}
            />
        </View>
    );
};

const App = () => {
    const [isComplete, setIsComplete] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Sort the Objects by Colors</Text>
            <ColorSortGame onComplete={() => setIsComplete(true)} />
            {isComplete && <ConfettiCannon count={200} origin={{x: -10, y: 0}} />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    gameContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    instruction: {
        fontSize: 18,
        marginBottom: 10,
    },
    colorButtons: {
        flexDirection: 'row',
        marginVertical: 20,
    },
    colorButton: {
        width: 50,
        height: 50,
        margin: 10,
        borderRadius: 25,
    },
    objectList: {
        alignItems: 'center',
    },
    object: {
        width: 60,
        height: 60,
        margin: 10,
        borderRadius: 10,
    },
});

export default App;