import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ButtonStylled = ({ children, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.touchable, style]}>
      {children}
    </TouchableOpacity>
);

const styles = StyleSheet.create ({
    touchable : {
        backgroundColor: '#007bff', //'#007bff'
        padding: 10,
        alignItems: 'center',
        borderRadius : 10
    }
});


export default ButtonStylled;

