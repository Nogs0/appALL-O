import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Routes from './routes';
import { AuthProvider } from './contexts/auth';
import { APIProvider } from './contexts/api';
import FlashMessage from 'react-native-flash-message';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <APIProvider>
          <Routes />
        </APIProvider>
      </AuthProvider>
      <FlashMessage position={'top'} />
    </NavigationContainer>
  );
}