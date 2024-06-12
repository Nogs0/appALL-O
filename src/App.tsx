import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Routes from './routes';
import { AuthProvider } from './contexts/auth';
import { RegisterProvider } from './contexts/register';
import { APIProvider } from './contexts/api';

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
    </NavigationContainer>
  );
}