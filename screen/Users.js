import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { database } from '../config/firebaseConfig'; // Importez la configuration Firebase
import { ref, set } from 'firebase/database';

const AddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleAddUser = () => {
    const newUserRef = ref(database, 'users/user789'); // Nouvel ID utilisateur
    set(newUserRef, {
      name,
      email,
      photoURL: 'https://example.com/testPhoto3.jpg',
      favorites: ["testBitcoin", "testEthereum"],
      createdAt: new Date().toISOString(),
    })
      .then(() => Alert.alert('Succès', 'Utilisateur ajouté !'))
      .catch((error) => Alert.alert('Erreur', error.message));
  };

  return (
    <View>
      <TextInput placeholder="Nom" value={name} onChangeText={setName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <Button title="Ajouter un utilisateur" onPress={handleAddUser} />
    </View>
  );
};

export default AddUser;