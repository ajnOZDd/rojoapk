import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import TextField from '../atom/TextField';
import InputField from '../atom/InputFiled';

const CryptoSuggestions = ({ onSelect, initialText}) => {

  const [allCryptos, setAllCryptos] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [searchText, setSearchText] = useState(initialText || '');
  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState('');

  

  // Récupération des cryptos au montage du composant
  useEffect(() => {
    fetchCryptos();
  }, []);

  const fetchCryptos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      );
      if (!response.ok) throw new Error('Erreur réseau');
      
      const data = await response.json();

      const cryptoNames = data.map(coin => ({
        id: coin.id,
        name: coin.name.toLowerCase(),
        symbol: coin.symbol.toUpperCase(),
        current_price : coin.current_price,
        image: coin.image
      }));

      setAllCryptos(cryptoNames);
      
    } catch (error) {
      console.error('Erreur lors de la récupération des cryptos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction de recherche optimisée avec debounce
  const handleSearch = useCallback((text) => {
    setSearchText(text);
    
    if (text.trim().length === 0) {
      setFilteredSuggestions([]);
      return;
    }

    const searchLower = text.toLowerCase();
    const filtered = allCryptos.filter(
      crypto => 
        crypto.name.includes(searchLower) || 
        crypto.symbol.toLowerCase().includes(searchLower)
    ).slice(0, 5); // Limite à 5 suggestions

    setFilteredSuggestions(filtered);
  }, [allCryptos]);

  const handleSelect = (crypto) => {
    onSelect({ 
      id : crypto.id,
      name : crypto.name, 
      price : crypto.current_price
    });
    setSearchText(crypto.name);
    setPrice(String(crypto.current_price));
    setFilteredSuggestions([]);
  };

  return (
    <View style={styles.container}>

      <View style={styles.section}>
        <TextField style={styles.sectionTitle}>Cryptomonaie</TextField>
        <InputField
          value={searchText}
          onChangeText={handleSearch}
          placeholder="Rechercher une crypto-monnaie"
          style={styles.input}
        />
      </View>

      {/* <View style={styles.section}>
        <TextField style={styles.sectionTitle}>Prix</TextField>
        <InputField
          value={price}
          onChangeText={setPrice}
          placeholder="Prix de Crypto"
          style={styles.input}
          editable={false}
        />
      </View> */}
      
      {filteredSuggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <FlatList
            data={filteredSuggestions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => handleSelect(item)}
                activeOpacity={0.7}
              >
                <TextField style={styles.suggestionText}>
                  {item.name} ({item.symbol})
                </TextField>
              </TouchableOpacity>
            )}
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 4,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    maxHeight: 200,
  },
  suggestionItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  suggestionText: {
    fontSize: 16,
    color: '#333',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  }

});

export default CryptoSuggestions;