import React from 'react';
import {ScrollView, StyleSheet, View } from 'react-native';
import MenuItem from './MenuItem';
import TextField from '../atom/TextField';

const MenuSection = ({ title, items }) => (
    <ScrollView style={styles.menuSection}>
      <TextField style={styles.sectionTitle}>{title}</TextField>
      {items.map((item, index) => (
        <MenuItem key={index} label={item.label} onPress={item.onPress} />
      ))}
    </ScrollView>
);

const styles = StyleSheet.create ({
    menuSection : {
        marginBottom: 24,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color : 'black'
    },
});

export default MenuSection;

