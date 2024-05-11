import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Header } from '../../components/Header';
import Home from './Home';
import ProfessionsList from './Home/ProfessionsList';

const Stack = createNativeStackNavigator();
export default function Main() {
  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={{ header: () => Header }}>
      <Stack.Group>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='ProfessionsList' component={ProfessionsList} options={{ headerShown: false }} />
      </Stack.Group>
    </Stack.Navigator>
  )
}