import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InputField from '../atom/InputFiled';

const FormField = ({ label, ...inputProps }) => {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <InputField {...inputProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    marginBottom: 15
  },
  label: {
    marginBottom: 5
  }
});

export default FormField;