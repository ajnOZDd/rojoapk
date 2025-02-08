import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import FormField from '../molecule/FormField';
import Button from '../atom/Button';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, database } from '../../config/firebaseConfig';
import { registerForPushNotificationsAsync } from '../../function/notification';

const SignUpForm = ({ navigation, style}) => {
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSignUp = async () => {
    // Réinitialiser l'erreur
    setError(null);

    // Validation des champs
    if (!email || !password || !name) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    // Validation du format de l'email
    if (!validateEmail(email)) {
      setError('Veuillez entrer une adresse email valide');
      return;
    }

    // Validation du mot de passe
    if (!validatePassword(password)) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

     // Validation de la confirmation du mot de passe
     if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);

    try {
      // Créer l'utilisateur dans Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
      const token = registerForPushNotificationsAsync();
      // Sauvegarder les informations supplémentaires dans la base de données
      await set(ref(database, `users/${userId}`), {
        name,
        email,
        createdAt: new Date().toISOString(),
        favorites: [],
        token : token
      });
      // Réinitialiser les champs
      setEmail('');
      setPassword('');
      setConfirmPassword('')
      setName('');
      Alert.alert(
        "Succès",
        "Compte créé avec succès !",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate('Login')
          }
        ]
      );

    } catch (error) {
      console.error("Error code:", error.code);
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('Cette adresse email est déjà utilisée');
          break;
        case 'auth/invalid-email':
          setError('Format d\'email invalide');
          break;
        case 'auth/operation-not-allowed':
          setError('La création de compte est désactivée');
          break;
        case 'auth/weak-password':
          setError('Le mot de passe est trop faible');
          break;
        default:
          setError('Une erreur est survenue lors de l\'inscription');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <FormField
        label="Nom"
        value={name}
        onChangeText={setName}
        placeholder="Entrez votre nom"
        autoCapitalize="words"
      />
      <FormField
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="exemple@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormField
        label="Mot de passe"
        value={password}
        onChangeText={setPassword}
        placeholder="Minimum 6 caractères"
        secureTextEntry
        autoCapitalize="none"
      />
      <FormField
        label="Confirmer le mot de passe"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirmez votre mot de passe"
        secureTextEntry
        autoCapitalize="none"
      />
      {error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}
      <Button 
        text={loading ? "Création du compte..." : "Créer un compte"} 
        onPress={handleSignUp}
        disabled={loading}
      />
      
      <Text 
        style={styles.loginLink}
        onPress={() => navigation.navigate('Login')}
      >
        Déjà un compte ? Connectez-vous
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
    marginBottom: 10,
    textAlign: 'center',
    padding: 10,
  },
  loginLink: {
    marginTop: 15,
    color: 'blue',
    textAlign: 'center',
    textDecorationLine: 'underline',
  }
});

export default SignUpForm;