import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { orangeDefault1, whiteDefault } from './shared/styleConsts';
import Main from './pages/Main/Main';

export default function App() {
  return (
    <NavigationContainer>
      <Main></Main>
      <StatusBar backgroundColor={whiteDefault}/>
    </NavigationContainer>
  );
}