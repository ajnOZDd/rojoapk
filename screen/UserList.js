import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { database } from '../config/firebaseConfig'; // Importez la configuration Firebase
import { ref, onValue } from 'firebase/database';

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersRef = ref(database, 'users'); // Référence à la table "users"
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val(); // Récupérer les données
      if (data) {
        const usersArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setUsers(usersArray); // Mettre à jour l'état
      }
    });
  }, []);

  return (
    <View>
      <Text>Liste des utilisateurs :</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ margin: 10 }}>
            <Text>Nom : {item.name}</Text>
            <Text>Email : {item.email}</Text>
            <Text>Favoris : {item.favorites.join(', ')}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default UsersList;