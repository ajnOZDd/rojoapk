import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Atomes
const TextField = ({ children, style }) => (
  <Text style={[styles.text, style]}>{children}</Text>
);


const styles = StyleSheet.create ({
    text : {
        fontSize : 20,
        color : 'black'
    }
})


export default TextField;