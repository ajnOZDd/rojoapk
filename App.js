import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthScreen from './screen/AuthScreen';
import SignUpFormScreen from './screen/SignUpFormScreen';
import UserDetailsScreen from './screen/UserDetailsScreen';
import CryptoCoursesScreen from './screen/CryptoCoursesScreen';
import MenueScreen from './screen/MenueScreen';
import DepotScreen from './screen/DepotScreen';
import RetraitScreen from './screen/RetraitScreen';
import Portfolio from './components/organics/Portfolio';
import SituationPortFeuilleScreen from './screen/SituationPorteFeuilleScreen';
import FavoriteScreen from './screen/FavoriteScreen';


const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={AuthScreen} />
      <Stack.Screen name="Cours Crypto" component={CryptoCoursesScreen} />
      <Stack.Screen name="Inscription" component={SignUpFormScreen} />
      <Stack.Screen name="Menue" component={MenueScreen} />
      <Stack.Screen name="Profile" component={UserDetailsScreen} />
      <Stack.Screen name="Depot" component={DepotScreen} />
      <Stack.Screen name="Transaction" component={Portfolio} />
      <Stack.Screen name="Retrait" component={RetraitScreen} />
      <Stack.Screen name="Situation Portefeuille" component={SituationPortFeuilleScreen} />
      <Stack.Screen name="Favoris" component={FavoriteScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
