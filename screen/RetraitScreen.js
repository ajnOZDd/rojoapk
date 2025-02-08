import {StyleSheet, View, SafeAreaView} from 'react-native';
import Retrait from '../components/organics/Retrait';

const RetraitScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Retrait />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container : {
        flex : 1
    }
})

export default RetraitScreen;