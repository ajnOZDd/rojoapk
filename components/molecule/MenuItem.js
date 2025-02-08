import React from 'react';
import { StyleSheet } from 'react-native';
import TextField from '../atom/TextField';
import ButtonStylled from '../atom/ButtonStylled';


const MenuItem = ({ label, onPress }) => (
    <ButtonStylled onPress={onPress} style={styles.menuItem}>
      <TextField style={styles.text}>{label}</TextField>
    </ButtonStylled>
);

const styles = StyleSheet.create ({
    menuItem : {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        marginBottom : 10
    },

    text : {
        color : 'white'
    }
});

export default MenuItem;

