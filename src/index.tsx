import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import Home from './pages/Main/Home';
import { orangeDefault1 } from './shared/styleConsts';

export default function App() {
  return (
    <NavigationContainer>
      <Home></Home>
      <StatusBar backgroundColor={orangeDefault1}/>
    </NavigationContainer>
  );
}