import React from 'react';
import {ScrollView, StyleSheet, View } from 'react-native';
import HistoriqueItem from './HistoriqueItem';
import InfoFieldV from './InfoFieldV';

const HistoriqueSection = ({ title, items, transactions}) => (
    <View>
        <View style={styles.entete}>
            <InfoFieldV label="Solde (USD)" value={parseFloat(title || 0).toFixed(2)}/>
            <InfoFieldV label="Achats (USD)" value={parseFloat(transactions.totalAchats || 0).toFixed(2)}/>
            <InfoFieldV label="Ventes (USD)" value={parseFloat(transactions.totalVentes || 0).toFixed(2)}/>
        </View>
        <ScrollView style={styles.historiqueSection}>
        {items.filter(item => item.type !== "inconnu").map((item, index) => (
            <HistoriqueItem key={index} 
                cryptoId={item.cryptoId} 
                date={item.date}
                amount={item.amount}
                type={item.type}
                totalValue={item.totalValue}
            />
        ))}
        </ScrollView>
    </View>
);

const styles = StyleSheet.create ({
    entete : {
        paddingTop : 5,
        flexDirection : 'row',
        justifyContent : 'space-between',
        backgroundColor : 'light gray'
    },

    historiqueSection : {
        marginBottom: 24,
    },

    sectionTitle: {
        paddingTop : 20,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color : 'black',
        marginRight : 5,
    },
});

export default HistoriqueSection;