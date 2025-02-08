import {StyleSheet, View } from 'react-native';
import MenuSection from '../molecule/MenueSection';

const Menu = ({ sections, style}) => (
    <View style={[styles.container, style]}>
      {sections.map((section, index) => (
        <MenuSection key={index} title={section.title} items={section.items} />
      ))}
    </View>
);

const styles = StyleSheet.create ({
    container: {
        backgroundColor: '#fff',
        padding: 16,
    },
});

export default Menu;