import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import SituationPortFeuille from '../components/organics/SituationPorteFeuille';

const SituationPortFeuilleScreen = () => {

  return (
    <SafeAreaView style={styles.container}>
        <SituationPortFeuille />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height : 'auto',
    backgroundColor: '#f5f5f5', // Optionnel, pour une couleur de fond uniforme
  },
});

export default SituationPortFeuilleScreen;