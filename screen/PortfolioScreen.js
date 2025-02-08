import {StyleSheet, View, SafeAreaView} from 'react-native';
import Portfolio from '../components/organics/Portfolio';

const DepotScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Portfolio />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container : {
        flex : 1
    }
})

export default DepotScreen;