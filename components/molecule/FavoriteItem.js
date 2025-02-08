import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import TextField from '../atom/TextField';
import InfoFieldV from './InfoFieldV';


const FavoriteItem = ({ symbol, crypto, date, prix}) => {

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
            <InfoFieldV style={styles.symbol} label="Symbol" value={symbol} />
            <InfoFieldV style={styles.nom} label="Nom" value={crypto}/>
            <InfoFieldV style={styles.date} label="Date" value={showDate} />
            <InfoFieldV style={styles.prix} label="Prix (USD)" value={prix} /> 
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    field: {
      marginBottom: 5,
      flexDirection: 'row',
    },
    
    symbol : {
        marginBottom: 5,
        padding: 20,
        shadowColor: '#000',
        borderRadius: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 3,
        width : 105,
        height : 90,
    },

    nom : {
        marginBottom: 5,
        padding: 20,
        shadowColor: '#000',
        borderRadius: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 3,
        width : 190,
        height : 90
    },

    date : {
        marginBottom: 5,
        padding: 20,
        shadowColor: '#000',
        borderRadius: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 3,
        width : 150,
        height : 90
    },

    prix : {
        marginBottom: 5,
        padding: 20,
        shadowColor: '#000',
        borderRadius: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 3,
        width : 150,
        height : 90
    },
  });

export default FavoriteItem;