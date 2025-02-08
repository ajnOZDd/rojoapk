import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import SignUpForm from '../components/organics/SignUpForm'

const SignUpFormScreen = ({navigation}) => {

  return (
    <SafeAreaView style={styles.container} >
      <SignUpForm navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height : 'auto',
    backgroundColor: '#f5f5f5', // Optionnel, pour une couleur de fond uniforme
    padding: 20,
  },
});

export default SignUpFormScreen;