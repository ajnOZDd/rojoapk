import React, {useState} from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import InfoField from '../molecule/InfoFiled';
import ImageDisplay from '../atom/ImageDisplay';
import Button from '../atom/Button';

const UserDetailForm = ({ user, onEditPress}) => {

  return (
    <View style={styles.container}>
      {user.photoURL && <ImageDisplay uri={user.photoURL} />}
      {user.name && <InfoField label="Nom" value={user.name} />}
      {user.email && <InfoField label="Email" value={user.email} />}
      {user.createdAt && (<InfoField label="Créé le" value={new Date(user.createdAt).toLocaleDateString()} />)}
      <Button text="Modifier Profil" onPress={onEditPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
    //backgroundColor : 'lightblue',
    marginTop : 10,
    borderRadius : 10

  },
});

export default UserDetailForm;