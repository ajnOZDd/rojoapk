import React from 'react';
import { ScrollView, StyleSheet, Dimensions, View} from 'react-native';
import TextField from '../atom/TextField';
import FavoriteItem from './FavoriteItem';

const FavoriteSection = ({ favorites }) => {

  const favoriteList = favorites ? Object.values(favorites) : [];

    return (
      <View style={styles.container}>
        <TextField style={styles.title}>Vos Favoris</TextField>
        <ScrollView style={styles.favorite} showsVerticalScrollIndicator={true}>
          {favoriteList.filter(favorite => favorite.name !== 'inconnu').map((favorite, index) => (
            <FavoriteItem
              key={index}
              symbol={favorite.symbol}
              crypto={favorite.name}
              date={favorite.addedAt}
              prix={favorite.lastKnownPrice}
            />
          ))}
        </ScrollView>
      </View>
    );
};


const styles = StyleSheet.create ({
    container : {
      flex : 1
    }, 

    favorite : {
        backgroundColor : 'light green',
        marginBottom : 10,
        borderRadius : 10,
        //padding : 10
        height : Dimensions.get('window').height/2.2
    },

    title : {
        fontSize : 20,
        color : 'black',
        marginBottom : 10
    }
});

export default FavoriteSection;