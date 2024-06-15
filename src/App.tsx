import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Routes from './routes';
import { AuthProvider } from './contexts/auth';
import { RegisterProvider } from './contexts/register';
import { APIProvider } from './contexts/api';
import FlashMessage from 'react-native-flash-message';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <RegisterProvider>
          <APIProvider>
            <Routes />
          </APIProvider>
        </RegisterProvider>
      </AuthProvider>
      <FlashMessage position={'top'}/>
    </NavigationContainer>
  );
}