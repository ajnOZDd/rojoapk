import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Favorite from '../components/organics/Favoris';

const FavoriteScreen = () => {

  return (
    <SafeAreaView style={styles.container}>
        <Favorite />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Optionnel, pour une couleur de fond uniforme
  },
});

export default FavoriteScreen;