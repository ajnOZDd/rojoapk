import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Alert, StyleSheet, ActivityIndicator} from 'react-native';
import { auth, database } from '../config/firebaseConfig'; 
import { ref, get, push, set, child} from 'firebase/database';
import Button from '../components/atom/Button';

const CryptoCoursesScreen = () => {
  const [cryptos, setCryptos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const fetchCryptos = async () => {
  //     try {
  //       const cryptoRef = ref(database, 'cryptocurrencies');
  //       const snapshot = await get(cryptoRef);
  //       if (snapshot.exists()) {
  //         const data = snapshot.val();
  //         const loadedCryptos = Object.keys(data).map(key => ({id: key, ...data[key] }));
  //         setCryptos(loadedCryptos);
  //       } else {
  //         console.log("Aucune donnée de crypto trouvée.");
  //       }
  //     } catch (error) {
  //       Alert.alert('Erreur', "Erreur lors de la récupération des données.");
  //       console.error('Erreur lors de la récupération des cryptos:', error);
  //     }
  //   };
  //   fetchCryptos();
  // }, []);

  const fetchCryptos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
      const data = await response.json();
      setCryptos(data);
    } catch (error) {
      Alert.alert('Erreur', "Erreur lors de la récupération des données.");
      console.error('Erreur lors de la récupération des cryptos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptos();
  }, []);

const addToFavorites = useCallback(async (cryptoId, nameCrypto, symbolCrypto, lastKnownPrice, priceAlertThreshold) => {
  try {
    const userId = auth.currentUser.uid;
    const favoritesRef = ref(database, `users/${userId}/favorites`);
    await set(child(favoritesRef, cryptoId), {
      name : nameCrypto,
      symbol : symbolCrypto,
      addedAt: new Date().toISOString(),
      lastKnownPrice : lastKnownPrice,
      priceAlertThreshold : priceAlertThreshold
    });
    Alert.alert('Succès', 'Cryptomonnaie ajoutée aux favoris');
  } catch (error) {
    Alert.alert('Erreur', "Erreur lors de l'ajout aux favoris.");
    console.error('Erreur lors de l\'ajout aux favoris:', error);
  }
}, []);

if (isLoading) {
  return (
    <View style={[styles.listContent]}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

  return (
    <FlatList
      data={cryptos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.cryptoText}>{item.name} - {item.current_price} USD</Text>
          <Button
            text="Add To Favorites" 
            onPress={() => addToFavorites(item.id, item.name, item.symbol, item.current_price, 0.05)}
            style={styles.button}
          />
        </View>
      )}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({

  listContent: {
    padding: 16,
  },

  itemContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 1,
  },

  cryptoText: {
    fontSize: 16,
    marginBottom: 8,
  },

  button : {
    backgroundColor : '#007bff'
  }

});

export default CryptoCoursesScreen;
