import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignIn from '../login';

const Stack = createNativeStackNavigator();

export default function AuthRotes() {
  return (
    
    <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}