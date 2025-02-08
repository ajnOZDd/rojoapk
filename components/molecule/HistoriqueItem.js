import React from 'react';
import { ScrollView, StyleSheet, View} from 'react-native';
import TextField from '../atom/TextField';
import InfoFieldV from './InfoFieldV';


const HistoriqueItem = ({ amount = 0, cryptoId = "inconnu", date = "", totalValue = 0, type = "" }) => {

    const getDateFromAddedAt = (date) => {
        if (!date || date === '') {
          return 'Inconnu';
        }
        const newDate = new Date(date);
        return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
    };

    const showDate = getDateFromAddedAt(date);

    return (
        <ScrollView style={styles.field} showsHorizontalScrollIndicator = {true} horizontal = {true}>
            <InfoFieldV style={styles.cryptoId} label="Nom" value={cryptoId} />
            <InfoFieldV style={styles.amount} label="Montant" value={amount.toFixed(1)}/>
            <InfoFieldV style={styles.totalValue} label="Valeur" value={totalValue.toFixed(1)}/>
            <InfoFieldV style={styles.date} label="Date" value={showDate} />
            <InfoFieldV style={styles.type} label="Type" value={type}/>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    field: {
      marginBottom: 5,
      flexDirection: 'row',
    },
    
    cryptoId : {
        marginBottom: 15,
        padding: 20,
        shadowColor: '#000',
        borderRadius: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 3,
        width : 220,
        height : 90,
    },

    amount : {
        marginBottom: 15,
        padding: 20,
        shadowColor: '#000',
        borderRadius: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 3,
        width : 140,
        height : 90
    },

    totalValue : {
        marginBottom: 15,
        padding: 20,
        shadowColor: '#000',
        borderRadius: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 3,
        width : 140,
        height : 90
    },

    date : {
        marginBottom: 15,
        padding: 20,
        shadowColor: '#000',
        borderRadius: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 3,
        width : 140,
        height : 90
    },

    type : {
        marginBottom: 15,
        padding: 20,
        shadowColor: '#000',
        borderRadius: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 3,
        width : 140,
        height : 90
    },
    
  });

export default HistoriqueItem;