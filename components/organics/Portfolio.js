import React, { useState, useEffect, useRef, useCallback} from 'react';
import { View, StyleSheet, Alert, SafeAreaView, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ref, get, set, update } from 'firebase/database';
import { auth, database } from '../../config/firebaseConfig';
import TextField from '../atom/TextField';
import InputField from '../atom/InputFiled';
import DatePicker from '../atom/DatePicker';
import Button from '../atom/Button';
import CryptoSuggestions from '../molecule/CryptoSuggestion';

const Portfolio = ({ style }) => {

  const [userId, setUserId] = useState(auth.currentUser.uid);
  const [cryptoId, setCryptoId] = useState('bitcoin');
  const [type, setType] = useState('achat');
  const [amount, setAmount] = useState("");
  const [totalValue, setTotalValue] = useState("");
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [portfolio, setPortfolio] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState("");
  // const inputRef = useRef(null);

  // const setInputValue = (newValue) => {
  //   if (inputRef.current) {
  //     // Pour mettre à jour la valeur native
  //     inputRef.current.setNativeProps({ text: newValue });
  //     // Mettre à jour l'état
  //     setTotalValue(newValue);
  //   }
  // };

  const fetchPortfolio = async () => {
    setIsLoading(true);
    try {
      const portfolioRef = ref(database, `portfolio/${userId}`);
      const snapshot = await get(portfolioRef);
      
      if (snapshot.exists()) {
        setPortfolio(snapshot.val());
      } else {
        // Création d'un nouveau portfolio si inexistant
        const initialPortfolio = {
          cryptoId : "",
          type : "",
          amount: 0,
          totalValue: 0, // Pour stocker le solde de chaque crypto
          date : new Date().toISOString()
        };
        await set(portfolioRef, initialPortfolio);
        setPortfolio(initialPortfolio);
      }
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de la récupération du portfolio.');
      console.error('Erreur lors de la récupération du portfolio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   setInputValue(totalValue);
  // }, [totalValue]);
  
  useEffect(() => {
    setUserId(auth.currentUser.uid);
    fetchPortfolio();
  }, []);

  const handleSubmit = async () => {
    if (!amount || !cryptoId) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    try {

      const portfolioRef = ref(database, `portfolio/${userId}`);
      const calculatedTotalValue = parseFloat(amount || 0) * parseFloat(totalValue || 0);
      const walletRef = ref(database, `wallets/${userId}`);
      const snapshotWallet = await get(walletRef);
      const walletData = snapshotWallet.val();

      // Vérifier le solde pour un achat
      if (type === 'achat' && calculatedTotalValue > walletData.balance) {
        Alert.alert('Information', 'Solde insuffisant pour cet achat');
        return;
      }

      // Créer la nouvelle transaction
      const newTransaction = {
        cryptoId,
        type,
        amount: parseFloat(amount),
        totalValue: calculatedTotalValue,
        date: transactionDate.toISOString()
      };

      // Calculer le nouveau solde
      const newBalance = type === 'achat' 
        ? walletData.balance - calculatedTotalValue 
        : walletData.balance + calculatedTotalValue;

      // Mettre à jour le portfolio
      const portfolioSnapshot = await get(portfolioRef);
      let currentTransactions = portfolioSnapshot.exists() ? portfolioSnapshot.val() : [];
      
      if (!Array.isArray(currentTransactions)) {
        currentTransactions = [];
      }

      currentTransactions.push(newTransaction);

      // Mettre à jour la base de données
      await set(portfolioRef, currentTransactions);
      await update(walletRef, {
        balance: newBalance
      });

      // Mettre à jour l'état local
      setBalance(newBalance);
      setAmount('');
      // setTotalValue('');
      setTransactionDate(new Date());

      Alert.alert(
        'Succès', `Transaction ${type} effectuée avec succès. Nouveau solde: ${newBalance.toFixed(2)}$`
      );
    } catch (error) {
      Alert.alert('Erreur', `Erreur lors de l'ajout de la transaction.`);
      console.error(`Erreur lors de l'ajout de la transaction:`, error);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, style]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, style]}>
      <View style={styles.section}>
        <TextField style={styles.sectionTitle}>Type</TextField>
        <Picker selectedValue={type} onValueChange={(itemValue) => setType(itemValue)} >
          <Picker.Item label="Achat" value="achat" />
          <Picker.Item label="Vente" value="vente" />
        </Picker>
      </View>
      <View style={styles.section}>
        <CryptoSuggestions
          onSelect={(cryptoData) => {
            setCryptoId(cryptoData.id);
            setTotalValue(String(cryptoData.price));
          }}
          initialText={cryptoId}
        />
      </View>

      <View style={styles.section}>
        <TextField style={styles.sectionTitle}>Prix</TextField>
        <InputField
          value={totalValue}
          onChangeText={setTotalValue}
          placeholder="entrer le prix"
          keyboardType="numeric"
          editable={false}
        />
      </View>

      <View style={styles.section}>
        <TextField style={styles.sectionTitle}>Montant Crypto</TextField>
        <InputField
          value={amount}
          onChangeText={setAmount}
          placeholder="entrer le montant du crypto"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.section}>
        <TextField style={styles.sectionTitle}>Date</TextField>
        <DatePicker
          value={transactionDate}
          onDateChange={setTransactionDate}
        />
      </View>

      <Button
        onPress={handleSubmit}
        text="AJOUTER"
        style={styles.button}
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

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  section: {
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  button: {
    padding: 10,
    marginTop: 8,
    color: 'black',
  },
});

export default Portfolio;