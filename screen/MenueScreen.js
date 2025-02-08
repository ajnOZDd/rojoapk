import {StyleSheet, View, SafeAreaView} from 'react-native';
import Menu from '../components/organics/Menue';

const MenueScreen = ({navigation}) => {

    const sections = [
        {
          title: 'Liste Des Menue',
          items: [
            // { label: 'Inscription', onPress: () => navigation.navigate('Inscription') },
            { label: 'Profile', onPress: () => navigation.navigate('Profile') },
            { label: 'Cours Crypto', onPress: () => navigation.navigate('Cours Crypto') },
            { label: 'Depot', onPress: () => navigation.navigate('Depot') },
            { label: 'Retrait', onPress: () => navigation.navigate('Retrait')},
            { label: 'Transaction', onPress: () => navigation.navigate('Transaction')},
            { label: 'Situation Portefeuille', onPress: () => navigation.navigate('Situation Portefeuille')},
            { label: 'Favoris', onPress: () => navigation.navigate('Favoris')}
          ],
        }
    ]
    
    return (
        <SafeAreaView style={styles.container}>
            <Menu sections={sections} style={styles.menue}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create ({
  container: {
    // flex : 1,
    // justifyContent : 'center',
  },
  
  menue : {
    //backgroundColor : 'light gray',
    borderColor : 'balck',
    borderRadius : 15,
    backgroundColor : 'light gray',
    // marginTop : 10
  }

});

export default MenueScreen;




