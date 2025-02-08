import {StyleSheet, View, SafeAreaView} from 'react-native';
import Depot from '../components/organics/Depot';

const DepotScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Depot />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container : {
        flex : 1
    }
})

export default DepotScreen;