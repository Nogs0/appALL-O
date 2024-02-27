import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import Main from './pages/Main/MainTab';
import { orangeDefault1 } from './shared/styleConsts';

export default function App() {
  return (
    <NavigationContainer>
      <Main></Main>
      <StatusBar backgroundColor={orangeDefault1}/>
    </NavigationContainer>
  );
}