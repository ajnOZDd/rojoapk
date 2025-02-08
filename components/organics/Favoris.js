import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import { auth, database } from '../../config/firebaseConfig';
import { ref, get, set} from 'firebase/database';
import FavoriteSection from '../molecule/FavoriteSection';

const Favorite = ({style}) => {

    const [favorisData, setFavorisData] =  useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState(auth.currentUser.uid)

    useEffect(() => {
        setUserId(auth.currentUser.uid);
        fetchFavorisData();
    }, []);


    const fetchFavorisData = async () => {
        setIsLoading(true);
        try {
          const favorisRef = ref(database, `users/${userId}/favorites`);
          const snapshot = await get(favorisRef);
          if (snapshot.exists()) {
            setFavorisData(snapshot.val());
          } else {
            const initialFavoris = {
                initial : {
                addedAt : new Date().toISOString(),
                name : "inconnu",
                symbol : "inconnu",
                lastKnownPrice : 0,
                priceAlertThreshold : 0.05
               }
            };
            await set(favorisRef, initialFavoris);
            setFavorisData(initialFavoris);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des données utilisateur:', error);
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
    
    return (
        <View style={[styles.container, style]}>
            <FavoriteSection favorites={favorisData} />
        </View>
    )
};
    

const styles = StyleSheet.create ({
    container: {
        flex : 1,
        backgroundColor: '#fff',
        padding: 16,
    },
});

export default Favorite;