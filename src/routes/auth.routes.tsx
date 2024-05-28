import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SignIn from '../login';

export default function AuthRotes() {
  
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}