import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import UserDetailForm from '../components/organics/UserDetailForm';
import { auth, database } from '../config/firebaseConfig'; 
import { ref, get, update} from 'firebase/database';
import * as ImagePicker from 'expo-image-picker';

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dyq9j8ltv/image/upload";
const UPLOAD_PRESET = "photo_profile_unsigned"; // Assurez-vous que ce preset utilise le dossier `profile_photos`

const UserDetailsScreen = () => {

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [photoURL, setPhotoURL] = useState("");

  const uploadImageToCloudinary = async (uri) => {
    try {
      const data = new FormData();
      data.append('file', {
        uri,
        type: 'image/jpeg', // ou image/png selon le cas
        name: 'upload.jpg'
      });
      data.append('upload_preset', UPLOAD_PRESET);
      const response = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: data,
      });
      const result = await response.json();
      return result.secure_url;
    } catch (error) {
      console.error('Erreur lors du téléchargement vers Cloudinary:', error);
      throw error;
    }
  };

  const uploadImage = async (uri) => {
    try {
      const url = await uploadImageToCloudinary(uri);
      console.log("url = " + url);
      const userId = auth.currentUser.uid;
      // Référence au nœud utilisateur dans la base de données en temps réel
      const userRef = ref(database, `users/${userId}`);
      // Mise à jour de l'URL de la photo dans la base de données en temps réel
      await update(userRef, {photoURL: url});
      // Mettre à jour l'état local
      setPhotoURL(url);
      Alert.alert('Succès', 'Photo mise à jour avec succès !');
    } catch (error) {
      console.error('Erreur lors du téléchargement de l\'image:', error);
      Alert.alert('Erreur', error.message);
    }
  };

  const takePhoto = async () => {
    // Demander la permission d'accéder à la caméra
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Erreur', 'L\'accès à la caméra est nécessaire pour prendre une photo.');
      return;
    }
    // Ouvrir la caméra pour prendre une photo
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
    }
  };

  const fetchUserData = async () => {
    try {
      const userId = auth.currentUser.uid;
      const userRef = ref(database, `users/${userId}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        setUserData(data);
      } else {
        console.log("Aucune donnée disponible pour cet utilisateur.");
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (isLoading) {
    return (
      // <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      // </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <UserDetailForm 
      user={userData} 
      onEditPress={takePhoto}
      />
    </SafeAreaView>
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
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Optionnel, pour correspondre à l'arrière-plan
  },
});

export default UserDetailsScreen;