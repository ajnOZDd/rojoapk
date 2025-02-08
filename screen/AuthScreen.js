import React, { useState } from 'react';
import { View, TextInput, Button, Alert, SafeAreaView } from 'react-native';
//import auth from '@react-native-firebase/auth';
import AuthForm from '../components/organics/AuthForm';

const AuthScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ padding: 20 }}>
      <AuthForm  
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

export default AuthScreen;
