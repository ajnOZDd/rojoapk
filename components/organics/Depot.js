import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, SafeAreaView, ActivityIndicator } from 'react-native';
import { ref, get, set, update } from 'firebase/database';
import { auth, database } from '../../config/firebaseConfig';
import TextField from '../atom/TextField';
import InputField from '../atom/InputFiled';
import DatePicker from '../atom/DatePicker';
import InfoField from '../molecule/InfoFiled';
import Button from '../atom/Button';

const Depot = ({ style }) => {
  const [wallet, setWallet] = useState(null);
  const [depositAmount, setDepositAmount] = useState('');
  const [depositDate, setDepositDate] = useState(new Date());
  const [userId, setUserId] = useState(auth.currentUser.uid);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWallet = async () => {
    setIsLoading(true);
    try {
      const walletRef = ref(database, `wallets/${userId}`);
      const snapshot = await get(walletRef);
      if (snapshot.exists()) {
        setWallet(snapshot.val());
      } else {
        // Si le portefeuille n'existe pas, on le crée avec un solde initial de 0
        await set(walletRef, { balance: 0, deposits: [{ amount: 0, date: new Date().toISOString() }], withdrawals: [{ amount: 0, date: new Date().toISOString() }]});
        setWallet({ balance: 0, deposits: [], withdrawals: [] });
      }
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de la récupération des données du portefeuille.');
      console.error('Erreur lors de la récupération du portefeuille:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, [userId]);

  useEffect(() => {
    setUserId(auth.currentUser.uid);
  }, []);

  const handleDeposit = async () => {
    try {
      const walletRef = ref(database, `wallets/${userId}`);
      const snapshot = await get(walletRef);
      const currentWallet = snapshot.val();

      const newDeposit = {
        amount: parseFloat(depositAmount),
        date: depositDate.toISOString(),
      };

      await update(walletRef, {
        balance: currentWallet.balance + newDeposit.amount,
        deposits: [...currentWallet.deposits, newDeposit],
      });

      const lastSnapshot = await get(walletRef);
      const lastValWallet = lastSnapshot.val();
      setWallet(lastValWallet);
      setDepositAmount('');
      Alert.alert('Succès', 'Dépôt effectué avec succès.');
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors du dépôt.');
      console.error('Erreur lors du dépôt:', error);
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
    <View style={[styles.container, style]}>
      <InfoField label="Solde" value={`${wallet.balance} USD`} />
      <View style={styles.section}>
        <TextField style={styles.sectionTitle}>Dépôt</TextField>

        <InputField
          value={depositAmount}
          onChangeText={setDepositAmount}
          placeholder="Montant du dépôt"
          keyboardType="numeric"
        />

        <DatePicker
          value={depositDate}
          onDateChange={setDepositDate}
        />

        <Button
          onPress={handleDeposit}
          text="DEPOSER"
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: 'black',
  },
  button: {
    padding: 10,
    marginTop: 8,
    color: 'black',
  },
});

export default Depot;