import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InfoField = ({ label, value, style}) => {
  return (
    <View style={[styles.field, style]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  label: {
    fontWeight: 'bold',
    fontSize : 18
  },

  value: {
    color: '#555',
    fontSize : 18
  },
});

export default InfoField;