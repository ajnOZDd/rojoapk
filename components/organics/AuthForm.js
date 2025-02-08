import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import FormField from '../molecule/FormField';
import Button from '../atom/Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig'; // Assurez-vous que firebase.js est correctement configuré

const AuthForm = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Menue");
    } catch (error) {
      setError("Failed to login: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <FormField
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
      />
      <FormField
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button text="Login" onPress={handleSubmit} />
      <Text style={styles.loginLink} onPress={() => navigation.navigate('Inscription')}>
        Inscrivez-Vous
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop : 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
  },
  error: {
    color: 'red',
    marginBottom: 10
  }, 

  button : {
    marginTop : 10
  },

  loginLink: {
    marginTop: 15,
    color: 'blue',
    textAlign: 'center',
    textDecorationLine: 'underline',
  }
});

export default AuthForm;