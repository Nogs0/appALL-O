import { View, Text } from 'react-native'
import React from 'react'
import { Header } from '../../components/Header'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
export default function Main() {
  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={{header: () => Header}}>
        <Stack.Group>
            <Stack.Screen name='Home' component={Home} />
        </Stack.Group>
    </Stack.Navigator>
  )
}