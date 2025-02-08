import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import HistoriqueSection from '../molecule/HistoriqueSection';
import { auth, database } from '../../config/firebaseConfig';
import { ref, get, set} from 'firebase/database';

const SituationPortFeuille = () => {

    const [wallet, setWallet] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState(auth.currentUser.uid);
    const [portfolio, setPortfolio] = useState([]);  // Initialisé comme tableau vide
    const [sommesTransaction, setSommeTransaction] = useState({totalAchats: 0, totalVentes: 0 });


    useEffect(() => {
        setUserId(auth.currentUser.uid);
        fetchData();
    }, []);

    function totalTransactions(portfolio) {
        let totalAchats = 0;
        let totalVentes = 0;
        if (Array.isArray(portfolio)) {
          portfolio.forEach((transaction) => {
            if (transaction.type === "achat") {
              totalAchats += transaction.totalValue;
            } else if (transaction.type === "vente") {
              totalVentes += transaction.totalValue;
            }
          });
        }
        return {
          totalAchats,
          totalVentes
        };
      }
      

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

    const fetchPortfolio = async () => {
        try {
            const portfolioRef = ref(database, `portfolio/${userId}`);
            const snapshot = await get(portfolioRef);
            if (snapshot.exists()) {
                const data = snapshot.val()
                setPortfolio(data);
                const totaux = totalTransactions(data)
                setSommeTransaction(totaux);
            } else {
                const initialPortfolio = [
                    {
                        amount: 0,
                        cryptoId: "inconnu",
                        date: new Date().toISOString(),
                        totalValue: 0,
                        type: "inconnu"
                    }
                ];
                await set(portfolioRef, initialPortfolio);
                setPortfolio(initialPortfolio);
                setSommeTransaction({totalAchats: 0, totalVentes: 0 });
            }
        } catch (error) {
            console.error('Erreur portfolio:', error);
            Alert.alert('Erreur', 'Erreur lors de la récupération des données du portfolio.');
        }
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            await Promise.all([fetchPortfolio(), fetchWallet()]);
        } catch (error) {
            console.error('Erreur fetchData:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <View style={[styles.container]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!wallet || !portfolio) {
        return (
            <View style={[styles.container]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <HistoriqueSection 
                title={wallet.balance.toString()}
                items={portfolio}
                transactions={sommesTransaction}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
        marginTop: 10,
        borderRadius: 10
    },
});

export default SituationPortFeuille;