import React from 'react';
import { Image, StyleSheet } from 'react-native';

const ImageDisplay = ({ uri }) => {
  return <Image source={{ uri }} style={styles.photo} />;
};

const styles = StyleSheet.create({
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
});

export default ImageDisplay;

// import React from 'react';
// import { Image, StyleSheet } from 'react-native';

// const ImageDisplay = ({ uri }) => {
//   return <Image source={uri} style={styles.photo} />; // Pas de destructuration de l'URI
// };

// const styles = StyleSheet.create({
//   photo: {
//     width: 150,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 20,
//   },
// });

// export default ImageDisplay;